export default function FinalCTA({ onOpenWaitlist }) {
  return (
    <section className="final-cta">
      <div className="final-cta-card">
        <div className="final-cta-background"></div>
        <div className="background-noise"></div>
        <div className="final-cta-content">
          <h2>Accède à bibli avant tout le monde.</h2>
          <button className="btn-final-cta" onClick={onOpenWaitlist}>
            <span>Rejoindre la liste</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
