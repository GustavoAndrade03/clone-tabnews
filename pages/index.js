// pages/index.js
import { useEffect, useRef, useState } from "react";

const IMG1_URL =
  "https://ogimg.infoglobo.com.br/rioshow/24884446-8f3-e73/FT1086A/deadpool-primeiro-filme.jpeg.jpg";
const IMG2_URL =
  "https://pm1.aminoapps.com/6400/00a84867acaf22433806d0ee70068cfea19ce792_hq.jpg";

const normalize = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase();

const ANSWERS = {
  img1: ["deadpool"],
  img2: ["ban"],
};

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState(null);
  const [modalStage, setModalStage] = useState(null);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");

  const answer1Ref = useRef(null);
  const answer2Ref = useRef(null);

  useEffect(() => {
    setDayOfMonth(new Date().getDate());
  }, []);

  // foca input correto quando modalStage muda
  useEffect(() => {
    if (modalStage === "q1") answer1Ref.current?.focus();
    if (modalStage === "q2") answer2Ref.current?.focus();
  }, [modalStage]);

  const submitName = () => {
    const n = normalize(name);
    if (!n) {
      setMessage("Coloque um nome antes de continuar.");
      return;
    }
    if (n === "matheus" && dayOfMonth === 19) {
      setModalStage("q1");
      setMessage("");
    } else {
      setMessage("");
      setModalStage(null);
    }
  };

  const resetAll = () => {
    setName("");
    setMessage("");
    setModalStage(null);
    setAnswer1("");
    setAnswer2("");
    setHint1("");
    setHint2("");
  };

  const tryAnswer1 = () => {
    if (ANSWERS.img1.includes(normalize(answer1))) {
      setHint1("");
      setModalStage("q2");
    } else {
      setHint1("Errado.");
    }
  };

  const tryAnswer2 = () => {
    if (ANSWERS.img2.includes(normalize(answer2))) {
      setHint2("");
      setModalStage("final");
    } else {
      setHint2("Errado.");
    }
  };

  const Modal = ({ children }) => (
    <div className="modalOverlay">
      <div className="modalCard">{children}</div>
      <style jsx>{`
        .modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modalCard {
          width: min(720px, 96vw);
          background: #fff;
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 10px 40px rgba(2, 6, 23, 0.35);
          max-height: 90vh;
          overflow: hidden;
        }
      `}</style>
    </div>
  );

  return (
    <main className="container">
      <div className="card">
        <h1>Insira o seu nome</h1>
        <div className="form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitName()}
            autoComplete="off"
          />
          <div className="row">
            <button onClick={submitName}>Enviar</button>
          </div>
          <p className="small">{message}</p>
        </div>
      </div>

      {modalStage && (
        <Modal>
          {/* Pergunta 1 */}
          <div style={{ display: modalStage === "q1" ? "block" : "none" }}>
            <h3>Prove sua identidade, qual personagem é esse?</h3>
            <img src={IMG1_URL} className="resp" />
            <input
              ref={answer1Ref}
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tryAnswer1()}
              autoComplete="off"
            />
            <p className="hint">{hint1}</p>
            <div className="row">
              <button onClick={tryAnswer1}>Verificar</button>
              <button className="ghost" onClick={resetAll}>
                Fechar
              </button>
            </div>
          </div>

          {/* Pergunta 2 */}
          <div style={{ display: modalStage === "q2" ? "block" : "none" }}>
            <h3>E esse?</h3>
            <img src={IMG2_URL} className="resp" />
            <input
              ref={answer2Ref}
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tryAnswer2()}
              autoComplete="off"
            />
            <p className="hint">{hint2}</p>
            <div className="row">
              <button onClick={tryAnswer2}>Verificar</button>
              <button className="ghost" onClick={resetAll}>
                Fechar
              </button>
            </div>
          </div>

          {/* Final */}
          <div style={{ display: modalStage === "final" ? "block" : "none" }}>
            <h2>Hoje é seu dia meu irmão S2</h2>
            <p>
              Feliz aniversário meu mano, tudo de bom para você. Você é foda 🫶
            </p>
            <img src="https://thumbs.dreamstime.com/b/emoticon-que-d%C3%A1-flor-108797967.jpg" />
            <div className="row">
              <button onClick={resetAll}>Fechar</button>
            </div>
          </div>
        </Modal>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(180deg, #fff, #f8fafc);
        }
        .card {
          width: min(720px, 94vw);
          background: #fff;
          border-radius: 12px;
          padding: 22px;
          box-shadow: 0 8px 30px rgba(2, 6, 23, 0.08);
        }
        input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-top: 10px;
        }
        .row {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }
        button {
          padding: 10px 14px;
          border-radius: 8px;
          border: 0;
          background: #2563eb;
          color: #fff;
          cursor: pointer;
        }
        button.ghost {
          background: transparent;
          color: #111827;
          border: 1px solid #e5e7eb;
        }
        .resp {
          max-width: 100%;
          border-radius: 8px;
          margin: 12px 0;
        }
        .hint {
          color: #6b7280;
          font-size: 13px;
          margin-top: 4px;
        }
        .small {
          font-size: 13px;
          color: #6b7280;
        }
      `}</style>
    </main>
  );
}
