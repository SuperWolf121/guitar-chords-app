import { useState, useRef, useEffect } from "react"
 
const SONGS = [
  { name: "Wonderwall", difficulty: 2, chords: "Em G D A7sus4", capo: 2, link: "https://www.ultimate-guitar.com/" },
  { name: "Stánky", difficulty: 1, chords: "G C D Gm A7", capo: 0, link: "https://akordy.kytary.cz/song/stanky" },
  { name: "Růže z papíru", difficulty: 2, chords: "Dm E7 Gm Am D7 F A7 C7", capo: 0, link: "https://akordy.kytary.cz/song/ruze-z-papiru" },
  { name: "Looking Out For You", difficulty: 2, chords: "A F#m C#m Bm D E", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/joy-again/looking-out-for-you-chords-1863147" },
  { name: "Riptide", difficulty: 1, chords: "Am G C", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/vance-joy/riptide-chords-1237247" },
  { name: "Hotel room", difficulty: 2, chords: "Bm E A F#m D", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/ax-and-the-hatchetmen/hotel-room-chords-5815592" },
  { name: "Stand by me", difficulty: 2, chords: "A D F#m E", capo: 0, link: "https://guitartuna.com/chords/stand-by-me-ben-e-king-easy-guitar-chords-60fa8757d87f149fe408c47e" },
  { name: "V blbým věku", difficulty: 2, chords: "C G F Am", capo: 0, link: "https://www.supermusic.cz/piesen.php?idpiesne=781955" },
  { name: "Pro Emu", difficulty: 2, chords: "C G F Dm Am", capo: 0, link: "https://akordy.kytary.cz/song/pro-emu" },
  { name: "Cudzinka v tvojej zemi", difficulty: 2, chords: "C G F Dm Am", capo: 0, link: "https://akordy.kytary.cz/song/cudzinka-v-tvojej-zemi" },
  { name: "Hledá se žena", difficulty: 2, chords: "Am G F E", capo: 0, link: "https://pisnicky-akordy.cz/mandrage/hleda-se-zena?format=pdf" },
  { name: "Sofia (kapo)", difficulty: 2, chords: "Am C G F Dm", capo: 2, link: "https://tabs.ultimate-guitar.com/tab/alvaro-soler/sofia-chords-1836944" },
  { name: "Sofia (bez kapa)", difficulty: 2, chords: "Bm D A G F#m", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/alvaro-soler/sofia-chords-1836944" },
  { name: "Čekám na signál", difficulty: 3, chords: "F# G#m C#m H", capo: 0, link: "https://akordy.kytary.cz/song/cekam-na-signal" },
  { name: "Na ostří nože", difficulty: 1, chords: "Em D C Am", capo: 0, link: "https://akordy.kytary.cz/song/na-ostri-noze" },
  { name: "Matfyzák na discu", difficulty: 2, chords: "F Am G Dm E H7", capo: 3, link: "https://kytaristka.cz/zpevnik/pokac/matfyzak-na-discu" },
  { name: "Amazonka", difficulty: 2, chords: "G Bm Hm Am D", capo: 0, link: "https://zpevniky.com/zpevnik.php?zpevnik=190&pisnicka=82" },
  { name: "Prodavač", difficulty: 2, chords: "C F G D7", capo: 0, link: "https://kytaristka.cz/zpevnik/fesaci/prodavac" },
  { name: "Lásko", difficulty: 1, chords: "Am E7 G C", capo: 0, link: "https://pisnicky-akordy.cz/karel-kryl/lasko?format=pdf" },
  { name: "Podvod", difficulty: 1, chords: "Em G H7 C", capo: 0, link: "https://kytaristka.cz/zpevnik/nedvedi/podvod" },
  { name: "Být stále mlád", difficulty: 1, chords: "G D Em C Am", capo: 0, link: "https://pisnicky-akordy.cz/karel-gott/byt-stale-mlad?format=pdf" },
  { name: "Holubí dům", difficulty: 2, chords: "Em D C Hm", capo: 0, link: "https://akordy.kytary.cz/song/holubi-dum" },
  { name: "Viva la Vida", difficulty: 1, chords: "C Em G D", capo: 1, link: "https://www.songsterr.com/a/wsa/coldplay-viva-la-vida-chords-s10136" },
  { name: "Yellow", difficulty: 2, chords: "G D Cmaj7", capo: 4, link: "https://tabs.ultimate-guitar.com/tab/coldplay/yellow-chords-114080" },
  { name: "Lovefool", difficulty: 2, chords: "Bm E A", capo: 0, link: "https://www.cifraclub.com/the-cardigans/lovefool/" },
  { name: "Mary on a cross", difficulty: 2, chords: "Em G D Bm", capo: 4, link: "https://tabs.ultimate-guitar.com/tab/ghost/mary-on-a-cross-chords-2825666" },
  { name: "Best friend", difficulty: 2, chords: "F G# Am", capo: 2, link: "https://tabs.ultimate-guitar.com/tab/rex-orange-county/best-friend-chords-1954795", isNew: true },
  { name: "Whats up", difficulty: 1, chords: "G C Am", capo: 2, link: "https://tabs.ultimate-guitar.com/tab/4-non-blondes/whats-up-chords-349210", isNew: true },
  { name: "Šrouby a matice", difficulty: 2, chords: "A D E Hm", capo: 0, link: "https://pisnicky-akordy.cz/mandrage/srouby-a-matice?format=pdf", isNew: true },
  { name: "Let her go", difficulty: 2, chords: "F C G Am", capo: 7, link: "https://tabs.ultimate-guitar.com/tab/passenger/let-her-go-chords-705962", isNew: true },
  { name: "Máme jen sebe", difficulty: 2, chords: "Am F E Dm", capo: 4, link: "https://pisnicky-akordy.cz/nedvedi/mame-jen-sebe", isNew: true },
  { name: "The loneliest", difficulty: 2, chords: "Bm F#m E Em", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/maneskin/the-loneliest-chords-4375667", isNew: true },
  { name: "Sex, drugs etc.", difficulty: 1, chords: "C Am G Em", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/beach-weather/sex-drugs-etc-chords-2737914", isNew: true },
  { name: "Far from any road", difficulty: 1, chords: "Am Dm E", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/the-handsome-family/far-from-any-road-chords-1457431", isNew: true },
  { name: "Take me out", difficulty: 2, chords: "Bm Em Am", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/franz-ferdinand/take-me-out-chords-176648", isNew: true },
  { name: "Accidentally in love", difficulty: 1, chords: "Am C G Em", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/counting-crows/accidentally-in-love-chords-128241", isNew: true },
  { name: "Dont look back in anger", difficulty: 2, chords: "F Gm G", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/oasis/dont-look-back-in-anger-chords-6097", isNew: true },
  { name: "Kopce u pramenu reky tyne", difficulty: 2, chords: "B F C", capo: 0, link: "https://pisnicky-akordy.cz/asonance/kopce-u-pramenu-reky-tyne", isNew: true },
  { name: "Dej mi víc své lásky", difficulty: 1, chords: "Am G C", capo: 0, link: "https://pisnicky-akordy.cz/olympic/dej-mi-vic-sve-lasky", isNew: true },
  { name: "Anděl", difficulty: 1, chords: "Am C G7", capo: 0, link: "https://kytaristka.cz/zpevnik/karel-kryl/andel", isNew: true },
  { name: "Kometa", difficulty: 2, chords: "Am Dm G7", capo: 0, link: "https://pisnicky-akordy.cz/jarek-nohavica/kometa", isNew: true },
  { name: "Milenci v texaskach", difficulty: 2, chords: "F G Am", capo: 0, link: "https://pisnicky-akordy.cz/taborove-pisne/milenci-v-texaskach", isNew: true },
  { name: "Řekni kde ty kytky jsou", difficulty: 2, chords: "A F#m D E", capo: 0, link: "https://kytaristka.cz/zpevnik/marie-rottrova/rekni-kde-ty-kytky-jsou", isNew: true },
]
 
const ACCENTS = ["#1db954", "#ff4d4d", "#4da6ff", "#ffcc00", "#b84dff"]
 
const DIFF_LABELS = ["", "začátečník", "střední", "pokročilý"]
const DIFF_COLORS = ["", "#4ade80", "#facc15", "#f87171"]
 
function DiffDots({ level, accent }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3].map(d => (
        <div key={d} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: d <= level ? accent : "#333",
          transition: "background 0.2s"
        }} />
      ))}
    </div>
  )
}
 
function ChordPill({ chord, accent }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 20,
      background: accent + "22",
      color: accent,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.02em",
      border: `1px solid ${accent}44`,
      fontFamily: "monospace",
    }}>{chord}</span>
  )
}
 
function SearchModal({ onClose, accent }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)
 
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
 
  const handleSearch = () => {
    if (!query.trim()) return
    const url = `https://www.google.com/search?q=${encodeURIComponent(query + " chords")}`
    window.open(url, "_blank", "noreferrer")
    onClose()
  }
 
  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch()
    if (e.key === "Escape") onClose()
  }
 
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(0,0,0,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: 16,
          padding: "28px 28px 24px",
          width: "min(420px, 90vw)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Hledat akordy</span>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 2
          }}>×</button>
        </div>
 
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Název písně..."
          style={{
            width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #333",
            background: "#111", color: "white", fontSize: 15, outline: "none", boxSizing: "border-box",
          }}
        />
 
        <p style={{ fontSize: 12, color: "#555", margin: "10px 0 18px" }}>
          Vyhledá <strong style={{ color: "#888" }}>"{query || "název písně"} chords"</strong> na Googlu
        </p>
 
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          style={{
            width: "100%", padding: "12px", borderRadius: 10, border: "none",
            background: query.trim() ? accent : "#333",
            color: query.trim() ? "#000" : "#555",
            fontWeight: 700, fontSize: 14, cursor: query.trim() ? "pointer" : "default",
            transition: "all 0.15s",
          }}
        >
          Hledat na Googlu →
        </button>
      </div>
    </div>
  )
}
 
function SongCard({ song, accent, isOpen, onToggle }) {
  const chords = song.chords.split(" ")
 
  return (
    <div
      onClick={onToggle}
      style={{
        background: isOpen ? "#212121" : "#181818",
        border: isOpen ? `1px solid ${accent}55` : "1px solid #2a2a2a",
        padding: "16px 18px",
        borderRadius: 14,
        cursor: "pointer",
        transition: "all 0.18s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {song.isNew && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: accent, color: "#000",
          fontSize: 9, fontWeight: 800, letterSpacing: "0.08em",
          padding: "2px 7px", borderRadius: 20, textTransform: "uppercase",
        }}>NEW</div>
      )}
 
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#f0f0f0", letterSpacing: "-0.01em" }}>
            {song.name}
          </h3>
          {song.capo > 0 && (
            <span style={{ fontSize: 11, color: "#666", fontWeight: 500 }}>kapo {song.capo}</span>
          )}
        </div>
        <DiffDots level={song.difficulty} accent={accent} />
      </div>
 
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {chords.map((c, i) => <ChordPill key={i} chord={c} accent={accent} />)}
      </div>
 
      {isOpen && (
        <div style={{ marginTop: 16, borderTop: "1px solid #2a2a2a", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888" }}>
            <span>Obtížnost: <span style={{ color: DIFF_COLORS[song.difficulty] }}>{DIFF_LABELS[song.difficulty]}</span></span>
            <span>{song.capo === 0 ? "Bez kapa" : `Kapo ${song.capo}`}</span>
          </div>
 
          <a href={song.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
            <button style={{
              width: "100%", padding: "10px", borderRadius: 10, border: "none",
              background: accent, color: "#000", fontWeight: 700, fontSize: 13,
              cursor: "pointer", letterSpacing: "0.02em",
            }}>
              Otevřít akordy ▶
            </button>
          </a>
 
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.name)}`}
            target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
          >
            <button style={{
              width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #ff000055",
              background: "transparent", color: "#ff4444", fontWeight: 700, fontSize: 13,
              cursor: "pointer",
            }}>
              YouTube ▶
            </button>
          </a>
        </div>
      )}
    </div>
  )
}
 
export default function App() {
  const [search, setSearch] = useState("")
  const [noCapo, setNoCapo] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [openedSong, setOpenedSong] = useState(null)
  const [accent, setAccent] = useState("#1db954")
  const [showSearchModal, setShowSearchModal] = useState(false)
 
  const filtered = SONGS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase())
    const matchesCapo = !noCapo || s.capo === 0
    const matchesNew = !showNewOnly || s.isNew === true
    return matchesSearch && matchesCapo && matchesNew
  })
 
  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "white", padding: "20px 20px 60px" }}>
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} accent={accent} />}
 
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🎸</span>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
            Akordíky
          </h1>
        </div>
 
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Color dots */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {ACCENTS.map(c => (
              <div
                key={c}
                onClick={() => setAccent(c)}
                style={{
                  width: 16, height: 16, borderRadius: "50%", background: c,
                  cursor: "pointer",
                  border: accent === c ? "2px solid white" : "2px solid transparent",
                  transition: "border 0.15s",
                }}
              />
            ))}
          </div>
 
          {/* Web search icon button */}
          <button
            onClick={() => setShowSearchModal(true)}
            title="Hledat akordy na internetu"
            style={{
              background: "#222", border: "1px solid #333",
              borderRadius: 10, width: 36, height: 36,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.15s", flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
      </div>
 
      {/* SEARCH BAR */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <svg
          style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.35 }}
          width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Hledat písně..."
          style={{
            width: "100%", padding: "12px 14px 12px 40px", borderRadius: 12,
            border: "1px solid #2a2a2a", background: "#191919", color: "white",
            fontSize: 14, outline: "none", boxSizing: "border-box",
          }}
        />
      </div>
 
      {/* FILTERS */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Bez kapa", active: noCapo, toggle: () => setNoCapo(v => !v) },
          { label: "✨ Nové", active: showNewOnly, toggle: () => setShowNewOnly(v => !v) },
        ].map(({ label, active, toggle }) => (
          <button
            key={label}
            onClick={toggle}
            style={{
              padding: "8px 16px", borderRadius: 20, border: active ? "none" : "1px solid #2a2a2a",
              background: active ? accent : "transparent",
              color: active ? "#000" : "#888",
              fontWeight: active ? 700 : 400,
              fontSize: 13, cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
 
        <span style={{ marginLeft: "auto", fontSize: 12, color: "#555", alignSelf: "center" }}>
          {filtered.length} písní
        </span>
      </div>
 
      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 12,
      }}>
        {filtered.map((song, i) => (
          <SongCard
            key={song.name + i}
            song={song}
            accent={accent}
            isOpen={openedSong === i}
            onToggle={() => setOpenedSong(openedSong === i ? null : i)}
          />
        ))}
      </div>
 
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", marginTop: 60, color: "#444" }}>
          <div style={{ fontSize: 40 }}>🔍</div>
          <p style={{ fontSize: 14, marginTop: 10 }}>Nic nenalezeno</p>
        </div>
      )}
    </div>
  )
}
 