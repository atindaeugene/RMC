
import { GoogleGenAI } from "@google/genai";

export async function askHealthAssistant(prompt: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    // Create a new GoogleGenAI instance right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history.length > 0 
      ? [
          ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
          { role: 'user', parts: [{ text: prompt }] }
        ]
      : { parts: [{ text: prompt }] };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are the Renice Medical Centre AI Health Assistant. 
        Renice Medical Centre is a Level 3 Accredited facility in Mlolongo, Kenya.
        Our slogan is "CARE FOR ALL".
        Contacts: Phone +254 707 167 434, Email care@renicemedicacenter.co.ke or renicefamilyhospitalltd@gmail.com.
        You provide general health information and explain our services:
        - Outpatient (24/7 acute/chronic care)
        - Laboratory (High-precision Level 3 diagnostics)
        - Pharmacy (24/7 genuine medications)
        - Maternity (Safe delivery & neonatal care)
        - Specialized Clinics (Pediatrics, Gynecology, Internal Medicine)
        - Inpatient/Observation (Skilled recovery monitoring)
        - Private Wing (Premium en-suite rooms and personalized nursing care).
        ALWAYS clarify that you are an AI and not a doctor. 
        For emergencies or specific diagnoses, advise the user to visit Renice Medical Centre in Mlolongo or call +254 707 167 434.
        Be compassionate, professional, and helpful.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble connecting right now. Please call Renice Medical Centre directly at +254 707 167 434 for any health inquiries.";
  }
}
