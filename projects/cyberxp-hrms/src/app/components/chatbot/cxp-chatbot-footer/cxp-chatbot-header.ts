
import {
  Component,
  signal,
  computed,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'cxp-chatbot-footer',
  standalone: true,
  imports: [],
  templateUrl: './cxp-chatbot-footer.html',
  styleUrl: './cxp-chatbot-footer.css'
})
export class CxpChatbotFooter {

  readonly message = signal('');

  readonly sending = input<boolean>(false);

  readonly canSend = computed(
    () => this.message().trim().length > 0 && !this.sending()
  );

  readonly messageSent = output<string>();

  onMessageInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.message.set(textarea.value);
  }

  onKeydown(event: KeyboardEvent): void {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.isComposing
    ) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    if (!this.canSend()) return;

    const text = this.message().trim();

    this.messageSent.emit(text);
    this.message.set('');
  }
}
