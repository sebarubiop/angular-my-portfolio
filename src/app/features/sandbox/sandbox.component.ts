import { Component, OnInit, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of, BehaviorSubject, interval } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
    zipcode: string;
  };
  status: 'active' | 'inactive' | 'pending';
  lastLogin: Date;
  role: string;
}

interface TableColumn {
  key: keyof User | string;
  label: string;
  sortable: boolean;
  filterable: boolean;
  type: 'text' | 'email' | 'date' | 'status' | 'actions';
}

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ],
  template: `
    <div class="sandbox-container">
      <div class="sandbox-header">
        <h1 class="page-title">Component Sandbox</h1>
        <p class="page-subtitle">
          Comprehensive demo showcasing advanced data tables, multi-step forms, and real-time features
        </p>
      </div>

      <mat-tab-group class="sandbox-tabs" animationDuration="300ms">
        <!-- Data Table Tab -->
        <mat-tab label="Advanced Data Table">
          <div class="tab-content">
            <mat-card class="table-card">
              <mat-card-header>
                <mat-card-title>User Management Table</mat-card-title>
                <mat-card-subtitle>
                  Advanced table with sorting, filtering, pagination, and inline editing
                </mat-card-subtitle>
              </mat-card-header>
              
              <mat-card-content>
                <!-- Table Controls -->
                <div class="table-controls">
                  <div class="search-controls">
                    <mat-form-field appearance="outline" class="search-field">
                      <mat-label>Search users...</mat-label>
                      <input matInput 
                             [formControl]="searchControl" 
                             placeholder="Search by name, email, or company">
                      <mat-icon matSuffix>search</mat-icon>
                    </mat-form-field>
                    
                    <mat-form-field appearance="outline" class="filter-field">
                      <mat-label>Filter by Status</mat-label>
                      <mat-select [formControl]="statusFilterControl" multiple>
                        <mat-option value="active">Active</mat-option>
                        <mat-option value="inactive">Inactive</mat-option>
                        <mat-option value="pending">Pending</mat-option>
                      </mat-select>
                    </mat-form-field>
                  </div>
                  
                  <div class="action-controls">
                    <button mat-raised-button color="primary" (click)="addNewUser()">
                      <mat-icon>add</mat-icon>
                      Add User
                    </button>
                    <button mat-stroked-button (click)="exportData()">
                      <mat-icon>download</mat-icon>
                      Export
                    </button>
                    <button mat-stroked-button (click)="refreshData()">
                      <mat-icon>refresh</mat-icon>
                      Refresh
                    </button>
                  </div>
                </div>

                <!-- Loading Indicator -->
                <mat-progress-bar *ngIf="isLoading()" mode="indeterminate"></mat-progress-bar>

                <!-- Data Table -->
                <div class="table-container">
                  <table mat-table 
                         [dataSource]="paginatedData()" 
                         matSort 
                         (matSortChange)="onSortChange($event)"
                         class="user-table">
                    
                    <!-- Selection Column -->
                    <ng-container matColumnDef="select">
                      <th mat-header-cell *matHeaderCellDef>
                        <mat-checkbox 
                          [checked]="isAllSelected()"
                          [indeterminate]="isPartiallySelected()"
                          (change)="toggleAllSelection()">
                        </mat-checkbox>
                      </th>
                      <td mat-cell *matCellDef="let user">
                        <mat-checkbox 
                          [checked]="isSelected(user.id)"
                          (change)="toggleSelection(user.id)">
                        </mat-checkbox>
                      </td>
                    </ng-container>

                    <!-- Name Column -->
                    <ng-container matColumnDef="name">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                      <td mat-cell *matCellDef="let user">
                        <div *ngIf="!isEditing(user.id); else editName" class="cell-content">
                          {{ user.name }}
                        </div>
                        <ng-template #editName>
                          <mat-form-field appearance="outline" class="inline-edit">
                            <input matInput [(ngModel)]="editingUser.name">
                          </mat-form-field>
                        </ng-template>
                      </td>
                    </ng-container>

                    <!-- Email Column -->
                    <ng-container matColumnDef="email">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                      <td mat-cell *matCellDef="let user">
                        <div *ngIf="!isEditing(user.id); else editEmail" class="cell-content">
                          <a [href]="'mailto:' + user.email">{{ user.email }}</a>
                        </div>
                        <ng-template #editEmail>
                          <mat-form-field appearance="outline" class="inline-edit">
                            <input matInput type="email" [(ngModel)]="editingUser.email">
                          </mat-form-field>
                        </ng-template>
                      </td>
                    </ng-container>

                    <!-- Company Column -->
                    <ng-container matColumnDef="company">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Company</th>
                      <td mat-cell *matCellDef="let user">{{ user.company.name }}</td>
                    </ng-container>

                    <!-- Status Column -->
                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                      <td mat-cell *matCellDef="let user">
                        <div *ngIf="!isEditing(user.id); else editStatus">
                          <span class="status-badge" [class]="'status-' + user.status">
                            {{ user.status | titlecase }}
                          </span>
                        </div>
                        <ng-template #editStatus>
                          <mat-form-field appearance="outline" class="inline-edit">
                            <mat-select [(ngModel)]="editingUser.status">
                              <mat-option value="active">Active</mat-option>
                              <mat-option value="inactive">Inactive</mat-option>
                              <mat-option value="pending">Pending</mat-option>
                            </mat-select>
                          </mat-form-field>
                        </ng-template>
                      </td>
                    </ng-container>

                    <!-- Last Login Column -->
                    <ng-container matColumnDef="lastLogin">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Login</th>
                      <td mat-cell *matCellDef="let user">
                        {{ user.lastLogin | date:'short' }}
                      </td>
                    </ng-container>

                    <!-- Actions Column -->
                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef>Actions</th>
                      <td mat-cell *matCellDef="let user">
                        <div class="action-buttons">
                          <button *ngIf="!isEditing(user.id)" 
                                  mat-icon-button 
                                  (click)="startEdit(user)"
                                  matTooltip="Edit">
                            <mat-icon>edit</mat-icon>
                          </button>
                          <button *ngIf="isEditing(user.id)" 
                                  mat-icon-button 
                                  color="primary"
                                  (click)="saveEdit(user.id)"
                                  matTooltip="Save">
                            <mat-icon>save</mat-icon>
                          </button>
                          <button *ngIf="isEditing(user.id)" 
                                  mat-icon-button 
                                  (click)="cancelEdit()"
                                  matTooltip="Cancel">
                            <mat-icon>cancel</mat-icon>
                          </button>
                          <button *ngIf="!isEditing(user.id)" 
                                  mat-icon-button 
                                  color="warn"
                                  (click)="deleteUser(user.id)"
                                  matTooltip="Delete">
                            <mat-icon>delete</mat-icon>
                          </button>
                        </div>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                  </table>
                </div>

                <!-- Pagination -->
                <mat-paginator 
                  [length]="totalItems()"
                  [pageSize]="pageSize()"
                  [pageSizeOptions]="[5, 10, 25, 50]"
                  (page)="onPageChange($event)"
                  showFirstLastButtons>
                </mat-paginator>

                <!-- Selection Info -->
                <div *ngIf="selectedItems().length > 0" class="selection-info">
                  <span>{{ selectedItems().length }} item(s) selected</span>
                  <button mat-button color="warn" (click)="deleteSelected()">
                    <mat-icon>delete</mat-icon>
                    Delete Selected
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Multi-Step Form Tab -->
        <mat-tab label="Multi-Step Form">
          <div class="tab-content">
            <mat-card class="form-card">
              <mat-card-header>
                <mat-card-title>Project Registration Form</mat-card-title>
                <mat-card-subtitle>
                  Multi-step form with validation, conditional fields, and auto-save
                </mat-card-subtitle>
              </mat-card-header>
              
              <mat-card-content>
                <mat-stepper [linear]="true" #stepper>
                  <!-- Step 1: Basic Information -->
                  <mat-step [stepControl]="basicInfoForm" label="Basic Information">
                    <form [formGroup]="basicInfoForm" class="step-form">
                      <h3>Project Details</h3>
                      
                      <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Project Name</mat-label>
                          <input matInput formControlName="projectName" required>
                          <mat-error *ngIf="basicInfoForm.get('projectName')?.hasError('required')">
                            Project name is required
                          </mat-error>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Project Type</mat-label>
                          <mat-select formControlName="projectType" required>
                            <mat-option value="web">Web Application</mat-option>
                            <mat-option value="mobile">Mobile Application</mat-option>
                            <mat-option value="desktop">Desktop Application</mat-option>
                            <mat-option value="api">API Development</mat-option>
                          </mat-select>
                          <mat-error *ngIf="basicInfoForm.get('projectType')?.hasError('required')">
                            Project type is required
                          </mat-error>
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Start Date</mat-label>
                          <input matInput [matDatepicker]="startPicker" formControlName="startDate" required>
                          <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                          <mat-datepicker #startPicker></mat-datepicker>
                          <mat-error *ngIf="basicInfoForm.get('startDate')?.hasError('required')">
                            Start date is required
                          </mat-error>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>End Date</mat-label>
                          <input matInput [matDatepicker]="endPicker" formControlName="endDate">
                          <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                          <mat-datepicker #endPicker></mat-datepicker>
                        </mat-form-field>
                      </div>

                      <mat-form-field appearance="outline" class="form-field full-width">
                        <mat-label>Project Description</mat-label>
                        <textarea matInput 
                                  formControlName="description" 
                                  rows="4" 
                                  placeholder="Describe your project goals and requirements..."
                                  required>
                        </textarea>
                        <mat-error *ngIf="basicInfoForm.get('description')?.hasError('required')">
                          Description is required
                        </mat-error>
                        <mat-error *ngIf="basicInfoForm.get('description')?.hasError('minlength')">
                          Description must be at least 20 characters long
                        </mat-error>
                      </mat-form-field>

                      <div class="step-actions">
                        <button mat-raised-button 
                                color="primary" 
                                matStepperNext 
                                [disabled]="basicInfoForm.invalid">
                          Next
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Step 2: Technical Requirements -->
                  <mat-step [stepControl]="technicalForm" label="Technical Requirements">
                    <form [formGroup]="technicalForm" class="step-form">
                      <h3>Technology Stack</h3>
                      
                      <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Frontend Framework</mat-label>
                          <mat-select formControlName="frontend" multiple>
                            <mat-option value="angular">Angular</mat-option>
                            <mat-option value="react">React</mat-option>
                            <mat-option value="vue">Vue.js</mat-option>
                            <mat-option value="svelte">Svelte</mat-option>
                          </mat-select>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Backend Technology</mat-label>
                          <mat-select formControlName="backend" multiple>
                            <mat-option value="nodejs">Node.js</mat-option>
                            <mat-option value="python">Python</mat-option>
                            <mat-option value="java">Java</mat-option>
                            <mat-option value="csharp">C#</mat-option>
                            <mat-option value="php">PHP</mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Database</mat-label>
                          <mat-select formControlName="database">
                            <mat-option value="postgresql">PostgreSQL</mat-option>
                            <mat-option value="mysql">MySQL</mat-option>
                            <mat-option value="mongodb">MongoDB</mat-option>
                            <mat-option value="sqlite">SQLite</mat-option>
                            <mat-option value="redis">Redis</mat-option>
                          </mat-select>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Cloud Platform</mat-label>
                          <mat-select formControlName="cloud">
                            <mat-option value="aws">AWS</mat-option>
                            <mat-option value="azure">Azure</mat-option>
                            <mat-option value="gcp">Google Cloud</mat-option>
                            <mat-option value="vercel">Vercel</mat-option>
                            <mat-option value="netlify">Netlify</mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>

                      <!-- Dynamic Features Section -->
                      <div class="features-section">
                        <h4>Required Features</h4>
                        <div formArrayName="features">
                          <div *ngFor="let feature of featuresArray.controls; let i = index" 
                               [formGroupName]="i" 
                               class="feature-item">
                            <mat-form-field appearance="outline" class="feature-name">
                              <mat-label>Feature Name</mat-label>
                              <input matInput formControlName="name">
                            </mat-form-field>
                            <mat-form-field appearance="outline" class="feature-priority">
                              <mat-label>Priority</mat-label>
                              <mat-select formControlName="priority">
                                <mat-option value="high">High</mat-option>
                                <mat-option value="medium">Medium</mat-option>
                                <mat-option value="low">Low</mat-option>
                              </mat-select>
                            </mat-form-field>
                            <button mat-icon-button 
                                    color="warn" 
                                    (click)="removeFeature(i)"
                                    type="button">
                              <mat-icon>delete</mat-icon>
                            </button>
                          </div>
                        </div>
                        <button mat-stroked-button 
                                (click)="addFeature()" 
                                type="button"
                                class="add-feature-btn">
                          <mat-icon>add</mat-icon>
                          Add Feature
                        </button>
                      </div>

                      <div class="step-actions">
                        <button mat-button matStepperPrevious>Back</button>
                        <button mat-raised-button 
                                color="primary" 
                                matStepperNext 
                                [disabled]="technicalForm.invalid">
                          Next
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Step 3: Budget & Timeline -->
                  <mat-step [stepControl]="budgetForm" label="Budget & Timeline">
                    <form [formGroup]="budgetForm" class="step-form">
                      <h3>Project Budget & Timeline</h3>
                      
                      <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Budget Range</mat-label>
                          <mat-select formControlName="budgetRange" required>
                            <mat-option value="under-10k">Under $10,000</mat-option>
                            <mat-option value="10k-25k">$10,000 - $25,000</mat-option>
                            <mat-option value="25k-50k">$25,000 - $50,000</mat-option>
                            <mat-option value="50k-100k">$50,000 - $100,000</mat-option>
                            <mat-option value="over-100k">Over $100,000</mat-option>
                          </mat-select>
                          <mat-error *ngIf="budgetForm.get('budgetRange')?.hasError('required')">
                            Budget range is required
                          </mat-error>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Timeline (months)</mat-label>
                          <input matInput 
                                 type="number" 
                                 formControlName="timeline" 
                                 min="1" 
                                 max="24" 
                                 required>
                          <mat-error *ngIf="budgetForm.get('timeline')?.hasError('required')">
                            Timeline is required
                          </mat-error>
                          <mat-error *ngIf="budgetForm.get('timeline')?.hasError('min')">
                            Timeline must be at least 1 month
                          </mat-error>
                        </mat-form-field>
                      </div>

                      <div class="checkbox-group">
                        <h4>Additional Services</h4>
                        <mat-checkbox formControlName="maintenanceSupport">
                          Ongoing Maintenance & Support
                        </mat-checkbox>
                        <mat-checkbox formControlName="training">
                          Team Training
                        </mat-checkbox>
                        <mat-checkbox formControlName="documentation">
                          Comprehensive Documentation
                        </mat-checkbox>
                        <mat-checkbox formControlName="testing">
                          Quality Assurance Testing
                        </mat-checkbox>
                      </div>

                      <mat-form-field appearance="outline" class="form-field full-width">
                        <mat-label>Special Requirements</mat-label>
                        <textarea matInput 
                                  formControlName="specialRequirements" 
                                  rows="3" 
                                  placeholder="Any special requirements or constraints...">
                        </textarea>
                      </mat-form-field>

                      <div class="step-actions">
                        <button mat-button matStepperPrevious>Back</button>
                        <button mat-raised-button 
                                color="primary" 
                                matStepperNext 
                                [disabled]="budgetForm.invalid">
                          Next
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Step 4: Contact Information -->
                  <mat-step [stepControl]="contactForm" label="Contact Information">
                    <form [formGroup]="contactForm" class="step-form">
                      <h3>Contact Details</h3>
                      
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
                          <mat-label>Phone</mat-label>
                          <input matInput type="tel" formControlName="phone">
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Company</mat-label>
                          <input matInput formControlName="company" required>
                          <mat-error *ngIf="contactForm.get('company')?.hasError('required')">
                            Company is required
                          </mat-error>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Position</mat-label>
                          <input matInput formControlName="position">
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Preferred Contact Method</mat-label>
                          <mat-select formControlName="preferredContact">
                            <mat-option value="email">Email</mat-option>
                            <mat-option value="phone">Phone</mat-option>
                            <mat-option value="video">Video Call</mat-option>
                          </mat-select>
                        </mat-form-field>

                        <mat-form-field appearance="outline" class="form-field">
                          <mat-label>Time Zone</mat-label>
                          <mat-select formControlName="timezone">
                            <mat-option value="UTC-8">Pacific Time (UTC-8)</mat-option>
                            <mat-option value="UTC-5">Eastern Time (UTC-5)</mat-option>
                            <mat-option value="UTC+0">GMT (UTC+0)</mat-option>
                            <mat-option value="UTC+1">Central European Time (UTC+1)</mat-option>
                            <mat-option value="UTC+8">China Standard Time (UTC+8)</mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>

                      <div class="step-actions">
                        <button mat-button matStepperPrevious>Back</button>
                        <button mat-raised-button 
                                color="primary" 
                                matStepperNext 
                                [disabled]="contactForm.invalid">
                          Review
                        </button>
                      </div>
                    </form>
                  </mat-step>

                  <!-- Step 5: Review & Submit -->
                  <mat-step label="Review & Submit">
                    <div class="review-section">
                      <h3>Review Your Information</h3>
                      
                      <div class="review-cards">
                        <mat-card class="review-card">
                          <mat-card-header>
                            <mat-card-title>Project Details</mat-card-title>
                          </mat-card-header>
                          <mat-card-content>
                            <div class="review-item">
                              <strong>Name:</strong> {{ basicInfoForm.get('projectName')?.value }}
                            </div>
                            <div class="review-item">
                              <strong>Type:</strong> {{ basicInfoForm.get('projectType')?.value }}
                            </div>
                            <div class="review-item">
                              <strong>Start Date:</strong> {{ basicInfoForm.get('startDate')?.value | date }}
                            </div>
                            <div class="review-item">
                              <strong>Description:</strong> {{ basicInfoForm.get('description')?.value }}
                            </div>
                          </mat-card-content>
                        </mat-card>

                        <mat-card class="review-card">
                          <mat-card-header>
                            <mat-card-title>Technical Stack</mat-card-title>
                          </mat-card-header>
                          <mat-card-content>
                            <div class="review-item">
                              <strong>Frontend:</strong> {{ technicalForm.get('frontend')?.value?.join(', ') }}
                            </div>
                            <div class="review-item">
                              <strong>Backend:</strong> {{ technicalForm.get('backend')?.value?.join(', ') }}
                            </div>
                            <div class="review-item">
                              <strong>Database:</strong> {{ technicalForm.get('database')?.value }}
                            </div>
                            <div class="review-item">
                              <strong>Cloud:</strong> {{ technicalForm.get('cloud')?.value }}
                            </div>
                          </mat-card-content>
                        </mat-card>

                        <mat-card class="review-card">
                          <mat-card-header>
                            <mat-card-title>Budget & Timeline</mat-card-title>
                          </mat-card-header>
                          <mat-card-content>
                            <div class="review-item">
                              <strong>Budget:</strong> {{ budgetForm.get('budgetRange')?.value }}
                            </div>
                            <div class="review-item">
                              <strong>Timeline:</strong> {{ budgetForm.get('timeline')?.value }} months
                            </div>
                            <div class="review-item">
                              <strong>Additional Services:</strong>
                              <ul>
                                <li *ngIf="budgetForm.get('maintenanceSupport')?.value">Maintenance & Support</li>
                                <li *ngIf="budgetForm.get('training')?.value">Team Training</li>
                                <li *ngIf="budgetForm.get('documentation')?.value">Documentation</li>
                                <li *ngIf="budgetForm.get('testing')?.value">QA Testing</li>
                              </ul>
                            </div>
                          </mat-card-content>
                        </mat-card>

                        <mat-card class="review-card">
                          <mat-card-header>
                            <mat-card-title>Contact Information</mat-card-title>
                          </mat-card-header>
                          <mat-card-content>
                            <div class="review-item">
                              <strong>Name:</strong> 
                              {{ contactForm.get('firstName')?.value }} {{ contactForm.get('lastName')?.value }}
                            </div>
                            <div class="review-item">
                              <strong>Email:</strong> {{ contactForm.get('email')?.value }}
                            </div>
                            <div class="review-item">
                              <strong>Company:</strong> {{ contactForm.get('company')?.value }}
                            </div>
                            <div class="review-item">
                              <strong>Preferred Contact:</strong> {{ contactForm.get('preferredContact')?.value }}
                            </div>
                          </mat-card-content>
                        </mat-card>
                      </div>

                      <div class="step-actions">
                        <button mat-button matStepperPrevious>Back</button>
                        <button mat-raised-button 
                                color="primary" 
                                (click)="submitForm()"
                                [disabled]="isSubmitting()">
                          <mat-icon *ngIf="!isSubmitting()">send</mat-icon>
                          <mat-icon *ngIf="isSubmitting()" class="spinning">hourglass_empty</mat-icon>
                          {{ isSubmitting() ? 'Submitting...' : 'Submit Project' }}
                        </button>
                      </div>
                    </div>
                  </mat-step>
                </mat-stepper>

                <!-- Auto-save Indicator -->
                <div class="auto-save-indicator" *ngIf="autoSaveStatus()">
                  <mat-icon>{{ autoSaveStatus() === 'saving' ? 'sync' : 'check_circle' }}</mat-icon>
                  <span>{{ autoSaveStatus() === 'saving' ? 'Saving...' : 'Saved' }}</span>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Real-time Features Tab -->
        <mat-tab label="Real-time Features">
          <div class="tab-content">
            <div class="realtime-grid">
              <!-- Live Data Updates -->
              <mat-card class="realtime-card">
                <mat-card-header>
                  <mat-card-title>Live Data Updates</mat-card-title>
                  <mat-card-subtitle>Real-time metrics and statistics</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="metrics-grid">
                    <div class="metric-item">
                      <div class="metric-value">{{ liveMetrics().activeUsers }}</div>
                      <div class="metric-label">Active Users</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">{{ liveMetrics().totalProjects }}</div>
                      <div class="metric-label">Total Projects</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">{{ liveMetrics().completedTasks }}</div>
                      <div class="metric-label">Completed Tasks</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">{{ liveMetrics().revenue | currency }}</div>
                      <div class="metric-label">Revenue</div>
                    </div>
                  </div>
                  
                  <div class="update-indicator">
                    <mat-icon class="pulse">sync</mat-icon>
                    <span>Updates every 3 seconds</span>
                  </div>
                </mat-card-content>
              </mat-card>

              <!-- Error Handling Demo -->
              <mat-card class="realtime-card">
                <mat-card-header>
                  <mat-card-title>Error Handling</mat-card-title>
                  <mat-card-subtitle>Demonstrate error scenarios and recovery</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="error-demo-controls">
                    <button mat-raised-button 
                            color="warn" 
                            (click)="simulateError('network')">
                      Simulate Network Error
                    </button>
                    <button mat-raised-button 
                            color="warn" 
                            (click)="simulateError('validation')">
                      Simulate Validation Error
                    </button>
                    <button mat-raised-button 
                            color="warn" 
                            (click)="simulateError('server')">
                      Simulate Server Error
                    </button>
                  </div>
                  
                  <div *ngIf="errorState()" class="error-display">
                    <mat-icon color="warn">error</mat-icon>
                    <div class="error-content">
                      <h4>{{ errorState()?.title }}</h4>
                      <p>{{ errorState()?.message }}</p>
                      <button mat-button color="primary" (click)="retryOperation()">
                        <mat-icon>refresh</mat-icon>
                        Retry
                      </button>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .sandbox-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px 40px;
    }

    .sandbox-header {
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
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .sandbox-tabs {
      margin-bottom: 40px;
    }

    .tab-content {
      padding: 32px 0;
    }

    /* Table Styles */
    .table-card {
      margin-bottom: 24px;
    }

    .table-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      gap: 16px;
    }

    .search-controls {
      display: flex;
      gap: 16px;
      flex: 1;
    }

    .search-field {
      min-width: 300px;
    }

    .filter-field {
      min-width: 200px;
    }

    .action-controls {
      display: flex;
      gap: 12px;
    }

    .table-container {
      overflow-x: auto;
      margin-bottom: 16px;
    }

    .user-table {
      width: 100%;
      min-width: 800px;
    }

    .cell-content {
      display: flex;
      align-items: center;
    }

    .inline-edit {
      width: 100%;
      margin: -8px 0;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-active {
      background-color: #e8f5e8;
      color: #2e7d32;
    }

    .status-inactive {
      background-color: #ffebee;
      color: #c62828;
    }

    .status-pending {
      background-color: #fff3e0;
      color: #ef6c00;
    }

    .action-buttons {
      display: flex;
      gap: 4px;
    }

    .selection-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background-color: var(--primary-color-light);
      border-radius: 8px;
      margin-top: 16px;
    }

    /* Form Styles */
    .form-card {
      margin-bottom: 24px;
    }

    .step-form {
      padding: 24px 0;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-field {
      flex: 1;
    }

    .full-width {
      width: 100%;
    }

    .step-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 32px;
    }

    .features-section {
      margin: 24px 0;
      padding: 16px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
    }

    .feature-item {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 12px;
    }

    .feature-name {
      flex: 2;
    }

    .feature-priority {
      flex: 1;
    }

    .add-feature-btn {
      margin-top: 12px;
    }

    .checkbox-group {
      margin: 24px 0;
    }

    .checkbox-group mat-checkbox {
      display: block;
      margin-bottom: 12px;
    }

    .review-section {
      padding: 24px 0;
    }

    .review-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .review-card {
      height: fit-content;
    }

    .review-item {
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .review-item strong {
      color: var(--on-surface-color);
    }

    .auto-save-indicator {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background-color: var(--surface-color);
      border-radius: 24px;
      box-shadow: var(--shadow-md);
      font-size: 0.875rem;
      color: var(--on-surface-variant-color);
    }

    .spinning {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Real-time Features */
    .realtime-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .realtime-card {
      height: fit-content;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 24px;
    }

    .metric-item {
      text-align: center;
      padding: 16px;
      background-color: var(--surface-variant-color);
      border-radius: 8px;
    }

    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 8px;
    }

    .metric-label {
      font-size: 0.875rem;
      color: var(--on-surface-variant-color);
    }

    .update-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 0.875rem;
      color: var(--on-surface-variant-color);
    }

    .pulse {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .error-demo-controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .error-display {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      background-color: #ffebee;
      border-radius: 8px;
      border-left: 4px solid #f44336;
    }

    .error-content {
      flex: 1;
    }

    .error-content h4 {
      margin: 0 0 8px;
      color: #c62828;
    }

    .error-content p {
      margin: 0 0 12px;
      color: #666;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .sandbox-container {
        padding: 0 16px 40px;
      }

      .page-title {
        font-size: 2.5rem;
      }

      .table-controls {
        flex-direction: column;
        align-items: stretch;
      }

      .search-controls {
        flex-direction: column;
      }

      .action-controls {
        justify-content: center;
      }

      .form-row {
        flex-direction: column;
      }

      .feature-item {
        flex-direction: column;
        align-items: stretch;
      }

      .review-cards {
        grid-template-columns: 1fr;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
      }

      .realtime-grid {
        grid-template-columns: 1fr;
      }

      .auto-save-indicator {
        bottom: 16px;
        right: 16px;
      }
    }
  `]
})
export class SandboxComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Table data and state
  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);
  paginatedData = signal<User[]>([]);
  selectedItems = signal<number[]>([]);
  isLoading = signal(false);
  editingUserId = signal<number | null>(null);
  editingUser: any = {};

  // Pagination
  currentPage = signal(0);
  pageSize = signal(10);
  totalItems = computed(() => this.filteredUsers().length);

  // Table configuration
  displayedColumns = ['select', 'name', 'email', 'company', 'status', 'lastLogin', 'actions'];
  searchControl = this.fb.control('');
  statusFilterControl = this.fb.control<string[]>([]);

  // Form groups
  basicInfoForm!: FormGroup;
  technicalForm!: FormGroup;
  budgetForm!: FormGroup;
  contactForm!: FormGroup;

  // Form state
  isSubmitting = signal(false);
  autoSaveStatus = signal<'saving' | 'saved' | null>(null);

  // Real-time features
  liveMetrics = signal({
    activeUsers: 0,
    totalProjects: 0,
    completedTasks: 0,
    revenue: 0
  });

  errorState = signal<{title: string, message: string} | null>(null);

  constructor() {
    this.initializeForms();
    this.setupFormAutoSave();
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadUsers();
      this.setupTableFilters();
      this.startLiveMetrics();
    }
  }

  private initializeForms() {
    this.basicInfoForm = this.fb.group({
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });

    this.technicalForm = this.fb.group({
      frontend: [[]],
      backend: [[]],
      database: [''],
      cloud: [''],
      features: this.fb.array([])
    });

    this.budgetForm = this.fb.group({
      budgetRange: ['', Validators.required],
      timeline: ['', [Validators.required, Validators.min(1)]],
      maintenanceSupport: [false],
      training: [false],
      documentation: [false],
      testing: [false],
      specialRequirements: ['']
    });

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: ['', Validators.required],
      position: [''],
      preferredContact: ['email'],
      timezone: ['']
    });
  }

  get featuresArray() {
    return this.technicalForm.get('features') as FormArray;
  }

  addFeature() {
    const featureGroup = this.fb.group({
      name: ['', Validators.required],
      priority: ['medium', Validators.required]
    });
    this.featuresArray.push(featureGroup);
  }

  removeFeature(index: number) {
    this.featuresArray.removeAt(index);
  }

  private setupFormAutoSave() {
    // Auto-save functionality
    const allForms = [this.basicInfoForm, this.technicalForm, this.budgetForm, this.contactForm];
    
    allForms.forEach(form => {
      form.valueChanges.pipe(
        debounceTime(2000),
        distinctUntilChanged()
      ).subscribe(() => {
        this.autoSave();
      });
    });
  }

  private autoSave() {
    if (!this.isBrowser) return;
    
    this.autoSaveStatus.set('saving');
    
    // Simulate auto-save
    setTimeout(() => {
      const formData = {
        basicInfo: this.basicInfoForm.value,
        technical: this.technicalForm.value,
        budget: this.budgetForm.value,
        contact: this.contactForm.value
      };
      
      localStorage.setItem('sandbox-form-data', JSON.stringify(formData));
      this.autoSaveStatus.set('saved');
      
      setTimeout(() => {
        this.autoSaveStatus.set(null);
      }, 2000);
    }, 1000);
  }

  submitForm() {
    this.isSubmitting.set(true);
    
    const formData = {
      basicInfo: this.basicInfoForm.value,
      technical: this.technicalForm.value,
      budget: this.budgetForm.value,
      contact: this.contactForm.value
    };

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.snackBar.open('Project submitted successfully!', 'Close', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      
      // Clear saved data
      if (this.isBrowser) {
        localStorage.removeItem('sandbox-form-data');
      }
    }, 3000);
  }

  // Table methods
  private loadUsers() {
    this.isLoading.set(true);
    
    // Simulate API call with JSONPlaceholder
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map(users => users.map(user => ({
          ...user,
          status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as 'active' | 'inactive' | 'pending',
          lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          role: ['Admin', 'User', 'Manager'][Math.floor(Math.random() * 3)]
        }))),
        catchError(error => {
          this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
          return of([]);
        })
      )
      .subscribe(users => {
        this.users.set(users);
        this.filteredUsers.set(users);
        this.updatePaginatedData();
        this.isLoading.set(false);
      });
  }

  private setupTableFilters() {
    // Search filter
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });

    // Status filter
    this.statusFilterControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  private applyFilters() {
    let filtered = this.users();
    
    // Apply search filter
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.company.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    const statusFilter = this.statusFilterControl.value || [];
    if (statusFilter.length > 0) {
      filtered = filtered.filter(user => statusFilter.includes(user.status));
    }

    this.filteredUsers.set(filtered);
    this.currentPage.set(0);
    this.updatePaginatedData();
  }

  onSortChange(sort: Sort) {
    const data = this.filteredUsers().slice();
    
    if (!sort.active || sort.direction === '') {
      this.filteredUsers.set(data);
      return;
    }

    const sorted = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'company': return this.compare(a.company.name, b.company.name, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'lastLogin': return this.compare(a.lastLogin, b.lastLogin, isAsc);
        default: return 0;
      }
    });

    this.filteredUsers.set(sorted);
    this.updatePaginatedData();
  }

  private compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.updatePaginatedData();
  }

  private updatePaginatedData() {
    const startIndex = this.currentPage() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    this.paginatedData.set(this.filteredUsers().slice(startIndex, endIndex));
  }

  // Selection methods
  isSelected(id: number): boolean {
    return this.selectedItems().includes(id);
  }

  toggleSelection(id: number) {
    const selected = this.selectedItems();
    if (selected.includes(id)) {
      this.selectedItems.set(selected.filter(item => item !== id));
    } else {
      this.selectedItems.set([...selected, id]);
    }
  }

  isAllSelected(): boolean {
    const currentPageIds = this.paginatedData().map(user => user.id);
    return currentPageIds.length > 0 && currentPageIds.every(id => this.isSelected(id));
  }

  isPartiallySelected(): boolean {
    const currentPageIds = this.paginatedData().map(user => user.id);
    const selectedCount = currentPageIds.filter(id => this.isSelected(id)).length;
    return selectedCount > 0 && selectedCount < currentPageIds.length;
  }

  toggleAllSelection() {
    const currentPageIds = this.paginatedData().map(user => user.id);
    if (this.isAllSelected()) {
      const remaining = this.selectedItems().filter(id => !currentPageIds.includes(id));
      this.selectedItems.set(remaining);
    } else {
      const newSelected = [...this.selectedItems(), ...currentPageIds.filter(id => !this.isSelected(id))];
      this.selectedItems.set(newSelected);
    }
  }

  // Editing methods
  isEditing(id: number): boolean {
    return this.editingUserId() === id;
  }

  startEdit(user: User) {
    this.editingUserId.set(user.id);
    this.editingUser = { ...user };
  }

  saveEdit(id: number) {
    const users = this.users();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...this.editingUser };
      this.users.set([...users]);
      this.applyFilters();
    }
    this.cancelEdit();
    this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
  }

  cancelEdit() {
    this.editingUserId.set(null);
    this.editingUser = {};
  }

  deleteUser(id: number) {
    const users = this.users().filter(u => u.id !== id);
    this.users.set(users);
    this.applyFilters();
    this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
  }

  deleteSelected() {
    const selected = this.selectedItems();
    const users = this.users().filter(u => !selected.includes(u.id));
    this.users.set(users);
    this.selectedItems.set([]);
    this.applyFilters();
    this.snackBar.open(`${selected.length} user(s) deleted`, 'Close', { duration: 3000 });
  }

  addNewUser() {
    const newUser: User = {
      id: Math.max(...this.users().map(u => u.id)) + 1,
      name: 'New User',
      email: 'new.user@example.com',
      phone: '',
      website: '',
      company: { name: 'New Company' },
      address: { city: '', zipcode: '' },
      status: 'pending',
      lastLogin: new Date(),
      role: 'User'
    };
    
    this.users.set([newUser, ...this.users()]);
    this.applyFilters();
    this.startEdit(newUser);
  }

  exportData() {
    if (!this.isBrowser) {
      this.snackBar.open('Export not available during server rendering', 'Close', { duration: 3000 });
      return;
    }
    
    const data = this.filteredUsers();
    const csv = this.convertToCSV(data);
    this.downloadCSV(csv, 'users-export.csv');
    this.snackBar.open('Data exported successfully', 'Close', { duration: 3000 });
  }

  private convertToCSV(data: User[]): string {
    const headers = ['Name', 'Email', 'Company', 'Status', 'Last Login'];
    const rows = data.map(user => [
      user.name,
      user.email,
      user.company.name,
      user.status,
      user.lastLogin.toISOString()
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(csv: string, filename: string) {
    if (!this.isBrowser) return;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  refreshData() {
    this.loadUsers();
  }

  // Real-time features
  private startLiveMetrics() {
    if (!this.isBrowser) return;
    
    interval(3000).subscribe(() => {
      this.liveMetrics.set({
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        totalProjects: Math.floor(Math.random() * 100) + 200,
        completedTasks: Math.floor(Math.random() * 500) + 1000,
        revenue: Math.floor(Math.random() * 100000) + 50000
      });
    });
  }

  simulateError(type: 'network' | 'validation' | 'server') {
    const errors = {
      network: {
        title: 'Network Error',
        message: 'Unable to connect to the server. Please check your internet connection.'
      },
      validation: {
        title: 'Validation Error',
        message: 'The submitted data contains invalid values. Please review and try again.'
      },
      server: {
        title: 'Server Error',
        message: 'An internal server error occurred. Our team has been notified.'
      }
    };

    this.errorState.set(errors[type]);
  }

  retryOperation() {
    this.errorState.set(null);
    this.snackBar.open('Operation retried successfully', 'Close', { duration: 3000 });
  }
}