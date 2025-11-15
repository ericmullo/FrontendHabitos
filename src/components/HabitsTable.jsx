import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function HabitsTable({ reloadToken = 0 }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    api
      .get("/habits")
      .then((r) => setHabits(r.data))
      .catch((err) => console.error(err));
  }, [reloadToken]);

  return (
    <div className="side-card">
      <h2>Hábitos registrados</h2>
      {habits.length === 0 ? (
        <p>No hay hábitos registrados aún.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Unidad</th>
              <th>Meta diaria</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((h) => (
              <tr key={h.id}>
                <td>{h.nombre}</td>
                <td>{h.unidad}</td>
                <td>{h.metaDiaria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
