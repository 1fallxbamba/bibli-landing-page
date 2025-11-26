import { useState, useEffect } from 'react';
import { addSurveyResponse } from '../lib/firebase';

const STORAGE_KEY = 'bibli_survey_completed';

const surveyOptions = [
  { id: 'phone', label: 'Sur mon téléphone' },
  { id: 'computer', label: 'Sur mon ordinateur' },
  { id: 'reading', label: 'En lisant (PDF, documents…)' },
  { id: 'other', label: 'Autres....' },
];

export default function SurveySection() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user has already submitted on mount
  useEffect(() => {
    const savedResponse = localStorage.getItem(STORAGE_KEY);
    if (savedResponse) {
      const parsed = JSON.parse(savedResponse);
      setSelectedOption(parsed.answer);
      setHasSubmitted(true);
    }
  }, []);

  const handleOptionSelect = (optionId) => {
    // If already submitted, don't allow changes
    if (hasSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = async () => {
    if (!selectedOption || hasSubmitted || isSubmitting) return;

    setIsSubmitting(true);

    // Save to Firestore
    const result = await addSurveyResponse({
      question: 'how_do_you_learn',
      answer: selectedOption,
      answerLabel: surveyOptions.find(o => o.id === selectedOption)?.label,
    });

    if (result.success) {
      // Save to localStorage to prevent future submissions
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answer: selectedOption,
        submittedAt: new Date().toISOString(),
      }));
      setHasSubmitted(true);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="survey-section">
      <div className="background-noise"></div>
      <h2 className="survey-header">
        Aide-nous à créer la<br/>version idéale.
      </h2>
      
      <div className="survey-card">
        <div className="survey-question">
          <h3>Comment apprends-tu<br/>le plus souvent ?</h3>
          <p>Ça nous aide à comprendre sur quel<br/>support tu passes le plus de temps.</p>
          {hasSubmitted && (
            <p className="survey-thanks">Merci pour ta réponse ! 🎉</p>
          )}
        </div>
        <div className="survey-options-wrapper">
          <div className="survey-options">
            {surveyOptions.map((option) => (
              <label 
                key={option.id} 
                className={`survey-option ${selectedOption === option.id ? 'selected' : ''} ${hasSubmitted ? 'disabled' : ''}`}
              >
                <input 
                  type="radio" 
                  name="learning" 
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionSelect(option.id)}
                  disabled={hasSubmitted}
                />
                <span>{option.label}</span>
                {selectedOption === option.id && hasSubmitted && (
                  <svg className="check-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </label>
            ))}
          </div>
          
          {!hasSubmitted && (
            <button 
              className={`btn-survey-submit ${!selectedOption ? 'disabled' : ''}`}
              onClick={handleSubmit}
              disabled={!selectedOption || isSubmitting}
            >
              {isSubmitting ? 'Envoi...' : 'Valider ma réponse'}
            </button>
          )}
        </div>
      </div>
      
      <div className="survey-dots">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
