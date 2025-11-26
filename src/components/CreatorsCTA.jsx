import { useState } from 'react';
import layingDownIllustration from '../assets/Illustrations/Open Doodles - Laying Down (1).svg';
import { addCreatorSignup } from '../lib/firebase';

export default function CreatorsCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    
    const result = await addCreatorSignup(email);
    
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
    <section className="creators-cta-section">
      <div className="creators-cta-container">
        <div className="creators-cta-content">
          <h2 className="creators-cta-title">
            Créateurs, partagez<br/>votre savoir avec Bibli.
          </h2>
          <p className="creators-cta-description">
            Nous collaborons avec des experts et recherchons de nouveaux créateurs 
            pour proposer leurs contenus en version audio. Si tu veux diffuser tes 
            cours et toucher une nouvelle audience, rejoins la liste des créateurs.
          </p>
          <form className="creator-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Votre adresse e-mail" 
              className={`creator-input ${error ? 'error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              className={`btn-creator ${submitted ? 'success' : ''}`}
              disabled={loading}
            >
              {loading ? '...' : submitted ? 'Envoyé !' : 'Devenir créateur'}
            </button>
          </form>
        </div>
        <div className="creators-cta-illustration">
          <img 
            src={layingDownIllustration} 
            alt="Person relaxing illustration" 
          />
        </div>
      </div>
    </section>
  );
}
