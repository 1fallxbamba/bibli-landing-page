import { useState, useEffect } from 'react';
import { addToWaitlist } from '../lib/firebase';

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Merci !</h2>
            <p>Tu es maintenant sur la liste d'attente. On te contacte très bientôt !</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Rejoins la liste d'attente</h2>
              <p>Sois parmi les premiers à découvrir Bibli et accède à l'application en priorité.</p>
            </div>
            
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Ton adresse e-mail"
                className={`modal-input ${error ? 'error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <button 
                type="submit" 
                className="modal-submit"
                disabled={loading}
              >
                {loading ? 'Envoi...' : 'Rejoindre'}
              </button>
            </form>
            
          </>
        )}
      </div>
    </div>
  );
}

