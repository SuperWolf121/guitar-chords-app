import { useState, useRef, useEffect, useCallback } from "react"

// ── DATA ─────────────────────────────────────────────────────────────────────

const SONGS = [
  // ── starý repertoár (abecedně) ──
  { name: "Amazonka",                  difficulty: 2, chords: "G Bm Hm Am D",         capo: 0, link: "https://zpevniky.com/zpevnik.php?zpevnik=190&pisnicka=82",                                  tag: "ceske" },
  { name: "Best friend",               difficulty: 2, chords: "F G# Am",              capo: 2, link: "https://tabs.ultimate-guitar.com/tab/rex-orange-county/best-friend-chords-1954795",         tag: "zahranicni" },
  { name: "Cudzinka v tvojej zemi",    difficulty: 2, chords: "C G F Dm Am",          capo: 0, link: "https://akordy.kytary.cz/song/cudzinka-v-tvojej-zemi",                                     tag: "ceske" },
  { name: "Hledá se žena",            difficulty: 2, chords: "Am G F E",             capo: 0, link: "https://pisnicky-akordy.cz/mandrage/hleda-se-zena?format=pdf",                              tag: "ceske" },
  { name: "Holubí dům",               difficulty: 2, chords: "Em D C Hm",            capo: 0, link: "https://akordy.kytary.cz/song/holubi-dum",                                                  tag: "ceske" },
  { name: "Hotel room",                difficulty: 2, chords: "Bm E A F#m D",         capo: 0, link: "https://tabs.ultimate-guitar.com/tab/ax-and-the-hatchetmen/hotel-room-chords-5815592",      tag: "zahranicni" },
  { name: "Lásko",                    difficulty: 1, chords: "Am E7 G C",            capo: 0, link: "https://pisnicky-akordy.cz/karel-kryl/lasko?format=pdf",                                    tag: "ceske" },
  { name: "Let her go",                difficulty: 2, chords: "F C G Am",             capo: 7, link: "https://tabs.ultimate-guitar.com/tab/passenger/let-her-go-chords-705962",                   tag: "zahranicni" },
  { name: "Looking Out For You",       difficulty: 2, chords: "A F#m C#m Bm D E",    capo: 0, link: "https://tabs.ultimate-guitar.com/tab/joy-again/looking-out-for-you-chords-1863147",         tag: "zahranicni" },
  { name: "Lovefool",                  difficulty: 2, chords: "Bm E A",               capo: 0, link: "https://www.cifraclub.com/the-cardigans/lovefool/",                                         tag: "zahranicni" },
  { name: "Mary on a cross",           difficulty: 2, chords: "Em G D Bm",            capo: 4, link: "https://tabs.ultimate-guitar.com/tab/ghost/mary-on-a-cross-chords-2825666",                 tag: "zahranicni" },
  { name: "Matfyzák na discu",        difficulty: 2, chords: "F Am G Dm E H7",       capo: 3, link: "https://kytaristka.cz/zpevnik/pokac/matfyzak-na-discu",                                     tag: "ceske" },
  { name: "Na ostří nože",            difficulty: 1, chords: "Em D C Am",            capo: 0, link: "https://akordy.kytary.cz/song/na-ostri-noze",                                               tag: "ceske" },
  { name: "Podvod",                    difficulty: 1, chords: "Em G H7 C",            capo: 0, link: "https://kytaristka.cz/zpevnik/nedvedi/podvod",                                              tag: "ceske" },
  { name: "Pro Emu",                   difficulty: 2, chords: "C G F Dm Am",          capo: 0, link: "https://akordy.kytary.cz/song/pro-emu",                                                     tag: "ceske" },
  { name: "Prodavač",                 difficulty: 2, chords: "C F G D7",             capo: 0, link: "https://kytaristka.cz/zpevnik/fesaci/prodavac",                                              tag: "ceske" },
  { name: "Riptide",                   difficulty: 1, chords: "Am G C",               capo: 0, link: "https://tabs.ultimate-guitar.com/tab/vance-joy/riptide-chords-1237247",                     tag: "zahranicni" },
  { name: "Růže z papíru",            difficulty: 2, chords: "Dm E7 Gm Am D7 F A7 C7", capo: 0, link: "https://akordy.kytary.cz/song/ruze-z-papiru",                                            tag: "ceske" },
  { name: "Sofia (bez kapa)",          difficulty: 2, chords: "Bm D A G F#m",         capo: 0, link: "https://tabs.ultimate-guitar.com/tab/alvaro-soler/sofia-chords-1836944",                    tag: "zahranicni" },
  { name: "Sofia (kapo)",              difficulty: 2, chords: "Am C G F Dm",          capo: 2, link: "https://tabs.ultimate-guitar.com/tab/alvaro-soler/sofia-chords-1836944",                    tag: "zahranicni" },
  { name: "Stand by me",               difficulty: 2, chords: "A D F#m E",            capo: 0, link: "https://guitartuna.com/chords/stand-by-me-ben-e-king-easy-guitar-chords-60fa8757d87f149fe408c47e", tag: "zahranicni" },
  { name: "Stánky",                   difficulty: 1, chords: "G C D Gm A7",          capo: 0, link: "https://akordy.kytary.cz/song/stanky",                                                      tag: "ceske" },
  { name: "Šrouby a matice",          difficulty: 2, chords: "A D E Hm",             capo: 0, link: "https://pisnicky-akordy.cz/mandrage/srouby-a-matice?format=pdf",                            tag: "ceske" },
  { name: "V blbým věku",             difficulty: 2, chords: "C G F Am",             capo: 0, link: "https://www.supermusic.cz/piesen.php?idpiesne=781955",                                      tag: "ceske" },
  { name: "Viva la Vida",              difficulty: 1, chords: "C Em G D",             capo: 1, link: "https://www.songsterr.com/a/wsa/coldplay-viva-la-vida-chords-s10136",                       tag: "zahranicni" },
  { name: "Whats up",                  difficulty: 1, chords: "G C Am",               capo: 2, link: "https://tabs.ultimate-guitar.com/tab/4-non-blondes/whats-up-chords-349210",                 tag: "zahranicni" },
  { name: "Wonderwall",                difficulty: 2, chords: "Em G D A7sus4",        capo: 2, link: "https://www.ultimate-guitar.com/",                                                          tag: "zahranicni" },
  { name: "Yellow",                    difficulty: 2, chords: "G D Cmaj7",            capo: 4, link: "https://tabs.ultimate-guitar.com/tab/coldplay/yellow-chords-114080",                        tag: "zahranicni" },
  { name: "Být stále mlád",           difficulty: 1, chords: "G D Em C Am",          capo: 0, link: "https://pisnicky-akordy.cz/karel-gott/byt-stale-mlad?format=pdf",                           tag: "ceske" },
  { name: "Čekám na signál",          difficulty: 3, chords: "F# G#m C#m H",         capo: 0, link: "https://akordy.kytary.cz/song/cekam-na-signal",                                             tag: "ceske" },

  // ── NEW (od Máme jen sebe po Řekni kde ty kytky jsou) ──
  { name: "Máme jen sebe",            difficulty: 2, chords: "Am F E Dm",            capo: 4, link: "https://pisnicky-akordy.cz/nedvedi/mame-jen-sebe",                                           tag: "ceske",      isNew: true },
  { name: "The loneliest",             difficulty: 2, chords: "Bm F#m E Em",          capo: 0, link: "https://tabs.ultimate-guitar.com/tab/maneskin/the-loneliest-chords-4375667",                tag: "zahranicni", isNew: true },
  { name: "Sex, drugs etc.",           difficulty: 1, chords: "C Am G Em",            capo: 0, link: "https://tabs.ultimate-guitar.com/tab/beach-weather/sex-drugs-etc-chords-2737914",           tag: "zahranicni", isNew: true },
  { name: "Far from any road",         difficulty: 1, chords: "Am Dm E",              capo: 0, link: "https://tabs.ultimate-guitar.com/tab/the-handsome-family/far-from-any-road-chords-1457431", tag: "zahranicni", isNew: true },
  { name: "Take me out",               difficulty: 2, chords: "Bm Em Am",             capo: 0, link: "https://tabs.ultimate-guitar.com/tab/franz-ferdinand/take-me-out-chords-176648",            tag: "zahranicni", isNew: true },
  { name: "Accidentally in love",      difficulty: 1, chords: "Am C G Em",            capo: 0, link: "https://tabs.ultimate-guitar.com/tab/counting-crows/accidentally-in-love-chords-128241",    tag: "zahranicni", isNew: true },
  { name: "Dont look back in anger",   difficulty: 2, chords: "F Gm G",              capo: 0, link: "https://tabs.ultimate-guitar.com/tab/oasis/dont-look-back-in-anger-chords-6097",             tag: "zahranicni", isNew: true },
  { name: "Kopce u pramenu reky tyne", difficulty: 2, chords: "B F C",               capo: 0, link: "https://pisnicky-akordy.cz/asonance/kopce-u-pramenu-reky-tyne",                             tag: "ceske",      isNew: true },
  { name: "Dej mi víc své lásky",     difficulty: 1, chords: "Am G C",               capo: 0, link: "https://pisnicky-akordy.cz/olympic/dej-mi-vic-sve-lasky",                                   tag: "ceske",      isNew: true },
  { name: "Anděl",                     difficulty: 1, chords: "Am C G7",              capo: 0, link: "https://kytaristka.cz/zpevnik/karel-kryl/andel",                                            tag: "ceske",      isNew: true },
  { name: "Kometa",                    difficulty: 2, chords: "Am Dm G7",             capo: 0, link: "https://pisnicky-akordy.cz/jarek-nohavica/kometa",                                          tag: "ceske",      isNew: true },
  { name: "Milenci v texaskach",       difficulty: 2, chords: "F G Am",               capo: 0, link: "https://pisnicky-akordy.cz/taborove-pisne/milenci-v-texaskach",                             tag: "ceske",      isNew: true },
  { name: "Řekni kde ty kytky jsou",  difficulty: 2, chords: "A F#m D E",            capo: 0, link: "https://kytaristka.cz/zpevnik/marie-rottrova/rekni-kde-ty-kytky-jsou",                      tag: "ceske",      isNew: true },
]
const ACCENTS = ["#1db954", "#ff4d4d", "#4da6ff", "#ffcc00", "#b84dff"]
const DIFF_LABELS = ["", "začátečník", "střední", "pokročilý"]
const DIFF_COLORS = ["", "#4ade80", "#facc15", "#f87171"]

// ── HELPERS ───────────────────────────────────────────────────────────────────

function loadLS(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback }
}
function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

// ── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function DiffDots({ level, accent }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1,2,3].map(d => (
        <div key={d} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: d <= level ? accent : "#2e2e2e",
          transition: "background 0.2s",
        }} />
      ))}
    </div>
  )
}

function ChordPill({ chord, accent, onClick, active }) {
  return (
    <span
      onClick={onClick}
      title={onClick ? `Filtrovat podle ${chord}` : undefined}
      style={{
        display: "inline-block", padding: "2px 8px", borderRadius: 20,
        background: active ? accent : accent + "22",
        color: active ? "#000" : accent,
        fontSize: 12, fontWeight: 700, letterSpacing: "0.02em",
        border: `1px solid ${accent}44`,
        fontFamily: "monospace",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.15s",
        userSelect: "none",
      }}
    >{chord}</span>
  )
}

function TagBadge({ tag }) {
  if (!tag) return null
  const isCz = tag === "ceske"
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.06em",
      padding: "2px 6px", borderRadius: 6,
      background: isCz ? "#1a3a2a" : "#1a2a3a",
      color: isCz ? "#4ade80" : "#60a5fa",
      textTransform: "uppercase",
    }}>{isCz ? "🇨🇿 CZ" : "🌍 EN"}</span>
  )
}

// ── SEARCH MODAL ──────────────────────────────────────────────────────────────

function SearchModal({ onClose, accent }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [])
  const handleSearch = () => {
    if (!query.trim()) return
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query + " chords")}`, "_blank", "noreferrer")
    onClose()
  }
  const handleKey = e => { if (e.key === "Enter") handleSearch(); if (e.key === "Escape") onClose() }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(6px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1a1a1a", border: "1px solid #333", borderRadius: 16,
        padding: "26px 26px 22px", width: "min(420px, 90vw)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <SearchIcon stroke={accent} size={18} />
            <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Hledat akordy</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
        </div>
        <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKey}
          placeholder="Název písně..."
          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #333", background: "#111", color: "white", fontSize: 15, outline: "none", boxSizing: "border-box" }}
        />
        <p style={{ fontSize: 12, color: "#555", margin: "10px 0 16px" }}>
          Vyhledá <strong style={{ color: "#888" }}>"{query || "název písně"} chords"</strong> na Googlu
        </p>
        <button onClick={handleSearch} disabled={!query.trim()} style={{
          width: "100%", padding: 12, borderRadius: 10, border: "none",
          background: query.trim() ? accent : "#2a2a2a",
          color: query.trim() ? "#000" : "#555",
          fontWeight: 700, fontSize: 14, cursor: query.trim() ? "pointer" : "default", transition: "all 0.15s",
        }}>Hledat na Googlu →</button>
      </div>
    </div>
  )
}

// ── ICON HELPERS ──────────────────────────────────────────────────────────────

function SearchIcon({ stroke = "white", size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}
function HeartIcon({ filled, color }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

// ── SONG CARD ─────────────────────────────────────────────────────────────────

function SongCard({ song, accent, isOpen, onToggle, isFav, onFavToggle, onChordClick, activeChord, listView, onPlayed }) {
  const chords = song.chords.split(" ")

  if (listView) {
    return (
      <div onClick={onToggle} style={{
        background: isOpen ? "#1e1e1e" : "#171717",
        border: isOpen ? `1px solid ${accent}44` : "1px solid #222",
        borderRadius: 10, padding: "11px 14px", cursor: "pointer",
        transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={e => { e.stopPropagation(); onFavToggle() }} style={{
          background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
        }}>
          <HeartIcon filled={isFav} color={isFav ? accent : "#444"} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#eee", whiteSpace: "nowrap" }}>{song.name}</span>
            {song.isNew && <span style={{ fontSize: 9, fontWeight: 800, background: accent, color: "#000", padding: "1px 5px", borderRadius: 20 }}>NEW</span>}
            <TagBadge tag={song.tag} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginTop: 4 }}>
            {chords.map((c, i) => <ChordPill key={i} chord={c} accent={accent} active={c === activeChord} onClick={e => { e.stopPropagation(); onChordClick(c) }} />)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {song.capo > 0 && <span style={{ fontSize: 10, color: "#555" }}>kapo {song.capo}</span>}
          <DiffDots level={song.difficulty} accent={accent} />
        </div>

        {isOpen && (
          <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: 6 }}>
            <a href={song.link} target="_blank" rel="noreferrer" onClick={() => onPlayed(song.name)}>
              <button style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: accent, color: "#000", fontWeight: 700, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
                Akordy ▶
              </button>
            </a>
            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.name)}`} target="_blank" rel="noreferrer">
              <button style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid #ff000055", background: "transparent", color: "#ff4444", fontWeight: 700, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
                YT ▶
              </button>
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <div onClick={onToggle} style={{
      background: isOpen ? "#212121" : "#181818",
      border: isOpen ? `1px solid ${accent}55` : "1px solid #242424",
      padding: "16px 18px", borderRadius: 14, cursor: "pointer",
      transition: "all 0.18s ease", position: "relative", overflow: "hidden",
    }}>
      {song.isNew && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: accent, color: "#000", fontSize: 9, fontWeight: 800,
          letterSpacing: "0.08em", padding: "2px 7px", borderRadius: 20, textTransform: "uppercase",
        }}>NEW</div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: song.isNew ? 42 : 0 }}>
          <button onClick={e => { e.stopPropagation(); onFavToggle() }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
            <HeartIcon filled={isFav} color={isFav ? accent : "#3a3a3a"} />
          </button>
          <div>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#f0f0f0", letterSpacing: "-0.01em" }}>{song.name}</h3>
            <div style={{ display: "flex", gap: 5, marginTop: 3, alignItems: "center" }}>
              <TagBadge tag={song.tag} />
              {song.capo > 0 && <span style={{ fontSize: 10, color: "#555", fontWeight: 500 }}>kapo {song.capo}</span>}
            </div>
          </div>
        </div>
        <DiffDots level={song.difficulty} accent={accent} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {chords.map((c, i) => (
          <ChordPill key={i} chord={c} accent={accent} active={c === activeChord}
            onClick={e => { e.stopPropagation(); onChordClick(c) }} />
        ))}
      </div>

      {isOpen && (
        <div style={{ marginTop: 14, borderTop: "1px solid #2a2a2a", paddingTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#777" }}>
            <span>Obtížnost: <span style={{ color: DIFF_COLORS[song.difficulty] }}>{DIFF_LABELS[song.difficulty]}</span></span>
            <span>{song.capo === 0 ? "Bez kapa" : `Kapo ${song.capo}`}</span>
          </div>
          <a href={song.link} target="_blank" rel="noreferrer" onClick={e => { e.stopPropagation(); onPlayed(song.name) }}>
            <button style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", background: accent, color: "#000", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Otevřít akordy ▶
            </button>
          </a>
          <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.name)}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
            <button style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ff000055", background: "transparent", color: "#ff4444", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              YouTube ▶
            </button>
          </a>
        </div>
      )}
    </div>
  )
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

export default function App() {
  const [search, setSearch]               = useState("")
  const [noCapo, setNoCapo]               = useState(false)
  const [showNewOnly, setShowNewOnly]     = useState(false)
  const [showFavOnly, setShowFavOnly]     = useState(false)
  const [showRecentOnly, setShowRecentOnly] = useState(false)
  const [tagFilter, setTagFilter]         = useState("vse") // "vse" | "ceske" | "zahranicni"
  const [sortBy, setSortBy]               = useState("default") // "default" | "az" | "diff_asc" | "diff_desc"
  const [openedSong, setOpenedSong]       = useState(null)
  const [accent, setAccent]               = useState(() => loadLS("accent", "#1db954"))
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [favorites, setFavorites]         = useState(() => loadLS("favorites", []))
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => loadLS("recentlyPlayed", []))
  const [activeChord, setActiveChord]     = useState(null)
  const [listView, setListView]           = useState(false)

  // Persist accent & favorites
  useEffect(() => saveLS("accent", accent), [accent])
  useEffect(() => saveLS("favorites", favorites), [favorites])
  useEffect(() => saveLS("recentlyPlayed", recentlyPlayed), [recentlyPlayed])

  const toggleFav = useCallback((name) => {
    setFavorites(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }, [])

  const markPlayed = useCallback((name) => {
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(n => n !== name)
      return [name, ...filtered].slice(0, 20)
    })
  }, [])

  const handleChordClick = useCallback((chord) => {
    setActiveChord(prev => prev === chord ? null : chord)
    setSearch("")
  }, [])

  // Sort + filter
  let songs = [...SONGS]

  if (sortBy === "az")         songs.sort((a, b) => a.name.localeCompare(b.name, "cs"))
  else if (sortBy === "diff_asc")  songs.sort((a, b) => a.difficulty - b.difficulty)
  else if (sortBy === "diff_desc") songs.sort((a, b) => b.difficulty - a.difficulty)
  // default = old songs first, new songs at bottom (as in source)
  // isNew songs are already at end of array, no extra sort needed

  const filtered = songs.filter(s => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    if (noCapo && s.capo !== 0) return false
    if (showNewOnly && !s.isNew) return false
    if (showFavOnly && !favorites.includes(s.name)) return false
    if (showRecentOnly && !recentlyPlayed.includes(s.name)) return false
    if (tagFilter !== "vse" && s.tag !== tagFilter) return false
    if (activeChord && !s.chords.split(" ").includes(activeChord)) return false
    return true
  })

  // When using recentlyPlayed filter, sort by recency
  const displaySongs = showRecentOnly
    ? [...filtered].sort((a, b) => recentlyPlayed.indexOf(a.name) - recentlyPlayed.indexOf(b.name))
    : filtered

  const clearChord = () => setActiveChord(null)

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "white", padding: "18px 16px 60px" }}>
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} accent={accent} />}

      {/* ── HEADER ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ fontSize: 24 }}>🎸</span>
          <h1 style={{ margin: 0, fontSize: 21, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>Akordíky</h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Color dots */}
          <div style={{ display: "flex", gap: 5 }}>
            {ACCENTS.map(c => (
              <div key={c} onClick={() => setAccent(c)} style={{
                width: 15, height: 15, borderRadius: "50%", background: c, cursor: "pointer",
                border: accent === c ? "2px solid white" : "2px solid transparent",
                transition: "border 0.15s",
              }} />
            ))}
          </div>

          {/* List / Grid toggle */}
          <button onClick={() => setListView(v => !v)} title={listView ? "Grid" : "Seznam"} style={{
            background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8,
            width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
            {listView ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>

          {/* Web search */}
          <button onClick={() => setShowSearchModal(true)} title="Hledat akordy online" style={{
            background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 8,
            width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <SearchIcon stroke={accent} size={15} />
          </button>
        </div>
      </div>

      {/* ── SEARCH BAR ── */}
      <div style={{ position: "relative", marginBottom: 10 }}>
        <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", opacity: 0.3 }}>
          <SearchIcon size={14} />
        </div>
        <input value={search} onChange={e => { setSearch(e.target.value); setActiveChord(null) }}
          placeholder="Hledat písně..."
          style={{ width: "100%", padding: "11px 14px 11px 38px", borderRadius: 11, border: "1px solid #242424", background: "#171717", color: "white", fontSize: 14, outline: "none", boxSizing: "border-box" }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
        )}
      </div>

      {/* ── ACTIVE CHORD BANNER ── */}
      {activeChord && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: accent + "18", border: `1px solid ${accent}44`, borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: accent, fontWeight: 600 }}>🎵 Filtr: akord <strong>{activeChord}</strong></span>
          <button onClick={clearChord} style={{ marginLeft: "auto", background: "none", border: "none", color: accent, cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* ── FILTERS ROW 1 ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        {[
          { label: "Bez kapa",  active: noCapo,        toggle: () => setNoCapo(v => !v) },
          { label: "✨ Nové",   active: showNewOnly,    toggle: () => setShowNewOnly(v => !v) },
          { label: "♥ Oblíbené", active: showFavOnly,  toggle: () => setShowFavOnly(v => !v) },
          { label: "🕐 Nedávné", active: showRecentOnly, toggle: () => setShowRecentOnly(v => !v) },
        ].map(({ label, active, toggle }) => (
          <button key={label} onClick={toggle} style={{
            padding: "7px 13px", borderRadius: 20,
            border: active ? "none" : "1px solid #242424",
            background: active ? accent : "transparent",
            color: active ? "#000" : "#777",
            fontWeight: active ? 700 : 400, fontSize: 12, cursor: "pointer", transition: "all 0.15s",
          }}>{label}</button>
        ))}
      </div>

      {/* ── FILTERS ROW 2: tag + sort ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        {/* Tag filter */}
        {[
          { val: "vse", label: "Vše" },
          { val: "ceske", label: "🇨🇿 České" },
          { val: "zahranicni", label: "🌍 Zahraniční" },
        ].map(({ val, label }) => (
          <button key={val} onClick={() => setTagFilter(val)} style={{
            padding: "6px 12px", borderRadius: 20,
            border: tagFilter === val ? "none" : "1px solid #242424",
            background: tagFilter === val ? accent + "33" : "transparent",
            color: tagFilter === val ? accent : "#666",
            fontWeight: tagFilter === val ? 700 : 400, fontSize: 12, cursor: "pointer", transition: "all 0.15s",
          }}>{label}</button>
        ))}

        <div style={{ width: 1, height: 18, background: "#2a2a2a", margin: "0 2px" }} />

        {/* Sort */}
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
          padding: "6px 10px", borderRadius: 20, border: "1px solid #242424",
          background: "#171717", color: "#888", fontSize: 12, cursor: "pointer", outline: "none",
        }}>
          <option value="default">Pořadí: výchozí</option>
          <option value="az">A–Z</option>
          <option value="diff_asc">Obtížnost ↑</option>
          <option value="diff_desc">Obtížnost ↓</option>
        </select>

        <span style={{ marginLeft: "auto", fontSize: 11, color: "#444" }}>{displaySongs.length} písní</span>
      </div>

      {/* ── GRID / LIST ── */}
      <div style={listView ? { display: "flex", flexDirection: "column", gap: 6 } : {
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10,
      }}>
        {displaySongs.map((song, i) => (
          <SongCard
            key={song.name}
            song={song}
            accent={accent}
            isOpen={openedSong === song.name}
            onToggle={() => setOpenedSong(openedSong === song.name ? null : song.name)}
            isFav={favorites.includes(song.name)}
            onFavToggle={() => toggleFav(song.name)}
            onChordClick={handleChordClick}
            activeChord={activeChord}
            listView={listView}
            onPlayed={markPlayed}
          />
        ))}
      </div>

      {displaySongs.length === 0 && (
        <div style={{ textAlign: "center", marginTop: 60, color: "#333" }}>
          <div style={{ fontSize: 38 }}>🔍</div>
          <p style={{ fontSize: 13, marginTop: 8 }}>Nic nenalezeno</p>
          {activeChord && <button onClick={clearChord} style={{ marginTop: 8, background: "none", border: `1px solid ${accent}44`, color: accent, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>Zrušit filtr akordu</button>}
        </div>
      )}
    </div>
  )
}