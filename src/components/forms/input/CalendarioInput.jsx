import React, { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import PropTypes from "prop-types";

export default function CalendarioInput({ label, name, placeholder, value, onChange, onBlur, error, id, disabled, minDate, maxDate }) {
    
    const parseDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return new Date(year, month - 1, day);  // O mês é zero-indexado em JavaScript
    };
    
    const [date, setDate] = useState(value ? parseDate(value) : null);

    useEffect(() => {
        setDate(value ? parseDate(value) : null);
    }, [value]);
    
    const handleDateChange = (e) => {
        const data = e.value;
        const dataFormatada = data.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        setDate(data);
        onChange({ target: { name, value: dataFormatada } });
    };

    return (
        <div className="campo" id={id}>
            <label>{label}:</label>
            <Calendar
                disabled={disabled}
                name={name}
                value={date}
                placeholder={placeholder}
                onChange={handleDateChange}
                onBlur={onBlur}
                dateFormat="dd/mm/yy"
                minDate={minDate ? new Date(minDate) : null}
                maxDate={maxDate ? new Date(maxDate) : null}
            />
            <small>{error && <p>{error}</p>}</small>
        </div>
    );
}

// Definindo as prop types para o componente
CalendarioInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
};

// Definindo valores padrões para as props opcionais
CalendarioInput.defaultProps = {
    placeholder: '99/99/9999',
    onBlur: () => {},
    error: '',
    id: '',
    disabled: false,
    minDate: '',
    maxDate: '',
};
