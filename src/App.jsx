import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "kiVirusWall@v1";

const DEMO_PEOPLE = [
  { id: "1", name: "Reinhold", team: "CEO", role: "CEO", infected: false },
  { id: "2", name: "Daniel", team: "Head of Sales & Consulting", role: "Head of Sales & Consulting", infected: false },
  { id: "3", name: "Dietmar", team: "Consultant", role: "Consultant", infected: false },
  { id: "4", name: "Ulrike", team: "Sales Manager Tourism Portals", role: "Sales Manager Tourism Portals", infected: false },
  { id: "5", name: "Marion", team: "Sales Manager Tourism Portals", role: "Sales Manager Tourism Portals", infected: false },
  { id: "6", name: "Manuel", team: "Team Leader Sales", role: "Team Leader Sales", infected: false },
  { id: "7", name: "Nadia", team: "Full Stack Developer", role: "Full Stack Developer", infected: false },
  { id: "8", name: "Carmen", team: "Front-End Artist Tourism Portals", role: "Front-End Artist Tourism Portals", infected: false },
  { id: "9", name: "Monika", team: "Head of Web Development & Graphics", role: "Head of Web Development & Graphics", infected: false },
  { id: "10", name: "Ruth", team: "Text Artist", role: "Text Artist", infected: false },
  { id: "11", name: "Renate", team: "Accounting Manager", role: "Accounting Manager", infected: false },
  { id: "12", name: "Stefan", team: "Head of Communication & Marketing", role: "Head of Communication & Marketing", infected: false },
  { id: "13", name: "Sandra", team: "Front-End Artist Web", role: "Front-End Artist Web", infected: false },
  { id: "14", name: "Julian", team: "Software Developer", role: "Software Developer", infected: false },
  { id: "15", name: "Karin", team: "Consultant", role: "Consultant", infected: false },
  { id: "16", name: "Elisabeth", team: "Art Director", role: "Art Director", infected: false },
  { id: "17", name: "Marina", team: "Payroll Manager", role: "Payroll Manager", infected: false },
  { id: "18", name: "Angelika", team: "Front-End Artist Tourism Portals", role: "Front-End Artist Tourism Portals", infected: false },
  { id: "19", name: "Ivan", team: "J.CEO & CTO", role: "J.CEO & CTO", infected: false },
  { id: "20", name: "Florian", team: "Head of Backoffice & Controlling", role: "Head of Backoffice & Controlling", infected: false },
  { id: "21", name: "Armin", team: "Team Leader SEO & Advertising", role: "Team Leader SEO & Advertising", infected: false },
  { id: "22", name: "Christoph", team: "Team Leader Web & Design", role: "Team Leader Web & Design", infected: false },
  { id: "23", name: "Julia", team: "Text Artist", role: "Text Artist", infected: false },
  { id: "24", name: "Christoph", team: "SEM Manager", role: "SEM Manager", infected: false },
  { id: "25", name: "Evelyn", team: "Head of Tourism Portals", role: "Head of Tourism Portals", infected: false },
  { id: "26", name: "Manuel", team: "Full Stack Developer", role: "Full Stack Developer", infected: false },
  { id: "27", name: "Uschi", team: "Front-End Artist Web", role: "Front-End Artist Web", infected: false },
  { id: "28", name: "Lisa", team: "Consultant", role: "Consultant", infected: false },
  { id: "29", name: "Andreas", team: "Text Artist", role: "Text Artist", infected: false },
  { id: "30", name: "Jasmin", team: "Consultant & Content Artist", role: "Consultant & Content Artist", infected: false },
  { id: "31", name: "Stefanie", team: "SEM Manager", role: "SEM Manager", infected: false },
  { id: "32", name: "Hannes", team: "Service Desk & IT Support", role: "Service Desk & IT Support", infected: false },
  { id: "33", name: "Marion", team: "Team Leader Consulting", role: "Team Leader Consulting", infected: false },
  { id: "34", name: "Andreas", team: "Software Developer", role: "Software Developer", infected: false },
  { id: "35", name: "Johanna", team: "Head of Product Management", role: "Head of Product Management", infected: false },
  { id: "36", name: "Julia", team: "SEO Manager", role: "SEO Manager", infected: false },
  { id: "37", name: "Nadja", team: "Human Resource Manager", role: "Human Resource Manager", infected: false },
  { id: "38", name: "Caroline", team: "Consultant", role: "Consultant", infected: false },
  { id: "39", name: "Fabian", team: "Software Developer", role: "Software Developer", infected: false },
  { id: "40", name: "Katharina", team: "Text Artist", role: "Text Artist", infected: false },
  { id: "41", name: "Alan", team: "SEM Manager", role: "SEM Manager", infected: false },
  { id: "42", name: "Mario", team: "Service Desk & IT Support", role: "Service Desk & IT Support", infected: false },
  { id: "43", name: "Martin", team: "Project Manager", role: "Project Manager", infected: false },
  { id: "44", name: "Franziska", team: "Front-End Artist Web", role: "Front-End Artist Web", infected: false },
  { id: "45", name: "Anna", team: "SEO Manager", role: "SEO Manager", infected: false },
  { id: "46", name: "Elisabeth", team: "Consultant", role: "Consultant", infected: false },
  { id: "47", name: "Daniel", team: "Front-End Artist Web", role: "Front-End Artist Web", infected: false },
  { id: "48", name: "Barbara", team: "Organizational Development Manager", role: "Organizational Development Manager", infected: false },
  { id: "49", name: "Pierre", team: "Sales & Project Manager", role: "Sales & Project Manager", infected: false },
  { id: "50", name: "Sonja", team: "Consultant", role: "Consultant", infected: false },
  { id: "51", name: "Norah", team: "Consultant", role: "Consultant", infected: false },
  { id: "52", name: "Simon", team: "Software Developer", role: "Software Developer", infected: false },
  { id: "53", name: "Roland", team: "Project Manager", role: "Project Manager", infected: false },
  { id: "54", name: "Judith", team: "Creative Designer & Brand Manager", role: "Creative Designer & Brand Manager", infected: false },
  { id: "55", name: "Tobias", team: "SEO Manager", role: "SEO Manager", infected: false }
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
      const matchesQ =
        q.trim().length === 0 ||
        `${p.name} ${p.role} ${p.team}`.toLowerCase().includes(q.toLowerCase());
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
        infected:
          infectedIdx >= 0
            ? ["true", "1", "yes", "ja"].includes((cols[infectedIdx] || "").toLowerCase())
            : false
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
            <h1 className="text-3xl font-bold tracking-tight">KI-Virus Wall</h1>
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
            <Segmented
              value={filter}
              onChange={setFilter}
              items={[
                { value: "all", label: "Alle" },
                { value: "infected", label: "Infiziert" },
                { value: "clean", label: "Noch zu überzeugen" }
              ]}
            />
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
            <button
              onClick={() => setShowImporter(v => !v)}
              className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm hover:border-emerald-500"
            >
              CSV importieren
            </button>
            <button
              onClick={resetAll}
              className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm hover:border-rose-500"
            >
              Reset
            </button>
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
            <p className="text-sm text-slate-300">
              Füge CSV ein (Spalten: <code>name,team,role[,infected]</code>). Beispiel unten:
            </p>
            <textarea
              value={csvText}
              onChange={e => setCsvText(e.target.value)}
              rows={5}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs"
            />
            <div className="flex gap-2">
              <button
                onClick={() => importCSV(csvText)}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-sm font-medium"
              >
                Importieren
              </button>
              <button
                onClick={() => setShowImporter(false)}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-2 text-sm"
              >
                Schließen
              </button>
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
      </div>   
    </div>      
  );
}

function PersonCard({ person, onToggle }) {
  const num = String(person.number ?? person.id ?? "").padStart(3, "0");
  const initials = useMemo(
    () => person.name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase(),
    [person.name]
  );
  const active = !!person.infected;

  return (
    <motion.div layout className="flex flex-col items-center">
      {/* Hex-Kachel */}
      <div
        className={[
          "sg-hex",
          active ? "sg-hex-infected" : "sg-hex-clean",
          "hover:-translate-y-1"
        ].join(" ")}
      >
        {/* Foto oder Initialen */}
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

        {/* Name & Rolle */}
        <div className="text-center px-2">
          <div className="text-sm md:text-base font-medium truncate">{person.name}</div>
          <div className="text-[10px] md:text-xs text-slate-300 truncate">
            {person.role} · {person.team}
          </div>
        </div>

        {/* Nummer */}
        <div className="mt-2 text-center">
          <span className="sg-num inline-block bg-black/60 rounded-md px-3 py-1 text-slate-50 text-sm md:text-base">
            {num}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onToggle}
        className={[
          "mt-3 w-[160px] rounded-xl px-3 py-2 text-sm font-medium",
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
