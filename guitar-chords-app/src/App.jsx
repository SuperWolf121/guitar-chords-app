import { useState } from "react"

function App() {
  const [search, setSearch] = useState("")
  const [noCapo, setNoCapo] = useState(false)
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
    name: "V blbým věku",
    difficulty: 2,
    chords: "C G F Am",
    capo: 0,
    link: "https://www.supermusic.cz/piesen.php?idpiesne=781955",
  },
  {
    name: "Pro Emu",
    difficulty: 2,
    chords: "C G F Dm Am",
    capo: 0,
    link: "https://akordy.kytary.cz/song/pro-emu",
  },
  {
    name: "Cudzinka v tvojej zemi",
    difficulty: 2,
    chords: "C G F Dm Am",
    capo: 0,
    link: "https://akordy.kytary.cz/song/cudzinka-v-tvojej-zemi",
  },
  {
    name: "Hledá se žena",
    difficulty: 2,
    chords: "Am G F E",
    capo: 0,
    link: "https://pisnicky-akordy.cz/mandrage/hleda-se-zena?format=pdf",
  },
  {
    name: "Sofia (kapo)",
    difficulty: 2,
    chords: "Am C G F Dm",
    capo: 2,
    link: "https://tabs.ultimate-guitar.com/tab/alvaro-soler/sofia-chords-1836944",
  },
  {
    name: "Sofia (bez kapa)",
    difficulty: 2,
    chords: "Bm D A G F#m",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/alvaro-soler/sofia-chords-1836944",
  },
  {
    name: "Čekám na signál",
    difficulty: 3,
    chords: "F# G#m C#m H",
    capo: 0,
    link: "https://akordy.kytary.cz/song/cekam-na-signal",
  },
  {
    name: "Na ostří nože",
    difficulty: 1,
    chords: "Em D C Am",
    capo: 0,
    link: "https://akordy.kytary.cz/song/na-ostri-noze",
  },
  {
    name: "Matfyzák na discu",
    difficulty: 2,
    chords: "F Am G Dm E H7",
    capo: 3,
    link: "https://kytaristka.cz/zpevnik/pokac/matfyzak-na-discu",
  },
  {
    name: "Amazonka",
    difficulty: 2,
    chords: "G Bm Hm Am D",
    capo: 0,
    link: "https://zpevniky.com/zpevnik.php?zpevnik=190&pisnicka=82",
  },
  {
    name: "Prodavač",
    difficulty: 2,
    chords: "C F G D7",
    capo: 0,
    link: "https://kytaristka.cz/zpevnik/fesaci/prodavac",
  },
  {
    name: "Lásko",
    difficulty: 1,
    chords: "Am E7 G C",
    capo: 0,
    link: "https://pisnicky-akordy.cz/karel-kryl/lasko?format=pdf",
  },
  {
    name: "Sbohem lásko",
    difficulty: 2,
    chords: "C F G7 Fm Em",
    capo: 0,
    link: "https://pisnicky-akordy.cz/waldemar-matuska/sbohem-lasko?format=pdf",
  },
  {
    name: "Podvod",
    difficulty: 1,
    chords: "Em G H7 C",
    capo: 0,
    link: "https://kytaristka.cz/zpevnik/nedvedi/podvod",
  },
  {
    name: "Hvězda na vrbě",
    difficulty: 3,
    chords: "Am F Em G7",
    capo: 0,
    link: "https://pisnicky-akordy.cz/taborove-pisne/hvezda-na-vrbe?format=pdf",
  },
  {
    name: "Být stále mlád",
    difficulty: 1,
    chords: "G D Em C Am",
    capo: 0,
    link: "https://pisnicky-akordy.cz/karel-gott/byt-stale-mlad?format=pdf",
  },
  {
    name: "Bláznová ukolébavka",
    difficulty: 1,
    chords: "G D C A",
    capo: 0,
    link: "https://kytaristka.cz/zpevnik/pavel-dydovic/blaznova-ukolebavka",
  },
  {
    name: "Báječná ženská",
    difficulty: 1,
    chords: "G C D7 A",
    capo: 0,
    link: "https://www.yousongs.cz/pisen/21462-Tucny-Michal-Bajecna-zenska-(bez-capo).aspx",
  },
  {
    name: "Severní vítr",
    difficulty: 3,
    chords: "D Hm H F#m",
    capo: 0,
    link: "https://pisnicky-akordy.cz/sverak-uhlir/severni-vitr?format=pdf",
  },
  {
    name: "Holky z naší školky",
    difficulty: 1,
    chords: "D G A A7",
    capo: 1,
    link: "https://www.yousongs.cz/pisen/15204-Hlozek-Stanislav-Holky-z-nasi-skolky.aspx",
  },
  {
    name: "Tereza (Osamělé město)",
    difficulty: 1,
    chords: "C D G Em",
    capo: 0,
    link: "https://akordy.kytary.cz/song/osamele-mesto-tereza",
  },
  {
    name: "Bedna od Whisky",
    difficulty: 1,
    chords: "Am C Em E",
    capo: 0,
    link: "https://akordy.kytary.cz/song/bena-od-whisky",
  },
  {
    name: "Holubí dům",
    difficulty: 2,
    chords: "Em D C Hm",
    capo: 0,
    link: "https://akordy.kytary.cz/song/holubi-dum",
  },
  {
    name: "Everybody wants to rule the world",
    difficulty: 2,
    chords: "Em F#m Bm C",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/tears-for-fears/everybody-wants-to-rule-the-world-chords-1503308",
  },
  {
    name: "Zakázané uvolnění",
    difficulty: 2,
    chords: "D F# A G Hm",
    capo: 0,
    link: "https://akordy.kytary.cz/song/zakazane-uvolneni",
  },
  {
    name: "Budu Ti Vyprávět",
    difficulty: 2,
    chords: "D F#m Hm G",
    capo: 0,
    link: "https://akordy.kytary.cz/song/budu-ti-vypravet",
  },
  {
    name: "Motýli",
    difficulty: 2,
    chords: "Hm G Em",
    capo: 0,
    link: "https://kytaristka.cz/zpevnik/mandrage/motyli",
  },
  {
    name: "26",
    difficulty: 2,
    chords: "G E F C",
    capo: 0,
    link: "https://akordy.kytary.cz/song/26",
  },
  {
    name: "Řiditel autobusu",
    difficulty: 2,
    chords: "Am F E Dm",
    capo: 0,
    link: "https://akordy.kytary.cz/song/riditel-autobusu-2",
  },
  {
    name: "End of beginning",
    difficulty: 2,
    chords: "D Bm A",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/djo/end-of-beginning-chords-4351838",
  },
  {
    name: "Those eyes",
    difficulty: 3,
    chords: "F#m A B E",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/new-west/those-eyes-chords-2734944",
  },
  {
    name: "Sweater weather",
    difficulty: 1,
    chords: "C Am Em G",
    capo: 3,
    link: "https://tabs.ultimate-guitar.com/tab/the-neighbourhood/sweater-weather-chords-1237978",
  },
  {
    name: "Pohoda",
    difficulty: 2,
    chords: "F#m C#m E D",
    capo: 0,
    link: "https://akordy.kytary.cz/song/pohoda",
  },
  {
    name: "Babydoll",
    difficulty: 2,
    chords: "Gm A Dm",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/dominic-fike/babydoll-chords-2937476",
  },
  {
    name: "Self aware",
    difficulty: 2,
    chords: "Am C F Dm",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/temper-city/self-aware-chords-6170777",
  },
  {
    name: "Sailor Song",
    difficulty: 1,
    chords: "C Em G",
    capo: 4,
    link: "https://tabs.ultimate-guitar.com/tab/gigi-perez/sailor-song-chords-5363001",
  },
  {
    name: "Viva la Vida",
    difficulty: 1,
    chords: "C Em G D",
    capo: 1,
    link: "https://www.songsterr.com/a/wsa/coldplay-viva-la-vida-chords-s10136",
  },
  {
    name: "Television, so far so good",
    difficulty: 2,
    chords: "C Em F G",
    capo: 5,
    link: "https://tabs.ultimate-guitar.com/tab/rex-orange-county/television-so-far-so-good-chords-2624304",
  },
  {
    name: "Cant take my eyes off you",
    difficulty: 2,
    chords: "C F Fm D",
    capo: 0,
    link: "https://guitartuna.com/chords/cant-take-my-eyes-off-you-andy-williams-easy-guitar-chords-6217b2f67d0e3fa4285c2ed2",
  },
  {
    name: "Hit the road Jack",
    difficulty: 2,
    chords: "Am G F E",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/ray-charles/hit-the-road-jack-chords-168021",
  },
  {
    name: "Be my baby",
    difficulty: 2,
    chords: "C Dm G E7",
    capo: 4,
    link: "https://tabs.ultimate-guitar.com/tab/the-ronettes/be-my-baby-chords-958714",
  },
  {
    name: "Yellow",
    difficulty: 2,
    chords: "G D Cmaj7",
    capo: 4,
    link: "https://tabs.ultimate-guitar.com/tab/coldplay/yellow-chords-114080",
  },
  {
    name: "Lemon tree",
    difficulty: 2,
    chords: "Am Em Dm",
    capo: 8,
    link: "https://tabs.ultimate-guitar.com/tab/fools-garden/lemon-tree-chords-607747",
  },
  {
    name: "Put your head on my shoulder",
    difficulty: 3,
    chords: "F# Fm A",
    capo: 0,
    link: "https://guitartuna.com/chords/put-your-head-on-my-shoulder-paul-anka-easy-guitar-chords-61c1ee0d2656a3cdf92d96be",
  },
  {
    name: "Kiss me",
    difficulty: 2,
    chords: "C Cmaj7 Dm",
    capo: 3,
    link: "https://tabs.ultimate-guitar.com/tab/sixpence-none-the-richer/kiss-me-chords-2704",
  },
  {
    name: "Copacabana",
    difficulty: 3,
    chords: "Fm Bb Cm",
    capo: 0,
    link: "https://guitartuna.com/chords/copacabana-at-the-copa-barry-manilow-easy-guitar-chords-621f8d9550cb7457161fae3b",
  },
  {
    name: "Out of my league",
    difficulty: 2,
    chords: "F G C Am",
    capo: 0,
    link: "https://tabs.ultimate-guitar.com/tab/stephen-speaks/out-of-my-league-chords-196771",
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
  {
  name: "Best friend",
  difficulty: 2,
  chords: "F G# Am",
  capo: 2,
  link: "https://tabs.ultimate-guitar.com/tab/rex-orange-county/best-friend-chords-1954795",
},
  {
  name: "Whats up",
  difficulty: 1,
  chords: "G C Am",
  capo: 2,
  link: "https://tabs.ultimate-guitar.com/tab/4-non-blondes/whats-up-chords-349210",
},
  {
  name: "Whats up",
  difficulty: 1,
  chords: "G C Am",
  capo: 2,
  link: "https://tabs.ultimate-guitar.com/tab/4-non-blondes/whats-up-chords-349210",
},
    
  ]

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCapo = noCapo ? song.capo === 0 : true

    return matchesSearch && matchesCapo
  })

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🎸 My Guitar Library</h1>

      {/* SEARCH */}
      <input
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* NO CAPO BUTTON */}
      <button
        onClick={() => setNoCapo(!noCapo)}
        style={{
          ...styles.noCapoButton,
          background: noCapo ? "#1db954" : "#333",
        }}
      >
        🎹 No capo
      </button>

      {/* GRID */}
      <div style={styles.grid}>
       {filteredSongs.map((song, i) => (
  <div key={i} style={styles.card}>
    
    {/* HEADER */}
    <div
      onClick={() =>
        setOpenedSong(openedSong === i ? null : i)
      }
      style={styles.songHeader}
    >
      <h2 style={styles.songName}>
        🎸 {song.name}
      </h2>

      <span>
        {openedSong === i ? "▲" : "▼"}
      </span>
    </div>

    {/* EXPANDED */}
    {openedSong === i && (
      <>
        <p style={styles.text}>
          🔥 Difficulty: <b>{song.difficulty}/3</b>
        </p>

        <p style={styles.text}>
          🎸 Chords: {song.chords}
        </p>

        <p style={styles.text}>
          🎹 Capo: {song.capo}
        </p>

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 10,
          }}
        >
          <a
            href={song.link}
            target="_blank"
            rel="noreferrer"
          >
            <button style={styles.button}>
              Play ▶
            </button>
          </a>

          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.name)}`}
            target="_blank"
            rel="noreferrer"
          >
            <button style={styles.youtubeButton}>
              YouTube ▶
            </button>
          </a>
        </div>
      </>
    )}
  </div>
))}
      </div>
    </div>
  )
}

const styles = {
  songHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
},
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
    marginBottom: 10,
    background: "#1f1f1f",
    color: "white",
    fontSize: 16,
  },

  noCapoButton: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
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

  youtubeButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#ff0000",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
}

export default App