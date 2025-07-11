import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

/**
 * Test helper utilities for Angular component testing
 */
export class TestHelpers {
  /**
   * Get element by CSS selector
   */
  static getElement<T extends HTMLElement>(
    fixture: ComponentFixture<any>,
    selector: string
  ): T | null {
    return fixture.nativeElement.querySelector(selector);
  }

  /**
   * Get all elements by CSS selector
   */
  static getAllElements<T extends HTMLElement>(
    fixture: ComponentFixture<any>,
    selector: string
  ): T[] {
    return Array.from(fixture.nativeElement.querySelectorAll(selector));
  }

  /**
   * Get debug element by CSS selector
   */
  static getDebugElement(
    fixture: ComponentFixture<any>,
    selector: string
  ): DebugElement | null {
    return fixture.debugElement.query(By.css(selector));
  }

  /**
   * Get all debug elements by CSS selector
   */
  static getAllDebugElements(
    fixture: ComponentFixture<any>,
    selector: string
  ): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
  }

  /**
   * Trigger click event on element
   */
  static clickElement(
    fixture: ComponentFixture<any>,
    selector: string
  ): void {
    const element = this.getElement(fixture, selector);
    if (element) {
      element.click();
      fixture.detectChanges();
    }
  }

  /**
   * Set input value and trigger input event
   */
  static setInputValue(
    fixture: ComponentFixture<any>,
    selector: string,
    value: string
  ): void {
    const input = this.getElement<HTMLInputElement>(fixture, selector);
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  /**
   * Wait for async operations to complete
   */
  static async waitForAsync(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 0));
  }

  /**
   * Create mock for Angular Material components
   */
  static createMatMock(componentName: string) {
    return {
      selector: componentName,
      template: `<ng-content></ng-content>`,
    };
  }

  /**
   * Create spy object with methods
   */
  static createSpyObj<T>(
    baseName: string,
    methodNames: (keyof T)[]
  ): jest.Mocked<T> {
    const obj: any = {};
    methodNames.forEach(name => {
      obj[name] = jest.fn();
    });
    return obj;
  }
}

/**
 * Mock data generators for testing
 */
export class MockDataGenerator {
  static generateUser() {
    return {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
    };
  }

  static generateProject() {
    return {
      id: '1',
      title: 'Test Project',
      description: 'A test project for unit testing',
      technologies: ['Angular', 'TypeScript'],
      image: 'https://example.com/image.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
    };
  }

  static generateContactForm() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      projectType: 'web-app',
      budget: '5k-15k',
      message: 'This is a test message for the contact form',
    };
  }
}

/**
 * Custom matchers for Jest
 */
export const customMatchers = {
  toHaveBeenCalledWithError: (received: jest.Mock, expectedError: string) => {
    const calls = received.mock.calls;
    const hasErrorCall = calls.some(call => 
      call.some((arg: { message: string; }) => arg instanceof Error && arg.message === expectedError)
    );
    
    return {
      message: () => `Expected function to have been called with error: ${expectedError}`,
      pass: hasErrorCall,
    };
  },
};