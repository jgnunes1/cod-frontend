import { useState } from "react";

const CategoriaForm = () => {
  const [preview, setPreview] = useState("https://placeholder.co/48x48");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="col-md-8">
          <div className="card form-container">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="imagem" className="form-label" style={{ cursor: "pointer" }}>
                    <img src={preview} alt="Categoria" width={48} />
                  </label>

                  <input
                    type="file"
                    name="imagem"
                    id="imagem"
                    className="form-control"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome da categoria"
                  />
                </div>

                 <div className="mb-3">
                  <label htmlFor="descricao" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    rows="5"                                 
                    name="descricao"
                    id="descricao"
                    className="form-control"
                    placeholder="Digite a descrição da categoria"
                  />
                </div>

                    <div className="mb-3">
                    <label htmlFor="bgcolor" className="form-label">
                        Cor
                    </label>
                    <input
                        type="color"
                        className="form-control form-control-color"
                        id="bgcolor"
                        name="bgcolor"
                        defaultValue="#563d7c"
                        title="Escolha a cor de fundo"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Salvar Categoria
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriaForm;
