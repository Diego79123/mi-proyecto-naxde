'use server';

import { GoogleGenAI, Part } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateChatResponseAction(
    prompt: string,
    history: any[],
    attachments: any[] = []
) {
    if (!apiKey) throw new Error("GEMINI_API_KEY no configurada en el servidor");
    
    const ai = new GoogleGenAI({ apiKey });
    
    const currentParts: Part[] = [{ text: prompt }];

    // Procesamiento de imágenes adjuntas
    attachments.forEach(att => {
        if (att.isReference) {
            currentParts.push({ text: "REFERENCIA DE MARCA/LOGO INMUTABLE (MANTENER ORIGINAL):" });
        }
        currentParts.push({
            inlineData: {
                mimeType: att.mimeType,
                data: att.data
            }
        });
    });

    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [
                ...history,
                { role: "user", parts: currentParts }
            ],
            config: {
                systemInstruction: `Eres un Experto en Estrategia de Redes Sociales y Branding para Naxde. Tu objetivo es ayudar a empresas a crear estrategias de contenido completas, incluyendo textos para posts, captions, hashtags y conceptos visuales.

Reglas de respuesta:
1. Sé creativo, profesional y enfocado en resultados.
2. Utiliza Markdown para estructurar la respuesta (títulos, listas, negritas).
3. Si el usuario pide un logo, diseño de post o cualquier elemento visual, descríbelo detalladamente. 
4. Si hay una imagen marcada como referencia (isReference), indica explícitamente que se debe incluir ESE MISMO LOGO/IMAGEN sin alteraciones. 
5. Al final de tu respuesta, si sugeriste un diseño, incluye EXACTAMENTE el siguiente formato: [GENERATE_IMAGE: una descripción detallada en inglés para el modelo de generación de imágenes].
6. Responde siempre en español.
7. Si el usuario sube una imagen, analízala para dar contexto. Si está marcada como referencia, trátala como un activo de marca inmutable.`,
            },
        });

        return response.text;
    } catch (error: any) {
        console.error("Gemini Chat Error:", error);
        throw new Error(error.message || "Error al generar respuesta");
    }
}

export async function generateImageAction(prompt: string, referenceImage?: { data: string; mimeType: string }) {
    if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");
    
    const ai = new GoogleGenAI({ apiKey });
    const parts: any[] = [{ text: prompt }];

    if (referenceImage) {
        parts.unshift({
            inlineData: {
                mimeType: referenceImage.mimeType,
                data: referenceImage.data
            }
        });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: parts,
            },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                },
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Image Generation Error:", error);
        return null;
    }
}
