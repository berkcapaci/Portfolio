import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactMail } from '../../core/services/contact-mail';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'message';

// Requires a dot in the domain, unlike Angular's built-in Validators.email
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly mail = inject(ContactMail);

  readonly status = signal<FormStatus>('idle');

  private readonly checkboxHovered = signal(false);

  get checkboxIcon(): string {
    const checked = this.form.controls.privacy.value;
    const hovered = this.checkboxHovered();

    if (checked && hovered) return 'icons/check_box_checked_hover.svg';
    if (checked) return 'icons/check_box_checked.svg';
    if (hovered) return 'icons/check_box_outline_blank_hover.svg';
    return 'icons/check_box_outline_blank.svg';
  }

  onCheckboxHover(state: boolean): void {
    this.checkboxHovered.set(state);
  }

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
    privacy: [false, Validators.requiredTrue],
  });

  // Errors are shown only after the user left the field (touched)
  errorMessage(field: FieldName): string {
    const control = this.form.controls[field];
    if (!control.touched || control.valid) return '';

    if (control.hasError('required')) {
      return {
        name: 'Oops! it seems your name is missing',
        email: 'Hoppla! your email is required',
        message: 'What do you need to develop?',
      }[field];
    }
    // Not from Figma
    return {
      name: 'Your name is too short',
      email: 'Please enter a valid email address',
      message: 'Your message is too short',
    }[field];
  }

  // True only when the field has content but fails a non-required rule
  // (the placeholder swap already handles the empty/required case)
  hasInlineError(field: FieldName): boolean {
    const control = this.form.controls[field];
    return control.touched && control.invalid && !control.hasError('required');
  }

  // Same touched/invalid rule for the checkbox
  get privacyError(): boolean {
    const control = this.form.controls.privacy;
    return control.touched && control.invalid;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.status() === 'sending') {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    const { name, email, message } = this.form.getRawValue();

    try {
      await this.mail.send({ name, email, message });
      this.status.set('success');
      // reset() also clears "touched", so no error flashes right after sending
      this.form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
