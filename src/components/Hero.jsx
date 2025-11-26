import { useState } from 'react';
import dancingIllustration from '../assets/Illustrations/Open Doodles - Dancing (2).svg';
import { addToWaitlist } from '../lib/firebase';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    setLoading(true);
    
    const result = await addToWaitlist(email);
    
    setLoading(false);
    
    if (result.success) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section className="hero">
      <div className="hero-background-noise"></div>
      <div className="hero-container">
        <div className="hero-card">
          <div className="hero-content">
            <div className="hero-headlines">
              <h1 className="headline-main">Apprends plus vite.</h1>
              <div className="headline-pill">
                <span>Partout.</span>
              </div>
            </div>
            <p className="hero-description">
              Une app qui transforme tes cours et tes contenus favoris en audio clair, 
              résumé et facile à retenir. Rejoins la liste d'attente et accède à 
              l'application en priorité.
            </p>
            <form className="email-form" onSubmit={handleSubmit}>
              <div className="email-input-wrapper">
                <input 
                  type="email" 
                  placeholder="Votre adresse e-mail" 
                  className={`email-input ${error ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className={`btn-submit ${submitted ? 'success' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span>...</span>
                  ) : submitted ? (
                    <>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Merci !</span>
                    </>
                  ) : (
                    <>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 11L18 11M18 11L11 4M18 11L11 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Rejoindre</span>
                    </>
                  )}
                </button>
              </div>
          
            </form>
          </div>
          <div className="hero-illustration">
            <img 
              src={dancingIllustration} 
              alt="Illustration of a dancing person" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
