import React, { useState, useEffect, useRef } from 'react';
import { Bot, Phone, MessageCircle, Mic, PhoneOff, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';
import './App.css';

const agentId = "agent_f3cd88bfcb9943d32ce5a09771";

function App() {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const retellWebClientRef = useRef(null);

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
          <img src="/logo-talkora.png" alt="Talkora Logo" style={{ height: '36px', objectFit: 'contain' }} />
          <span>Talkora</span>
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
          Revoluciona tu Atención con <span className="text-primary-gradient">Talkora</span>
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
          <p className="text-muted">Descubre cómo Talkora transforma la gestión de tus huéspedes.</p>
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
          <h2 className="section-title">Habla con Talkora</h2>
          <p className="text-muted">Prueba nuestro agente de voz en tiempo real.</p>
        </div>
        
        <div className="demo-container">
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
            {isLoading ? <Loader2 className="animate-spin" size={40} /> : (isCalling ? <PhoneOff size={40} /> : <Mic size={40} />)}
          </button>
          
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {isLoading ? 'Conectando con servidor...' : (isCalling ? 'Talkora te está escuchando...' : 'Pulsa para hablar')}
          </h3>
          {errorText && (
            <p style={{ color: '#EF4444', marginTop: '1rem', fontWeight: 500 }}>
              {errorText}
            </p>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">¿Listo para modernizar tu negocio?</h2>
        <p className="cta-desc">
          Integra a Talkora en tus apartamentos y empieza a ahorrar tiempo desde el primer día.
        </p>
        <button className="btn-primary" onClick={handleWhatsAppRedirect} style={{ backgroundColor: 'white', color: 'var(--color-text-main)' }}>
          Hablar por WhatsApp <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <img src="/logo-talkora.png" alt="Talkora Logo" style={{ height: '28px', objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-text-main)' }}>Talkora</span>
        </div>
        <p>© 2026 Talkora AI Agents. Todos los derechos reservados.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Desarrollado para WebBeatrizAutomatiza</p>
      </footer>
    </div>
  );
}

export default App;
