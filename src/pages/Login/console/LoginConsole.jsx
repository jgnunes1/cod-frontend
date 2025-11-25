import React, { useState } from "react";
import { LoremIpsum } from "react-lorem-ipsum";
import logo_dgti from "../../../assets/images/dgti.svg";
import ToastPadrao from "../../../components/toast/ToastPadrao";
import LoginForm from "../form/LoginForm";

export default function LoginConsole() {
    const [toastParams, setToastParams] = useState(null);

    return (
        <>
            <section className="orientacoes">
                <h1>Bem-vindo </h1>
                <LoremIpsum p={1} />
            </section>
            {toastParams && (
                <ToastPadrao
                    tipo={toastParams.tipo}
                    titulo={toastParams.titulo}
                    mensagem={toastParams.mensagem}
                />
            )}

            <LoginForm />
            <div className="recuperar-senha">esqueci minha senha</div>
            <img src={logo_dgti} className="logo" alt="Logo da DGTI" />
        </>
    );
}