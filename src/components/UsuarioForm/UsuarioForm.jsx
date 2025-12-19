import { useState } from "react";

const UsuarioForm = () => {
  const [preview, setPreview] = useState("https://placeholder.co/80x80");

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
                {/* Avatar */}
                <div className="mb-3 text-center">
                  <label htmlFor="imagem" style={{ cursor: "pointer" }}>
                    <img
                      src={preview}
                      alt="Foto do usuário"
                      width={80}
                      height={80}
                      className="rounded-circle"
                    />
                  </label>

                  <input
                    type="file"
                    id="imagem"
                    name="imagem"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Nome */}
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    placeholder="Digite o nome do usuário"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="usuario@email.com"
                  />
                </div>

                {/* Senha */}
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    name="senha"
                    placeholder="Digite a senha"
                  />
                </div>

                {/* Perfil */}
                <div className="mb-3">
                  <label htmlFor="perfil" className="form-label">
                    Perfil
                  </label>
                  <select className="form-select" id="perfil" name="perfil">
                    <option value="">Selecione</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="USER">Usuário</option>
                  </select>
                </div>

                {/* Status */}
                <div className="form-check form-switch mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="ativo"
                    name="ativo"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="ativo">
                    Usuário ativo
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Salvar usuário
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioForm;
