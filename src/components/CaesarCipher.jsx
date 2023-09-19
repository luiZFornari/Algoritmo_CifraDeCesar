import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CaesarCipher() {
  const [text, setText] = useState("");
  const [key, setKey] = useState(0);
  const [result, setResult] = useState("");
  const [resultDecrypt, setResultDecrypt] = useState("");
  const [error, setError] = useState("");
  let inputValue = "";

  const cifraDeCesar = () => {
    if (!text || key < 0) {
      setError("Por favor, insira um texto e uma chave válida.");
      return;
    }

    let mensagemCriptografada = "";

    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if (char.match(/[A-Z]/)) {
        const codigo = text.charCodeAt(i);
        char = String.fromCharCode(((codigo - 65 + parseInt(key)) % 26) + 65);
      } else if (char.match(/[a-z]/)) {
        const codigo = text.charCodeAt(i);
        char = String.fromCharCode(((codigo - 97 + parseInt(key)) % 26) + 97);
      }

      mensagemCriptografada += char;
    }

    setError("");
    setResult(mensagemCriptografada);
  };

  const decifraDeCesar = () => {
    if (!result || key < 0) {
      setError("Por favor, insira um texto cifrado e uma chave válida.");
      return;
    }

    let textoOriginal = "";

    for (let i = 0; i < result.length; i++) {
      let char = result[i];

      if (char.match(/[A-Z]/)) {
        const codigo = result.charCodeAt(i);
        char = String.fromCharCode(
          ((codigo - 65 - parseInt(key) + 26) % 26) + 65
        );
      } else if (char.match(/[a-z]/)) {
        const codigo = result.charCodeAt(i);
        char = String.fromCharCode(
          ((codigo - 97 - parseInt(key) + 26) % 26) + 97
        );
      }

      textoOriginal += char;
    }

    setError("");
    setResultDecrypt(textoOriginal);
  };

  return (
    <div
      className="container mt-5"
      style={{
        paddingLeft: "20%",
        paddingRight: "20%",
        border: "2px solid black",
      }}
    >
      <h1>Algoritmo de César</h1>
      <div className="form-group" style={{ textAlign: "left" }}>
        <label htmlFor="text">Texto:</label>
        <input
          type="text"
          id="text"
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-group" style={{ textAlign: "left" }}>
        <label htmlFor="key">Chave:</label>
        <input
          type="number"
          id="key"
          className="form-control"
          value={key}
          onChange={(e) => {
            const inputValue = parseInt(e.target.value, 10);
            if (inputValue >= 0 && inputValue <= 25) setKey(inputValue);
          }}
        />
      </div>
      <div style={{ padding: "10px" }}>
        <button
          className="btn btn-primary"
          onClick={cifraDeCesar}
          style={{ padding: "10px" }}
        >
          Criptografar
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={decifraDeCesar}
          style={{ padding: "10px" }}
        >
          Descriptografar
        </button>
      </div>
      <div className="mt-3">
        {error && <div className="alert alert-danger">{error}</div>}
        <h6>Resultado Criptografado : {result}</h6>
        <h6>Resultado Descriptografado : {resultDecrypt}</h6>
      </div>
    </div>
  );
}

export default CaesarCipher;
