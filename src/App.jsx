import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import './App.css';
import Profile from "./assets/steve.jpg";
import Nosa from "./assets/NOSA.png";
import Payslip from "./assets/PAYSLIP.png";
import Capstone from "./assets/capstone.png";
import Dtr from "./assets/DTR.png";
import Aicc from "./assets/AICC.png";
import Downloader from "./assets/AppDownloader.png";
import Baymax from "./assets/baymax.png";
import Eloan from "./assets/Eloan.png";
import Agent from "./assets/Agent.png";
import CiApp from "./assets/CI_App.png";
import QR from "./assets/QR.png";
import Receipt from "./assets/Receipt.png";
import Asset from "./assets/Asset.png";
import HRBLIZ from "./assets/hrBliz.png";

function App() {
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [emailStatus, setEmailStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const achievementsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Cursor tracking - Simple
  useEffect(() => {
    const trailPositions = [];
    const maxTrail = 8;
    
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      trailPositions.push({ x: e.clientX, y: e.clientY });
      if (trailPositions.length > maxTrail) {
        trailPositions.shift();
      }
      setCursorTrail([...trailPositions]);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Loading animation
  useEffect(() => {
    let startTime = Date.now();
    const duration = 3000;
    
    const animateLoading = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(animateLoading);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    
    animateLoading();
  }, []);

  const handleChange = (e) => {
    setEmailData({
      ...emailData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailData.name || !emailData.email || !emailData.message) {
      setEmailStatus('⚠️ All fields required.');
      return;
    }

    setEmailStatus('📡 Sending...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEmailStatus('✅ Message sent successfully!');
      setEmailData({ name: '', email: '', message: '' });
    } catch (error) {
      setEmailStatus('❌ Failed. Please try again.');
    }
  };

  // Download Resume Handler
  const handleDownloadResume = () => {
    const resumeContent = `
      STEVE CALVIN BARRERA
      Software Developer
      
      Email: barrerasteve032@gmail.com
      Phone: 09352344313
      Location: Quezon City
      
      SKILLS:
      - Java & Android Development
      - Mobile Application Development
      - Java Web Development
      - Database Development
      - Software Troubleshooting
      
      ACHIEVEMENTS:
      - Cum Laude (2024)
      - University Valedictorian (2024)
      - TESDA Java Programming NC III Passer (2025)
      - Hackathon Champion (2023)
      - Leadership Award (2023)
      
      EXPERIENCE:
      - Software Developer
      - Android Developer
      - Web Developer
    `;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Steve_Calvin_Barrera_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'achievements', ref: achievementsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef }
      ];

      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section.ref.current) {
          const element = section.ref.current;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const floatAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const glitchAnimation = {
    hidden: { opacity: 0, skewX: -5 },
    visible: { 
      opacity: 1, 
      skewX: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Logo Component
  const Logo = ({ size = 40 }) => (
    <svg 
      viewBox="0 0 200 200" 
      width={size} 
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke="#ff0000" strokeWidth="3"/>
      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,0,0,0.1)" strokeWidth="8"/>
      <path d="M 50 60 L 35 100 L 50 140" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 150 60 L 165 100 L 150 140" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 85 45 L 75 95 L 95 95 L 85 155" stroke="#ff0000" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="100" y="115" textAnchor="middle" fontSize="60" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif">S</text>
      <circle cx="100" cy="25" r="3" fill="#ff0000" />
      <circle cx="100" cy="175" r="3" fill="#ff0000" />
    </svg>
  );

  // Loading Screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-bg-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="loading-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                opacity: 0.1 + Math.random() * 0.3
              }}
            />
          ))}
        </div>
        <div className="loading-container">
          <div className="loading-circle">
            <svg className="loading-svg" viewBox="0 0 200 200">
              <circle
                className="loading-ring-bg"
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="4"
              />
              <circle
                className="loading-ring"
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#ff0000"
                strokeWidth="4"
                strokeDasharray="534"
                strokeDashoffset={534 - (progress / 100) * 534}
                strokeLinecap="round"
              />
            </svg>
            <div className="loading-center">
              <span className="loading-name">STEVE</span>
              <span className="loading-title">PORTFOLIO</span>
            </div>
          </div>
          <div className="loading-progress">
            <div 
              className="loading-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-percentage">
            {Math.round(progress)}%
          </div>
          <div className="loading-status">
            {progress < 30 && 'INITIALIZING SYSTEM...'}
            {progress >= 30 && progress < 60 && 'LOADING MODULES...'}
            {progress >= 60 && progress < 90 && 'COMPILING RESOURCES...'}
            {progress >= 90 && progress < 100 && 'FINALIZING...'}
            {progress >= 100 && '🚀 READY'}
          </div>
          <div className="loading-dots">
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="loading-dot"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Custom Cursor - Simple Light */}
      <div className="cursor-container">
        {cursorTrail.map((pos, index) => (
          <motion.div
            key={index}
            className="cursor-trail"
            style={{
              left: pos.x,
              top: pos.y,
              opacity: 0.2 + (index / cursorTrail.length) * 0.3,
              transform: `translate(-50%, -50%) scale(${0.6 + (index / cursorTrail.length) * 0.4})`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 0.6 + (index / cursorTrail.length) * 0.4,
              opacity: 0.2 + (index / cursorTrail.length) * 0.3
            }}
            transition={{ duration: 0.1 }}
          />
        ))}
        <motion.div 
          className={`custom-cursor ${isHovering ? 'hover' : ''}`}
          animate={{
            x: cursorPosition.x,
            y: cursorPosition.y,
          }}
          transition={{ 
            type: "spring", 
            damping: 30, 
            stiffness: 400,
            mass: 0.3
          }}
        />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ===== NAVIGATION ===== */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="nav-container">
          <div className="logo">
            <Logo size={40} />
            <span className="logo-text">Steve</span>
          </div>
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li>
              <button 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={() => scrollToSection(homeRef)}
              >
                <span className="nav-number">00</span> Home
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={() => scrollToSection(aboutRef)}
              >
                <span className="nav-number">01</span> About
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={() => scrollToSection(skillsRef)}
              >
                <span className="nav-number">02</span> Skills
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'achievements' ? 'active' : ''}
                onClick={() => scrollToSection(achievementsRef)}
              >
                <span className="nav-number">03</span> Achievements
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={() => scrollToSection(projectsRef)}
              >
                <span className="nav-number">04</span> Projects
              </button>
            </li>
            <li>
              <button 
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={() => scrollToSection(contactRef)}
              >
                <span className="nav-number">05</span> Contact
              </button>
            </li>
          </ul>
        </div>
      </motion.nav>

      {/* ===== HOME SECTION ===== */}
      <motion.section 
        ref={homeRef} 
        id="home" 
        className="home-section"
        style={{ scale, opacity }}
      >
        <div className="section-container">
          <motion.div 
            className="home-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="home-text" variants={fadeInLeft}>
              <motion.div 
                className="home-badge"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <span className="badge-dot"></span>
                <span className="badge-text">Available for opportunities</span>
              </motion.div>
              
              <motion.h1 variants={glitchAnimation}>
                Hi, I'm <span className="highlight">Steve Calvin</span>
              </motion.h1>
              
              <motion.h2 variants={fadeInUp}>
                <span className="typing-cursor">|</span> Software Programmer &amp; Aspiring Software Engineer
              </motion.h2>
              
              <motion.p variants={fadeInUp}>
                IT graduate and software developer with experience in programming, database management, 
                and computer troubleshooting. Proficient in Python, Java, C, SQL, and PHP, with additional
                skills in 3D modeling and Microsoft Office. Strong problem-solving abilities, adaptable, and 
                committed to continuous learning and delivering effective technical solutions.
              </motion.p>
              
              <motion.div 
                className="home-actions"
                variants={fadeInUp}
              >
                <motion.button 
                  className="btn-primary"
                  onClick={() => scrollToSection(projectsRef)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                  <i className="fas fa-arrow-right"></i>
                </motion.button>
                <motion.button 
                  className="btn-secondary"
                  onClick={() => scrollToSection(contactRef)}
                  whileHover={{ scale: 1.05, borderColor: '#ff0000', color: '#ff0000' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </motion.div>

              <motion.div 
                className="home-stats"
                variants={fadeInUp}
              >
                {[
                  { number: '1+', label: 'Years Experience' },
                  { number: '14', label: 'Projects' },
                  { number: '1', label: 'Clients' },
                  { number: '12', label: 'Awards' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="stat-item"
                    whileHover={{ y: -5 }}
                  >
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="home-visual"
              variants={fadeInRight}
            >
              <div className="profile-container">
                <motion.div 
                  className="profile-image-wrapper"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  animate={floatAnimation}
                >
                  <img 
                    src={Profile}
                    alt="Profile"
                    className="profile-image"
                  />
                  <div className="profile-ring"></div>
                  <div className="profile-glow"></div>
                </motion.div>
                <div className="floating-icons">
                  {[
                    { icon: 'fab fa-android', delay: 0 },
                    { icon: 'fab fa-java', delay: 0.5 },
                    { icon: 'fas fa-database', delay: 1 },
                    { icon: 'fas fa-leaf', delay: 1.5 }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="float-icon"
                      animate={{ y: [0, -20, 0] }}
                      transition={{ 
                        duration: 3 + index * 0.5, 
                        repeat: Infinity,
                        delay: item.delay
                      }}
                      whileHover={{ scale: 1.2, color: '#ff0000' }}
                    >
                      <i className={item.icon}></i>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== ABOUT SECTION ===== */}
      <section ref={aboutRef} id="about" className="about-section">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <span className="section-number">01</span>
              <h2>About Me</h2>
              <div className="section-line">
                <motion.div 
                  className="section-line-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>

            <motion.p className="section-subtitle" variants={fadeInUp}>
              Passionate developer trying to reach his dreams
            </motion.p>

            <motion.div className="about-grid" variants={staggerContainer}>
              <motion.div className="about-text" variants={fadeInLeft}>
                <p>
                  I am a Software Developer with experience in developing mobile applications for the finance industry
                  using Android Studio and Java also Kotlin. I also have experience developing web-based systems using Hibernate, 
                  Struts, and Apache Tomcat. I enjoy solving technical challenges, learning new technologies, and creating 
                  reliable, user-friendly solutions that improve business processes and productivity.
                </p>
                <p>
                  I specialize in building Android applications and Java-based web systems, with experience 
                  in Android Studio, Hibernate, Struts, Apache Tomcat, MS SQL Server, and MySQL. 
                  I focus on turning business requirements into reliable, efficient, and user-friendly solutions while
                  continuously exploring new technologies and improving my development skills.
                </p>
                <div className="about-highlights">
                  {[
                    { icon: 'fa-graduation-cap', text: "Bachelor's in Information Technology" },
                    { icon: 'fa-certificate', text: 'Cum-Laude' },
                    { icon: 'fa-users', text: 'Software Developer' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="highlight-item"
                      whileHover={{ x: 10 }}
                    >
                      <i className={`fas ${item.icon}`}></i>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button 
                  className="btn-download-about"
                  onClick={handleDownloadResume}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-download"></i> 
                  Download Resume
                </motion.button>
              </motion.div>

              <motion.div className="about-visual" variants={fadeInRight}>
                <div className="code-showcase">
                  <div className="code-header">
                    <span className="code-dot red"></span>
                    <span className="code-dot yellow"></span>
                    <span className="code-dot green"></span>
                    <span className="code-title">developer.js</span>
                  </div>
                  <pre className="code-content">
{`const developer = {
  name: "Steve Calvin Barrera",
  title: "Software Developer",
  location: "Remote",
  skills: {
    mobile: ["Android Studio", "Java", "Kotlin"],
    web: ["Java", "Hibernate", "Struts", "Tomcat"],
    databases: ["MS SQL Server", "MySQL", "SQLite", "Room"],
    other: ["Python", "PHP", "JavaScript"]
  },
  focus: "Building reliable and user-friendly software solutions"
};`}
                  </pre>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SKILLS SECTION ===== */}
      <section ref={skillsRef} id="skills" className="skills-section">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <span className="section-number">02</span>
              <h2>Skills &amp; Expertise</h2>
              <div className="section-line">
                <motion.div 
                  className="section-line-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>

            <motion.p className="section-subtitle" variants={fadeInUp}>
              Technologies and tools I use
            </motion.p>

            <motion.div className="skills-grid" variants={staggerContainer}>
              {[
                {
                  title: 'Mobile Development',
                  skills: ['Android Studio', 'Java', 'Kotlin', 'XML', 'CameraX', 'ML Kit', 'SQLite', 'Room Database']
                },
                {
                  title: 'Web Development',
                  skills: ['Java', 'Hibernate', 'Struts', 'Apache Tomcat', 'JavaScript', 'React', 'PHP', 'HTML / CSS']
                },
                {
                  title: 'Database & Tools',
                  skills: ['MS SQL Server', 'MySQL', 'SQLite', 'Git / GitHub', 'Room', 'JDBC', 'VPN', 'Microsoft Office']
                }
              ].map((category, catIndex) => (
                <motion.div 
                  key={catIndex}
                  className="skills-category"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                >
                  <h3>{category.title}</h3>
                  <div className="skills-list">
                    {category.skills.map((skill, index) => (
                      <motion.span 
                        key={skill}
                        className="skill-item"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 + catIndex * 0.1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: '#ff0000',
                          color: '#ffffff'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="skill-bars" variants={fadeInUp}>
              <h3>Technical Expertise</h3>
              <div className="bars-container">
                {[
                  { name: 'Java & Android Development', level: 90 },
                  { name: 'Mobile Application Development', level: 80 },
                  { name: 'Java Web Development', level: 70 },
                  { name: 'Database Development', level: 80 },
                  { name: 'Software Troubleshooting', level: 70 }
                ].map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    className="bar-item"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bar-header">
                      <span className="bar-name">{skill.name}</span>
                      <span className="bar-percentage">{skill.level}%</span>
                    </div>
                    <div className="bar-track">
                      <motion.div 
                        className="bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS SECTION ===== */}
      <section ref={achievementsRef} id="achievements" className="achievements-section">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <span className="section-number">03</span>
              <h2>Achievements</h2>
              <div className="section-line">
                <motion.div 
                  className="section-line-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>

            <motion.p className="section-subtitle" variants={fadeInUp}>
              Awards, certifications, and milestones that define my career
            </motion.p>

            <motion.div className="achievements-grid" variants={staggerContainer}>
              {[
                {
                  icon: 'fa-trophy',
                  title: 'Cum Laude',
                  desc: 'Graduated with honors in recognition of outstanding academic performance.',
                  year: '2024',
                  org: 'Romblon State University'
                },
                {
                  icon: 'fa-rocket',
                  title: 'University Valedictorian',
                  desc: 'Recognized as Valedictorian for achieving an exceptional General Weighted Average (GWA) of 1.17.',
                  year: '2024',
                  org: 'Romblon State University'
                },
                {
                  icon: 'fa-certificate',
                  title: 'TESDA Java Programming NC III Passer',
                  desc: 'Successfully passed the TESDA Java Programming NC III certification.',
                  year: '2025',
                  org: 'TESDA'
                },
                {
                  icon: 'fa-medal',
                  title: 'Hackathon Champion',
                  desc: 'Won First Place in the Likhamon Hackathon MIMAROPA.',
                  year: '2023',
                  org: 'Research, Extension, Development and Innovation'
                },
                {
                  icon: 'fa-star',
                  title: 'Leadership Award',
                  desc: 'Recognized for demonstrating leadership and initiative as a student organization leader.',
                  year: '2023',
                  org: 'Romblon State University'
                },
                {
                  icon: 'fa-graduation-cap',
                  title: 'Certificate of Commendation',
                  desc: 'Received commendation for developing an HR-related system during internship.',
                  year: '2024',
                  org: 'Department of Migrant Workers'
                },
                {
                  icon: 'fa-rocket',
                  title: 'Outstanding Student Trainee',
                  desc: 'Recognized for outstanding performance during the on-the-job training program.',
                  year: '2024',
                  org: 'Department of Migrant Workers'
                }
              ].map((achievement, index) => (
                <motion.div 
                  key={index}
                  className="achievement-card"
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10, 
                    borderColor: '#ff0000',
                    boxShadow: '0 20px 40px rgba(255,0,0,0.1)'
                  }}
                >
                  <div className="achievement-icon">
                    <i className={`fas ${achievement.icon}`}></i>
                  </div>
                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <p>{achievement.desc}</p>
                    <div className="achievement-meta">
                      <span className="achievement-year">{achievement.year}</span>
                      <span className="achievement-org">{achievement.org}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="achievement-stats" variants={fadeInScale}>
              {[
                { number: '12', label: 'Awards Won' },
                { number: '8', label: 'Certifications' },
                { number: '4', label: 'Open Source Contributions' },
                { number: '1', label: 'GitHub Stars' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="achieve-stat"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="achieve-number"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="achieve-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section ref={projectsRef} id="projects" className="projects-section">
        <div className="section-container" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', display: 'block', visibility: 'visible', opacity: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <span className="section-number">04</span>
              <h2>Projects</h2>
              <div className="section-line">
                <motion.div 
                  className="section-line-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>

            <motion.p className="section-subtitle" variants={fadeInUp}>
              A selection of my recent work and achievements
            </motion.p>

            {/* Sub-section 1: Web Systems & Software */}
            <motion.div variants={fadeInUp} style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#fff', borderLeft: '4px solid #ff0000', paddingLeft: '12px' }}>
                Web Systems &amp; Software Projects
              </h3>
            </motion.div>

            <motion.div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', width: '100%' }} variants={staggerContainer}>
              {[
                {
                  category: 'Client Project',
                  title: 'Department of Migrant Workers Notice Of Salary Adjustment (NOSA) System',
                  desc: 'Automated administrative platform designed to streamline salary revision workflows, track employee adjustments, and manage institutional compensation records.',
                  icon: 'fa-receipt',
                  image: Nosa,
                  achievements: ['🏆 Adopted by DMW HR Personnel', '⭐ Key OJT Project', '💳 Consistent Annual Deployment'],
                  tech: ['VB', 'Macros', 'MS-Access']
                },
                {
                  category: 'OJT Project',
                  title: 'Department of Migrant Workers DTR Generator System',
                  desc: 'Automated attendance tracking and daily time record generation platform custom-built for the Department of Migrant Workers to streamline employee hour reporting and simplify administrative workflows.',
                  icon: 'fa-clock',
                  image: Dtr,
                  achievements: ['🏆 Adopted by DMW HR Personnel', '⭐ Key OJT Government Project', '💳 Consistent Annual Deployment'],
                  tech: ['VB', 'Macros', 'MS-Access']
                },
                {
                  category: 'OJT Project',
                  title: 'Department of Migrant Workers Payslip Generator System',
                  desc: 'Automated payroll and payslip generation platform custom-built for the Department of Migrant Workers to streamline salary computation, deduction management, and secure document distribution.',
                  icon: 'fa-file-invoice-dollar',
                  image: Payslip,
                  achievements: ['💼 Streamlined DMW Payroll', '⚡ Efficient Batch Processing', '🔒 Secure Record Management'],
                  tech: ['VB', 'Macros', 'MS-Access']
                },
                {
                  category: 'Personal System',
                  title: 'Inventory System',
                  desc: 'Comprehensive web-based inventory management platform built to monitor stock levels, track item movement, and automate reporting workflows.',
                  icon: 'fa-boxes',
                  image: Aicc,
                  achievements: ['✅ Real-time Stock Tracking', '📅 Automated Report Generation', '🔗 Secure Database Architecture'],
                  tech: ['PHP', 'MySQL', 'JavaScript', 'CSS']
                },
                {
                  category: 'Corporate System',
                  title: 'HR Bliz',
                  desc: 'Comprehensive corporate human resources platform built to manage personnel data, employee workflows, and administrative records, featuring automated reporting powered by Jasper Reports.',
                  icon: 'fa-users-cog',
                  image: HRBLIZ,
                  achievements: ['✅ Personnel Record Management', '📊 Custom Jasper Reports', '🔗 Secure Enterprise Database'],
                  tech: ['Java', 'Struts', 'Hibernate', 'MS SQL Server', 'Jasper Reports']
                },
                {
                  category: 'Capstone Project',
                  title: 'Traditional Fishing Gear Preservation System',
                  desc: 'An interactive educational platform designed to preserve and showcase traditional fishing gear crafting techniques, featuring AR view integration, step-by-step tutorials, and responsive 3D models.',
                  icon: 'fa-cube',
                  image: Capstone,
                  achievements: ['🎣 AR 3D Model Integration', '📚 Interactive Crafting Tutorials', '🌊 Cultural Heritage Preservation'],
                  tech: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'AR.js']
                },
                {
                  category: 'Corporate Project',
                  title: 'Company App Downloader & Distribution Hub',
                  desc: 'An internal web platform designed to streamline the distribution, version control, and secure downloading of proprietary company applications for employees.',
                  link: 'https://redwing08.github.io/app_downloader/#/',
                  icon: 'fa-download',
                  image: Downloader,
                  achievements: ['⚡ Centralized App Distribution', '🔒 Secure Access Control', '📦 Version Tracking & Updates'],
                  tech: ['React', 'Supabase', 'JavaScript', 'TailwindCSS']
                },
                {
                  category: 'Personal Project',
                  title: 'B.A.Y.M.A.X Local Personal AI',
                  desc: 'An intelligent locally deployed AI assistant built to provide real-time support, answer user queries, and automate routine tasks while keeping all data securely processed within the local environment.',
                  link: 'https://redwing08.github.io/BAYMAX-HUD/',
                  icon: 'fa-download',
                  image: Baymax,
                  achievements: [
                    '🤖 Personalized AI Assistant',
                    '🔒 Secure Local Data Processing',
                    '⚡ Real-Time Intelligent Responses'
                  ],
                  tech: ['React', 'Llama', 'JavaScript', 'CSS']
                }
              ].map((project, index) => (
                <motion.div 
                  key={index}
                  className="project-card"
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 40px rgba(255,0,0,0.15)'
                  }}
                >
                  <div className="project-image-wrapper">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                    <div className="project-image-overlay">
                      <motion.div 
                        className="project-icon"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <i className={`fas ${project.icon}`}></i>
                      </motion.div>
                    </div>
                  </div>
                  <div className="project-content">
                    <span className="project-category-tag" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-color, #ff0000)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                      {project.category}
                    </span>
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    {project.link && (
                      <div className="project-link-wrapper" style={{ marginBottom: '12px' }}>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-external-link"
                          style={{ color: 'var(--accent-color, #ff0000)', textDecoration: 'underline', fontSize: '0.9rem', fontWeight: 500 }}
                        >
                          <i className="fas fa-external-link-alt" style={{ marginRight: '6px' }}></i>
                          Live Demo / App
                        </a>
                      </div>
                    )}
                    <div className="project-technologies">
                      {project.tech.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-achievements">
                      {project.achievements.map(achievement => (
                        <span key={achievement} className="achievement-tag">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Sub-section 2: Mobile Applications Showcase */}
            <motion.div variants={fadeInUp} style={{ margin: '60px 0 30px 0' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#fff', borderLeft: '4px solid #ff0000', paddingLeft: '12px' }}>
                Mobile Applications Showcase
              </h3>
              <p style={{ color: '#aaa', fontSize: '0.95rem' }}>Deployed mobile app interface layouts matching mobile device dimensions.</p>
            </motion.div>

            <motion.div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', width: '100%' }} variants={staggerContainer}>
              {[
                {
                  category: 'Mobile Application',
                  title: 'E-Loan App - Financial Services',
                  desc: 'Mobile client entry and management system featuring server connection status, quick actions for client creation and lists.',
                  image: Eloan,
                  achievements: ['📱 Mobile UI Layout', '🔒 Server Connection Status', '⚡ Quick Action Modules'],
                  tech: ['Android Studio', 'Java', 'XML', 'Room Database']
                }, 
                {
                  category: 'Mobile Application',
                  title: 'Credit Investigation App - Credit Checking',
                  desc: 'Mobile client entry and management system featuring server connection status, quick actions for client creation and lists.',
                  image: CiApp, 
                  achievements: ['📱 Mobile UI Layout', '🔒 Server Connection Status', '⚡ Quick Action Modules'],
                  tech: ['Android Studio', 'Java', 'XML', 'Room Database']
                },
                {
                  category: 'Mobile Application',
                  title: 'Agent Entry App',
                  desc: 'Mobile client entry and management system featuring server connection status, quick actions for client creation, and streamlined field tracking.',
                  image: Agent,
                  achievements: ['📱 Mobile UI Layout', '🔒 Server Connection Status', '⚡ Quick Action Modules'],
                  tech: ['Android Studio', 'Kotlin', 'Room Database']
                },
                {
                  category: 'Mobile Application',
                  title: 'Asset Receipt Scanner',
                  desc: 'Mobile scanning tool used to capture and digitize asset receipts for direct attachment to liquidation and cash advance reports.',
                  image: Asset,
                  achievements: ['📷 CameraX Integration', '⚡ Instant Scanning', '🔄 Sync Capabilities'],
                  tech: ['Android Studio', 'Java', 'ML Kit']
                },
                {
                  category: 'Mobile Application',
                  title: 'QR Overrider App',
                  desc: 'Management tool utilized by Operations Managers (OM) to verify sudden changes via QR code scanning, update system data, and approve liquidations and cash advances.',
                  image: QR,
                    achievements: ['📷 CameraX Integration', '⚡ Instant Scanning', '🔄 Sync Capabilities'],
                  tech: ['Android Studio', 'Kotlin']
                },
                {
                  category: 'Mobile Application',
                  title: 'Provision Receipt App',
                  desc: 'Mobile application designed to track, log, and manage provisional receipts for secure financial record-keeping and auditing workflows.',
                  image: Receipt,
                  achievements: ['📱 Digital Receipt Logs', '⚡ Fast Transaction Entry', '📋 Export Reports'],
                  tech: ['Android Studio', 'Java', 'Room']
                }
              
              ].map((mobApp, index) => (
                <motion.div 
                  key={index}
                  className="project-card"
                  variants={fadeInUp}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(255,0,0,0.15)' }}
                >
                  <div style={{ background: '#111', marginBlockStart: '20px', borderRadius: '28px', padding: '12px', border: '3px solid #333', maxWidth: '280px', margin: '20px auto 15px auto', boxShadow: '0 10px 25px rgba(0,0,0,0.6)' }}>
                    <div style={{ width: '60px', height: '14px', background: '#000', margin: '0 auto 8px auto', borderRadius: '10px' }}></div>
                    <img 
                      src={mobApp.image} 
                      alt={mobApp.title} 
                      style={{ width: '100%', height: 'auto', borderRadius: '14px', display: 'block' }} 
                    />
                  </div>

                  <div className="project-content">
                    <span className="project-category-tag" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--accent-color, #ff0000)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                      {mobApp.category}
                    </span>
                    <h3>{mobApp.title}</h3>
                    <p>{mobApp.desc}</p>
                    <div className="project-technologies">
                      {mobApp.tech.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-achievements">
                      {mobApp.achievements.map(achievement => (
                        <span key={achievement} className="achievement-tag">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Sub-section 3: GLB 3D Models Showcase */}
            <motion.div variants={fadeInUp} style={{ margin: '60px 0 30px 0' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#fff', borderLeft: '4px solid #ff0000', paddingLeft: '12px' }}>
                Interactive GLB 3D Models Showcase
              </h3>
              <p style={{ color: '#aaa', fontSize: '0.95rem' }}>View and explore the 5 interactive 3D assets generated and optimized for applications.</p>
            </motion.div>

            <motion.div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', width: '100%' }} variants={staggerContainer}>
              {[
                {
                  title: 'Traditional Fishing Trap 3D Model',
                  desc: 'A detailed .glb asset optimized for web and AR environments, showcasing cultural preservation artifacts.',
                  tech: ['Blender', 'GLTF/GLB', 'Three.js'],
                  file: 'fishing_trap.glb'
                },
                {
                  title: 'App HUD Element Component',
                  desc: 'Futuristic sci-fi HUD interface model designed for interactive immersion panels.',
                  tech: ['Blender', 'GLTF/GLB', 'React Three Fiber'],
                  file: 'hud_element.glb'
                },
                {
                  title: 'Virtual Smartphone Frame Model',
                  desc: 'Low-poly mobile chassis .glb asset utilized for custom device mockup presentations.',
                  tech: ['Blender', 'GLTF/GLB', 'Three.js'],
                  file: 'smartphone_mockup.glb'
                },
                {
                  title: 'Interactive Database Node Asset',
                  desc: '3D structural representation of backend server clusters and node relationships.',
                  tech: ['Blender', 'GLTF/GLB', 'Three.js'],
                  file: 'db_node.glb'
                },
                {
                  title: 'AI Hologram Core Orb Model',
                  desc: 'Futuristic glowing particle orb model created for AI virtual assistant visual interfaces.',
                  tech: ['Blender', 'GLTF/GLB', 'Shader Nodes'],
                  file: 'ai_core_orb.glb'
                }
              ].map((modelItem, index) => (
                <motion.div 
                  key={index}
                  className="project-card model-3d-card"
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 25px 50px rgba(255,0,0,0.25)',
                    borderColor: '#ff0000'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ border: '1px solid #333', background: '#181818', padding: '20px', borderRadius: '16px', textAlign: 'left', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '15px' }}
                >
                  <div style={{ width: '100%', height: '180px', background: 'linear-gradient(135deg, #0d0d0d 0%, #1f1f1f 100%)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #444', position: 'relative', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <i className="fas fa-cube" style={{ fontSize: '3.5rem', color: '#ff0000', filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.5))' }}></i>
                    </motion.div>
                    <span style={{ fontSize: '0.8rem', color: '#ccc', marginTop: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '20px', border: '1px solid #555' }}>
                      <i className="fas fa-eye" style={{ marginRight: '6px', color: '#ff0000' }}></i>Interactive 3D Asset Viewer
                    </span>
                  </div>

                  <div className="project-content" style={{ padding: 0 }}>
                    <span style={{ fontSize: '0.75rem', color: '#ff0000', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>3D Model Asset</span>
                    <h3 style={{ fontSize: '1.25rem', margin: '4px 0 8px 0', color: '#fff' }}>{modelItem.title}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#bbb', marginBottom: '15px', lineHeight: '1.4' }}>{modelItem.desc}</p>
                    
                    <div className="project-technologies" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '15px' }}>
                      {modelItem.tech.map(t => (
                        <span key={t} className="tech-tag" style={{ fontSize: '0.75rem', background: '#252525', color: '#ddd', padding: '4px 10px', borderRadius: '6px', border: '1px solid #333' }}>{t}</span>
                      ))}
                    </div>

                    <div style={{ background: '#111', padding: '10px 12px', borderRadius: '8px', border: '1px solid #2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: '#888', fontFamily: 'monospace' }}>File: {modelItem.file}</span>
                      <span style={{ fontSize: '0.8rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <i className="fas fa-check-circle"></i> Ready
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section ref={contactRef} id="contact" className="contact-section">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <span className="section-number">05</span>
              <h2>Get In Touch</h2>
              <div className="section-line">
                <motion.div 
                  className="section-line-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>

            <motion.p className="section-subtitle" variants={fadeInUp}>
              Have a project in mind? Let's discuss how we can work together
            </motion.p>

            <motion.div className="contact-wrapper" variants={staggerContainer}>
              <motion.div className="contact-info" variants={fadeInLeft}>
                <h3>Let's Connect</h3>
                <p>
                  I'm always interested in hearing about new opportunities,
                  collaborations, or just having a conversation about technology.
                </p>
                
                <div className="contact-details">
                  {[
                    { icon: 'fa-envelope', label: 'Email', value: 'barrerasteve032@gmail.com' },
                    { icon: 'fa-phone', label: 'Phone', value: '09352344313' },
                    { icon: 'fa-map-marker-alt', label: 'Location', value: 'Quezon City' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="contact-item"
                      whileHover={{ x: 5 }}
                    >
                      <div className="contact-icon">
                        <i className={`fas ${item.icon}`}></i>
                      </div>
                      <div>
                        <span className="contact-label">{item.label}</span>
                        <span className="contact-value">{item.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="social-links">
                  {['github', 'linkedin-in', 'facebook', 'instagram'].map((social, index) => (
                    <motion.a 
                      key={index}
                      href="#"
                      whileHover={{ 
                        y: -5, 
                        background: '#ff0000',
                        color: '#ffffff'
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className={`fab fa-${social}`}></i>
                    </motion.a>
                  ))}
                </div>

                <motion.button 
                  className="btn-download-contact"
                  onClick={handleDownloadResume}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-download"></i> 
                  Download Resume
                </motion.button>
              </motion.div>

              <motion.form 
                className="contact-form" 
                variants={fadeInRight}
                onSubmit={handleSendEmail}
              >
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Juan Dela Cruz"
                    value={emailData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="juan@example.com"
                    value={emailData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your concern"
                    value={emailData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="btn-submit"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 40px rgba(255,0,0,0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-paper-plane"></i> 
                  Send Message
                </motion.button>
                
                <AnimatePresence>
                  {emailStatus && (
                    <motion.div 
                      className={`email-status ${emailStatus.includes('✅') ? 'success' : 'error'}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {emailStatus}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-container">
          <div className="footer-brand">
            <span className="footer-logo">
              <Logo size={35} />
              Steve<span className="logo-dot">.</span>
            </span>
            <p>Building Codes for Fun and Learning</p>
          </div>
          
          <div className="footer-nav">
            {['Home', 'About', 'Skills', 'Achievements', 'Projects', 'Contact'].map((item, index) => (
              <button 
                key={index}
                onClick={() => {
                  const refs = [homeRef, aboutRef, skillsRef, achievementsRef, projectsRef, contactRef];
                  scrollToSection(refs[index]);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          
          <div className="footer-social">
            <a href="https://github.com/redwing08"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/steve-calvin-barrera-3b6625313/"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://www.facebook.com/stevecalvinromano.barrera/"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Steve Portfolio. All rights reserved.</p>
          <p>Built with React &amp; Framer Motion</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;