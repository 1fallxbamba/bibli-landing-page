import { useState } from 'react';
import {
  Navbar,
  Hero,
  ExpertSection,
  CategoriesSection,
  SurveySection,
  CreatorsCTA,
  FinalCTA,
  Footer,
  WaitlistModal,
} from './components';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app">
      <Navbar onOpenWaitlist={openModal} />
      <main>
        <Hero />
        <ExpertSection />
        <CategoriesSection />
        <SurveySection />
        <CreatorsCTA />
        <FinalCTA onOpenWaitlist={openModal} />
        <Footer />
      </main>
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
