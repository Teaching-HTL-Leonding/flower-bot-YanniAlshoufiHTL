import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../open-ai.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'app-answer-question',
    standalone: true,
    imports: [FormsModule, MarkdownModule],
    templateUrl: './answer-question.component.html',
    styleUrl: './answer-question.component.css',
})
export class AnswerQuestionComponent {
    question = signal('');
    answer = signal('');

    readonly openAiService = inject(OpenAIService);

    async answerQuestion() {
        const response = await this.openAiService.answerQuestion(this.question());
        this.answer.set(response.choices[0].message.content);
    }
}
