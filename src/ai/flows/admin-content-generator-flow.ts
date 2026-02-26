'use server';
/**
 * @fileOverview An AI-powered content assistant for generating marketing copy, headlines, meta descriptions, or FAQ answers.
 *
 * - generateAdminContent - A function that generates various types of content for admin users.
 * - AdminContentGeneratorInput - The input type for the generateAdminContent function.
 * - AdminContentGeneratorOutput - The return type for the generateAdminContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminContentGeneratorInputSchema = z.object({
  contentType: z
    .enum(['marketing_copy', 'headline', 'meta_description', 'faq_answer', 'blog_post_idea', 'social_media_post'])
    .describe('The type of content to generate (e.g., marketing_copy, headline, meta_description, faq_answer).'),
  entityType: z
    .enum(['service', 'product', 'project', 'general'])
    .describe('The type of entity the content is for (e.g., service, product, project, or general for broader topics).'),
  entityName: z
    .string()
    .describe('The name of the service, product, or project.'),
  entityDescription: z
    .string()
    .describe('A detailed description of the entity or topic for which content is being generated.'),
  keywords: z
    .array(z.string())
    .optional()
    .describe('Optional keywords or phrases to incorporate into the generated content.'),
  tone: z
    .string()
    .optional()
    .describe('Optional tone for the generated content (e.g., professional, innovative, friendly, persuasive).'),
});
export type AdminContentGeneratorInput = z.infer<typeof AdminContentGeneratorInputSchema>;

const AdminContentGeneratorOutputSchema = z.object({
  generatedContent: z
    .string()
    .describe('The AI-generated content based on the input specifications.'),
});
export type AdminContentGeneratorOutput = z.infer<typeof AdminContentGeneratorOutputSchema>;

export async function generateAdminContent(
  input: AdminContentGeneratorInput
): Promise<AdminContentGeneratorOutput> {
  return adminContentGeneratorFlow(input);
}

const contentGeneratorPrompt = ai.definePrompt({
  name: 'adminContentGeneratorPrompt',
  input: {schema: AdminContentGeneratorInputSchema},
  output: {schema: AdminContentGeneratorOutputSchema},
  prompt: `You are an AI-powered content assistant for Naxde, a leading digital platform in Colombia and Latin America.
Naxde's mission is to "Construimos plataformas digitales que transforman negocios."
The company emphasizes a futuristic, premium brand identity, focusing on conversion, scalability, and security.

Your task is to generate specific content based on the provided details. Please provide only the requested content, without any additional conversational text, preambles, or explanations.

---
Content Type: "{{contentType}}"
Target Entity Type: "{{entityType}}"
Entity Name: "{{entityName}}"
Entity Description: "{{entityDescription}}"
{{#if keywords}}
Keywords to consider: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.
{{/if}}
{{#if tone}}
Desired Tone: "{{tone}}".
{{/if}}
---

Based on the above, generate the content.
If the content type is 'headline', generate 3-5 distinct options.
If the content type is 'meta_description', ensure it is concise, impactful, and around 150-160 characters, suitable for SEO.
`
});

const adminContentGeneratorFlow = ai.defineFlow(
  {
    name: 'adminContentGeneratorFlow',
    inputSchema: AdminContentGeneratorInputSchema,
    outputSchema: AdminContentGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await contentGeneratorPrompt(input);
    return output!;
  }
);
