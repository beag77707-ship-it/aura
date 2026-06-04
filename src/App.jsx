import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, Mic, PhoneOff, ArrowRight, CheckCircle2, Loader2, Calendar, Globe, Zap, Clock } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { motion, useScroll, useTransform } from 'framer-motion';
import './App.css';

const agentId = "agent_f3cd88bfcb9943d32ce5a09771";

function App() {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [activeTab, setActiveTab] = useState('voice');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy Talkora. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const retellWebClientRef = useRef(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    retellWebClientRef.current = new RetellWebClient();
    const retellClient = retellWebClientRef.current;

    retellClient.on("call_started", () => {
      setIsCalling(true);
      setIsLoading(false);
      setErrorText("");
    });

    retellClient.on("call_ended", () => {
      setIsCalling(false);
      setIsLoading(false);
    });

    retellClient.on("error", (error) => {
      console.error("Retell SDK Error:", error);
      setIsCalling(false);
      setIsLoading(false);
      setErrorText("Asegúrate de haber añadido tu API Key secreta.");
      retellClient.stopCall();
    });

    return () => {
      retellClient.stopCall();
    };
  }, []);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "34600000000"; 
    const message = "Hola Talkora, me gustaría obtener más información.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Simulate bot typing and responding
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Esta es una respuesta simulada de Talkora. En la versión final, aquí se integrará la API de WhatsApp real.' }
      ]);
    }, 1500);
  };

  const toggleCall = async () => {
    if (isCalling || isLoading) {
      retellWebClientRef.current?.stopCall();
      return;
    }

    setIsLoading(true);
    setErrorText("");

    try {
      const response = await fetch('/api/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: agentId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error creando llamada");
      }

      await retellWebClientRef.current?.startCall({
        accessToken: data.access_token,
      });

    } catch (err) {
      console.error("Error al iniciar llamada:", err);
      setErrorText("Falta la API Key en el servidor o hay un error.");
      setIsLoading(false);
    }
  };

  const fadeInOut = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="app-container">
      {/* Dark Aura Animated Background */}
      <div className="aura-background">
        <div className="aura-blob aura-blob-1"></div>
        <div className="aura-blob aura-blob-2"></div>
        <div className="aura-blob aura-blob-3"></div>
      </div>
      <div className="noise-overlay"></div>

      {/* Navbar */}
      <nav className="navbar">
        <motion.div 
          className="nav-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/logo.png" alt="Talkora Logo" className="logo-image" />
          <span>Talkora</span>
        </motion.div>
        <motion.button 
          className="btn-primary" 
          onClick={handleWhatsAppRedirect}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={18} />
          Contactar
        </motion.button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div className="glass-shape shape-1" style={{ y: y1 }} />
        <motion.div className="glass-shape shape-2" style={{ y: y2 }} />
        <motion.div className="glass-shape shape-3" style={{ y: y3 }} />
        
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={fadeInOut} className="hero-badge">IA para Apartamentos Turísticos</motion.div>
          <motion.h1 variants={fadeInOut} className="hero-title">
            Revoluciona tu Atención con <br/><span className="text-primary-gradient">Talkora</span>
          </motion.h1>
          <motion.p variants={fadeInOut} className="hero-subtitle">
            Agentes de Voz y WhatsApp disponibles 24/7. Gestiona reservas, responde dudas de huéspedes al instante y ahorra tiempo. Cero esperas, cero estrés.
          </motion.p>
          <motion.div variants={fadeInOut} className="hero-actions">
            <motion.button 
              className="btn-primary" 
              onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Probar Demo de Voz
            </motion.button>
            <motion.button 
              className="btn-secondary" 
              onClick={handleWhatsAppRedirect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Demo WhatsApp
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Playground Console */}
        <motion.div 
          className="playground-console"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          id="demo"
        >
          <div className="pg-tabs-container">
            <button className={`pg-tab ${activeTab === 'voice' ? 'active' : ''}`} onClick={() => setActiveTab('voice')}>
              <Phone size={18} /> Llamada de Voz
            </button>
            <button className={`pg-tab ${activeTab === 'whatsapp' ? 'active' : ''}`} onClick={() => setActiveTab('whatsapp')}>
              <MessageCircle size={18} /> WhatsApp
            </button>
          </div>
          
          <div className="pg-card">
            <div className="pg-card-inner">
              {activeTab === 'voice' ? (
                <div className="pg-voice-mode">
                  <button 
                    className={`pg-avatar-btn ${isCalling ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
                    onClick={toggleCall}
                    disabled={isLoading}
                    title={isCalling ? "Finalizar llamada" : "Iniciar llamada"}
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={40} /> : (isCalling ? <PhoneOff size={40} /> : <Mic size={40} />)}
                  </button>
                  <h3 className="pg-status-title">Agente IA Activo</h3>
                  <p className="pg-status-subtitle">
                    {isCalling ? "Conectado · Tiempo real" : "Pulsa para iniciar"}
                  </p>
                  
                  <div className={`pg-waveform ${isCalling ? 'active' : ''}`}>
                    {[...Array(40)].map((_, i) => <div key={i} className="pg-bar"></div>)}
                  </div>

                  {errorText && <p style={{color: '#EF4444', fontSize: '0.9rem', marginTop: '1rem'}}>{errorText}</p>}
                </div>
              ) : (
                <div className="pg-whatsapp-mode">
                  <div className="pg-chat-container">
                    <div className="pg-chat-messages">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`pg-chat-bubble ${msg.sender}`}>
                          {msg.text}
                        </div>
                      ))}
                    </div>
                    <form className="pg-chat-input-area" onSubmit={handleSendMessage}>
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Escribe un mensaje de prueba..." 
                        className="pg-chat-input"
                      />
                      <button type="submit" className="pg-chat-send" disabled={!chatInput.trim()}>
                        <ArrowRight size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bilingual Orbit Section */}
      <section className="orbit-section">
        <motion.div 
          className="orbit-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInOut}
        >
          <div className="orbit-content">
            <h2 className="section-title">Un Agente IA. <br/><span className="text-primary-gradient">Bilingüe Nativo.</span><br/>Cualquier Cliente.</h2>
            <p className="about-desc" style={{ marginTop: '1.5rem' }}>
              Nuestros agentes detectan automáticamente si tu cliente habla <strong>Español</strong> o <strong>Inglés</strong> y adaptan la conversación en tiempo real. Sin configuraciones previas, solo despliega la IA y domina el mercado internacional sin esfuerzo.
            </p>
          </div>
          <div className="orbit-visual">
            <div className="orbit-center"></div>
            <div className="orbit-ring ring-1">
              <div className="orbit-node node-en">EN</div>
            </div>
            <div className="orbit-ring ring-2">
              <div className="orbit-node node-es">ES</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Services Section */}
      <section className="services">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInOut}
        >
          <h2 className="section-title">Automatización Inteligente</h2>
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>Todo lo que necesitas para escalar la gestión de tus apartamentos.</p>
        </motion.div>
        
        <div className="bento-grid">
          <motion.div className="bento-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="bento-icon"><Phone size={24} /></div>
            <h3>Gestionar Llamadas</h3>
            <p>Llamadas entrantes y salientes gestionadas por una IA con voz natural, capaz de hacer check-in y emergencias.</p>
          </motion.div>
          
          <motion.div className="bento-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="bento-icon"><MessageCircle size={24} /></div>
            <h3>Conversaciones WhatsApp</h3>
            <p>Automatiza la mensajería con respuestas contextuales. Envía links de pago, normas y recomendaciones locales.</p>
          </motion.div>
          
          <motion.div className="bento-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="bento-icon"><Calendar size={24} /></div>
            <h3>Agendar Reservas</h3>
            <p>La IA consulta la disponibilidad en tiempo real y gestiona cancelaciones o reprogramaciones al instante.</p>
          </motion.div>
          
          <motion.div className="bento-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <div className="bento-icon"><Globe size={24} /></div>
            <h3>Soporte Bilingüe</h3>
            <p>Comunicación impecable tanto en Español como en Inglés, adaptándose a las necesidades de cada huésped.</p>
          </motion.div>
          
          <motion.div className="bento-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <div className="bento-icon"><Zap size={24} /></div>
            <h3>Enrutamiento Inteligente</h3>
            <p>Deriva automáticamente las incidencias graves o muy complejas a tu equipo humano para su revisión.</p>
          </motion.div>
          
          <motion.div className="bento-card" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            <div className="bento-icon"><Clock size={24} /></div>
            <h3>Operación 24/7</h3>
            <p>Tus agentes de IA nunca duermen. Asegura un nivel de respuesta premium a las 3 de la madrugada.</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img src="/foto-bea.png" alt="Beatriz - Fundadora de Talkora" className="about-image" />
            <div className="about-image-glow"></div>
          </motion.div>
          
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="about-title">Conoce a la mente detrás de <span className="text-primary-gradient">Talkora</span></h2>
            <p className="about-desc">
              Soy <strong>Beatriz</strong>, experta en automatización con Inteligencia Artificial. Mi misión es ayudar a propietarios de apartamentos turísticos a recuperar su tiempo libre.
            </p>
            <p className="about-desc">
              Con Talkora, he diseñado agentes capaces de gestionar el 90% de la comunicación con tus huéspedes de forma natural, humana y eficiente. Deja de trabajar para tu negocio y haz que la IA trabaje para ti.
            </p>
            <a href="https://www.instagram.com/beatrizautomatiza/" target="_blank" rel="noopener noreferrer" className="btn-instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Sígueme en Instagram
            </a>
          </motion.div>
        </div>
      </section>



      {/* Footer */}
      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <img src="/logo.png" alt="Talkora Logo" className="logo-image" style={{ height: '28px' }} />
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-text-main)' }}>Talkora</span>
        </div>
        <p style={{ color: 'var(--color-text-muted)' }}>© 2026 Talkora AI Agents. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
