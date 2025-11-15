// src/components/Login.jsx
import { useState } from "react";
import "../styles/global.css";
import api from "../api/axiosClient";

export default function Login({ onLogin }) {
  const [view, setView] = useState("login"); // login | register | forgot

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  // ========= LOGIN =========
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setOkMsg("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // res.data = { id, nombre, email }
      setOkMsg("Bienvenido " + res.data.nombre);

      if (onLogin) onLogin(res.data);
    } catch (err) {
      const msg =
        err.response?.data?.error || "Error al iniciar sesión. Inténtalo otra vez.";
      setErrorMsg(msg);
    }
  };

  // ========= REGISTRO =========
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setOkMsg("");

    try {
      const res = await api.post("/auth/register", {
        nombre: name,
        email,
        password,
      });

      setOkMsg("Cuenta creada para " + res.data.nombre);
      // opcional: limpiar password
      setPassword("");
      // volvemos al login
      setView("login");
    } catch (err) {
      const msg =
        err.response?.data?.error || "Error al crear la cuenta. Inténtalo otra vez.";
      setErrorMsg(msg);
    }
  };

  // ========= OLVIDÉ CONTRASEÑA (solo front por ahora) =========
  const handleForgot = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setOkMsg("");

    // Aquí en el futuro podrías llamar a /auth/forgot-password
    console.log("Recuperar contraseña para:", email);
    setOkMsg("Si el correo existe, te enviaremos un enlace de recuperación.");
    setView("login");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* IZQUIERDA */}
        <div className="login-left">
          <h1>Welcome to website</h1>
          <p>
            Gestiona los hábitos familiares de forma sencilla.
            Organiza miembros, hábitos y revisa el progreso diario desde un solo lugar.
          </p>
        </div>

        {/* DERECHA */}
        <div className="login-right">
          {/* ====== LOGIN ====== */}
          {view === "login" && (
            <>
              <h2>User Login</h2>

              <form onSubmit={handleLogin} className="login-form">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  placeholder="tu@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button type="submit" className="login-btn">
                  Iniciar sesión
                </button>

                {errorMsg && <p className="error">{errorMsg}</p>}
                {okMsg && <p className="success">{okMsg}</p>}
              </form>

              <p className="login-help">
                ¿Olvidaste tu contraseña?{" "}
                <span onClick={() => setView("forgot")}>Recupérala aquí</span>
              </p>

              <p className="login-help">
                ¿No tienes una cuenta?{" "}
                <span onClick={() => setView("register")}>Crear cuenta</span>
              </p>
            </>
          )}

          {/* ====== REGISTRO ====== */}
          {view === "register" && (
            <>
              <h2>Crear cuenta</h2>

              <form onSubmit={handleRegister} className="login-form">
                <label>Nombre completo</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button className="login-btn">Crear cuenta</button>

                {errorMsg && <p className="error">{errorMsg}</p>}
                {okMsg && <p className="success">{okMsg}</p>}
              </form>

              <p className="login-help">
                ¿Ya tienes cuenta?{" "}
                <span onClick={() => setView("login")}>Iniciar sesión</span>
              </p>
            </>
          )}

          {/* ====== OLVIDÉ CONTRASEÑA ====== */}
          {view === "forgot" && (
            <>
              <h2>Recuperar contraseña</h2>

              <form onSubmit={handleForgot} className="login-form">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button className="login-btn">Enviar enlace</button>

                {errorMsg && <p className="error">{errorMsg}</p>}
                {okMsg && <p className="success">{okMsg}</p>}
              </form>

              <p className="login-help">
                ¿Recordaste tu contraseña?{" "}
                <span onClick={() => setView("login")}>Volver al login</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
