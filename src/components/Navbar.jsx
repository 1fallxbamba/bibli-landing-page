import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function Navbar({ onOpenWaitlist }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);
      setHidden(currentScrollY > lastScrollY && currentScrollY > 200);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
      <div className="navbar-content">
        <div className="logo-group">
          <img src={logo} alt="Bibli" className="logo-image" />
        </div>
        <div className="navbar-actions">
          <button className="btn-lang">EN / FR</button>
          <button className="btn-primary-nav" onClick={onOpenWaitlist}>
            Rejoindre la liste d'attente
          </button>
        </div>
      </div>
    </nav>
  );
}
