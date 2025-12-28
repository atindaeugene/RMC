
// Fix: Import React to resolve the 'React' namespace for ReactNode types.
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface InsuranceProvider {
  name: string;
  logo: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
