// src/components/CompareFamilies.jsx
import { useState, useEffect } from "react";
import api from "../api/axiosClient";
import FamilySelect from "./FamilySelect";

function FamilyMiniDashboard({ data, label }) {
  if (!data) return null;

  return (
    <div className="card">
      <div className="dashboard-header">
        <div>
          <h3>{label}</h3>
          <p>
            {data.familyName} — Semana del{" "}
            <strong>{data.startDate}</strong> al{" "}
            <strong>{data.endDate}</strong>
          </p>
        </div>

        <div className="dashboard-score">
          <span>Score semanal</span>
          <strong>{data.overallPercentage.toFixed(0)}%</strong>
        </div>
      </div>

      <div className="dashboard-section" style={{ marginTop: "1rem" }}>
        <h4>Hábitos de la semana</h4>

        {(!data.habits || data.habits.length === 0) && (
          <p>No hay registros en esta semana.</p>
        )}

        {data.habits &&
          data.habits.map((h) => {
            const width = Math.min(h.percentage, 120);
            return (
              <div key={h.habitName} className="habit-bar-row">
                <div className="habit-bar-label">{h.habitName}</div>
                <div className="habit-bar-track">
                  <div
                    className="habit-bar-fill"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <div className="habit-bar-value">
                  {h.percentage.toFixed(0)}%
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default function CompareFamilies() {
  const [family1Id, setFamily1Id] = useState(0);
  const [family2Id, setFamily2Id] = useState(0);
  const [data, setData] = useState(null); // { family1, family2 }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // si falta una de las dos, no pedimos nada
    if (!family1Id || !family2Id) {
      setData(null);
      return;
    }

    setLoading(true);
    setError("");

    // 👉 usamos el endpoint que YA funciona en tu Dashboard:
    //    /dashboard/family/{id}/weekly
    Promise.all([
      api.get(`/dashboard/family/${family1Id}/weekly`),
      api.get(`/dashboard/family/${family2Id}/weekly`),
    ])
      .then(([r1, r2]) => {
        setData({
          family1: r1.data,
          family2: r2.data,
        });
      })
      .catch((err) => {
        console.error("Error cargando comparación", err);
        setError("No se pudo cargar la comparación de familias");
      })
      .finally(() => setLoading(false));
  }, [family1Id, family2Id]);

  return (
    <>
      <h2>Comparación de familias</h2>
      <p
        style={{
          marginBottom: "1.2rem",
          color: "#4b5563",
          fontSize: "0.95rem",
        }}
      >
        Selecciona dos familias para comparar su desempeño semanal de hábitos.
      </p>

      <div
        className="page-two-col"
        style={{ marginBottom: "1.5rem", alignItems: "flex-end" }}
      >
        <div>
          <label>Familia A</label>
          <FamilySelect value={family1Id} onChange={setFamily1Id} />
        </div>
        <div>
          <label>Familia B</label>
          <FamilySelect value={family2Id} onChange={setFamily2Id} />
        </div>
      </div>

      {(!family1Id || !family2Id) && (
        <p style={{ color: "#6b7280" }}>
          Elige ambas familias para ver la comparación.
        </p>
      )}

      {loading && <p>Cargando comparación...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="page-two-col">
          <FamilyMiniDashboard data={data.family1} label="Familia A" />
          <FamilyMiniDashboard data={data.family2} label="Familia B" />
        </div>
      )}
    </>
  );
}
