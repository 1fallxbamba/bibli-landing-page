import { useEffect, useRef, useState } from 'react';

function AudioCard({ title, duration, isDark, progress }) {
  return (
    <div className={`audio-card ${isDark ? 'card-dark' : 'card-light'}`}>
      <div className="card-inner">
        <div className={`card-thumbnail ${isDark ? 'thumbnail-orange' : ''}`}>
          <svg className="play-icon" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M8 5L22 14.5L8 24V5Z" 
              stroke={isDark ? "#F3E5DC" : "#FF8D28"} 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <div className="card-meta">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11.5" cy="11.5" r="8" stroke={isDark ? "white" : "#7A7A7A"} strokeWidth="2"/>
              <path d="M11.5 7V12L15 15" stroke={isDark ? "white" : "#7A7A7A"} strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{duration}</span>
          </div>
        </div>
      </div>
      {progress && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}

export default function ExpertSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="expert-section" ref={sectionRef}>
      <div className="background-noise"></div>
      <div className={`expert-header ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="expert-title">
          Des contenus experts<br/>sélectionnés pour toi.
        </h2>
        <p className="expert-description">
          Bibli est une application d'apprentissage audio qui te donne accès à une 
          sélection de cours et de contenus créés par des experts et des créateurs 
          reconnus. Chaque contenu est transformé en un audio clair, agréable à 
          écouter et facile à retenir, pour te permettre d'apprendre plus vite, 
          où que tu sois. Notre mission : rendre le savoir accessible, moderne et mobile.
        </p>
      </div>
      
      <div className="audio-cards-container">
        <div className="floating-tag tag-ia">#ia</div>
        <div className="floating-tag tag-expert">#expert</div>
        <div className="headphones-icon">
          <svg width="89" height="93" viewBox="0 0 89 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.5 8C25.45 8 10 23.45 10 42.5V75C10 79.97 14.03 84 19 84H28C32.97 84 37 79.97 37 75V57C37 52.03 32.97 48 28 48H19V42.5C19 28.42 30.42 17 44.5 17C58.58 17 70 28.42 70 42.5V48H61C56.03 48 52 52.03 52 57V75C52 79.97 56.03 84 61 84H70C74.97 84 79 79.97 79 75V42.5C79 23.45 63.55 8 44.5 8Z" fill="#2D2D2D"/>
          </svg>
        </div>
        
        <AudioCard 
          title="Les clés du développement personnel" 
          duration="24 min" 
          isDark={false}
          progress={50}
        />
        
        <AudioCard 
          title="Le secret de l'autonomie financière" 
          duration="32 min" 
          isDark={true}
        />
      </div>
    </section>
  );
}

