import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type OpenAIResponse = {
    choices: {
        message: {
            role: string;
            content: string;
        };
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
};

export type OpenAIMessage = {
    role: string;
    content: string;
};

@Injectable({
    providedIn: 'root',
})
export class OpenAIService {
    private readonly httpClient = inject(HttpClient);
    private readonly messages: OpenAIMessage[] = [];
    private systemPrompt =
        'Be a helpful assistant in a flower shop. Refuse answering anything that is not flower-related. Do not write code.';

    async answerQuestion(question: string): Promise<OpenAIResponse> {
        this.messages.push({
            role: 'user',
            content: question,
        });

        const messages = [
            {
                role: 'system',
                content: this.systemPrompt,
            },
            ...this.messages,
        ];

        console.log(messages);

        const response = firstValueFrom(
            this.httpClient.post<OpenAIResponse>(
                'http://localhost:3000/openai/deployments/gpt-4o-mini/chat/completions',
                { messages },
            ),
        );

        this.messages.push((await response).choices[0].message);
        return response;
    }

    getMessages(): OpenAIMessage[] {
        return this.messages;
    }

    clearChat(): void {
        this.messages.splice(0);
    }

    setSystemPrompt(systemPrompt: string): void {
        this.systemPrompt = systemPrompt;
    }
}
