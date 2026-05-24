import { useState } from "react"

function App() {
  const [search, setSearch] = useState("")
  const [noCapo, setNoCapo] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [openedSong, setOpenedSong] = useState(null)

  const songs = [
    {
      name: "Wonderwall",
      difficulty: 2,
      chords: "Em G D A7sus4",
      capo: 2,
      link: "https://www.ultimate-guitar.com/",
    },
    {
      name: "Stánky",
      difficulty: 1,
      chords: "G C D Gm A7",
      capo: 0,
      link: "https://akordy.kytary.cz/song/stanky",
    },
    {
      name: "Růže z papíru",
      difficulty: 2,
      chords: "Dm E7 Gm Am D7 F A7 C7",
      capo: 0,
      link: "https://akordy.kytary.cz/song/ruze-z-papiru",
    },
    {
      name: "Looking Out For You",
      difficulty: 2,
      chords: "A F#m C#m Bm D E",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/joy-again/looking-out-for-you-chords-1863147",
    },
    {
      name: "Riptide",
      difficulty: 1,
      chords: "Am G C",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/vance-joy/riptide-chords-1237247",
    },
    {
      name: "Hotel room",
      difficulty: 2,
      chords: "Bm E A F#m D",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/ax-and-the-hatchetmen/hotel-room-chords-5815592",
    },
    {
      name: "Stand by me",
      difficulty: 2,
      chords: "A D F#m E",
      capo: 0,
      link: "https://guitartuna.com/chords/stand-by-me-ben-e-king-easy-guitar-chords-60fa8757d87f149fe408c47e",
    },
    {
      name: "Holubí dům",
      difficulty: 2,
      chords: "Em D C Hm",
      capo: 0,
      link: "https://akordy.kytary.cz/song/holubi-dum",
    },
    {
      name: "Lovefool",
      difficulty: 2,
      chords: "Bm E A",
      capo: 0,
      link: "https://www.cifraclub.com/the-cardigans/lovefool/",
    },
    {
      name: "Mary on a cross",
      difficulty: 2,
      chords: "Em G D Bm",
      capo: 4,
      link: "https://tabs.ultimate-guitar.com/tab/ghost/mary-on-a-cross-chords-2825666",
    },

    // NEW SONGS

    {
      name: "Best friend",
      difficulty: 2,
      chords: "F G# Am",
      capo: 2,
      link: "https://tabs.ultimate-guitar.com/tab/rex-orange-county/best-friend-chords-1954795",
      isNew: true,
    },
    {
      name: "Whats up",
      difficulty: 1,
      chords: "G C Am",
      capo: 2,
      link: "https://tabs.ultimate-guitar.com/tab/4-non-blondes/whats-up-chords-349210",
      isNew: true,
    },
    {
      name: "Šrouby a matice",
      difficulty: 2,
      chords: "A D E Hm",
      capo: 0,
      link: "https://pisnicky-akordy.cz/mandrage/srouby-a-matice?format=pdf",
      isNew: true,
    },
    {
      name: "Let her go",
      difficulty: 2,
      chords: "F C G Am",
      capo: 7,
      link: "https://tabs.ultimate-guitar.com/tab/passenger/let-her-go-chords-705962",
      isNew: true,
    },
    {
      name: "Máme jen sebe",
      difficulty: 2,
      chords: "Am F E Dm",
      capo: 4,
      link: "https://pisnicky-akordy.cz/nedvedi/mame-jen-sebe",
      isNew: true,
    },
    {
      name: "The loneliest",
      difficulty: 2,
      chords: "Bm F#m E Em",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/maneskin/the-loneliest-chords-4375667",
      isNew: true,
    },
    {
      name: "Sex, drugs etc.",
      difficulty: 1,
      chords: "C Am G Em",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/beach-weather/sex-drugs-etc-chords-2737914",
      isNew: true,
    },
    {
      name: "Far from any road",
      difficulty: 1,
      chords: "Am Dm E",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/the-handsome-family/far-from-any-road-chords-1457431",
      isNew: true,
    },
    {
      name: "Take me out",
      difficulty: 2,
      chords: "Bm Em Am",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/franz-ferdinand/take-me-out-chords-176648",
      isNew: true,
    },
    {
      name: "Accidentally in love",
      difficulty: 1,
      chords: "Am C G Em",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/counting-crows/accidentally-in-love-chords-128241",
      isNew: true,
    },
  ]

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCapo = noCapo ? song.capo === 0 : true
    const matchesNew = showNewOnly ? song.isNew : true

    return matchesSearch && matchesCapo && matchesNew
  })

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎸 Akordíky</h1>

        <input
          placeholder="Search songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        <div style={styles.filters}>
          <button
            onClick={() => setNoCapo(!noCapo)}
            style={{
              ...styles.filterButton,
              background: noCapo ? "#1db954" : "#1e1e1e",
            }}
          >
            🎹 No capo
          </button>

          <button
            onClick={() => setShowNewOnly(!showNewOnly)}
            style={{
              ...styles.filterButton,
              background: showNewOnly ? "#ff9800" : "#1e1e1e",
            }}
          >
            ✨ NEW
          </button>
        </div>

        <div style={styles.grid}>
          {filteredSongs.map((song, i) => (
            <div key={i} style={styles.card}>
              <div
                style={styles.songHeader}
                onClick={() =>
                  setOpenedSong(openedSong === i ? null : i)
                }
              >
                <div>
                  <h2 style={styles.songName}>
                    {song.name}
                  </h2>

                  <div style={styles.preview}>
                    {song.chords}
                  </div>
                </div>

                <div style={styles.arrow}>
                  {openedSong === i ? "−" : "+"}
                </div>
              </div>

              {openedSong === i && (
                <div style={styles.expanded}>
                  <div style={styles.infoRow}>
                    <span>🔥 Difficulty</span>
                    <b>{song.difficulty}/3</b>
                  </div>

                  <div style={styles.infoRow}>
                    <span>🎹 Capo</span>
                    <b>{song.capo}</b>
                  </div>

                  <div style={styles.chordsBox}>
                    {song.chords}
                  </div>

                  <div style={styles.buttons}>
                    <a
                      href={song.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ flex: 1 }}
                    >
                      <button style={styles.playButton}>
                        Play ▶
                      </button>
                    </a>

                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        song.name
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ flex: 1 }}
                    >
                      <button style={styles.youtubeButton}>
                        YouTube ▶
                      </button>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    color: "white",
  },

  container: {
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  search: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "1px solid #2a2a2a",
    background: "#181818",
    color: "white",
    fontSize: 16,
    marginBottom: 14,
    boxSizing: "border-box",
  },

  filters: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },

  filterButton: {
    flex: 1,
    minWidth: 120,
    padding: 12,
    borderRadius: 12,
    border: "1px solid #2a2a2a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },

  card: {
    background: "#181818",
    borderRadius: 18,
    border: "1px solid #262626",
    overflow: "hidden",
    transition: "0.2s",
  },

  songHeader: {
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    gap: 12,
  },

  songName: {
    margin: 0,
    fontSize: 18,
    marginBottom: 6,
  },

  preview: {
    color: "#9e9e9e",
    fontSize: 13,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 200,
  },

  arrow: {
    fontSize: 28,
    color: "#1db954",
    fontWeight: "bold",
  },

  expanded: {
    padding: 16,
    paddingTop: 0,
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    color: "#cfcfcf",
  },

  chordsBox: {
    background: "#111",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 14,
    fontWeight: "bold",
    color: "#1db954",
    fontSize: 15,
    overflowX: "auto",
  },

  buttons: {
    display: "flex",
    gap: 10,
  },

  playButton: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#1db954",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 14,
  },

  youtubeButton: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#ff0000",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 14,
  },
}

export default App