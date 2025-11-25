import { Tooltip } from "primereact/tooltip";
import React, { useRef } from "react"

export default function InfoTooltip({ id, mensagem }) {
    const tooltipRef = useRef(null);

    const handleTooltipShow = (event) => {
        tooltipRef.current.show(event); // Exibe o Tooltip
    };

    const handleTooltipHide = () => {
        tooltipRef.current.hide(); // Oculta o Tooltip
    };
    return (
        <>
            <i
                id={id}
                className="pi pi-info-circle"
                onClick={handleTooltipShow}
                onMouseLeave={handleTooltipHide} // Oculta o Tooltip no desktop
                onTouchEnd={handleTooltipHide} // Oculta o Tooltip no mobile
                style={{
                    cursor: "pointer",
                    color: "#007ad9",
                    fontSize: "1.2rem",
                }}
            ></i>
            <Tooltip
                ref={tooltipRef}
                target={`#${id}`}
                content={mensagem}
                position="top"
            />
        </>
    )
}