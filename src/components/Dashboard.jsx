// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import "../styles/global.css";

export default function Dashboard({ familyId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!familyId) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/dashboard/family/${familyId}/weekly`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [familyId]);

  if (loading) {
    return <div className="card">Cargando dashboard...</div>;
  }

  if (error) {
    return <div className="card"><p className="error">{error}</p></div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="card dashboard-card">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard familiar</h2>
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

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h3>Hábitos de la semana</h3>

          {data.habits.length === 0 && (
            <p>No hay registros en esta semana.</p>
          )}

          {data.habits.map((h) => {
            const width = Math.min(h.percentage, 120); // max 120%

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
    </div>
  );
}
