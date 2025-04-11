export default function Footer({licencia}) {
    return (
        <div className="text-end text-light">
          <label style={{ paddingRight: "20px" }}>Vencimiento:{licencia}</label>
        </div>
      );
}