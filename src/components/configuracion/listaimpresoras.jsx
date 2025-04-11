import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import {LoaderCircle} from "lucide-react";

export default function Impresoras() {
  const [printers, setPrinters] = useState([]);
  const [impresoraElegida, setImpresoraElegida] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener impresoras al cargar el componente
  useEffect(() => {
    async function fetchPrinters() {
      setLoading(true); // Inicia el estado de carga
      try {
        const printerList = await window.electron.obtenerImpresoras(); // Llamada IPC al backend
        setPrinters(printerList);
        setError(null); // Si se obtiene correctamente, resetea los errores
      } catch (error) {
        setError("❌ Error al obtener las impresoras.");
        console.error("❌ Error obteniendo las impresoras:", error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }
    fetchPrinters();
  }, []);

  const options = useMemo(() => [
    { value: '', label: 'Elige una opción', isDisabled: true },
    ...printers
  ], [printers]);

  async function handlePrint() {
    if (!impresoraElegida) {
      console.error("⚠️ No has seleccionado una impresora.");
      return;
    }

    setLoading(true); // Inicia el estado de carga durante la impresión
    try {
      const response = await window.electron.imprimirTicket(impresoraElegida); // Llamada IPC al backend
      if (response.success) {
        console.log("✅ Impresión enviada correctamente.");
      } else {
        console.error("❌ Error al imprimir:", response.error);
        setError(response.error); // Muestra el error de impresión al usuario
      }
    } catch (error) {
      console.error("❌ Error al imprimir:", error);
      setError("❌ Error inesperado al intentar imprimir.");
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  }

  return (
    <div className="d-inline">
      {error && <div className="alert alert-danger">{error}</div>} {/* Muestra los errores al usuario */}
      
      {/* Si está cargando, muestra un spinner */}
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"><LoaderCircle /></span>
        </div>
      ) : (
        <>
          <Select 
            options={options} 
            placeholder="Seleccione una impresora"
            onChange={(selectedOption) => setImpresoraElegida(selectedOption ? selectedOption.value : null)}
          />
          <button 
            className="btn btn-outline-dark" 
            onClick={handlePrint} 
            disabled={!impresoraElegida || loading} // Deshabilitar el botón si no hay impresora seleccionada o si está cargando
          >
            {loading ? "Imprimiendo..." : "Prueba"}
          </button>
        </>
      )}
    </div>
  );
}
