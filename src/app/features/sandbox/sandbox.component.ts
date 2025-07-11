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
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Table Data
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

  // Table config
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

  // Real-time data
  liveMetrics = signal({
    activeUsers: 234,
    totalProjects: 18,
    completedTasks: 156,
    revenue: 45230
  });

  errorState = signal<{title: string, message: string} | null>(null);

  constructor() {
    this.initializeForms();
    this.setupFormAutoSave();
    this.loadUsers();
    this.setupTableFilters();
  }

  ngOnInit() {
    if (this.isBrowser) {
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
      timezone: ['UTC+0']
    });
  }

  get featuresArray() {
    return this.technicalForm.get('features') as FormArray;
  }

  addFeature() {
    const featureGroup = this.fb.group({
      name: [''],
      priority: ['medium']
    });
    this.featuresArray.push(featureGroup);
  }

  removeFeature(index: number) {
    this.featuresArray.removeAt(index);
  }

  private setupFormAutoSave() {
    const allForms = [
      this.basicInfoForm,
      this.technicalForm,
      this.budgetForm,
      this.contactForm
    ];

    allForms.forEach(form => {
      form.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
      ).subscribe(() => {
        this.autoSave();
      });
    });
  }

  private autoSave() {
    if (this.isBrowser) {
      this.autoSaveStatus.set('saving');
      
      const formData = {
        basic: this.basicInfoForm.value,
        technical: this.technicalForm.value,
        budget: this.budgetForm.value,
        contact: this.contactForm.value
      };

      localStorage.setItem('sandbox-form-data', JSON.stringify(formData));
      
      setTimeout(() => {
        this.autoSaveStatus.set('saved');
        setTimeout(() => {
          this.autoSaveStatus.set(null);
        }, 2000);
      }, 500);
    }
  }

  submitForm() {
    if (this.basicInfoForm.valid && this.technicalForm.valid && 
        this.budgetForm.valid && this.contactForm.valid) {
      
      this.isSubmitting.set(true);
      
      const formData = {
        basic: this.basicInfoForm.value,
        technical: this.technicalForm.value,
        budget: this.budgetForm.value,
        contact: this.contactForm.value
      };

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.snackBar.open('Form submitted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        
        if (this.isBrowser) {
          localStorage.removeItem('sandbox-form-data');
        }
      }, 2000);
    }
  }

  private loadUsers() {
    this.isLoading.set(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          website: 'john.dev',
          company: { name: 'Tech Corp' },
          address: { city: 'New York', zipcode: '10001' },
          status: 'active',
          lastLogin: new Date(),
          role: 'Admin'
        },
        // Add more mock users...
      ];
      
      this.users.set(mockUsers);
      this.filteredUsers.set(mockUsers);
      this.isLoading.set(false);
      this.updatePaginatedData();
    }, 1000);
  }

  private setupTableFilters() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.applyFilters();
    });

    this.statusFilterControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  private applyFilters() {
    let filtered = [...this.users()];
    
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
    const statusFilters = this.statusFilterControl.value || [];
    if (statusFilters.length > 0) {
      filtered = filtered.filter(user => statusFilters.includes(user.status));
    }

    this.filteredUsers.set(filtered);
    this.currentPage.set(0);
    this.updatePaginatedData();
  }

  onSortChange(sort: Sort) {
    const data = [...this.filteredUsers()];
    
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
    const paginated = this.filteredUsers().slice(startIndex, endIndex);
    this.paginatedData.set(paginated);
  }

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
    return this.paginatedData().length > 0 && 
           this.paginatedData().every(user => this.isSelected(user.id));
  }

  isPartiallySelected(): boolean {
    const selected = this.selectedItems();
    return selected.length > 0 && !this.isAllSelected();
  }

  toggleAllSelection() {
    if (this.isAllSelected()) {
      // Deselect all visible items
      const currentlySelected = this.selectedItems();
      const visibleIds = this.paginatedData().map(user => user.id);
      this.selectedItems.set(currentlySelected.filter(id => !visibleIds.includes(id)));
    } else {
      // Select all visible items
      const currentlySelected = this.selectedItems();
      const visibleIds = this.paginatedData().map(user => user.id);
      const newSelection = [...new Set([...currentlySelected, ...visibleIds])];
      this.selectedItems.set(newSelection);
    }
  }

  isEditing(id: number): boolean {
    return this.editingUserId() === id;
  }

  startEdit(user: User) {
    this.editingUserId.set(user.id);
    this.editingUser = { ...user };
  }

  saveEdit(id: number) {
    // Simulate save operation
    this.snackBar.open('User updated successfully!', 'Close', { duration: 2000 });
    this.editingUserId.set(null);
    this.editingUser = {};
  }

  cancelEdit() {
    this.editingUserId.set(null);
    this.editingUser = {};
  }

  deleteUser(id: number) {
    const users = this.users().filter(user => user.id !== id);
    this.users.set(users);
    this.applyFilters();
    this.snackBar.open('User deleted successfully!', 'Close', { duration: 2000 });
  }

  deleteSelected() {
    const selectedIds = this.selectedItems();
    const users = this.users().filter(user => !selectedIds.includes(user.id));
    this.users.set(users);
    this.selectedItems.set([]);
    this.applyFilters();
    this.snackBar.open(`${selectedIds.length} users deleted!`, 'Close', { duration: 2000 });
  }

  addNewUser() {
    const newUser: User = {
      id: Date.now(),
      name: 'New User',
      email: 'new@example.com',
      phone: '',
      website: '',
      company: { name: 'New Company' },
      address: { city: '', zipcode: '' },
      status: 'pending',
      lastLogin: new Date(),
      role: 'User'
    };
    
    this.users.set([...this.users(), newUser]);
    this.applyFilters();
    this.snackBar.open('New user added!', 'Close', { duration: 2000 });
  }

  exportData() {
    const csvData = this.convertToCSV(this.filteredUsers());
    this.downloadCSV(csvData, 'users-export.csv');
    this.snackBar.open('Data exported successfully!', 'Close', { duration: 2000 });
  }

  private convertToCSV(data: User[]): string {
    const headers = ['Name', 'Email', 'Company', 'Status', 'Last Login'];
    const rows = data.map(user => [
      user.name,
      user.email,
      user.company.name,
      user.status,
      user.lastLogin.toLocaleDateString()
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(csv: string, filename: string) {
    if (this.isBrowser) {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }

  refreshData() {
    this.loadUsers();
  }

  private startLiveMetrics() {
    interval(3000).subscribe(() => {
      this.liveMetrics.set({
        activeUsers: 234 + Math.floor(Math.random() * 20) - 10,
        totalProjects: 18 + Math.floor(Math.random() * 4) - 2,
        completedTasks: 156 + Math.floor(Math.random() * 10) - 5,
        revenue: 45230 + Math.floor(Math.random() * 1000) - 500
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
        message: 'The submitted data contains invalid values. Please review and correct.'
      },
      server: {
        title: 'Server Error',
        message: 'An internal server error occurred. Please try again later.'
      }
    };
    
    this.errorState.set(errors[type]);
  }

  retryOperation() {
    this.errorState.set(null);
    this.snackBar.open('Operation retried successfully!', 'Close', { duration: 2000 });
  }
}