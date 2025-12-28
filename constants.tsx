
import React from 'react';

export const COLORS = {
  primary: '#0072bc', // Branded Blue from logo
  secondary: '#26c2ad', // Branded Teal from logo
  accent: '#e9c46a',
  background: '#f8fafc',
  text: '#1e293b',
  white: '#ffffff',
};

export const FAQ_DATA = [
  {
    question: "What insurance covers do you accept?",
    answer: "We officially accept SHA (Social Health Authority) and MUA Insurance Cover. We are committed to making healthcare affordable and accessible for our community."
  },
  {
    question: "Do I need to book an appointment for outpatient services?",
    answer: "While we encourage booking appointments for specialized clinics to reduce waiting times, we also welcome walk-in patients for general outpatient consultations 24/7."
  },
  {
    question: "What are the laboratory operating hours?",
    answer: "Our Level 3 laboratory is fully operational 24 hours a day, 7 days a week, ensuring you get diagnostic results whenever you need them."
  },
  {
    question: "Do you offer maternity and delivery services?",
    answer: "Yes, as a Level 3 Accredited facility, we offer comprehensive maternity care, including ANC clinics, safe delivery services, and postnatal care."
  },
  {
    question: "Where exactly are you located in Mlolongo?",
    answer: "We are located at the Renice Building in Mlolongo, Machakos County. We are easily accessible for residents of Mlolongo, Syokimau, and surrounding areas."
  },
  {
    question: "What payment methods do you accept for non-insured patients?",
    answer: "We accept Cash, M-Pesa, and all major Credit/Debit cards for your convenience."
  }
];

export const SERVICES = [
  {
    id: 'outpatient',
    title: 'Outpatient Consultation',
    description: 'Our team of highly qualified medical officers and clinical officers provides round-the-clock primary care. We specialize in managing acute illnesses and chronic lifestyle conditions like Hypertension and Diabetes using the latest evidence-based guidelines. Patients benefit from rapid triage, professional diagnosis, and a holistic approach to wellness that prioritizes long-term health outcomes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'lab',
    title: 'Level 3 Laboratory Services',
    description: 'Equipped with cutting-edge automated hematology and biochemistry analyzers, our laboratory provides high-precision diagnostics. We offer a wide range of tests including Complete Blood Counts (CBC), Renal and Liver Function Tests (LFTs/RFTs), Lipid Profiles, and rapid infectious disease screenings. Results are processed under strict quality control protocols and shared promptly with patients via secure digital or physical reports for immediate clinical action.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.574.345l-2.387-.477a2 2 0 00-1.022.547l-1.1 1.1a2 2 0 000 2.828l1.265 1.265a2 2 0 11-2.828 2.828l-1.265-1.265a4 4 0 010-5.656l1.1-1.1a4 4 0 012.044-1.093l2.387.477a2 2 0 001.287-.173l.673-.337a8 8 0 015.147-.69l2.387.477a4 4 0 012.044 1.093l1.1 1.1a2 2 0 002.828 0l1.265-1.265a2 2 0 012.828 2.828l-1.265 1.265a4 4 0 01-5.656 0l-1.1-1.1z" />
      </svg>
    ),
  },
  {
    id: 'pharmacy',
    title: '24/7 Fully Stocked Pharmacy',
    description: 'Managed by licensed clinical pharmacists, our pharmacy ensures access to genuine, high-quality medications at all times. We utilize digital inventory management systems to maintain consistent stock of essential pediatric syrups, antibiotics, and chronic management drugs. Our staff provides professional counseling on medication adherence, potential side effects, and drug-food interactions to ensure optimal recovery for every patient.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: 'maternity',
    title: 'Maternity & Neonatal Care',
    description: 'We provide a compassionate and safe environment for expectant mothers, featuring modern labor suites and neonatal resuscitation equipment. Our experienced obstetric team offers comprehensive Antenatal (ANC) and Postnatal care, supported by ultrasound technology for fetal monitoring. We are dedicated to ensuring safe deliveries and the highest standards of neonatal health for the newest members of our community.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'specialized',
    title: 'Specialized Clinical Services',
    description: 'Access expert care in Pediatrics, Gynecology, and Internal Medicine within your neighborhood. We utilize modern diagnostic tools for comprehensive screenings, including cervical cancer screening (Pap Smears), pediatric growth monitoring, and gynecological consultations. Our specialized clinics bring consultant-level expertise to Mlolongo, ensuring you don\'t have to travel far for high-quality specialized health assessments.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'inpatient',
    title: 'Inpatient Care & Recovery',
    description: 'Our inpatient department offers 24-hour skilled nursing monitoring and medical supervision for patients requiring stabilization or post-procedural care. Wards are equipped with modern patient beds, central oxygen supply systems, and advanced monitoring equipment. We prioritize a safe, restful, and hygienic healing environment, ensuring patients receive nutritional support and constant care during their recovery journey.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'private-wing',
    title: 'Exclusive Private Wing',
    description: 'For patients seeking enhanced comfort and privacy, our Exclusive Private Wing offers premium amenities including private en-suite rooms, personalized nursing care, and a tranquil atmosphere designed for restful recovery. It combines our professional Level 3 medical expertise with the comfort of a home-like environment, ensuring a discrete and high-quality healing experience for those requiring focused individual attention.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
      </svg>
    ),
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "The staff at Renice were incredibly kind and professional. I brought my son for an emergency, and we were attended to almost immediately. Truly CARE FOR ALL.",
    name: "Jane D.",
    location: "Mlolongo Phase 3",
  },
  {
    id: 2,
    quote: "Fast lab results and very affordable pharmacy prices. I highly recommend Renice Medical Centre to anyone living in the Syokimau or Mlolongo area.",
    name: "Peter K.",
    location: "Syokimau Resident",
  },
  {
    id: 3,
    quote: "I delivered my first baby here. The maternity wing is clean, and the nurses were so supportive during my stay. Thank you for the wonderful care!",
    name: "Sarah M.",
    location: "Mlolongo Town",
  },
];

export const Logo = () => (
  <div className="flex items-center">
    <div className="relative w-16 h-16 md:w-20 md:h-20">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Definitions for circular text paths */}
        <defs>
          <path id="circlePathTop" d="M 40, 100 A 60, 60 0 0, 1 160, 100" />
          <path id="circlePathBottom" d="M 40, 100 A 60, 60 0 0, 0 160, 100" />
        </defs>
        
        {/* Blue Cross Outline */}
        <g transform="translate(100, 100)">
          <path 
            d="M -30,-10 H -10 V -30 Q -10,-35 0,-35 Q 10,-35 10,-30 V -10 H 30 Q 35,-10 35,0 Q 35,10 30,10 H 10 V 30 Q 10,35 0,35 Q -10,35 -10,30 V 10 H -30 Q -35,10 -35,0 Q -35,-10 -30,-10 Z" 
            fill="none" 
            stroke="#0072bc" 
            strokeWidth="8" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Teal Leaf in Center */}
        <g transform="translate(100, 100) scale(0.9)">
          <path 
            d="M 0,0 C 30,-30 40,-10 20,20 C 10,35 -15,15 -20,5 C -30,-10 -10,-20 0,0 Z" 
            fill="#26c2ad" 
          />
          <path 
            d="M 0,0 C 15,-20 20,-10 10,10 C 5,20 -5,10 -10,5" 
            fill="white" 
            opacity="0.3"
          />
        </g>

        {/* Circular Text */}
        <text fill="#26c2ad" fontSize="14" fontWeight="bold" letterSpacing="1">
          <textPath xlinkHref="#circlePathTop" startOffset="50%" textAnchor="middle">
            RENICE MEDICAL CENTER
          </textPath>
        </text>
        <text fill="#26c2ad" fontSize="16" fontWeight="bold" letterSpacing="1">
          <textPath xlinkHref="#circlePathBottom" startOffset="50%" textAnchor="middle">
            CARE FOR ALL
          </textPath>
        </text>
      </svg>
    </div>
  </div>
);
