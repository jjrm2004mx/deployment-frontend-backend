import { useState, useEffect, useRef } from "react";

const concepts = [
  {
    id: "token",
    emoji: "🔤",
    title: "Token",
    color: "#00D4FF",
    tagline: "La unidad mínima del lenguaje",
    definition:
      "Un Token es el pedazo más pequeño en que un modelo de IA divide el texto para procesarlo. Puede ser una palabra, parte de una palabra o incluso un signo de puntuación.",
    analogy: "💡 Piénsalo como piezas de LEGO: el texto es la construcción, los tokens son las piezas individuales.",
    interactive: "token",
  },
  {
    id: "embedding",
    emoji: "🧬",
    title: "Embedding",
    color: "#A855F7",
    tagline: "Convertir palabras en números",
    definition:
      "Un Embedding es la traducción de texto (o imágenes) a una lista de números que captura su significado. Palabras con significados similares producen números similares.",
    analogy: "💡 Como un GPS: convierte una dirección (texto) en coordenadas (números) que una máquina puede calcular.",
    interactive: "embedding",
  },
  {
    id: "vector",
    emoji: "➡️",
    title: "Vector",
    color: "#10B981",
    tagline: "Un punto en el espacio del significado",
    definition:
      "Un Vector es simplemente una lista ordenada de números. En IA, cada palabra o frase se representa como un vector. Vectores cercanos = significados parecidos.",
    analogy: "💡 Como coordenadas en un mapa: [latitud, longitud] ubica un lugar. Un vector ubica el 'significado' en el espacio matemático.",
    interactive: "vector",
  },
  {
    id: "vectorDistance",
    emoji: "📏",
    title: "Vector Distance",
    color: "#F59E0B",
    tagline: "¿Qué tan parecidos son dos significados?",
    definition:
      "La distancia entre dos vectores mide qué tan similares son semánticamente dos textos. Distancia pequeña = muy similares. Distancia grande = muy diferentes.",
    analogy: "💡 Como la distancia entre dos ciudades en un mapa: menor distancia = están más cerca geográficamente.",
    interactive: "distance",
  },
  {
    id: "cosine",
    emoji: "📐",
    title: "Cosine Similarity",
    color: "#EF4444",
    tagline: "Similitud por ángulo, no por distancia",
    definition:
      "Mide el ángulo entre dos vectores. Si apuntan en la misma dirección (ángulo = 0°), son idénticos (similitud = 1). Si son opuestos, similitud = -1.",
    analogy: "💡 Dos personas caminando en la misma dirección están 'de acuerdo' aunque estén lejos. Cosine mide ese acuerdo de dirección.",
    interactive: "cosine",
  },
  {
    id: "euclidean",
    emoji: "📍",
    title: "Euclidean Distance",
    color: "#06B6D4",
    tagline: "La distancia en línea recta",
    definition:
      "Es la distancia más intuitiva: la línea recta entre dos puntos (el teorema de Pitágoras en múltiples dimensiones). Mayor distancia = menos similares.",
    analogy: "💡 Es exactamente como medir con una regla entre dos puntos en una hoja de papel.",
    interactive: "euclidean",
  },
  {
    id: "dotproduct",
    emoji: "✖️",
    title: "Dot Product",
    color: "#8B5CF6",
    tagline: "¿Cuánto apuntan en la misma dirección?",
    definition:
      "Multiplica los valores correspondientes de dos vectores y los suma. Resultado alto = apuntan en la misma dirección y son grandes. Resultado 0 = perpendiculares (sin relación).",
    analogy: "💡 Como preguntar: '¿Cuánto esfuerzo comparten dos personas trabajando juntas hacia el mismo objetivo?'",
    interactive: "dot",
  },
  {
    id: "lexical",
    emoji: "🔍",
    title: "Búsqueda Léxica vs Semántica",
    color: "#F97316",
    tagline: "Exactitud vs Intención",
    definition:
      "Léxica busca la palabra exacta (como CTRL+F). Semántica busca el significado: 'auto' también encuentra 'coche', 'vehículo', 'carro'.",
    analogy: "💡 Léxica = buscar en un diccionario por letra exacta. Semántica = preguntar a un experto que entiende lo que necesitas.",
    interactive: "search",
  },
];

// --- Token Interactive ---
function TokenDemo() {
  const [text, setText] = useState("Hola mundo IA");
  const colors = ["#00D4FF", "#A855F7", "#10B981", "#F59E0B", "#EF4444", "#06B6D4", "#8B5CF6", "#F97316"];
  const tokens = text.trim() ? text.trim().split(/\s+/) : [];
  return (
    <div style={{ fontFamily: "monospace" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%", padding: "10px 14px", background: "#0f172a", border: "1px solid #334155",
          borderRadius: 8, color: "#e2e8f0", fontSize: 15, marginBottom: 16, boxSizing: "border-box",
        }}
        placeholder="Escribe cualquier frase..."
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {tokens.map((t, i) => (
          <span key={i} style={{
            background: colors[i % colors.length] + "22", border: `1px solid ${colors[i % colors.length]}`,
            color: colors[i % colors.length], borderRadius: 6, padding: "4px 10px", fontSize: 14, fontWeight: 600,
          }}>
            {t}
          </span>
        ))}
      </div>
      {tokens.length > 0 && (
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 13 }}>
          🔢 <strong style={{ color: "#e2e8f0" }}>{tokens.length} tokens</strong> detectados
        </p>
      )}
    </div>
  );
}

// --- Embedding Demo ---
function EmbeddingDemo() {
  const words = [
    { word: "gato", vec: [0.82, 0.91, 0.12] },
    { word: "perro", vec: [0.79, 0.88, 0.15] },
    { word: "auto", vec: [0.11, 0.22, 0.95] },
    { word: "felino", vec: [0.84, 0.90, 0.10] },
  ];
  const [selected, setSelected] = useState(0);
  const w = words[selected];
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {words.map((w, i) => (
          <button key={i} onClick={() => setSelected(i)} style={{
            background: selected === i ? "#A855F7" : "#1e293b", border: `1px solid ${selected === i ? "#A855F7" : "#334155"}`,
            color: selected === i ? "#fff" : "#94a3b8", borderRadius: 8, padding: "6px 16px", cursor: "pointer", fontWeight: 600,
          }}>
            "{w.word}"
          </button>
        ))}
      </div>
      <div style={{ background: "#0f172a", borderRadius: 10, padding: 16, fontFamily: "monospace" }}>
        <p style={{ color: "#64748b", fontSize: 12, marginBottom: 6 }}>VECTOR EMBEDDING DE "{w.word.toUpperCase()}"</p>
        <p style={{ color: "#A855F7", fontSize: 18 }}>
          [ {w.vec.map((v, i) => <span key={i} style={{ color: ["#00D4FF","#10B981","#F59E0B"][i] }}>{v}{i < 2 ? ", " : ""}</span>)} , ... ]
        </p>
        <p style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>* En la práctica, los vectores tienen 768 a 1536 dimensiones</p>
      </div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginTop: 10 }}>
        💡 "gato" y "felino" tienen vectores muy parecidos porque significan lo mismo.
      </p>
    </div>
  );
}

// --- Vector 2D Plot ---
function VectorPlot() {
  const canvas = useRef(null);
  const vectors = [
    { label: "gato", x: 0.8, y: 0.85, color: "#00D4FF" },
    { label: "felino", x: 0.75, y: 0.9, color: "#A855F7" },
    { label: "perro", x: 0.6, y: 0.7, color: "#10B981" },
    { label: "auto", x: 0.15, y: 0.2, color: "#F59E0B" },
    { label: "coche", x: 0.2, y: 0.15, color: "#EF4444" },
  ];

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(i * W / 10, 0); ctx.lineTo(i * W / 10, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * H / 10); ctx.lineTo(W, i * H / 10); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#334155"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(30, H - 30); ctx.lineTo(W - 10, H - 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(30, H - 30); ctx.lineTo(30, 10); ctx.stroke();

    // Axis labels
    ctx.fillStyle = "#475569"; ctx.font = "11px monospace";
    ctx.fillText("Dim 1", W - 50, H - 10);
    ctx.fillText("Dim 2", 5, 20);

    // Similarity groups
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = "#00D4FF22"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0.67 * (W - 40) + 30, H - 30 - 0.8 * (H - 40), 38, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0.175 * (W - 40) + 30, H - 30 - 0.175 * (H - 40), 30, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);

    // Group labels
    ctx.fillStyle = "#00D4FF55"; ctx.font = "bold 10px monospace";
    ctx.fillText("grupo: felinos", 0.55 * (W - 40) + 30, H - 30 - 0.97 * (H - 40));
    ctx.fillStyle = "#F59E0B55";
    ctx.fillText("grupo: vehículos", 0.05 * (W - 40) + 30, H - 30 - 0.36 * (H - 40));

    vectors.forEach(({ label, x, y, color }) => {
      const px = x * (W - 40) + 30;
      const py = H - 30 - y * (H - 40);

      // Arrow from origin
      ctx.strokeStyle = color + "60"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(30, H - 30); ctx.lineTo(px, py); ctx.stroke();

      // Point
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();

      // Label
      ctx.fillStyle = color; ctx.font = "bold 12px monospace";
      ctx.fillText(label, px + 10, py + 4);
    });
  }, []);

  return (
    <div>
      <canvas ref={canvas} width={360} height={260} style={{ width: "100%", borderRadius: 10, background: "#0a0f1e" }} />
      <p style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>
        Puntos cercanos = significados similares. Esta es la magia de los vectores.
      </p>
    </div>
  );
}

// --- Distance Demo ---
function DistanceDemo() {
  const [p1, setP1] = useState([2, 3]);
  const [p2, setP2] = useState([5, 7]);
  const canvas = useRef(null);
  const euclidean = Math.sqrt((p2[0]-p1[0])**2 + (p2[1]-p1[1])**2).toFixed(2);

  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    const scale = 28;
    const ox = 20, oy = H - 20;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(ox + i * scale, 20); ctx.lineTo(ox + i * scale, H - 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox, oy - i * scale); ctx.lineTo(W - 10, oy - i * scale); ctx.stroke();
    }

    const toCanvas = (p) => [ox + p[0] * scale, oy - p[1] * scale];
    const [x1, y1] = toCanvas(p1);
    const [x2, y2] = toCanvas(p2);

    // Line between points
    ctx.strokeStyle = "#F59E0B"; ctx.lineWidth = 2; ctx.setLineDash([6, 3]);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.setLineDash([]);

    // Midpoint label
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    ctx.fillStyle = "#F59E0B"; ctx.font = "bold 12px monospace";
    ctx.fillText(`d = ${euclidean}`, mx + 8, my - 5);

    // Points
    [[x1, y1, "#00D4FF", `A(${p1[0]},${p1[1]})`], [x2, y2, "#EF4444", `B(${p2[0]},${p2[1]})`]].forEach(([x, y, col, lbl]) => {
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = col; ctx.font = "bold 12px monospace"; ctx.fillText(lbl, x + 12, y + 4);
    });
  }, [p1, p2]);

  return (
    <div>
      <canvas ref={canvas} width={320} height={240} style={{ width: "100%", borderRadius: 10, background: "#0a0f1e" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        {[["Punto A (x,y)", p1, setP1, "#00D4FF"], ["Punto B (x,y)", p2, setP2, "#EF4444"]].map(([label, pt, set, color]) => (
          <div key={label} style={{ background: "#0f172a", borderRadius: 8, padding: 10 }}>
            <p style={{ color, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{label}</p>
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 1].map(i => (
                <input key={i} type="number" value={pt[i]} min={0} max={9} onChange={e => {
                  const v = [...pt]; v[i] = Number(e.target.value); set(v);
                }} style={{
                  width: "48%", padding: "4px 8px", background: "#1e293b", border: `1px solid ${color}44`,
                  borderRadius: 6, color: "#e2e8f0", fontSize: 13,
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#0f172a", borderRadius: 8, padding: 12, marginTop: 10, fontFamily: "monospace" }}>
        <p style={{ color: "#64748b", fontSize: 12 }}>FÓRMULA EUCLIDIANA</p>
        <p style={{ color: "#F59E0B", fontSize: 16 }}>√( (x₂-x₁)² + (y₂-y₁)² ) = <strong>{euclidean}</strong></p>
      </div>
    </div>
  );
}

// --- Cosine Demo ---
function CosineDemo() {
  const canvas = useRef(null);
  const [angle, setAngle] = useState(35);
  const cosVal = Math.cos(angle * Math.PI / 180).toFixed(3);

  useEffect(() => {
    const c = canvas.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    const cx = W / 2, cy = H / 2 + 20;
    const r = 90;
    ctx.clearRect(0, 0, W, H);

    // Circle
    ctx.strokeStyle = "#1e293b"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

    // Axes
    ctx.strokeStyle = "#334155"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx - r - 15, cy); ctx.lineTo(cx + r + 15, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - r - 15); ctx.lineTo(cx, cy + r + 15); ctx.stroke();

    // Fixed vector A (horizontal)
    ctx.strokeStyle = "#00D4FF"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
    ctx.fillStyle = "#00D4FF"; ctx.font = "bold 13px monospace"; ctx.fillText("A", cx + r + 6, cy + 4);

    // Rotating vector B
    const bx = cx + r * Math.cos(-angle * Math.PI / 180);
    const by = cy + r * Math.sin(-angle * Math.PI / 180);
    ctx.strokeStyle = "#EF4444"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(bx, by); ctx.stroke();
    ctx.fillStyle = "#EF4444"; ctx.fillText("B", bx + 6, by - 4);

    // Angle arc
    ctx.strokeStyle = "#F59E0B55"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, 35, -angle * Math.PI / 180, 0); ctx.stroke();
    ctx.fillStyle = "#F59E0B"; ctx.font = "11px monospace"; ctx.fillText(`${angle}°`, cx + 40, cy - 10);

    // Similarity indicator
    const sim = parseFloat(cosVal);
    const simColor = sim > 0.7 ? "#10B981" : sim > 0.3 ? "#F59E0B" : "#EF4444";
    ctx.fillStyle = simColor; ctx.font = "bold 14px monospace";
    ctx.fillText(`cos(θ) = ${cosVal}`, cx - 55, 24);
  }, [angle, cosVal]);

  return (
    <div>
      <canvas ref={canvas} width={320} height={240} style={{ width: "100%", borderRadius: 10, background: "#0a0f1e" }} />
      <div style={{ marginTop: 12 }}>
        <label style={{ color: "#94a3b8", fontSize: 13 }}>Ángulo entre vectores: <strong style={{ color: "#F59E0B" }}>{angle}°</strong></label>
        <input type="range" min={0} max={180} value={angle} onChange={e => setAngle(Number(e.target.value))}
          style={{ width: "100%", marginTop: 6, accentColor: "#EF4444" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#475569" }}>
          <span>0° = Idénticos (1.0)</span>
          <span>90° = Sin relación (0.0)</span>
          <span>180° = Opuestos (-1.0)</span>
        </div>
      </div>
    </div>
  );
}

// --- Dot Product ---
function DotDemo() {
  const [a, setA] = useState([3, 2]);
  const [b, setB] = useState([1, 4]);
  const dot = a[0] * b[0] + a[1] * b[1];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {[["Vector A", a, setA, "#00D4FF"], ["Vector B", b, setB, "#A855F7"]].map(([label, vec, set, color]) => (
          <div key={label} style={{ background: "#0f172a", borderRadius: 10, padding: 12 }}>
            <p style={{ color, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{label}</p>
            {[0, 1].map(i => (
              <div key={i} style={{ marginBottom: 6 }}>
                <label style={{ color: "#64748b", fontSize: 11 }}>dim {i + 1}:</label>
                <input type="range" min={-5} max={5} value={vec[i]}
                  onChange={e => { const v = [...vec]; v[i] = Number(e.target.value); set(v); }}
                  style={{ width: "100%", accentColor: color }} />
                <span style={{ color, fontSize: 13, fontWeight: 700 }}>{vec[i]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background: "#0f172a", borderRadius: 10, padding: 14, fontFamily: "monospace" }}>
        <p style={{ color: "#64748b", fontSize: 12 }}>CÁLCULO PASO A PASO</p>
        <p style={{ color: "#e2e8f0", fontSize: 15, marginTop: 6 }}>
          <span style={{ color: "#00D4FF" }}>A</span> · <span style={{ color: "#A855F7" }}>B</span> = ({a[0]} × {b[0]}) + ({a[1]} × {b[1]})
        </p>
        <p style={{ color: "#e2e8f0", fontSize: 15 }}>= {a[0] * b[0]} + {a[1] * b[1]}</p>
        <p style={{ fontSize: 22, marginTop: 8 }}>
          = <span style={{ color: dot > 0 ? "#10B981" : dot < 0 ? "#EF4444" : "#F59E0B", fontWeight: 700 }}>{dot}</span>
        </p>
        <p style={{ color: "#64748b", fontSize: 12, marginTop: 6 }}>
          {dot > 5 ? "✅ Alta similitud — apuntan en la misma dirección" :
           dot > 0 ? "🟡 Similitud moderada" :
           dot === 0 ? "⬜ Sin relación — vectores perpendiculares" :
           "❌ Direcciones opuestas"}
        </p>
      </div>
    </div>
  );
}

// --- Search Demo ---
function SearchDemo() {
  const [query, setQuery] = useState("vehículo rápido");
  const docs = [
    { text: "El auto deportivo alcanza 300 km/h", lexical: false, semantic: true },
    { text: "El coche de carreras es muy veloz", lexical: false, semantic: true },
    { text: "El vehículo rápido ganó la carrera", lexical: true, semantic: true },
    { text: "El avión es el transporte más rápido", lexical: false, semantic: true },
    { text: "La bicicleta es lenta pero ecológica", lexical: false, semantic: false },
  ];
  const [mode, setMode] = useState("both");

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        {[["both", "Comparar"], ["lexical", "Solo Léxica"], ["semantic", "Solo Semántica"]].map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} style={{
            background: mode === m ? "#F97316" : "#1e293b", border: `1px solid ${mode === m ? "#F97316" : "#334155"}`,
            color: mode === m ? "#fff" : "#94a3b8", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 13,
          }}>{label}</button>
        ))}
      </div>
      <div style={{ background: "#0f172a", borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#64748b" }}>🔍</span>
        <span style={{ color: "#F97316", fontWeight: 700 }}>"{query}"</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: mode === "both" ? "1fr 1fr" : "1fr", gap: 8 }}>
        {(mode === "both" || mode === "lexical") && (
          <div>
            <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>LÉXICA (palabra exacta)</p>
            {docs.map((d, i) => (
              <div key={i} style={{
                background: d.lexical ? "#10B98122" : "#1e293b", border: `1px solid ${d.lexical ? "#10B981" : "#334155"}`,
                borderRadius: 8, padding: "8px 10px", marginBottom: 6, fontSize: 13,
                color: d.lexical ? "#e2e8f0" : "#475569",
              }}>
                {d.lexical ? "✅" : "❌"} {d.text}
              </div>
            ))}
          </div>
        )}
        {(mode === "both" || mode === "semantic") && (
          <div>
            <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>SEMÁNTICA (por significado)</p>
            {docs.map((d, i) => (
              <div key={i} style={{
                background: d.semantic ? "#A855F722" : "#1e293b", border: `1px solid ${d.semantic ? "#A855F7" : "#334155"}`,
                borderRadius: 8, padding: "8px 10px", marginBottom: 6, fontSize: 13,
                color: d.semantic ? "#e2e8f0" : "#475569",
              }}>
                {d.semantic ? "✅" : "❌"} {d.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const interactiveMap = {
  token: TokenDemo,
  embedding: EmbeddingDemo,
  vector: VectorPlot,
  distance: DistanceDemo,
  cosine: CosineDemo,
  euclidean: DistanceDemo,
  dot: DotDemo,
  search: SearchDemo,
};

export default function App() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("concept");
  const concept = concepts[active];
  const Interactive = interactiveMap[concept.interactive];

  return (
    <div style={{
      minHeight: "100vh", background: "#060a14", color: "#e2e8f0",
      fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1a0a2e 100%)",
        borderBottom: "1px solid #1e293b", padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, background: "linear-gradient(135deg, #00D4FF, #A855F7)",
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
        }}>🧠</div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
            AI Concepts <span style={{ color: "#00D4FF" }}>Lab</span>
          </h1>
          <p style={{ fontSize: 11, color: "#475569", margin: 0 }}>Aprende IA de forma visual e interactiva</p>
        </div>
        <div style={{
          marginLeft: "auto", background: "#1e293b", borderRadius: 20, padding: "4px 12px",
          fontSize: 11, color: "#64748b",
        }}>
          {active + 1} / {concepts.length}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: 60, background: "#0a0f1e", borderRight: "1px solid #1e293b",
          display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", gap: 4,
        }}>
          {concepts.map((c, i) => (
            <button key={i} onClick={() => { setActive(i); setTab("concept"); }}
              title={c.title}
              style={{
                width: 44, height: 44, borderRadius: 10, border: active === i ? `2px solid ${c.color}` : "2px solid transparent",
                background: active === i ? c.color + "22" : "transparent",
                fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}>
              {c.emoji}
            </button>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          {/* Concept header */}
          <div style={{
            background: `linear-gradient(135deg, ${concept.color}11, #0f172a)`,
            border: `1px solid ${concept.color}33`, borderRadius: 14, padding: 18, marginBottom: 16,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>{concept.emoji}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: concept.color }}>{concept.title}</h2>
                <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>{concept.tagline}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
            {[["concept", "📖 Concepto"], ["interactive", "⚡ Interactivo"]].map(([t, label]) => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? concept.color : "#1e293b",
                border: `1px solid ${tab === t ? concept.color : "#334155"}`,
                color: tab === t ? "#000" : "#94a3b8", borderRadius: 8, padding: "7px 16px",
                cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "all 0.2s",
              }}>{label}</button>
            ))}
          </div>

          {tab === "concept" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, borderLeft: `3px solid ${concept.color}` }}>
                <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>DEFINICIÓN</p>
                <p style={{ color: "#e2e8f0", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{concept.definition}</p>
              </div>
              <div style={{ background: "#0f172a", borderRadius: 12, padding: 16, borderLeft: "3px solid #F59E0B" }}>
                <p style={{ color: "#F59E0B", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{concept.analogy}</p>
              </div>
            </div>
          ) : (
            <div style={{ background: "#0f172a", borderRadius: 12, padding: 16 }}>
              <p style={{ color: "#64748b", fontSize: 12, fontWeight: 700, marginBottom: 12 }}>DEMO INTERACTIVA</p>
              <Interactive />
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={() => { setActive(Math.max(0, active - 1)); setTab("concept"); }}
              disabled={active === 0}
              style={{
                flex: 1, padding: "10px", background: active === 0 ? "#1e293b" : "#1e293b",
                border: "1px solid #334155", borderRadius: 10, color: active === 0 ? "#334155" : "#94a3b8",
                cursor: active === 0 ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14,
              }}>← Anterior</button>
            <button onClick={() => { setActive(Math.min(concepts.length - 1, active + 1)); setTab("concept"); }}
              disabled={active === concepts.length - 1}
              style={{
                flex: 1, padding: "10px", background: active === concepts.length - 1 ? "#1e293b" : concept.color + "22",
                border: `1px solid ${active === concepts.length - 1 ? "#334155" : concept.color}`,
                color: active === concepts.length - 1 ? "#334155" : concept.color,
                cursor: active === concepts.length - 1 ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14,
              }}>Siguiente →</button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#0a0f1e", borderTop: "1px solid #1e293b", padding: "10px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#475569", marginBottom: 5 }}>
          <span>Progreso</span><span>{Math.round(((active + 1) / concepts.length) * 100)}%</span>
        </div>
        <div style={{ background: "#1e293b", borderRadius: 4, height: 4 }}>
          <div style={{
            height: "100%", borderRadius: 4,
            background: `linear-gradient(90deg, ${concept.color}, #A855F7)`,
            width: `${((active + 1) / concepts.length) * 100}%`, transition: "width 0.4s ease",
          }} />
        </div>
      </div>
    </div>
  );
}
