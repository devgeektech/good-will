export default function CreditsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#050809", color: "#f4ecdf", padding: "64px 24px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <p style={{ color: "#e7bb70", letterSpacing: ".14em", fontSize: 12 }}>MEDIA PROVENANCE</p>
        <h1 style={{ fontSize: 52, marginBottom: 16 }}>Goodwill India media</h1>
        <p style={{ color: "#a99f8c", lineHeight: 1.8 }}>Most programme imagery and video in this build was supplied directly through the Goodwill India project assets. The journey uses public destination imagery for Mumbai, Agra and Brahma Kumaris Jagdamba Bhawan with local fallbacks. These can be replaced with client-approved local files before launch if a fully self-contained deployment is required.</p>
        <a href="/" style={{ display: "inline-block", marginTop: 28, color: "#e7bb70" }}>← Back to the experience</a>
      </div>
    </main>
  );
}
