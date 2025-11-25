export default function ValidarCpf(valor) {

    if (!ValidaCPF(valor)) {
        return "CPF inválido";
    }

    return null;
}

function ValidaCPF(cpf) {
    if (cpf !== null && cpf !== undefined) {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11) {
            return false;
        }

        // Elimina CPFs inválidos conhecidos
        if ([
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999'
        ].includes(cpf)) {
            return false;
        }

        // Valida 1º dígito verificador
        let add = 0;
        for (let i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(9))) {
            return false;
        }

        // Valida 2º dígito verificador
        add = 0;
        for (let i = 0; i < 10; i++) {
            add += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) {
            rev = 0;
        }
        if (rev !== parseInt(cpf.charAt(10))) {
            return false;
        }
    }
    
    return true;
}
