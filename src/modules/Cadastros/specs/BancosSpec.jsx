export const BancosSpec = {
    schema:{id:'',codigo:'',nome:'',indice:''},
    inputs() {
        let k = 1;
        return [
            {type:"TextoInput",key: k++,label:"Código",name:"codigo", },
            {type:"TextoInput",key: k++,label:"Índice",name:"indice"},
            {type:"TextoInput",key: k++,label:"Nome",name:"nome"},
        ]
    },

    dataTable() {
        return [
            {
                id: "banco",
                selectionMode: false,
                newMode: true,
                editMode: true,
                deleteMode: true,
                columns: [
                    {
                        id: 1,
                        field: "codigo",
                        header: "Banco",
                    },
                    {
                        id: 2,
                        field: "nome",
                        header: "Nome",
                    },
                    {
                        id: 3,
                        field: "indice",
                        header: "indice",
                    },
                ],
            },
        ]
    }
}