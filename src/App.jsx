import { useState } from "react";
import MemberForm from "./components/MemberForm";
import CreateHabit from "./components/CreateHabit";
import RecordHabit from "./components/RecordHabit";
import Dashboard from "./components/Dashboard";
import MembersTable from "./components/MembersTable";
import HabitsTable from "./components/HabitsTable";
import RecordsTable from "./components/RecordsTable";
import FamilySelect from "./components/FamilySelect";
import Login from "./components/Login";   // 👈 importa el login
import "./styles/global.css";

function App() {
  const [page, setPage] = useState("members");

  // estado simple para saber si ya se logueó
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // familia seleccionada (1 = Familia Mullo, 2 = otra, etc.)
  const [familyId, setFamilyId] = useState(1);

  const [membersReload, setMembersReload] = useState(0);
  const [habitsReload, setHabitsReload] = useState(0);
  const [recordsReload, setRecordsReload] = useState(0);

  // mientras no esté logueado, solo mostramos el login
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // una vez logueado, mostramos el admin
  return (
    <div className="app-root">
      <div className="app-container">
        <h1 className="app-title">Admin Hábitos Familiares</h1>

        <nav className="tabs">
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
        </nav>

        {/* selector de familia actual */}
        <div className="family-filter">
          <span>Familia actual:</span>
          <FamilySelect
            value={familyId}
            onChange={(value) => setFamilyId(Number(value))}
          />
        </div>

        <main className="app-content">
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
              <RecordsTable reloadToken={recordsReload} familyId={familyId} />
            </div>
          )}

          {page === "dashboard" && (
            <div className="card">
              <Dashboard familyId={familyId} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
