'use server';

import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateChatResponseAction(
    prompt: string,
    history: any[],
    attachments: any[] = []
) {
    if (!apiKey) throw new Error("GEMINI_API_KEY no configurada en el servidor");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Usamos gemini-2.0-flash que es el modelo más reciente y capaz
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: `Eres un Experto en Estrategia de Redes Sociales y Branding para Naxde. Tu objetivo es ayudar a empresas a crear estrategias de contenido completas, incluyendo textos para posts, captions, hashtags y conceptos visuales.

Reglas de respuesta:
1. Sé creativo, profesional y enfocado en resultados.
2. Utiliza Markdown para estructurar la respuesta (títulos, listas, negritas).
3. Si el usuario pide un logo, diseño de post o cualquier elemento visual, descríbelo detalladamente. 
4. Si hay una imagen marcada como referencia (isReference), indica explícitamente que se debe incluir ESE MISMO LOGO/IMAGEN sin alteraciones. 
5. Al final de tu respuesta, si sugeriste un diseño, incluye EXACTAMENTE el siguiente formato: [GENERATE_IMAGE: una descripción detallada en inglés para el modelo de generación de imágenes].
6. Responde siempre en español.
7. Si el usuario sube una imagen, analízala para dar contexto. Si está marcada como referencia, trátala como un activo de marca inmutable.`,
    });

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

    const chat = model.startChat({
        history: history.map(h => ({
            role: h.role,
            parts: h.parts,
        })),
    });

    try {
        const result = await chat.sendMessage(currentParts);
        return result.response.text();
    } catch (error: any) {
        console.error("Gemini Chat Error:", error);
        throw new Error(error.message || "Error al procesar el mensaje con Gemini");
    }
}

export async function generateImageAction(prompt: string, referenceImage?: { data: string; mimeType: string }) {
    if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    // Para generación de imágenes usamos el modelo flash con modalidad de imagen
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const parts: any[] = [{ text: `Generate a high-quality, professional image based on this description: ${prompt}. Cinematic lighting, 8k resolution, professional branding style.` }];

    if (referenceImage) {
        parts.unshift({
            inlineData: {
                mimeType: referenceImage.mimeType,
                data: referenceImage.data
            }
        });
    }

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;
        
        // Buscamos la parte que contiene los datos de la imagen generada
        const candidate = response.candidates?.[0];
        if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;
    } catch (error) {
        console.error("Image Generation Error:", error);
        return null;
    }
}
