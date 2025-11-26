export default function Footer() {
  return (
    <>
      <section className="giant-logo-section">
        <h2 className="giant-logo">Bibli</h2>
      </section>
      
      <footer className="footer">
        <div className="background-noise"></div>
        <p className="made-in">Made in Sénégal 🇸🇳</p>
        <div className="footer-divider"></div>
        <div className="footer-content">
          <span className="footer-logo">Bibli</span>
          <p className="copyright">Copyright 2025 @ All Rights Reserved</p>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="linkedin-link"
            aria-label="LinkedIn"
          >
            <svg width="39" height="40" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 3.5C6.01 3.5 4 5.51 4 8C4 10.49 6.01 12.5 8.5 12.5C10.99 12.5 13 10.49 13 8C13 5.51 10.99 3.5 8.5 3.5ZM4.5 15H12.5V35H4.5V15ZM21 15H15V35H21V24.5C21 19 28 18.5 28 24.5V35H34V22C34 13 23.5 13.31 21 17.81V15Z" fill="black"/>
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}

