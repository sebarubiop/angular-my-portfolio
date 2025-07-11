import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      projectType: [''],
      budgetRange: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Initialize component
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