import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs-config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactMail {
  // Rejects on failure, so the caller can react with try/catch
  async send(payload: ContactPayload): Promise<void> {
    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      { ...payload },
      { publicKey: EMAILJS_CONFIG.publicKey }
    );
  }
}