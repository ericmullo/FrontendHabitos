// src/components/FamilySelect.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function FamilySelect({ value, onChange, allowCreate = false }) {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFamilyName, setNewFamilyName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarFamilias();
  }, []);

  const cargarFamilias = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/api/familias`);
      setFamilies(res.data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las familias");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFamily = async (e) => {
    e.preventDefault();
    const apellido = newFamilyName.trim();
    if (!apellido) return;

    setSaving(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/api/familias`, {
        nombre: apellido,
      });

      const nueva = res.data;
      setFamilies((prev) => [...prev, nueva]);

      if (onChange) {
        onChange(nueva.id);
      }
      setNewFamilyName("");
    } catch (err) {
      const msg = err.response?.data?.error || "No se pudo crear la familia";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="family-select-wrapper">
      <select
        value={value ?? ""}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        disabled={loading}
      >
        <option value="">Selecciona una familia</option>
        {families.map((f) => (
          <option key={f.id} value={f.id}>
            {f.nombre}
          </option>
        ))}
      </select>

      {/* 👉 Solo muestra el botón + input si allowCreate es true */}
      {allowCreate && (
        <form onSubmit={handleCreateFamily} className="family-add-inline">
          <input
            type="text"
            placeholder="Nueva familia (solo apellido)"
            value={newFamilyName}
            onChange={(e) => setNewFamilyName(e.target.value)}
          />
          <button type="submit" disabled={saving}>
            Agregar
          </button>
        </form>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
