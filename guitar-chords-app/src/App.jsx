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
      name: "Podvod",
      difficulty: 1,
      chords: "Em G H7 C",
      capo: 0,
      link: "https://kytaristka.cz/zpevnik/nedvedi/podvod",
    },
    {
      name: "Být stále mlád",
      difficulty: 1,
      chords: "G D Em C Am",
      capo: 0,
      link: "https://pisnicky-akordy.cz/karel-gott/byt-stale-mlad?format=pdf",
    },
    {
      name: "Holubí dům",
      difficulty: 2,
      chords: "Em D C Hm",
      capo: 0,
      link: "https://akordy.kytary.cz/song/holubi-dum",
    },
    {
      name: "Viva la Vida",
      difficulty: 1,
      chords: "C Em G D",
      capo: 1,
      link: "https://www.songsterr.com/a/wsa/coldplay-viva-la-vida-chords-s10136",
    },
    {
      name: "Yellow",
      difficulty: 2,
      chords: "G D Cmaj7",
      capo: 4,
      link: "https://tabs.ultimate-guitar.com/tab/coldplay/yellow-chords-114080",
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
    {
      name: "Dont look back in anger",
      difficulty: 2,
      chords: "F Gm G",
      capo: 0,
      link: "https://tabs.ultimate-guitar.com/tab/oasis/dont-look-back-in-anger-chords-6097",
      isNew: true,
    },
    {
      name: "Kopce u pramenu reky tyne",
      difficulty: 2,
      chords: "B F C",
      capo: 0,
      link: "https://pisnicky-akordy.cz/asonance/kopce-u-pramenu-reky-tyne",
      isNew: true,
    },
    {
      name: "Dej mi víc své lásky",
      difficulty: 1,
      chords: "Am G C",
      capo: 0,
      link: "https://pisnicky-akordy.cz/olympic/dej-mi-vic-sve-lasky",
      isNew: true,
    },
    {
      name: "Anděl",
      difficulty: 1,
      chords: "Am C G7",
      capo: 0,
      link: "https://kytaristka.cz/zpevnik/karel-kryl/andel",
      isNew: true,
    },
    {
      name: "Kometa",
      difficulty: 2,
      chords: "Am Dm G7",
      capo: 0,
      link: "https://pisnicky-akordy.cz/jarek-nohavica/kometa",
      isNew: true,
    },
    {
      name: "Milenci v texaskach",
      difficulty: 2,
      chords: "F G Am",
      capo: 0,
      link: "https://pisnicky-akordy.cz/taborove-pisne/milenci-v-texaskach",
      isNew: true,
    },
    {
      name: "Řekni kde ty kytky jsou",
      difficulty: 2,
      chords: "A F#m D E",
      capo: 0,
      link: "https://kytaristka.cz/zpevnik/marie-rottrova/rekni-kde-ty-kytky-jsou",
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
      <h1 style={styles.title}>🎸 Akordiky</h1>

      <input
        placeholder="Search songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.topButtons}>
        <button
          onClick={() => setNoCapo(!noCapo)}
          style={{
            ...styles.filterButton,
            background: noCapo ? "#1db954" : "#333",
          }}
        >
          🎹 No capo
        </button>

        <button
          onClick={() => setShowNewOnly(!showNewOnly)}
          style={{
            ...styles.filterButton,
            background: showNewOnly ? "#ff9800" : "#333",
          }}
        >
          ✨ NEW
        </button>
      </div>

      <div style={styles.grid}>
        {filteredSongs.map((song, i) => (
          <div key={i} style={styles.card}>
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

                <div style={styles.buttons}>
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
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0f0f0f, #121212)",
    color: "white",
    padding: 15,
    fontFamily: "Arial",
  },

  title: {
    fontSize: 28,
    marginBottom: 15,
  },

  search: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "none",
    outline: "none",
    marginBottom: 10,
    background: "#1f1f1f",
    color: "white",
    fontSize: 15,
  },

  topButtons: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
  },

  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 10,
  },

  card: {
    background: "#1a1a1a",
    padding: 10,
    borderRadius: 12,
    border: "1px solid #2a2a2a",
  },

  songHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },

  songName: {
    margin: 0,
    fontSize: 16,
  },

  text: {
    margin: "4px 0",
    color: "#b3b3b3",
    fontSize: 14,
  },

  buttons: {
    display: "flex",
    gap: 8,
    marginTop: 10,
  },

  button: {
    padding: 8,
    borderRadius: 8,
    border: "none",
    background: "#1db954",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },

  youtubeButton: {
    padding: 8,
    borderRadius: 8,
    border: "none",
    background: "#ff0000",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
}

export default App