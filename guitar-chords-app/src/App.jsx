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
      chords: "Dm, E7, Gm, Am, D7, F, A7, C7",
      capo: 0,
      link: "https://akordy.kytary.cz/song/ruze-z-papiru",
    },
  ]

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      style={{
        padding: "20px",
        background: "#111",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>🎸 Vítej na mé strance s akordama :D</h1>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Hledej písničku..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "none",
        }}
      />

      {/* SONG LIST */}
      {filteredSongs.map((song, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #333",
            padding: "15px",
            marginTop: "15px",
            borderRadius: "10px",
          }}
        >
          <h2>{song.name}</h2>

          <p>Obtížnost: {song.difficulty}/3</p>
          <p>Akordy: {song.chords}</p>
          <p>Kapo: {song.capo}</p>

          <a href={song.link} target="_blank" rel="noreferrer">
            <button>Hrát</button>
          </a>
        </div>
      ))}
    </div>
  )
}

export default App