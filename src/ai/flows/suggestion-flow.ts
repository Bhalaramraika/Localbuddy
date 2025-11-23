
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const TaskSuggestionInputSchema = z.object({
  userSkills: z.array(z.string()).describe('A list of the user\'s skills.'),
  currentLocation: z.string().optional().describe('The user\'s current general location (e.g., city or neighborhood).'),
  taskHistory: z.array(z.object({
    title: z.string(),
    category: z.string(),
    completed: z.boolean(),
  })).optional().describe('A list of tasks the user has previously interacted with.'),
});

export type TaskSuggestionInput = z.infer<typeof TaskSuggestionInputSchema>;

export const TaskSuggestionOutputSchema = z.object({
  suggestions: z.array(z.object({
    title: z.string().describe('The suggested task title.'),
    category: z.string().describe('The category of the task.'),
    reasoning: z.string().describe('A brief explanation for why this task is a good suggestion for the user.'),
    estimatedEarning: z.number().describe('An estimated earning potential for this task in the local currency.'),
  })),
});

export type TaskSuggestionOutput = z.infer<typeof TaskSuggestionOutputSchema>;


const suggestionPrompt = ai.definePrompt({
    name: 'taskSuggestionPrompt',
    input: { schema: TaskSuggestionInputSchema },
    output: { schema: TaskSuggestionOutputSchema },
    prompt: `You are a helpful assistant in a cyberpunk-themed task-runner app. Your goal is to suggest relevant and interesting tasks to users.

    Based on the user's profile, suggest 3-5 tasks.

    User Profile:
    - Skills: {{#each userSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
    {{#if currentLocation}}- Location: {{{currentLocation}}}{{/if}}

    {{#if taskHistory}}
    Task History:
    {{#each taskHistory}}
    - "{{{title}}}" (Category: {{{category}}}, Completed: {{{completed}}})
    {{/each}}
    {{/if}}

    For each suggestion, provide a catchy title, a relevant category, a brief reasoning for the suggestion, and an estimated earning. The reasoning should be encouraging and align with the cyberpunk theme.
    `,
});


const getTaskSuggestionsFlow = ai.defineFlow(
  {
    name: 'getTaskSuggestionsFlow',
    inputSchema: TaskSuggestionInputSchema,
    outputSchema: TaskSuggestionOutputSchema,
  },
  async (input) => {
    const { output } = await suggestionPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate task suggestions.');
    }
    return output;
  }
);


export async function getTaskSuggestions(input: TaskSuggestionInput): Promise<TaskSuggestionOutput> {
  return getTaskSuggestionsFlow(input);
}
