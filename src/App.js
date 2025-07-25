import React, { useState, useEffect } from "react";
import "./App.css";
import Join from "./join/join";

function App() {

  const [showJoinForm, setShowJoinForm] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showJoinForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showJoinForm]);

  // Scroll observer for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'impact', 'about'];
      const scrollPosition = window.scrollY + 150; // Increased offset
      
      // Find which section we're closest to
      let closestSection = 'home';
      let minDistance = Infinity;
      
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          const distance = Math.abs(scrollPosition - sectionTop);
          
          // If we're within the section or it's the closest one
          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            closestSection = sectionId;
            minDistance = 0;
          } else if (distance < minDistance) {
            closestSection = sectionId;
            minDistance = distance;
          }
        }
      });
      
      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header activeSection={activeSection} />
      <Hero onJoinClick={() => setShowJoinForm(true)} />
      <Features />
      <Impact />
      <About />
      <Footer />

      {showJoinForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowJoinForm(false)}>×</button>
            <Join />
          </div>
        </div>
      )}

    </div>
  );
}

const Header = ({ activeSection }) => (
  <header className="header">
    <div className="logo">plannix</div>
    <nav>
      <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
      <a href="#features" className={activeSection === 'features' ? 'active' : ''}>Features</a>
      <a href="#impact" className={activeSection === 'impact' ? 'active' : ''}>Impact</a>
      <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
      <a href="#login" className="login-link">Log In</a>
    </nav>
  </header>
);

const Hero = ({ onJoinClick }) => (
  <section className="hero" id="home">
    <h1>We plan. You relax.</h1>
    <p>
      Plannix is your intelligent event co-pilot. From ideation to execution,
      we handle invites, venues, vendors, and everything in between.
    </p>
    <button className="cta-button" onClick={onJoinClick}>Join</button>
  </section>
);

const features = [
  {
    title: "AI Event Planner",
    description: "Create tailored event plans with zero stress."
  },
  {
    title: "Smart Invitations",
    description: "Generate and send custom invites with ease."
  },
  {
    title: "Venue & Vendor Matcher",
    description: "AI-powered recommendations with real-time pricing."
  },
  {
    title: "Budget Assistant",
    description: "Keep spending smart and under control."
  },
  {
    title: "Live Dashboard",
    description: "Track responses, logistics, and timelines easily."
  },
  {
    title: "Calendar Sync",
    description: "Seamless integration with Google, Outlook and more."
  }
];

const Features = () => (
  <section className="features" id="features">
    <h2>Features</h2>
    <div className="feature-grid">
      {features.map((feature, idx) => (
        <div key={idx} className="feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

const Impact = () => (
  <section className="problem-solution" id="impact">
    <div className="card">
      <h3>The Problem</h3>
      <ul>
        <li>Busy teams lack time to plan impactful events.</li>
        <li>Manual coordination leads to budget overruns.</li>
        <li>Generic tools fail corporate expectations.</li>
      </ul>
    </div>
    <div className="card">
      <h3>Why Plannix</h3>
      <ul>
        <li>Smart, fast, stress-free corporate planning</li>
        <li>AI-powered suggestions & real-time tracking</li>
        <li>No spreadsheets. Just seamless execution.</li>
      </ul>
    </div>
  </section>
);

const About = () => (
  <section className="about" id="about">
    <h2>About Us</h2>
    <p>Dikshitha Karanam</p>
    <p>Preetham Reddy</p>
    <p>Jahnavi Vemuri</p>
    <p>We are Masters in Computer Science students at Indiana University Bloomington.</p>
  </section>
);

const Footer = () => (
  <footer>
    <div className="footer-links">
      <a href="#home">Privacy Policy</a>
      <a href="#home">Terms and Conditions</a>
      <a href="#home">Support</a>
    </div>
    <p>&copy; 2025 plannix. All rights reserved.</p>
  </footer>
);

export default App;