// src/App.jsx
import { useState } from "react";
import MemberForm from "./components/MemberForm";
import CreateHabit from "./components/CreateHabit";
import RecordHabit from "./components/RecordHabit";
import Dashboard from "./components/Dashboard";
import MembersTable from "./components/MembersTable";
import HabitsTable from "./components/HabitsTable";
import RecordsTable from "./components/RecordsTable";
import FamilySelect from "./components/FamilySelect";
import CompareFamilies from "./components/CompareFamilies"; // 👈 comparaciones
import Login from "./components/Login";
import "./styles/global.css";

function App() {
  const [page, setPage] = useState("members");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [familyId, setFamilyId] = useState(1);
  const [membersReload, setMembersReload] = useState(0);
  const [habitsReload, setHabitsReload] = useState(0);
  const [recordsReload, setRecordsReload] = useState(0);

  // Si no está logueado, solo mostramos el login
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-root">
      <div className="app-shell">
        {/* CABECERA DENTRO DE LA CARD */}
        <header className="app-header">
          <div className="app-header-text">
            <h1>Admin Hábitos Familiares</h1>
            <p>
              Gestiona miembros, define hábitos y registra el progreso diario
              de tu familia desde un solo panel.
            </p>
          </div>

          <nav className="app-tabs">
            <button
              className={`tab-button ${page === "members" ? "active" : ""}`}
              onClick={() => setPage("members")}
            >
              Miembros
            </button>
            <button
              className={`tab-button ${page === "habits" ? "active" : ""}`}
              onClick={() => setPage("habits")}
            >
              Hábitos
            </button>
            <button
              className={`tab-button ${page === "records" ? "active" : ""}`}
              onClick={() => setPage("records")}
            >
              Registrar Hábitos
            </button>
            <button
              className={`tab-button ${page === "dashboard" ? "active" : ""}`}
              onClick={() => setPage("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`tab-button ${page === "compare" ? "active" : ""}`}
              onClick={() => setPage("compare")}
            >
              Comparaciones
            </button>
          </nav>
        </header>

        {/* FILTRO DE FAMILIA (oculto solo en la página de comparaciones) */}
        {page !== "compare" && (
          <section className="app-toolbar">
            <span>Familia actual:</span>
            <FamilySelect
              value={familyId}
              onChange={setFamilyId} // FamilySelect ya devuelve Number
              allowCreate={true}     // aquí sí puedes crear familias
            />
          </section>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <main className="app-main">
          {page === "members" && (
            <div className="page-two-col">
              <div className="card">
                <MemberForm
                  onCreated={() => setMembersReload((prev) => prev + 1)}
                />
              </div>
              <MembersTable reloadToken={membersReload} familyId={familyId} />
            </div>
          )}

          {page === "habits" && (
            <div className="page-two-col">
              <div className="card">
                <CreateHabit
                  onCreated={() => setHabitsReload((prev) => prev + 1)}
                />
              </div>
              <HabitsTable reloadToken={habitsReload} />
            </div>
          )}

          {page === "records" && (
            <div className="page-two-col">
              <div className="card">
                <RecordHabit
                  familyId={familyId}
                  onCreated={() => setRecordsReload((prev) => prev + 1)}
                />
              </div>
              <RecordsTable
                reloadToken={recordsReload}
                familyId={familyId}
              />
            </div>
          )}

          {page === "dashboard" && (
            <div className="card">
              <Dashboard familyId={familyId} />
            </div>
          )}

          {page === "compare" && (
            <div className="card">
              <CompareFamilies />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
