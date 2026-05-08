import { useState } from "react"

function App() {
  const [search, setSearch] = useState("")

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
      chords: "G C D",
      capo: 0,
      link: "https://www.supermusic.cz/",
    },
    {
      name: "Růže z papíru",
      difficulty: 2,
      chords: "Dm E7 Gm Am D7 F A7 C7",
      capo: 0,
      link: "https://akordy.kytary.cz/song/ruze-z-papiru",
    },
  ]

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h1 style={styles.title}>🎸 My Guitar Library</h1>

      {/* SEARCH */}
      <input
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* GRID */}
      <div style={styles.grid}>
      {filteredSongs.map((song, i) => (
  <div key={i} style={styles.card}>
    <h2 style={styles.songName}>{song.name}</h2>

    <p style={styles.text}>
      🔥 Difficulty: <b>{song.difficulty}/3</b>
    </p>

    <p style={styles.text}>🎸 Chords: {song.chords}</p>
    <p style={styles.text}>🎹 Capo: {song.capo}</p>

    <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
      
      {/* TVOJE EXISTUJÍCÍ PLAY TLAČÍTKO */}
      <a href={song.link} target="_blank" rel="noreferrer">
        <button style={styles.button}>Play ▶</button>
      </a>

      {/* NOVÉ YOUTUBE TLAČÍTKO */}
      <a
        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.name)}`}
        target="_blank"
        rel="noreferrer"
      >
        <button style={styles.youtubeButton}>YouTube ▶</button>
      </a>
    </div>
  </div>
    ))}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f0f0f, #121212)",
    color: "white",
    padding: 20,
    fontFamily: "Arial",
  },

  title: {
    fontSize: 32,
    marginBottom: 20,
  },

  search: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    outline: "none",
    marginBottom: 20,
    background: "#1f1f1f",
    color: "white",
    fontSize: 16,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 15,
  },

  card: {
    background: "#1a1a1a",
    padding: 15,
    borderRadius: 15,
    border: "1px solid #2a2a2a",
    transition: "0.2s",
    cursor: "pointer",
  },

  songName: {
    marginBottom: 10,
  },

  text: {
    margin: "5px 0",
    color: "#b3b3b3",
  },

  button: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#1db954",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
}

export default App