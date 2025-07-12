import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';

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
    MatExpansionModule,
    TranslateModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  isBrowser: boolean;

  faqs = [
    {
      question: 'contact.faq.q1',
      answer: 'contact.faq.a1'
    },
    {
      question: 'contact.faq.q2',
      answer: 'contact.faq.a2'
    },
    {
      question: 'contact.faq.q3',
      answer: 'contact.faq.a3'
    },
    {
      question: 'contact.faq.q4',
      answer: 'contact.faq.a4'
    },
    {
      question: 'contact.faq.q5',
      answer: 'contact.faq.a5'
    },
    {
      question: 'contact.faq.q6',
      answer: 'contact.faq.a6'
    }
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Initialize form with proper control names to match HTML template
    this.contactForm = this.fb.group({
      name: [''],
      email: [''],
      subject: [''],
      company: [''],
      projectType: [''],
      budget: [''],
      message: ['']
    });
  }

  ngOnInit(): void {
    // Re-initialize validators when running in browser
    if (this.isBrowser) {
      this.contactForm.get('name')?.setValidators([Validators.required]);
      this.contactForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.contactForm.get('subject')?.setValidators([Validators.required]);
      this.contactForm.get('message')?.setValidators([Validators.required, Validators.minLength(10)]);
      this.contactForm.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        // Here you would typically send the form data to your backend
        // this.contactService.submitForm(this.contactForm.value).subscribe(...)
      }, 2000);
    }
  }

  resetForm(): void {
    this.contactForm.reset();
  }
}