"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [nicho, setNicho] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function generarIdea() {
    if (!nicho.trim()) {
      setMensaje("⚠️ Escribe un perfil o nicho primero.");
      return;
    }

    setCargando(true);
    setMensaje("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nicho })
      });

      const data = await response.json();
      setMensaje(data.idea);
    } catch {
      setMensaje("❌ Error generando ideas.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "system-ui"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#0b1220",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 25px rgba(0,0,0,0.6)"
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "15px" }}>
          🚀 Generador de Ideas de Negocio
        </h1>

        <p style={{ opacity: 0.8, marginBottom: "10px" }}>
          Describe tu perfil o nicho:
        </p>

        <textarea
          maxLength={200}
          value={nicho}
          onChange={(e) => setNicho(e.target.value)}
          rows={4}
          placeholder="Ej: Psicólogo especializado en ansiedad"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            marginBottom: "15px"
          }}
        />

        <button
          onClick={generarIdea}
          disabled={cargando}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            background: cargando ? "#334155" : "#2563eb",
            color: "white",
            fontSize: "16px",
            border: "none",
            cursor: cargando ? "not-allowed" : "pointer",
            opacity: cargando ? 0.7 : 1
          }}
        >
          {cargando ? "Generando..." : "Generar Idea"}
        </button>

        {mensaje && (
          <div
            style={{
              marginTop: "15px",
              background: "#020617",
              padding: "15px",
              borderRadius: "6px",
              fontSize: "14px",
              lineHeight: "1.6"
            }}
          >
            <ReactMarkdown>{mensaje}</ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  );
}
