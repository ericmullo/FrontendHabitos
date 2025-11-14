import { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function FamilySelect({ value, onChange }) {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    api.get("/families")
      .then(res => setFamilies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <select value={value || ""} onChange={e => onChange(e.target.value)}>
      <option value="">Selecciona una familia</option>
      {families.map(f => (
        <option key={f.id} value={f.id}>
          {f.nombre}
        </option>
      ))}
    </select>
  );
}
