
import {
  Component,
  input,
  effect,
  ElementRef,
  viewChild
} from '@angular/core';

export interface ChatbotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

@Component({
  selector: 'cxp-chatbot-messages',
  standalone: true,
  imports: [],
  templateUrl: './cxp-chatbot-messages.html',
  styleUrl: './cxp-chatbot-messages.css'
})
export class CxpChatbotMessages {

  readonly messages = input<ChatbotMessage[]>([]);
  readonly loading = input<boolean>(false);

  readonly scrollContainer =
    viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  constructor() {
    effect(() => {
      const messages = this.messages();
      const loading = this.loading();
      const container = this.scrollContainer();

      if (!container) return;

      // Schedule scrolling after Angular renders messages.
      queueMicrotask(() => {
        const element = container.nativeElement;

        if (element.isConnected) {
          element.scrollTop = element.scrollHeight;
        }
      });
    });
  }
}
