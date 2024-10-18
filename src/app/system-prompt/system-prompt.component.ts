import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../open-ai.service';

@Component({
    selector: 'app-system-prompt',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './system-prompt.component.html',
    styleUrl: './system-prompt.component.css',
})
export class SystemPromptComponent {
    protected systemPrompt = signal('');
    private openAiService = inject(OpenAIService);

    setSystemPrompt() {
        this.openAiService.setSystemPrompt(this.systemPrompt());
    }
}
