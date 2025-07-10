import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let mockSnackBar: jest.Mocked<MatSnackBar>;

  beforeEach(async () => {
    mockSnackBar = {
      open: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize contact form with proper structure', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.get('firstName')).toBeTruthy();
    expect(component.contactForm.get('lastName')).toBeTruthy();
    expect(component.contactForm.get('email')).toBeTruthy();
    expect(component.contactForm.get('message')).toBeTruthy();
  });

  it('should validate required fields', () => {
    const form = component.contactForm;
    
    expect(form.get('firstName')?.hasError('required')).toBeTruthy();
    expect(form.get('lastName')?.hasError('required')).toBeTruthy();
    expect(form.get('email')?.hasError('required')).toBeTruthy();
    expect(form.get('message')?.hasError('required')).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should validate message minimum length', () => {
    const messageControl = component.contactForm.get('message');
    
    messageControl?.setValue('short');
    expect(messageControl?.hasError('minlength')).toBeTruthy();
    
    messageControl?.setValue('This is a longer message that meets the minimum requirement');
    expect(messageControl?.hasError('minlength')).toBeFalsy();
  });

  it('should submit form when valid', async () => {
    const form = component.contactForm;
    
    form.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message that is long enough'
    });

    expect(form.valid).toBeTruthy();
    
    component.onSubmit();
    expect(component.isSubmitting).toBeTruthy();

    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 2100));
    
    expect(mockSnackBar.open).toHaveBeenCalled();
    expect(component.isSubmitting).toBeFalsy();
  });

  it('should not submit form when invalid', () => {
    const form = component.contactForm;
    expect(form.valid).toBeFalsy();
    
    component.onSubmit();
    expect(component.isSubmitting).toBeFalsy();
    expect(mockSnackBar.open).not.toHaveBeenCalled();
  });

  it('should reset form', () => {
    const form = component.contactForm;
    
    form.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });

    component.resetForm();
    
    expect(form.get('firstName')?.value).toBeNull();
    expect(form.get('lastName')?.value).toBeNull();
    expect(form.get('email')?.value).toBeNull();
  });

  it('should display contact information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.method-value').textContent).toContain('sebastian.rubio');
    expect(compiled.textContent).toContain('+54 11 1234-5678');
    expect(compiled.textContent).toContain('Buenos Aires, Argentina');
  });

  it('should display FAQ section', () => {
    const faqItems = fixture.nativeElement.querySelectorAll('.faq-item');
    expect(faqItems.length).toBe(component.faqs.length);
    
    const firstFaq = faqItems[0];
    expect(firstFaq.textContent).toContain('How long does a typical project take?');
  });

  it('should have proper FAQ data structure', () => {
    expect(component.faqs).toBeDefined();
    expect(component.faqs.length).toBeGreaterThan(0);
    expect(component.faqs[0]).toHaveProperty('question');
    expect(component.faqs[0]).toHaveProperty('answer');
  });
});