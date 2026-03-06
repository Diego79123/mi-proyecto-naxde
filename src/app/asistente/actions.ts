'use server';

import { GoogleGenAI, Part } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateChatResponseAction(
  prompt: string, 
  history: any[],
  attachments: any[] = []
) {
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");
  const genAI = new GoogleGenAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `Eres un Experto en Estrategia de Redes Sociales y Branding para Naxde. Tu objetivo es ayudar a empresas a crear estrategias de contenido completas.
    Reglas:
    1. Responde en español.
    2. Usa Markdown.
    3. Si piden un logo o diseño, descríbelo y al final añade: [GENERATE_IMAGE: descripción en inglés]`,
  });

  const currentParts: Part[] = [{ text: prompt }];
  
  attachments.forEach(att => {
    currentParts.push({
      inlineData: {
        mimeType: att.mimeType,
        data: att.data
      }
    });
  });

  const chat = model.startChat({
    history: history.map(h => ({
      role: h.role,
      parts: h.parts
    })),
  });

  const result = await chat.sendMessage(currentParts);
  return result.response.text();
}

export async function generateImageAction(prompt: string, referenceImage?: { data: string; mimeType: string }) {
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");
  const genAI = new GoogleGenAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Nota: Ajustar al modelo de imagen si está disponible via SDK

  // Mock de generación para el ejemplo si el modelo de imagen no está disponible directamente
  // En una implementación real usarías el endpoint de Imagen vía Google Cloud o el SDK específico.
  return null; 
}
