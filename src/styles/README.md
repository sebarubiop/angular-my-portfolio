# SCSS Architecture & Style Guide

This project uses a modular SCSS architecture with BEM naming conventions for better maintainability, scalability, and code reusability.

## 📁 File Structure

```
src/styles/
├── abstracts/
│   ├── _variables.scss    # CSS custom properties & SCSS variables
│   └── _mixins.scss       # Reusable mixins & functions
├── base/
│   ├── _reset.scss        # CSS reset & normalization
│   ├── _typography.scss   # Typography system
│   └── _utilities.scss    # Utility classes
├── components/
│   └── _material-overrides.scss  # Material Design overrides
├── themes/
│   ├── _light-theme.scss  # Light theme styles
│   └── _dark-theme.scss   # Dark theme styles
└── README.md              # This file
```

## 🎯 BEM Naming Convention

We use the **Block Element Modifier (BEM)** methodology:

```scss
// Block
.header { }

// Block__Element
.header__content { }
.header__actions { }

// Block__Element--Modifier
.header__action-btn--active { }

// Block--Modifier
.header--sticky { }
```

### Examples from Components:

```scss
// ✅ Good - BEM naming
.home {
  &__hero {
    &-title {
      &--highlight { }
    }
    &-actions { }
    &-cta {
      &--secondary { }
    }
  }
  &__stats {
    &-card { }
    &-icon { }
  }
}

// ❌ Bad - Inconsistent naming
.hero-section { }
.heroTitle { }
.primary-cta { }
.statCard { }
```

## 🎨 Design System

### CSS Custom Properties
All design tokens are defined as CSS custom properties for consistent theming:

```scss
// Colors
var(--primary-color)
var(--surface-color)
var(--on-surface-color)

// Spacing
var(--spacing-xs)   // 4px
var(--spacing-sm)   // 8px
var(--spacing-md)   // 16px
var(--spacing-lg)   // 24px

// Typography
var(--font-size-sm)
var(--font-weight-medium)
var(--line-height-base)

// Borders & Shadows
var(--border-radius-md)
var(--shadow-lg)
```

### Mixins Usage

```scss
// Layout mixins
@include container;
@include flex-center;
@include grid-auto-fit(300px);

// Button mixins
@include button-primary;
@include button-secondary;
@include button-ghost;

// Typography mixins
@include heading-1;
@include body-text;
@include small-text;

// Animation mixins
@include fade-in(0.6s);
@include slide-up;
@include hover-lift;

// Responsive mixins
@include respond-to('mobile') {
  // Mobile styles
}
```

## 🛠️ Component SCSS Structure

Each component should follow this structure:

```scss
// Component styles
// Brief description of component purpose

.component-name {
  // Base component styles
  @include mixins-used;
  
  // Component elements
  &__element {
    // Element styles
    
    &-sub-element {
      // Sub-element styles
    }
    
    &--modifier {
      // Element modifier
    }
  }
  
  // Component modifiers
  &--modifier {
    // Modifier styles
  }
}

// Additional selectors if needed
.component-name__element {
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
}
```

## 🎭 Utility Classes

Utility classes follow the `u-` prefix pattern:

```scss
// Display
.u-display--flex
.u-display--none

// Spacing
.u-margin--lg
.u-padding-x--md
.u-margin-top--xl

// Layout
.u-flex--center
.u-flex--between
.u-width--full

// Visibility
.u-hide--mobile
.u-show--tablet-only
.u-sr-only
```

## 🌓 Theming

Themes are implemented using CSS custom properties:

```scss
// Light theme (default in :root)
:root {
  --primary-color: #3F51B5;
  --surface-color: #FFFFFF;
}

// Dark theme override
.dark-theme {
  --primary-color: #7986CB;
  --surface-color: #1E1E1E;
}
```

## 📱 Responsive Design

Use predefined breakpoint mixins:

```scss
// Available breakpoints
$breakpoints: (
  'mobile': 768px,
  'tablet': 1024px,
  'desktop': 1200px,
  'wide': 1400px
);

// Usage
@include respond-to('mobile') {
  // Styles for mobile and below
}

@include respond-from('desktop') {
  // Styles for desktop and above
}
```

## ✅ Best Practices

1. **Use mixins** instead of repeating code
2. **Follow BEM naming** consistently
3. **Use CSS custom properties** for values that might change
4. **Organize imports** in the main styles.scss file
5. **Keep specificity low** - avoid deep nesting
6. **Use semantic class names** that describe purpose, not appearance
7. **Leverage utility classes** for common patterns
8. **Document complex mixins** with comments

## 🚫 Common Mistakes to Avoid

```scss
// ❌ Don't use camelCase
.heroSection { }

// ❌ Don't use deep nesting
.component {
  .inner {
    .nested {
      .too-deep { }
    }
  }
}

// ❌ Don't hardcode values
.element {
  margin: 16px;  // Use var(--spacing-md) instead
}

// ❌ Don't mix naming conventions
.component-name {
  &__elementName { }  // Should be &__element-name
}
```

## 🔧 Migration Guide

When refactoring existing components:

1. Identify the main **block** (component name)
2. Find **elements** (child components)
3. Identify **modifiers** (variations)
4. Replace hardcoded values with design tokens
5. Use mixins for common patterns
6. Add responsive behavior with breakpoint mixins
7. Test in both light and dark themes 