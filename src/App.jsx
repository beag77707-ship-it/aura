import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, Mic, PhoneOff, ArrowRight, CheckCircle2, Loader2, Instagram } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { motion, useScroll, useTransform } from 'framer-motion';
import './App.css';

const agentId = "agent_f3cd88bfcb9943d32ce5a09771";

function App() {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
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

    // Efecto magnético brillante para las tarjetas
    const handleMouseMove = (e) => {
      for (const card of document.querySelectorAll('.service-card')) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      retellClient.stopCall();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "34600000000"; 
    const message = "Hola Talkora, me gustaría obtener más información.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
          <img src="/logo-talkora.png" alt="Talkora Logo" className="logo-image" />
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
              <Instagram size={20} /> Sígueme en Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInOut}
        >
          <h2 className="section-title text-gradient">Automatización Inteligente</h2>
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>Descubre cómo Talkora transforma la experiencia de tus huéspedes.</p>
        </motion.div>
        
        <div className="services-grid">
          {/* Voice Agent Card */}
          <motion.div 
            className="service-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="service-content">
              <div className="service-icon-wrapper">
                <Phone size={32} />
              </div>
              <h3 className="service-title">Recepcionista Virtual 24/7</h3>
              <p className="service-desc">
                Un agente telefónico capaz de realizar el check-in, explicar las normas del apartamento y resolver cualquier emergencia en tiempo real, con voz natural y en múltiples idiomas.
              </p>
              <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
                {['Atención multi-idioma nativa', 'Check-in y Check-out automático', 'Resolución de incidencias 24h'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* WhatsApp Agent Card */}
          <motion.div 
            className="service-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="service-content">
              <div className="service-icon-wrapper">
                <MessageCircle size={32} />
              </div>
              <h3 className="service-title">WhatsApp en Piloto Automático</h3>
              <p className="service-desc">
                Convierte conversaciones en reservas. Nuestro agente inteligente gestiona solicitudes, envía enlaces de pago y responde preguntas frecuentes directamente en la app que tus clientes ya usan.
              </p>
              <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
                {['Respuestas instantáneas', 'Gestión integral de reservas', 'Soporte activo durante la estancia'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-primary)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="demo-section">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInOut}
        >
          <h2 className="section-title text-gradient">Habla con Talkora</h2>
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>Experimenta el futuro de la atención al huésped.</p>
        </motion.div>
        
        <motion.div 
          className="demo-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="demo-status">
            <div className={`status-dot ${isCalling ? 'pulse' : ''}`} style={{ backgroundColor: isCalling ? '#EF4444' : '#10B981' }}></div>
            {isCalling ? 'Conectado a Talkora' : 'Sistemas Operativos. IA Lista.'}
          </div>
          
          <button 
            className={`mic-button ${isCalling ? 'active' : ''}`}
            onClick={toggleCall}
            disabled={isLoading}
            aria-label={isCalling ? 'Finalizar llamada' : 'Iniciar llamada'}
          >
            {isLoading ? <Loader2 className="animate-spin" size={48} /> : (isCalling ? <PhoneOff size={48} /> : <Mic size={48} />)}
          </button>
          
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 700 }}>
            {isLoading ? 'Conectando...' : (isCalling ? 'Talkora te está escuchando...' : 'Pulsa para hablar')}
          </h3>
          
          {errorText && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: '#EF4444', marginTop: '1rem', fontWeight: 500, fontSize: '1.1rem' }}
            >
              {errorText}
            </motion.p>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <img src="/logo-talkora.png" alt="Talkora Logo" className="logo-image" style={{ height: '28px' }} />
          <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-text-main)' }}>Talkora</span>
        </div>
        <p style={{ color: 'var(--color-text-muted)' }}>© 2026 Talkora AI Agents. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
