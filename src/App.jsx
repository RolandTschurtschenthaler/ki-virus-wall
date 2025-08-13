import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "kiVirusWall@v1";

const DEMO_PEOPLE = [
  { id: "1", name: "Reinhold", role: "CEO", photoUrl: "https://cdn.bitrix24.de/b12352915/main/e6e/e6e35995b52205b7559b7c93e164c01e/reinhold.jpg.png", infected: false },
  { id: "2", name: "Daniel", role: "Head of Sales & Consulting", photoUrl: "https://cdn.bitrix24.de/b12352915/main/b43/b438765059eeba3c40aa8358dff32372/daniel.png", infected: false },
  { id: "3", name: "Dietmar", role: "Consultant", photoUrl: "https://cdn.bitrix24.de/b12352915/main/3ec/3ec4c10b3a3942347513b41d2bfcd52c/dietmar.jpg.png", infected: false },
  { id: "4", name: "Ulrike", role: "Sales Manager Tourism Portals", photoUrl: "https://cdn.bitrix24.de/b12352915/main/310/3109d355dea3e750ad92f60141bd1109/ulli.jpg.png", infected: false },
  { id: "5", name: "Marion", role: "Sales Manager Tourism Portals", photoUrl: "https://cdn.bitrix24.de/b12352915/main/096/09661adb4621f50a64558307661eb984/marionf.jpg.png", infected: false },
  { id: "6", name: "Manuel", role: "Team Leader Sales", photoUrl: "https://cdn.bitrix24.de/b12352915/main/b5d/b5d4a23cc321729d31c4490cb5a1ba57/manuelr.jpg.png", infected: false },
  { id: "7", name: "Nadia", role: "Full Stack Developer", photoUrl: "https://cdn.bitrix24.de/b12352915/main/7f2/7f2eb031d24757bfad7420cacf207f1f/nadia.png", infected: false },
  { id: "8", name: "Carmen", role: "Front-End Artist Tourism Portals", photoUrl: "https://cdn.bitrix24.de/b12352915/main/7a2/7a2ae432f2f4aba60b56058548329173/carmen.png", infected: false },
  { id: "9", name: "Monika", role: "Head of Web Development & Graphics", photoUrl: "https://cdn.bitrix24.de/b12352915/main/fc4/fc4ef99efbf09b29643de7f2829e3181/monika.png", infected: false },
  { id: "10", name: "Ruth", role: "Text Artist", photoUrl: "https://cdn.bitrix24.de/b12352915/main/3a2/3a241204dec989492a797edd5c59e161/ruth.png", infected: false },
  { id: "11", name: "Renate", role: "Accounting Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/84f/84f3259552507e2205d6d43c20e5fcb5/renate.png", infected: false },
  { id: "12", name: "Stefan", role: "Head of Communication & Marketing", photoUrl: "https://cdn.bitrix24.de/b12352915/main/d92/d9219431f25bf3de5f3ee0e7f7d69511/stefan.png", infected: false },
  { id: "13", name: "Sandra", role: "Front-End Artist Web", photoUrl: "https://cdn.bitrix24.de/b12352915/resize_cache/6403324/a7fa78f57e73ecbd0b9500a062d0d214/main/0e4/0e4c930e68a8b015a4eac6ed6940f6df/2.jpg.png", infected: false },
  { id: "14", name: "Julian", role: "Software Developer", photoUrl: "https://cdn.bitrix24.de/b12352915/main/914/914f094cb30b39cc66e0309b5f0f6f24/julian.jpg.png", infected: false },
  { id: "15", name: "Karin", role: "Consultant", photoUrl: "https://cdn.bitrix24.de/b12352915/main/535/5354ad33700bebaa0f228918e0f310b3/karin.png", infected: false },
  { id: "16", name: "Elisabeth", role: "Art Director", photoUrl: "https://cdn.bitrix24.de/b12352915/main/690/690caba8418553a77b19bb209793b2f4/elisabeth.jpg.png", infected: false },
  { id: "17", name: "Marina", role: "Payroll Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/8d8/8d8741a4ace2d10a240e4949de8073be/marina.jpg.png", infected: false },
  { id: "18", name: "Angelika", role: "Front-End Artist Tourism Portals", photoUrl: "https://cdn.bitrix24.de/b12352915/main/984/98499838f86aaa72a52c7174092193fb/angelika.jpg.png", infected: false },
  { id: "19", name: "Ivan", role: "J.CEO & CTO", photoUrl: "https://cdn.bitrix24.de/b12352915/main/1c7/1c7080c0b89f1120ad5a501578332b5c/ivan.jpg.png", infected: false },
  { id: "20", name: "Florian", role: "Head of Backoffice & Controlling", photoUrl: "https://cdn.bitrix24.de/b12352915/main/0f7/0f79cf1db3e1b1e4196107fc1d666cd1/florian.png", infected: false },
  { id: "21", name: "Armin", role: "Team Leader SEO & Advertising", photoUrl: "https://cdn.bitrix24.de/b12352915/main/a7d/a7dc16a1b5bacf4714405cae583fb69e/armin.png", infected: false },
  { id: "22", name: "Christoph", role: "Team Leader Web & Design", photoUrl: "https://cdn.bitrix24.de/b12352915/main/18a/18afde78c82b4384432df89107ba0f68/christoph.jpg.png", infected: false },
  { id: "23", name: "Julia", role: "Text Artist", photoUrl: "https://cdn.bitrix24.de/b12352915/main/27e/27eb96d547e29b3af5d418351aef498a/julia.png", infected: false },
  { id: "24", name: "Christoph", role: "SEM Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/resize_cache/6410576/a7fa78f57e73ecbd0b9500a062d0d214/main/3b1/3b151597f85b23be2063f788a5726e26/2%20_1_.jpg.png", infected: false },
  { id: "25", name: "Evelyn", role: "Head of Tourism Portals", photoUrl: "https://cdn.bitrix24.de/b12352915/main/d7c/d7cbad8c16e44d7a357425fc0aa012a1/evelyn.jpg.png", infected: false },
  { id: "26", name: "Manuel", role: "Full Stack Developer", photoUrl: "https://cdn.bitrix24.de/b12352915/main/3b3/3b3c81933bced432de27d024778575f5/manuel%203.jpg.png", infected: false },
  { id: "27", name: "Uschi", role: "Front-End Artist Web", photoUrl: "https://cdn.bitrix24.de/b12352915/main/523/523591ce08c3a5137bce020210ff80bc/uschi.png", infected: false },
  { id: "28", name: "Lisa", role: "Consultant", photoUrl: "https://cdn.bitrix24.de/b12352915/main/966/96668b0e92e7d9447d2513a7dc185b23/lisaf.jpg.png", infected: false },
  { id: "29", name: "Andreas", role: "Text Artist", photoUrl: "https://cdn.bitrix24.de/b12352915/main/420/420e39810a31639bd4f44613f45ec125/andreas.png", infected: false },
  { id: "30", name: "Jasmin", role: "Consultant & Content Artist", photoUrl: "https://cdn.bitrix24.de/b12352915/main/755/755b3975e85f3695fbfb0e60bc5c746f/jasmin.png", infected: false },
  { id: "31", name: "Stefanie", role: "SEM Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/5d2/5d201a06adcdb13703ba44d08298a3c2/stefanie.png", infected: false },
  { id: "32", name: "Hannes", role: "Service Desk & IT Support", photoUrl: "https://cdn.bitrix24.de/b12352915/resize_cache/7725648/a7fa78f57e73ecbd0b9500a062d0d214/main/6fd/6fd0a599b928de86161aac18b110e7fb/1b81537dec65ab1369aac830a314892e.jpg", infected: false },
  { id: "33", name: "Marion", role: "Team Leader Consulting", photoUrl: "https://cdn.bitrix24.de/b12352915/main/298/298d6185fd63913bc21fac3527d35e61/marionc.jpg.png", infected: false },
  { id: "34", name: "Andreas", role: "Software Developer", photoUrl: "https://cdn.bitrix24.de/b12352915/main/716/716ee2789110b749daf9e6f16ea06b81/andreasb.jpg.png", infected: false },
  { id: "35", name: "Johanna", role: "Head of Product Management", photoUrl: "https://cdn.bitrix24.de/b12352915/main/806/806d6c258cefdc43b71edd1c01030230/johanna.jpg.png", infected: false },
  { id: "36", name: "Julia", role: "SEO Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/73d/73d9a7de6eae2bffc361d244453bbe28/juliaa.jpg.png", infected: false },
  { id: "37", name: "Nadja", role: "Human Resource Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/6a8/6a85ad6e519c658600ef896487a01c1f/nadja.jpg.png", infected: false },
  { id: "38", name: "Caroline", role: "Consultant", photoUrl: "https://cdn.bitrix24.de/b12352915/main/4bf/4bfd2ebee3dac70c69a3440f771dda48/caroline.jpg.png", infected: false },
  { id: "39", name: "Fabian", role: "Software Developer", photoUrl: "https://cdn.bitrix24.de/b12352915/main/7f5/7f56f212a6e2eb01d62cafc972299a01/fabian.jpg.png", infected: false },
  { id: "40", name: "Katharina", role: "Text Artist", photoUrl: "https://cdn.bitrix24.de/b12352915/main/300/300326a1f27afcae9582008fd8c9eb5a/katharina.jpg.png", infected: false },
  { id: "41", name: "Alan", role: "SEM Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/85d/85d43b5769baa4f6b61f69e1495937c9/Screenshot%202023-11-23%20160805.png", infected: false },
  { id: "42", name: "Mario", role: "Service Desk & IT Support", photoUrl: "https://cdn.bitrix24.de/b12352915/main/2a3/2a32671f1208c9bbebc9401ed8c2fe72/Screenshot%202023-11-23%20160342.png", infected: false },
  { id: "43", name: "Martin", role: "Project Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/db6/db6d033d5d9dcd22968691d7e326483b/martinh.jpg.png", infected: false },
  { id: "44", name: "Franziska", role: "Front-End Artist Web", photoUrl: "https://cdn.bitrix24.de/b12352915/main/9f9/9f9bcec2a9058679be48803dcf08f1fe/franziskap.jpg.png", infected: false },
  { id: "45", name: "Anna", role: "SEO Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/6c7/6c72930624346c7d316d14a44190c16c/annak.jpg.png", infected: false },
  { id: "46", name: "Elisabeth", role: "Consultant", photoUrl: "https://cdn.bitrix24.de/b12352915/main/267/26778e50a88f133269eea2775de3c854/elisabethv.jpg.png", infected: false },
  { id: "47", name: "Daniel", role: "Front-End Artist Web", photoUrl: "https://cdn.bitrix24.de/b12352915/main/91d/91d7d9f9a516927ad5bdbc804a5f9e5f/daniels.jpg.png", infected: false },
  { id: "48", name: "Barbara", role: "Organizational Development Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/a80/a8032a1f6bb99faa9ef7bda07a0ca0b4/barbaral.jpg.png", infected: false },
  { id: "49", name: "Pierre", role: "Sales & Project Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/569/569ac332304a6c5778031dce6751f6bb/pierrep.jpg.png", infected: false },
  { id: "50", name: "Sonja", role: "Consultant", photoUrl: "https://cdn.bitrix24.de/b12352915/main/b1c/b1c2c03c591a9e9b2c9dde9d6d5cfd70/sonjas.jpg.png", infected: false },
  { id: "51", name: "Norah", role: "Consultant", photoUrl: "https://cdn.bitrix24.de/b12352915/main/736/736830d38c6b14612fe700896e9cdb38/norahb.jpg.png", infected: false },
  { id: "52", name: "Simon", role: "Software Developer", photoUrl: "https://cdn.bitrix24.de/b12352915/main/bef/bef37ca7f2f7dab10a31fb097dd58d04/simonc.jpg.png", infected: false },
  { id: "53", name: "Roland", role: "Project Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/d7e/d7ebe31924c926f507d90c1a531fac66/rolandt.jpg.png", infected: false },
  { id: "54", name: "Judith", role: "Creative Designer & Brand Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/53b/53bda6304e03242f23782a5754d75f46/judithw.jpg.png", infected: false },
  { id: "55", name: "Tobias", role: "SEO Manager", photoUrl: "https://cdn.bitrix24.de/b12352915/main/2a4/2a4f04fc5d6f5fed29d42810d83ec09f/Screenshot%202024-12-13%20143920.png", infected: false }
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
