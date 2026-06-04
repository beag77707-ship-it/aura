import React, { useState } from 'react';
import { Bot, Phone, MessageCircle, Mic, PhoneOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import './App.css';

function App() {
  const [isCalling, setIsCalling] = useState(false);

  // Placeholder for WhatsApp redirect
  const handleWhatsAppRedirect = () => {
    // Reemplaza esto con el número real cuando el usuario lo proporcione
    const phoneNumber = "34600000000"; 
    const message = "Hola Aura, me gustaría obtener más información.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Placeholder for Retell AI logic
  const toggleCall = () => {
    // Aquí irá la lógica del SDK de Retell AI usando el Agent ID
    setIsCalling(!isCalling);
  };

  return (
    <div className="app-container">
      {/* Aura Animated Background */}
      <div className="aura-background">
        <div className="aura-blob aura-blob-1"></div>
        <div className="aura-blob aura-blob-2"></div>
        <div className="aura-blob aura-blob-3"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">
          <Bot className="logo-icon" size={32} />
          <span>Aura</span>
        </div>
        <button className="btn-primary" onClick={handleWhatsAppRedirect}>
          <MessageCircle size={20} />
          Contactar
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero animate-fade-in">
        <div className="hero-badge">IA para Apartamentos Turísticos</div>
        <h1 className="hero-title">
          Revoluciona tu Atención con <span className="text-primary-gradient">Aura</span>
        </h1>
        <p className="hero-subtitle">
          Agentes de Voz y WhatsApp disponibles 24/7. Gestiona reservas, responde dudas de huéspedes al instante y ahorra tiempo. Cero esperas, cero estrés.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}>
            Probar Demo de Voz
          </button>
          <button className="btn-secondary" onClick={handleWhatsAppRedirect}>
            Ver Demo WhatsApp
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="section-header">
          <h2 className="section-title">Automatización Completa</h2>
          <p className="text-muted">Descubre cómo Aura transforma la gestión de tus huéspedes.</p>
        </div>
        
        <div className="services-grid">
          {/* Voice Agent Card */}
          <div className="service-card">
            <div className="service-icon-wrapper">
              <Phone size={32} />
            </div>
            <h3 className="service-title">Tu Recepcionista Virtual 24/7</h3>
            <p className="service-desc">
              Un agente telefónico capaz de realizar el check-in, explicar las normas del apartamento y resolver cualquier emergencia en tiempo real, con voz natural y en múltiples idiomas.
            </p>
            <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
              {['Atención multi-idioma', 'Check-in y Check-out automático', 'Resolución de incidencias'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Agent Card */}
          <div className="service-card">
            <div className="service-icon-wrapper">
              <MessageCircle size={32} />
            </div>
            <h3 className="service-title">WhatsApp en Piloto Automático</h3>
            <p className="service-desc">
              Convierte conversaciones en reservas. Nuestro agente inteligente gestiona solicitudes, envía enlaces de pago y responde preguntas frecuentes directamente en la app que tus clientes ya usan.
            </p>
            <ul style={{ marginTop: '1.5rem', listStyle: 'none', padding: 0 }}>
              {['Respuestas instantáneas', 'Gestión de reservas', 'Soporte durante la estancia'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary)' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="demo-section">
        <div className="section-header">
          <h2 className="section-title">Habla con Aura</h2>
          <p className="text-muted">Prueba nuestro agente de voz en tiempo real.</p>
        </div>
        
        <div className="demo-container">
          <div className="demo-status">
            <div className="status-dot"></div>
            Sistemas Operativos. IA Lista.
          </div>
          
          <button 
            className={`mic-button ${isCalling ? 'active' : ''}`}
            onClick={toggleCall}
            aria-label={isCalling ? 'Finalizar llamada' : 'Iniciar llamada'}
          >
            {isCalling ? <PhoneOff size={40} /> : <Mic size={40} />}
          </button>
          
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {isCalling ? 'Aura te está escuchando...' : 'Pulsa para hablar'}
          </h3>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Agent ID conectado: agent_f3cd88bfcb9943d32ce5a09771
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">¿Listo para modernizar tu negocio?</h2>
        <p className="cta-desc">
          Integra a Aura en tus apartamentos y empieza a ahorrar tiempo desde el primer día.
        </p>
        <button className="btn-primary" onClick={handleWhatsAppRedirect} style={{ backgroundColor: 'white', color: 'var(--color-text-main)' }}>
          Hablar por WhatsApp <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Bot size={24} color="var(--color-primary)" />
          <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>Aura</span>
        </div>
        <p>© 2026 Aura AI Agents. Todos los derechos reservados.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Desarrollado para WebBeatrizAutomatiza</p>
      </footer>
    </div>
  );
}

export default App;
