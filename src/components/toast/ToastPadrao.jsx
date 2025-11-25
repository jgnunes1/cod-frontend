import { Toast } from 'primereact/toast';
import React, { useRef, useEffect } from 'react';

export default function ToastPadrao({ tipo = 'info', titulo = 'processando', mensagem = '...aguarde', position = 'top-right', sticky = false }) {
    const toast = useRef(null);

    const showToast = (severity, summary, detail, sticky) => {
        if (sticky) {
            toast.current.show({ severity, summary, detail, sticky: true });
            
        }else{
            toast.current.show({ severity, summary, detail, life: 3000 });
        }
    };

    useEffect(() => {
        const toastTypes = {
            info: 'info',
            success: 'success',
            warn: 'warn',
            error: 'error',
        };

        const severity = toastTypes[tipo] || 'info';  // Usa 'info' como fallback
        showToast(severity, titulo, mensagem, sticky);
    }, [tipo, titulo, mensagem]); 

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} position={position}/>
        </div>
    );
}
