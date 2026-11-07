
import { Component, input, output } from '@angular/core';

export type ChatbotWindowState =
  | 'fullscreen'
  | 'medium'
  | 'minimized';

@Component({
  selector: 'cxp-chatbot-header',
  standalone: true,
  imports: [],
  templateUrl: './cxp-chatbot-header.html',
  styleUrl: './cxp-chatbot-header.css'
})
export class CxpChatbotHeader {

  // Header Information
  readonly title = input<string>('SPEED-X AI');
  readonly subtitle = input<string>('AI Assistant');

  // Window State
  readonly windowState = input<ChatbotWindowState>('medium');

  // Header Actions
  readonly newChatClicked = output<void>();
  readonly minimizeClicked = output<void>();
  readonly maximizeClicked = output<void>();
  readonly restoreClicked = output<void>();

}
