
import { Component, signal } from '@angular/core';

import {
  CxpChatbotHeader,
  ChatbotWindowState
} from '../cxp-chatbot-header/cxp-chatbot-header';

import {
  CxpChatbotMessages,
  ChatbotMessage
} from '../cxp-chatbot-messages/cxp-chatbot-messages';

import {
  CxpChatbotFooter
} from '../cxp-chatbot-footer/cxp-chatbot-header';

@Component({
  selector: 'cxp-chatbot-main',
  standalone: true,
  imports: [
    CxpChatbotHeader,
    CxpChatbotMessages,
    CxpChatbotFooter
  ],
  templateUrl: './cxp-chatbot-main.html',
  styleUrl: './cxp-chatbot-main.css'
})
export class CxpChatbotMain {

  // Window State
  readonly windowState =
    signal<ChatbotWindowState>('minimized');

  // Conversation Messages
  readonly messages = signal<ChatbotMessage[]>([]);

  // AI Response Loading
  readonly loading = signal<boolean>(false);

  // Fullscreen
  maximize(): void {
    this.windowState.set('fullscreen');
  }

  // Medium Window
  restore(): void {
    this.windowState.set('medium');
  }

  // Minimized Window
  minimize(): void {
    this.windowState.set('minimized');
  }

  // Start New Conversation
  newChat(): void {
    this.messages.set([]);
  }

  // Receive Message from Footer
  onMessageSent(content: string): void {

    const message: ChatbotMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date()
    };

    this.messages.update(current => [
      ...current,
      message
    ]);

    // TODO: Connect SPEED-X AI API
  }
}
