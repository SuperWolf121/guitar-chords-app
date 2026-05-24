import { useState } from "react"

function App() {
  const [search, setSearch] = useState("")
  const [noCapo, setNoCapo] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [openedSong, setOpenedSong] = useState(null)
  const [themeColor, setThemeColor] = useState("#1db954")

  const songs = [
    { name: "Wonderwall", difficulty: 2, chords: "Em G D A7sus4", capo: 2, link: "https://www.ultimate-guitar.com/" },
    { name: "Stánky", difficulty: 1, chords: "G C D Gm A7", capo: 0, link: "https://akordy.kytary.cz/song/stanky" },
    { name: "Růže z papíru", difficulty: 2, chords: "Dm E7 Gm Am D7 F A7 C7", capo: 0, link: "https://akordy.kytary.cz/song/ruze-z-papiru" },
    { name: "Looking Out For You", difficulty: 2, chords: "A F#m C#m Bm D E", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/joy-again/looking-out-for-you-chords-1863147" },
    { name: "Riptide", difficulty: 1, chords: "Am G C", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/vance-joy/riptide-chords-1237247" },
    { name: "Hotel room", difficulty: 2, chords: "Bm E A F#m D", capo: 0, link: "https://tabs.ultimate-guitar.com/tab/ax-and-the-hatchetmen/hotel-room-chords-5815592" },
    { name: "Stand by me", difficulty: 2, chords: "A D F#m E", capo: 0, link: "https://guitartuna.com/chords/stand-by-me-ben-e-king-easy-guitar-chords-60fa8757d87f149fe408c47e" },
    { name: "Holubí dům", difficulty: 2, chords: "Em D C Hm", capo: 0, link: "https://akordy.kytary.cz/song/holubi-dum" },
    { name: "Lovefool", difficulty: 2, chords: "Bm E A", capo: 0, link: "https://www.cifraclub.com/the-cardigans/lovefool/" },
    { name: "Mary on a cross", difficulty: 2, chords: "Em G D Bm", capo: 4, link: "https://tabs.ultimate-guitar.com/tab/ghost/mary-on-a-cross-chords-2825666" },

    // NEW
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
  ]

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.name.toLowerCase().includes(search.toLowerCase())
    const matchesCapo = !noCapo || song.capo === 0
    const matchesNew = !showNewOnly || song.isNew === true

    return matchesSearch && matchesCapo && matchesNew
  })

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#121212",
      color: "white",
      fontFamily: "Arial",
      padding: 20,
    },

    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    title: {
      fontSize: 32,
      fontWeight: "bold",
    },

    themePicker: {
      display: "flex",
      gap: 8,
      alignItems: "center",
    },

    colorDot: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      cursor: "pointer",
      border: "2px solid white",
    },

    search: {
      width: "100%",
      padding: 14,
      borderRadius: 12,
      border: "none",
      background: "#2a2a2a",
      color: "white",
      marginBottom: 15,
    },

    filters: {
      display: "flex",
      gap: 10,
      marginBottom: 20,
    },

    button: (active) => ({
      padding: 10,
      borderRadius: 20,
      border: "none",
      cursor: "pointer",
      background: active ? themeColor : "#2a2a2a",
      color: "white",
      fontWeight: "bold",
    }),

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: 15,
    },

    card: {
      background: "#181818",
      padding: 15,
      borderRadius: 16,
      cursor: "pointer",
      transition: "0.2s",
      border: "1px solid #2a2a2a",
    },

    songName: {
      margin: 0,
      fontSize: 18,
    },

    chords: {
      color: themeColor,
      fontWeight: "bold",
      marginTop: 5,
    },

    expanded: {
      marginTop: 10,
      paddingTop: 10,
      borderTop: "1px solid #333",
    },

    info: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 6,
      color: "#ccc",
    },

    openBtn: {
      marginTop: 10,
      width: "100%",
      padding: 10,
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      background: themeColor,
      color: "black",
      fontWeight: "bold",
    },
  }

  return (
    <div style={styles.page}>

      {/* TOP BAR */}
      <div style={styles.topBar}>
        <div style={styles.title}>🎸 Akordíky</div>

        <div style={styles.themePicker}>
          {["#1db954", "#ff4d4d", "#4da6ff", "#ffcc00", "#b84dff"].map((c) => (
            <div
              key={c}
              onClick={() => setThemeColor(c)}
              style={{
                ...styles.colorDot,
                background: c,
                transform: themeColor === c ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <input
        style={styles.search}
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div style={styles.filters}>
        <button
          style={styles.button(noCapo)}
          onClick={() => setNoCapo(!noCapo)}
        >
          No capo
        </button>

        <button
          style={styles.button(showNewOnly)}
          onClick={() => setShowNewOnly(!showNewOnly)}
        >
          NEW
        </button>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {filteredSongs.map((song, i) => (
          <div key={i} style={styles.card} onClick={() => setOpenedSong(openedSong === i ? null : i)}>
            <h3 style={styles.songName}>{song.name}</h3>
            <div style={styles.chords}>{song.chords}</div>

            {openedSong === i && (
              <div style={styles.expanded}>
                <div style={styles.info}>
                  <span>🔥 Difficulty</span>
                  <b>{song.difficulty}/3</b>
                </div>

                <div style={styles.info}>
                  <span>🎹 Capo</span>
                  <b>{song.capo}</b>
                </div>

                <a href={song.link} target="_blank" rel="noreferrer">
                  <button style={styles.openBtn}>Open song ▶</button>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App