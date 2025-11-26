import { useState } from 'react';
import creatorsImage from '../assets/creators.png';

const categories = [
  { id: 'entrepreneuriat', label: 'Entrepreunariat' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'finance', label: 'Finance' },
  { id: 'science', label: 'Science' },
];

export default function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState('lifestyle');

  return (
    <section className="categories-section">
      <div className="categories-card">
        <div className="categories-background"></div>
        <div className="background-noise"></div>
        <div className="categories-content">
          <div className="categories-text">
            <h2 className="categories-title">
              Parce qu'on n'a pas<br/>toujours le temps<br/>de lire.
            </h2>
            <p className="categories-description">
              Les PDF sont longs, les cours sont lourds, et nos journées sont 
              chargées. Bibli veut rendre l'apprentissage plus simple, plus mobile 
              et plus agréable. L'audio permet d'apprendre partout, à ton rythme.
            </p>
            <div className="category-pills">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`pill ${activeCategory === category.id ? 'pill-filled' : 'pill-outline'}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="creators-section">
            <h3 className="creators-label">
              Nos créateurs<br/>et experts
            </h3>
            <div className="creators-badge">+10 professionnels</div>
            <div className="creators-avatars">
              <img src={creatorsImage} alt="Our creators and experts" className="creators-group-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
