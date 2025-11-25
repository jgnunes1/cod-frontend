export const iconeStyle = { fontSize: "1.2em", color: 'auto' };
export const labelStyle = { paddingLeft: "4%" };

export const iconeCienciaSpec = (data) => {
    let icone = "";
    let estilo = { ...iconeStyle };

    switch (data?.ciencia) { // Supondo que "status" é a coluna com os valores
        case 0:
            icone = "pi pi-ban";
            estilo.color = 'orange';
            break;
        case 1:
            icone = "pi pi-verified";
            estilo.color = 'green';
            break;
        default:
            icone = "pi pi-circle-fill";
            estilo.color = 'puple';
    }

    return <><i className={icone} style={estilo}></i><label style={labelStyle}>{data?.nome_avaliado}</label></>;
}

export const iconeChancelaSpec = (data) => {
    let icone = "";
    let estilo = {};

    switch (data?.chancela) { // Supondo que "status" é a coluna com os valores
        case 0:
            icone = "pi pi-clock";

            break;
        case 1:
            icone = "pi pi-thumbs-up-fill";
            estilo.color = 'green';
            break;
        case 2:
            icone = "pi pi-thumbs-down-fill";
            estilo.color = 'red';
            break;
        default:
            icone = "pi pi-circle-fill";
            estilo.color = 'purple';
    }
    return <><i className={icone} style={estilo}></i><label style={labelStyle}>{data?.nome_diretor}</label></>;
}


export const iconeSituacaoSpec = (data, chave="situacao") => {
    let icone = "";
    let estilo = {};

    switch (data?.situacao) { // Supondo que "status" é a coluna com os valores
        case "EM ABERTO":
            icone = "pi pi-file-edit";
            estilo.color = 'orange';
            break;
        case "SALVO":
            icone = "pi pi-save";
            estilo.color = 'blue';
            break;
        case "APTO":
            icone = "pi pi-check-circle";
            estilo.color = 'green';
            break;
        case "INDEFERIDO":
            icone = "pi pi-times";
            estilo.color = 'red';
            break;
        default:
            icone = "pi pi-circle-fill";
            estilo.color = 'purple';
    }
    return <><i className={icone} style={estilo}></i><label style={labelStyle}>{data[chave]}</label></>;
}


export const iconeStatusSpec = (data) => {
    let icone = "";
    let estilo = {};

    switch (data?.id_tipo_status) { // Supondo que "status" é a coluna com os valores
        case 1:
            icone = "pi pi-flag-fill";
            estilo.color = 'blue';
            break;
        case 2:
            icone = "pi pi-flag-fill";
            estilo.color = 'yellow';
            break;
        case 3:
            icone = "pi pi-flag-fill";
            estilo.color = 'orange';
            break;
        case 4:
            icone = "pi pi-flag-fill";
            estilo.color = 'green';
            break;
        case 5:
            icone = "pi pi-flag-fill";
            estilo.color = 'red';
            break;
        default:
            icone = "pi pi-flag-fill";
            estilo.color = 'purple';
    }
    return <><i className={icone} style={estilo}></i><label style={labelStyle}>{data?.status}</label></>;
}