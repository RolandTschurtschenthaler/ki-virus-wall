import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "kiVirusWall@v1";

const DEMO_PEOPLE = [
  { id: "1", name: "Anna M.", team: "Marketing", role: "Managerin", infected: true },
  { id: "2", name: "Marco R.", team: "Sales", role: "Account Exec", infected: false },
  { id: "3", name: "Sara M.", team: "Product", role: "PM", infected: true },
  { id: "4", name: "Luca B.", team: "Engineering", role: "FE Dev", infected: false },
  { id: "5", name: "Elena M.", team: "HR", role: "People Ops", infected: true },
  { id: "6", name: "Jonas K.", team: "Engineering", role: "BE Dev", infected: false },
  { id: "7", name: "Mara M.", team: "Design", role: "UX", infected: false },
  { id: "8", name: "Timo S.", team: "Operations", role: "Ops", infected: true },
  { id: "9", name: "Julia M.", team: "Sales", role: "SDR", infected: false },
  { id: "10", name: "Fabio P.", team: "Marketing", role: "Content", infected: true },
  { id: "11", name: "Nina R.", team: "Finance", role: "Controller", infected: false },
  { id: "12", name: "David H.", team: "Engineering", role: "QA", infected: false },
  { id: "13", name: "Sophie K.", team: "Design", role: "Visual", infected: true },
  { id: "14", name: "Alex G.", team: "IT", role: "Sysadmin", infected: false },
  { id: "15", name: "Paolo D.", team: "Product", role: "PO", infected: false },
  { id: "16", name: "Marta L.", team: "Support", role: "Agent", infected: true }
];

export default function App() {
  const [people, setPeople] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEMO_PEOPLE;
  });
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all"); // all | infected | clean
  const [team, setTeam] = useState("all");
  const [showImporter, setShowImporter] = useState(false);
  const [csvText, setCsvText] = useState("name,team,role\nMax Mustermann,Sales,AE\nErika Musterfrau,Marketing,Content");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
  }, [people]);

  const teams = useMemo(() => {
    const t = Array.from(new Set(people.map(p => p.team))).sort();
    return t;
  }, [people]);

  const infectedCount = useMemo(() => people.filter(p => p.infected).length, [people]);

  const filtered = useMemo(() => {
    return people.filter(p => {
      const matchesQ = q.trim().length === 0 || `${p.name} ${p.role} ${p.team}`.toLowerCase().includes(q.toLowerCase());
      const matchesTeam = team === "all" || p.team === team;
      const matchesState = filter === "all" || (filter === "infected" ? p.infected : !p.infected);
      return matchesQ && matchesTeam && matchesState;
    });
  }, [people, q, filter, team]);

  function toggleInfected(id) {
    setPeople(prev => prev.map(p => (p.id === id ? { ...p, infected: !p.infected } : p)));
  }

  function resetAll() {
    if (confirm("Alle Daten zurücksetzen?")) {
      setPeople(DEMO_PEOPLE);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function importCSV(text) {
    // Very simple CSV parser; expects header: name,team,role[,infected]
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const header = lines[0].split(/[,;\t]/).map(h => h.trim().toLowerCase());
    const nameIdx = header.indexOf("name");
    const teamIdx = header.indexOf("team");
    const roleIdx = header.indexOf("role");
    const infectedIdx = header.indexOf("infected");
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(/[,;\t]/).map(c => c.trim());
      if (!cols[nameIdx]) continue;
      rows.push({
        id: `${Date.now()}_${i}`,
        name: cols[nameIdx],
        team: cols[teamIdx] || "",
        role: cols[roleIdx] || "",
        infected: infectedIdx >= 0 ? ["true", "1", "yes", "ja"].includes((cols[infectedIdx] || "").toLowerCase()) : false
      });
    }
    if (rows.length) setPeople(rows);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <style>{`
        @keyframes glowPulse { 0% { box-shadow: 0 0 0 rgba(34,197,94,0.0); } 50% { box-shadow: 0 0 25px rgba(34,197,94,0.65); } 100% { box-shadow: 0 0 0 rgba(34,197,94,0.0); } }
        .glow { animation: glowPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">KI‑Virus Wall</h1>
            <p className="text-slate-400">Wer "leuchtet", ist bereits infiziert 💚</p>
          </div>
          <div className="w-full md:w-1/2">
            <label className="sr-only">Suche</label>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Suche nach Name, Team oder Rolle…"
              className="w-full rounded-2xl bg-slate-900 border border-slate-700 px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Segmented value={filter} onChange={setFilter} items={[
              { value: "all", label: "Alle" },
              { value: "infected", label: "Infiziert" },
              { value: "clean", label: "Noch zu überzeugen" }
            ]} />
            <select
              value={team}
              onChange={e => setTeam(e.target.value)}
              className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
            >
              <option value="all">Alle Teams</option>
              {teams.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowImporter(v => !v)} className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm hover:border-emerald-500">CSV importieren</button>
            <button onClick={resetAll} className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm hover:border-rose-500">Reset</button>
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>{infectedCount} von {people.length} überzeugt</span>
            <span>{Math.round((infectedCount / Math.max(people.length, 1)) * 100)}%</span>
          </div>
          <div className="mt-2 h-3 rounded-xl bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${(infectedCount / Math.max(people.length, 1)) * 100}%` }}
            />
          </div>
        </div>

        {showImporter && (
          <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800 space-y-3">
            <p className="text-sm text-slate-300">Füge CSV ein (Spalten: <code>name,team,role[,infected]</code>). Beispiel unten:</p>
            <textarea
              value={csvText}
              onChange={e => setCsvText(e.target.value)}
              rows={5}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs"
            />
            <div className="flex gap-2">
              <button onClick={() => importCSV(csvText)} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm font-medium">Importieren</button>
              <button onClick={() => setShowImporter(false)} className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm">Schließen</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
          {filtered.map(p => (
            <PersonCard key={p.id} person={p} onToggle={() => toggleInfected(p.id)} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-slate-400">
              Keine Treffer – Filter anpassen oder CSV importieren.
            </div>
          )}
        </div>
          );
        }

function PersonCard({ person, onToggle }) {
  // Nummer wie bei Squid Game – nimm person.number, sonst aus id generieren
  const num = String(person.number ?? person.id ?? "").padStart(3, "0");

  // Falls ihr Photos habt: person.photoUrl befüllen, sonst Initialen anzeigen
  const initials = useMemo(
    () => person.name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase(),
    [person.name]
  );

  const active = !!person.infected;

  return (
    <motion.div layout className="flex flex-col items-center">
      {/* Hex/Raute-Kachel */}
      <div
        className={[
          "sg-hex",                       // Form + Hintergrund
          "w-[160px] sm:w-[180px] md:w-[190px] aspect-[1/1.12]", // Größe
          "p-3 md:p-4",
          "transition-transform duration-200 hover:-translate-y-1",
          active ? "sg-neon" : "sg-muted"
        ].join(" ")}
      >
        {/* Bild / Initialen */}
        <div className="sg-photo mx-auto w-[72%] mt-[10%] mb-3 grid place-items-center">
          {person.photoUrl ? (
            <img
              src={person.photoUrl}
              alt={person.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-2xl md:text-3xl font-semibold text-slate-100">
              {initials}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="text-center px-2">
          <div className="text-sm md:text-base font-medium truncate">{person.name}</div>
          <div className="text-[10px] md:text-xs text-slate-400 truncate">
            {person.role} · {person.team}
          </div>
        </div>

        {/* Nummer unten wie im Poster */}
        <div className="mt-2 md:mt-3 text-center">
          <span className="sg-num inline-block bg-black/60 rounded-md px-3 py-1 text-slate-50 text-sm md:text-base">
            {num}
          </span>
        </div>
      </div>

      {/* Action-Button darunter */}
      <button
        onClick={onToggle}
        className={[
          "mt-3 w-[160px] sm:w-[180px] md:w-[190px]",
          "rounded-xl px-3 py-2 text-sm font-medium",
          active
            ? "bg-pink-600/80 hover:bg-pink-500 text-white"
            : "bg-slate-800 hover:bg-slate-700 text-slate-100"
        ].join(" ")}
      >
        {active ? "Leuchtet ✨" : "Überzeugen 💡"}
      </button>
    </motion.div>
  );
}

function Segmented({ value, onChange, items }) {
  return (
    <div className="inline-flex rounded-xl border border-slate-700 bg-slate-900 p-1">
      {items.map(it => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={`px-3 py-1.5 text-sm rounded-lg ${value === it.value ? "bg-slate-800" : "hover:bg-slate-800/50"}`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
