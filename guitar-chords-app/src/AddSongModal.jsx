import { useState } from "react"

const EMPTY_SONG = {
  name: "",
  difficulty: "2",
  chords: "",
  capo: "0",
  link: "",
  tag: "ceske",
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  borderRadius: 9,
  border: "1px solid #333",
  background: "#111",
  color: "white",
  fontSize: 13,
  outline: "none",
}

/**
 * Form for adding a song to the local song list.
 * The parent owns the SONGS state and persists the submitted song.
 */
export default function AddSongModal({ onClose, onAdd, accent = "#1db954" }) {
  const [form, setForm] = useState(EMPTY_SONG)
  const [error, setError] = useState("")

  const update = (key, value) => {
    setForm(previous => ({ ...previous, [key]: value }))
    setError("")
  }

  const submit = event => {
    event.preventDefault()

    const name = form.name.trim()
    const chords = form.chords.trim().replace(/\s+/g, " ")
    const link = form.link.trim()
    const capo = Number(form.capo)
    const difficulty = Number(form.difficulty)

    if (!name || !chords || !link) {
      setError("Vyplň název, akordy i odkaz na akordy.")
      return
    }
    if (!/^https?:\/\//i.test(link)) {
      setError("Odkaz musí začínat http:// nebo https://.")
      return
    }
    if (!Number.isInteger(capo) || capo < 0 || capo > 12) {
      setError("Kapo musí být celé číslo od 0 do 12.")
      return
    }

    onAdd({
      name,
      difficulty: Math.min(3, Math.max(1, difficulty)),
      chords,
      capo,
      link,
      tag: form.tag,
      isNew: true,
      userAdded: true,
    })
    onClose()
  }

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1001,
      background: "rgba(0,0,0,.78)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }}>
      <form onSubmit={submit} onClick={event => event.stopPropagation()} style={{
        width: "min(440px, 100%)", maxHeight: "90vh", overflowY: "auto",
        background: "#1a1a1a", border: "1px solid #333", borderRadius: 16,
        padding: 22, boxShadow: "0 24px 64px rgba(0,0,0,.7)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ margin: 0, fontSize: 17 }}>➕ Přidat píseň</h2>
          <button type="button" onClick={onClose} style={{ background: "none", border: 0, color: "#777", cursor: "pointer", fontSize: 22 }}>×</button>
        </div>

        <label style={{ display: "block", marginBottom: 12, color: "#aaa", fontSize: 12 }}>
          Název písně *
          <input autoFocus value={form.name} onChange={event => update("name", event.target.value)} placeholder="Např. Píseň" style={{ ...inputStyle, marginTop: 5 }} />
        </label>

        <label style={{ display: "block", marginBottom: 12, color: "#aaa", fontSize: 12 }}>
          Akordy * <span style={{ color: "#555" }}>(oddělené mezerou)</span>
          <input value={form.chords} onChange={event => update("chords", event.target.value)} placeholder="Am F C G" style={{ ...inputStyle, marginTop: 5, fontFamily: "monospace" }} />
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <label style={{ color: "#aaa", fontSize: 12 }}>
            Obtížnost *
            <select value={form.difficulty} onChange={event => update("difficulty", event.target.value)} style={{ ...inputStyle, marginTop: 5 }}>
              <option value="1">1 – začátečník</option>
              <option value="2">2 – střední</option>
              <option value="3">3 – pokročilý</option>
            </select>
          </label>
          <label style={{ color: "#aaa", fontSize: 12 }}>
            Kapo
            <input type="number" min="0" max="12" value={form.capo} onChange={event => update("capo", event.target.value)} style={{ ...inputStyle, marginTop: 5 }} />
          </label>
        </div>

        <label style={{ display: "block", marginBottom: 12, color: "#aaa", fontSize: 12 }}>
          Odkaz na akordy *
          <input type="url" value={form.link} onChange={event => update("link", event.target.value)} placeholder="https://..." style={{ ...inputStyle, marginTop: 5 }} />
        </label>

        <label style={{ display: "block", marginBottom: 16, color: "#aaa", fontSize: 12 }}>
          Jazyk
          <select value={form.tag} onChange={event => update("tag", event.target.value)} style={{ ...inputStyle, marginTop: 5 }}>
            <option value="ceske">🇨🇿 České</option>
            <option value="zahranicni">🌍 Zahraniční</option>
          </select>
        </label>

        {error && <p style={{ color: "#f87171", fontSize: 12, margin: "0 0 12px" }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: 12, border: 0, borderRadius: 10, background: accent, color: "#000", fontWeight: 800, cursor: "pointer" }}>
          Přidat píseň
        </button>
      </form>
    </div>
  )
}
