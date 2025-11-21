import React, { useState } from 'react';
import Hero from '../components/Hero';
import WhoWeAre from '../components/WhoWeAre';
import AreasBento from '../components/AreasBento';
import SpecializedNiches from '../components/SpecializedNiches';
import SocialProof from '../components/SocialProof';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ContactModal from '../components/ContactModal';
import LaborCalculator from '../components/Calculator/Calculator';

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="app-container">
            <Navbar onOpenModal={() => setIsModalOpen(true)} />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            import ProcessTracker from '../components/ProcessTracker';

            // ... inside component
            <Hero onOpenModal={() => setIsModalOpen(true)} />
            <ProcessTracker />
            <WhoWeAre />
            <AreasBento />
            <SpecializedNiches />
            <LaborCalculator />
            <SocialProof />
            <Footer />
        </div>
    );
};

export default HomePage;
