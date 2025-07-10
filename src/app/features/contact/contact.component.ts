import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  template: `
    <div class="contact-container">
      <div class="contact-header">
        <h1 class="page-title">Get In Touch</h1>
        <p class="page-subtitle">
          I'm always interested in new opportunities and exciting projects. 
          Let's discuss how we can work together!
        </p>
      </div>

      <div class="contact-content">
        <!-- Contact Information -->
        <section class="contact-info-section">
          <mat-card class="contact-info-card">
            <mat-card-content>
              <h2 class="section-title">Contact Information</h2>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <div class="method-icon">
                    <mat-icon>email</mat-icon>
                  </div>
                  <div class="method-content">
                    <h4 class="method-title">Email</h4>
                    <p class="method-value">sebastian.rubio&#64;email.com</p>
                    <p class="method-description">Best way to reach me for project inquiries</p>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div class="contact-method">
                  <div class="method-icon">
                    <mat-icon>phone</mat-icon>
                  </div>
                  <div class="method-content">
                    <h4 class="method-title">Phone</h4>
                    <p class="method-value">+54 11 1234-5678</p>
                    <p class="method-description">Available Monday to Friday, 9 AM - 6 PM (ART)</p>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div class="contact-method">
                  <div class="method-icon">
                    <mat-icon>location_on</mat-icon>
                  </div>
                  <div class="method-content">
                    <h4 class="method-title">Location</h4>
                    <p class="method-value">Buenos Aires, Argentina</p>
                    <p class="method-description">Open to remote work and relocation</p>
                  </div>
                </div>

                <mat-divider></mat-divider>

                <div class="contact-method">
                  <div class="method-icon">
                    <mat-icon>schedule</mat-icon>
                  </div>
                  <div class="method-content">
                    <h4 class="method-title">Response Time</h4>
                    <p class="method-value">Within 24 hours</p>
                    <p class="method-description">I'll get back to you as soon as possible</p>
                  </div>
                </div>
              </div>

              <div class="social-links">
                <h3 class="social-title">Connect With Me</h3>
                <div class="social-buttons">
                  <button mat-fab class="social-btn linkedin">
                    <mat-icon>link</mat-icon>
                  </button>
                  <button mat-fab class="social-btn github">
                    <mat-icon>code</mat-icon>
                  </button>
                  <button mat-fab class="social-btn twitter">
                    <mat-icon>message</mat-icon>
                  </button>
                  <button mat-fab class="social-btn instagram">
                    <mat-icon>camera_alt</mat-icon>
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </section>

        <!-- Contact Form -->
        <section class="contact-form-section">
          <mat-card class="contact-form-card">
            <mat-card-content>
              <h2 class="section-title">Send Me a Message</h2>
              
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>First Name</mat-label>
                    <input matInput formControlName="firstName" required>
                    <mat-error *ngIf="contactForm.get('firstName')?.hasError('required')">
                      First name is required
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Last Name</mat-label>
                    <input matInput formControlName="lastName" required>
                    <mat-error *ngIf="contactForm.get('lastName')?.hasError('required')">
                      Last name is required
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Email</mat-label>
                    <input matInput type="email" formControlName="email" required>
                    <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                      Email is required
                    </mat-error>
                    <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                      Please enter a valid email
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Phone (Optional)</mat-label>
                    <input matInput type="tel" formControlName="phone">
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Company/Organization</mat-label>
                    <input matInput formControlName="company">
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Project Type</mat-label>
                    <mat-select formControlName="projectType">
                      <mat-option value="web-app">Web Application</mat-option>
                      <mat-option value="mobile-app">Mobile Application</mat-option>
                      <mat-option value="consultation">Consultation</mat-option>
                      <mat-option value="maintenance">Maintenance & Support</mat-option>
                      <mat-option value="other">Other</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-row full-width">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Budget Range</mat-label>
                    <mat-select formControlName="budget">
                      <mat-option value="under-5k">Under $5,000</mat-option>
                      <mat-option value="5k-15k">$5,000 - $15,000</mat-option>
                      <mat-option value="15k-30k">$15,000 - $30,000</mat-option>
                      <mat-option value="30k-50k">$30,000 - $50,000</mat-option>
                      <mat-option value="over-50k">Over $50,000</mat-option>
                      <mat-option value="discuss">Prefer to discuss</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>

                <div class="form-row full-width">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Message</mat-label>
                    <textarea 
                      matInput 
                      formControlName="message" 
                      rows="6" 
                      placeholder="Tell me about your project, timeline, and any specific requirements..."
                      required>
                    </textarea>
                    <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                      Message is required
                    </mat-error>
                    <mat-error *ngIf="contactForm.get('message')?.hasError('minlength')">
                      Message must be at least 10 characters long
                    </mat-error>
                  </mat-form-field>
                </div>

                <div class="form-actions">
                  <button 
                    mat-raised-button 
                    color="primary" 
                    type="submit" 
                    [disabled]="contactForm.invalid || isSubmitting"
                    class="submit-btn">
                    <mat-icon *ngIf="!isSubmitting">send</mat-icon>
                    <mat-icon *ngIf="isSubmitting" class="spinning">hourglass_empty</mat-icon>
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                  
                  <button 
                    mat-button 
                    type="button" 
                    (click)="resetForm()"
                    [disabled]="isSubmitting">
                    <mat-icon>refresh</mat-icon>
                    Reset Form
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </section>
      </div>

      <!-- FAQ Section -->
      <section class="faq-section">
        <mat-card class="faq-card">
          <mat-card-content>
            <h2 class="section-title">Frequently Asked Questions</h2>
            
            <div class="faq-grid">
              <div *ngFor="let faq of faqs" class="faq-item">
                <h4 class="faq-question">{{ faq.question }}</h4>
                <p class="faq-answer">{{ faq.answer }}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </section>
    </div>
  `,
  styles: [`
    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px 40px;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 48px;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      margin: 0 0 16px;
      color: var(--on-surface-color);
    }

    .page-subtitle {
      font-size: 1.25rem;
      color: var(--on-surface-variant-color);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 32px;
      margin-bottom: 48px;
    }

    .section-title {
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0 0 32px;
      color: var(--on-surface-color);
    }

    /* Contact Information */
    .contact-info-card {
      height: fit-content;
    }

    .contact-methods {
      margin-bottom: 32px;
    }

    .contact-method {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 24px 0;
    }

    .method-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: var(--on-primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .method-content {
      flex: 1;
    }

    .method-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 4px;
      color: var(--on-surface-color);
    }

    .method-value {
      font-size: 1rem;
      font-weight: 500;
      margin: 0 0 4px;
      color: var(--primary-color);
    }

    .method-description {
      font-size: 0.875rem;
      margin: 0;
      color: var(--on-surface-variant-color);
      line-height: 1.4;
    }

    /* Social Links */
    .social-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 16px;
      color: var(--on-surface-color);
      text-align: center;
    }

    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    .social-btn {
      width: 48px;
      height: 48px;
      transition: transform 0.3s ease;
    }

    .social-btn:hover {
      transform: scale(1.1);
    }

    .social-btn.linkedin {
      background-color: #0077b5;
      color: white;
    }

    .social-btn.github {
      background-color: #333;
      color: white;
    }

    .social-btn.twitter {
      background-color: #1da1f2;
      color: white;
    }

    .social-btn.instagram {
      background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
      color: white;
    }

    /* Contact Form */
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row {
      display: flex;
      gap: 16px;
    }

    .form-row.full-width {
      flex-direction: column;
    }

    .form-field {
      flex: 1;
    }

    .form-actions {
      display: flex;
      gap: 16px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    .submit-btn {
      min-width: 160px;
      height: 48px;
      font-size: 1rem;
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* FAQ Section */
    .faq-section {
      margin-top: 48px;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .faq-item {
      padding: 24px;
      background-color: var(--surface-variant-color);
      border-radius: 12px;
      border-left: 4px solid var(--primary-color);
    }

    .faq-question {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 12px;
      color: var(--on-surface-color);
    }

    .faq-answer {
      font-size: 0.875rem;
      line-height: 1.6;
      margin: 0;
      color: var(--on-surface-variant-color);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .contact-container {
        padding: 0 16px 40px;
      }

      .page-title {
        font-size: 2.5rem;
      }

      .page-subtitle {
        font-size: 1.125rem;
      }

      .contact-content {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .form-row {
        flex-direction: column;
        gap: 8px;
      }

      .form-actions {
        flex-direction: column;
        align-items: stretch;
      }

      .submit-btn {
        width: 100%;
      }

      .social-buttons {
        gap: 8px;
      }

      .social-btn {
        width: 40px;
        height: 40px;
      }

      .faq-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .page-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 1.5rem;
      }

      .contact-method {
        padding: 16px 0;
      }

      .method-icon {
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  contactForm: FormGroup;
  isSubmitting = false;

  faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity and scope. Simple websites may take 2-4 weeks, while complex applications can take 3-6 months. I provide detailed timeline estimates after understanding your requirements.'
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Absolutely! I work with clients worldwide and am comfortable with different time zones. I use modern collaboration tools to ensure smooth communication throughout the project.'
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'I specialize in Angular, React, TypeScript, and modern web technologies. I also have experience with Node.js, databases, and cloud platforms like AWS and Firebase.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, I offer maintenance and support packages for projects after completion. This includes bug fixes, updates, security patches, and minor feature enhancements.'
    },
    {
      question: 'Can you help with existing projects?',
      answer: 'Definitely! I can help improve existing codebases, add new features, optimize performance, or migrate to newer technologies. I start with a thorough code review and assessment.'
    },
    {
      question: 'What is your preferred payment structure?',
      answer: 'I typically work with milestone-based payments: 30% upfront, 40% at midpoint, and 30% on completion. For longer projects, we can discuss monthly payment schedules.'
    }
  ];

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      projectType: [''],
      budget: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.snackBar.open('Message sent successfully! I\'ll get back to you soon.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.resetForm();
      }, 2000);
    }
  }

  resetForm(): void {
    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.setErrors(null);
    });
  }
}