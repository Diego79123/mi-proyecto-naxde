'use server';
/**
 * @fileOverview Asistente de IA general para Naxde Digital Hub.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralAssistantInputSchema = z.object({
  message: z.string().describe('El mensaje enviado por el usuario.'),
});
export type GeneralAssistantInput = z.infer<typeof GeneralAssistantInputSchema>;

const GeneralAssistantOutputSchema = z.object({
  response: z.string().describe('La respuesta generada por la IA.'),
});
export type GeneralAssistantOutput = z.infer<typeof GeneralAssistantOutputSchema>;

export async function generalAssistant(input: GeneralAssistantInput): Promise<GeneralAssistantOutput> {
  return generalAssistantFlow(input);
}

const assistantPrompt = ai.definePrompt({
  name: 'generalAssistantPrompt',
  input: {schema: GeneralAssistantInputSchema},
  output: {schema: GeneralAssistantOutputSchema},
  prompt: `Eres el Asistente Inteligente de Naxde, un Hub Digital líder en Colombia y Latinoamérica.
Nuestra misión es: "Construimos plataformas digitales que transforman negocios."
Identidad de marca: Futurista, premium, enfocada en conversión, escalabilidad y seguridad.

Ayuda al usuario con sus dudas sobre nuestros servicios (Software, NFC, IA, Web), proyectos o contacto. 
Sé profesional, innovador y amable. Responde de forma concisa y directa.

Mensaje del usuario: {{{message}}}`
});

const generalAssistantFlow = ai.defineFlow(
  {
    name: 'generalAssistantFlow',
    inputSchema: GeneralAssistantInputSchema,
    outputSchema: GeneralAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await assistantPrompt(input);
    return output!;
  }
);
