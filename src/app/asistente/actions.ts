'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export async function generateChatResponseAction(
    prompt: string,
    history: any[],
    attachments: any[] = []
) {
    if (!apiKey) throw new Error("GEMINI_API_KEY no configurada en el servidor");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const chat = model.startChat({
        history: history.map(item => ({
            role: item.role === 'model' ? 'model' : 'user',
            parts: item.parts.map((p: any) => ({ text: p.text || "" })),
        })),
        generationConfig: {
            maxOutputTokens: 2048,
        },
    });

    const currentParts: any[] = [{ text: prompt }];

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
        const result = await chat.sendMessage(currentParts);
        return result.response.text();
    } catch (error: any) {
        console.error("Gemini Chat Error:", error);
        throw new Error(error.message || "Error al generar respuesta");
    }
}

export async function generateImageAction(prompt: string, referenceImage?: { data: string; mimeType: string }) {
    if (!apiKey) throw new Error("GEMINI_API_KEY no configurada");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const parts: any[] = [{ text: prompt }];

    if (referenceImage) {
        parts.push({
            inlineData: {
                mimeType: referenceImage.mimeType,
                data: referenceImage.data
            }
        });
    }

    try {
        const result = await model.generateContent(parts);
        const response = await result.response;
        
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
