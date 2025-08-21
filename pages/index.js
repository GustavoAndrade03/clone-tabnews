import { useState } from "react";

function Home() {
  const [mostrarModal, setMostrarModal] = useState(false);

  return (
    <div>
      <h1>Oi mãe</h1>
      <button onClick={() => setMostrarModal(true)}>Aqui</button>

      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              position: "relative",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setMostrarModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "transparent",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>

            <h2>Pra você</h2>
            <img
              src="https://i.pinimg.com/736x/ba/86/41/ba86419398265ea8b85f6b4e2f1902fa.jpg"
              alt=""
              style={{ maxWidth: "300px", borderRadius: "8px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;