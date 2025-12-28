
import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, TESTIMONIALS, Logo, FAQ_DATA } from './constants';
import { askHealthAssistant } from './services/geminiService';
import { Message } from './types';

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Insurance', href: '#insurance' },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      setMobileMenuOpen(false);
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#0072bc] rounded-xl"
          aria-label="Renice Medical Centre Home"
        >
          <Logo />
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium transition-colors focus:outline-none focus:text-[#0072bc] ${isScrolled ? 'text-slate-600 hover:text-[#0072bc]' : 'text-slate-800 hover:text-[#0072bc]'}`}
              aria-label={`Navigate to ${link.name}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="bg-[#0072bc] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#005f91] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0072bc]"
            aria-label="Book an Appointment"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-800 p-2 focus:outline-none focus:ring-2 focus:ring-[#0072bc] rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Content */}
      <div 
        id="mobile-menu"
        ref={menuRef}
        className={`fixed top-0 right-0 w-3/4 max-w-sm h-screen bg-white z-50 shadow-2xl transition-transform duration-300 transform md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-10">
            <Logo />
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-400 p-2 hover:text-slate-600"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xl font-bold text-slate-800 py-4 border-b border-slate-50 hover:text-[#0072bc] transition-colors"
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-label={`Navigate to ${link.name}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10">
            <a 
              href="#contact" 
              className="block w-full text-center bg-[#0072bc] text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
              onClick={(e) => handleLinkClick(e, '#contact')}
              aria-label="Book an Appointment"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// FAQ Section Component
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#26c2ad] text-sm font-bold uppercase tracking-widest mb-3">Common Questions</h2>
          <p className="text-4xl font-bold text-slate-900">Frequently Asked Questions</p>
          <p className="text-slate-600 mt-4 italic">"Care for All" means being here to answer all your healthcare concerns.</p>
        </div>
        
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${activeIndex === index ? 'border-[#0072bc] bg-[#0072bc]/5 shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
            >
              <button 
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-[#0072bc]' : 'text-slate-800'}`}>
                  {item.question}
                </span>
                <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#0072bc]' : 'text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// AI Health Assistant Bot
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am your Renice Health Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const response = await askHealthAssistant(userMsg, messages);
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Primary Floating WhatsApp Link */}
      <a 
        href="https://wa.me/254707167434?text=I%20would%20like%20to%20inquire%20about%20your%20services." 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center space-x-2 group"
        aria-label="Chat with Renice Medical Centre on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-medium ml-2">Direct Chat</span>
      </a>

      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#0072bc] p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <h3 className="font-bold">Health AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close Assistant">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#0072bc] text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 px-4 py-2 rounded-2xl rounded-bl-none">
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a health question..."
              className="flex-1 text-sm border-none focus:ring-0 outline-none"
              aria-label="Ask a health question"
            />
            <button onClick={handleSend} className="text-[#0072bc] p-2 hover:bg-slate-50 rounded-full transition-colors" aria-label="Send Message">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#0072bc] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center space-x-2 group"
          aria-label="Open Health AI Assistant"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 font-medium">Health AI</span>
        </button>
      )}
    </div>
  );
};

// Hero Section
const Hero = () => (
  <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
    <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
       <svg viewBox="0 0 100 100" className="w-full h-full text-[#26c2ad]">
         <circle cx="100" cy="0" r="80" fill="currentColor" />
       </svg>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-flex items-center space-x-2 bg-[#26c2ad]/10 px-4 py-2 rounded-full border border-[#26c2ad]/20">
            <span className="w-2 h-2 bg-[#26c2ad] rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-[#26c2ad] uppercase tracking-wider">Level 3 Accredited Hospital</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
            Compassionate <br />
            <span className="text-[#0072bc]">Healthcare</span> in Mlolongo.
          </h1>
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            Renice Medical Centre: Your trusted partner in health since 2012. Providing professional Level 3 medical services with a community heart. Quality you can trust, care you can feel.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#contact" className="px-8 py-4 bg-[#0072bc] text-white rounded-2xl font-bold text-lg hover:bg-[#005f91] transition-all shadow-xl hover:shadow-[#0072bc]/30 text-center">
              Book Appointment
            </a>
            <a href="#services" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all text-center">
              Our Services
            </a>
          </div>
        </div>
        <div className="relative group animate-in fade-in slide-in-from-right duration-700">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover object-top" alt="Friendly doctors providing professional care" />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] border border-slate-50">
            <p className="text-xs font-bold text-[#26c2ad] uppercase mb-1">24/7 Pharmacy</p>
            <p className="text-sm font-semibold text-slate-900">Always stocked, always here for our neighbors.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Accreditation and Insurance Section
const Accreditation = () => (
  <section id="insurance" className="py-20 bg-white border-y border-slate-100 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-[#26c2ad] text-sm font-bold uppercase tracking-widest mb-3">Making Healthcare Affordable</h2>
        <p className="text-3xl font-bold text-slate-900">Accredited & Trusted Partner</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-24 items-center">
        <div className="flex flex-col items-center group">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center p-4 group-hover:bg-[#0072bc]/5 transition-colors duration-300">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#0072bc]"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.74-3.53 8.9-7 10.02V12h-7V6.39l7-3.11v8.72z"/></svg>
          </div>
          <span className="mt-4 text-sm font-bold text-slate-700">SHA (Social Health Authority)</span>
        </div>
        <div className="flex flex-col items-center group">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center p-4 group-hover:bg-[#26c2ad]/5 transition-colors duration-300">
            <svg viewBox="0 0 24 24" className="w-12 h-12 text-[#26c2ad]"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          </div>
          <span className="mt-4 text-sm font-bold text-slate-700">MUA Insurance Cover</span>
        </div>
        <div className="flex flex-col items-center group">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center p-4">
             <span className="text-2xl font-black text-slate-300">MoH</span>
          </div>
          <span className="mt-4 text-sm font-bold text-slate-700">MoH Registered (Level 3)</span>
        </div>
      </div>
      <p className="mt-12 text-slate-500 text-sm italic">We also accept Cash, M-Pesa, and all major Credit Cards.</p>
    </div>
  </section>
);

// Services Section
const Services = () => (
  <section id="services" className="py-24 bg-slate-50 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-[#26c2ad] text-sm font-bold uppercase tracking-widest mb-3">Our Core Services</h2>
        <p className="text-4xl font-bold text-slate-900 mb-6">Expert Level 3 Medical Care</p>
        <p className="text-slate-600">Renice Medical Centre provides a comprehensive suite of healthcare services featuring advanced diagnostics and professional medical supervision in the heart of Mlolongo.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(SERVICES || []).map((service) => (
          <div key={service.id} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group flex flex-col h-full">
            <div className="w-16 h-16 bg-[#0072bc]/5 rounded-2xl flex items-center justify-center text-[#0072bc] mb-8 group-hover:bg-[#0072bc] group-hover:text-white transition-all duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm flex-1">{service.description}</p>
            <a 
              href="#contact" 
              className="text-[#0072bc] font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform focus:outline-none focus:ring-2 focus:ring-[#0072bc] rounded"
              aria-label={`Book appointment for ${service.title}`}
            >
              Book Appointment
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// About Us Section
const About = () => (
  <section id="about" className="py-24 scroll-mt-24 bg-white border-t border-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-lg mt-12 h-80 object-cover" alt="Dedicated medical team at Renice" />
          <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-lg h-80 object-cover" alt="Modern clinic facilities interior" />
        </div>
        <div className="space-y-8">
          <h2 className="text-[#0072bc] text-sm font-bold uppercase tracking-widest mb-3">About Renice Medical</h2>
          <p className="text-4xl font-bold text-slate-900 leading-tight">Driven by a Simple Motto: <br /><span className="text-[#26c2ad]">"CARE FOR ALL"</span></p>
          <div className="space-y-6 text-slate-600">
            <p className="leading-relaxed">
              At Renice Medical Centre, our mission is simple and reflected in our motto: “Care for All.” As a Level 3 Accredited facility, we have established ourselves as a cornerstone of health and wellness in the Mlolongo community.
            </p>
            <p className="leading-relaxed">
              We believe that high-quality medical care should be accessible, compassionate, and professional. Our facility is fully SHA Accredited, ensuring that we meet the highest national standards for patient safety and clinical excellence.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-1 rounded-full text-green-600 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div><h4 className="font-bold text-slate-900 text-sm">Community Heart</h4></div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-1 rounded-full text-green-600 mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div><h4 className="font-bold text-slate-900 text-sm">Clinical Excellence</h4></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Testimonials Section
const Testimonials = () => (
  <section id="testimonials" className="py-24 bg-[#0072bc]/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
      <h2 className="text-[#26c2ad] text-sm font-bold uppercase tracking-widest mb-3">Patient Testimonials</h2>
      <p className="text-4xl font-bold text-slate-900">What Our Community Says</p>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm relative border border-white hover:border-[#26c2ad]/20 transition-all">
            <p className="text-slate-600 italic leading-relaxed mb-8 pt-4">"{t.quote}"</p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-[#0072bc] font-bold text-lg">{t.name.charAt(0)}</div>
              <div className="text-left">
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500 font-medium">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Contact Section
const Contact = () => (
  <section id="contact" className="py-24 bg-slate-50 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-[#0072bc] text-sm font-bold uppercase tracking-widest mb-3">Get In Touch</h2>
          <p className="text-4xl font-bold text-slate-900 mb-8">Ready to Serve You</p>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0072bc] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Our Location</h4>
                <p className="text-slate-600">Renice Building, Mlolongo, Machakos County, Kenya</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#26c2ad] shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Call / WhatsApp</h4>
                <a href="tel:+254707167434" className="block text-slate-600 hover:text-[#0072bc] font-bold text-lg transition-colors">+254 707 167 434</a>
                
                <div className="mt-4">
                  <a 
                    href="https://wa.me/254707167434?text=I%20would%20like%20to%20inquire%20about%20your%20services." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2.5 bg-[#25D366] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all group"
                  >
                    <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="mt-6 space-y-1 border-t border-slate-200 pt-4">
                  <p className="text-slate-600 font-medium">care@renicemedicacenter.co.ke</p>
                  <p className="text-slate-400 text-xs italic">renicefamilyhospitalltd@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Inquiry Form</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0072bc]/20" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0072bc]/20" placeholder="+254..." />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Service Required</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0072bc]/20 bg-white">
                <option>General Consultation</option>
                <option>Maternity & Delivery</option>
                <option>Laboratory Services</option>
                <option>Specialized Clinic</option>
                <option>Private Wing Services</option>
                <option>Pharmacy Inquiry</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#0072bc]/20" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-[#26c2ad] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#1fa18f] transition-all">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
        <div className="col-span-2 space-y-6">
          <Logo />
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Renice Medical Centre: Providing expert Level 3 medical care to the Mlolongo community with compassion and professional integrity. Our motto is "Care for All".</p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Explore</h4>
          <ul className="space-y-4 text-slate-400">
            <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
            <li><a href="#insurance" className="hover:text-white transition-colors">Insurance</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-6">Support</h4>
          <p className="text-slate-400 mb-2">Renice Building, Mlolongo, Kenya</p>
          <p className="text-white font-bold text-lg">+254 707 167 434</p>
          <p className="text-slate-400 text-xs mt-4 break-all">care@renicemedicacenter.co.ke</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Renice Medical Centre. All rights reserved.</p>
        <div className="flex space-x-4">
          <span className="text-xs text-slate-600">Level 3 Accredited</span>
          <span className="text-xs text-slate-600">SHA Partner</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 selection:bg-[#0072bc]/20">
      <Navbar />
      <Hero />
      <Accreditation />
      <Services />
      <About />
      <FAQ />
      <Testimonials />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
}
