import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

// TODO: implementar um controle no datastorage para não exibir a mensagem novamente
export default function CienteMensagem() {
    const [visible, setVisible] = useState(false);
    const toastBC = useRef(null);

    const clear = () => {
        toastBC.current.clear();
        setVisible(false);
    };

    const confirm = () => {
        if (!visible) {
            setVisible(true);
            toastBC.current.clear();
            toastBC.current.show({
                severity: 'info',
                summary: 'Leia atentamente os dados de cada cartão',
                sticky: true,
                content: (props) => (
                    <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
                        <div className="flex align-items-center gap-2">
                            {/*<Avatar image="/images/avatar/amyelsner.png" shape="circle" />*/}
                            <span className="font-bold text-900">Orientação Importante</span>
                        </div>
                        <div className="font-medium text-sm my-3 text-900">{props.message.summary}</div>
                        <Button className="p-button-sm flex" label="ciente" severity="info" onClick={clear}></Button>
                    </div>
                )
            });
        }
    };

    useEffect(() => {
        confirm();
    }, []);

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toastBC} position="bottom-center" onRemove={clear} />
        </div>
    )
}