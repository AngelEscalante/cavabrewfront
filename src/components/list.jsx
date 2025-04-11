import React from 'react';
import Select from 'react-select';

const SelectedData = ({ lista = [], value, onChange, name }) => {
    const options = [{ value: '', label: 'Elige una opción', isDisabled: true }, ...lista];
    
    const handleChange = (selectedOption) => {
        // Simulamos un evento estándar para que funcione con tu handleChange
        onChange({
            target: {
                name: name,
                value: selectedOption ? selectedOption.value : ''
            }
        });
    };

    // Encuentra la opción seleccionada basada en el valor
    const selectedValue = options.find(option => option.value === value) || null;

    return (
        <Select 
            options={options} 
            placeholder="Seleccione" 
            value={selectedValue}
            onChange={handleChange}
            name={name}
        />
    );
};

export default SelectedData;