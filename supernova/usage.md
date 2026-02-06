# Supernova Agent Rules

When using the codebase, follow these rules:

## Angular Basics

### Standalone Components
- Always use standalone components (`standalone: true` in @Component decorator)
- Import required modules directly in the component's `imports` array
- Do not create or use NgModules

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`,
})
export class ExampleComponent {}
```

### Component Structure
- Use inline templates for simple components (< 50 lines)
- Use inline styles for component-specific CSS
- Place the template before styles in the decorator
- Export components as default only when required by routing

### Template Syntax
- Use `@if` and `@for` control flow syntax (Angular 17+), not `*ngIf` and `*ngFor`
- Use signal-based reactivity where appropriate
- Prefer template expressions over complex logic in templates

```html
<!-- Preferred -->
@if (isVisible) {
  <div>Content</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

<!-- Avoid -->
<div *ngIf="isVisible">Content</div>
<div *ngFor="let item of items">{{ item.name }}</div>
```

### Data Binding
- Use `[(ngModel)]` for two-way binding with FormsModule
- Use `[property]` for property binding
- Use `(event)` for event binding
- Use `{{ expression }}` for interpolation

### Services and Dependency Injection
- Use `inject()` function instead of constructor injection
- Services should use `providedIn: 'root'` for singleton services

```typescript
export class MyComponent {
  private myService = inject(MyService);
}
```

## Angular Material

### Importing Components
- Import Material components individually from their standalone paths
- Each Material component has its own module (e.g., `MatButtonModule`, `MatCardModule`)

```typescript
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule],
  // ...
})
```

### Common Material Components

**Buttons:**
```html
<button mat-button>Basic</button>
<button mat-raised-button color="primary">Raised</button>
<button mat-flat-button color="accent">Flat</button>
<button mat-stroked-button>Stroked</button>
<button mat-icon-button><mat-icon>favorite</mat-icon></button>
<button mat-fab><mat-icon>add</mat-icon></button>
```

**Cards:**
```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Title</mat-card-title>
    <mat-card-subtitle>Subtitle</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>Content here</mat-card-content>
  <mat-card-actions>
    <button mat-button>Action</button>
  </mat-card-actions>
</mat-card>
```

**Form Fields:**
```html
<mat-form-field appearance="outline">
  <mat-label>Label</mat-label>
  <input matInput placeholder="Placeholder" />
  <mat-hint>Hint text</mat-hint>
  <mat-error>Error message</mat-error>
</mat-form-field>
```

**Form Controls:**
```html
<mat-checkbox>Check me</mat-checkbox>
<mat-slide-toggle>Toggle me</mat-slide-toggle>
<mat-radio-group>
  <mat-radio-button value="1">Option 1</mat-radio-button>
  <mat-radio-button value="2">Option 2</mat-radio-button>
</mat-radio-group>
```

### Material Icons
- Use `<mat-icon>icon_name</mat-icon>` for Material icons
- Import `MatIconModule` from `@angular/material/icon`
- Icon names use snake_case (e.g., `favorite`, `add_circle`, `arrow_back`)

### Theming
- Use `color="primary"`, `color="accent"`, or `color="warn"` for themed components
- The theme is configured globally in `styles.scss`

### Form Field Appearances
- `appearance="fill"` - Filled background (default)
- `appearance="outline"` - Outlined border

## Code Style

### Naming Conventions
- Components: PascalCase with `Component` suffix (e.g., `LoginFormComponent`)
- Services: PascalCase with `Service` suffix (e.g., `AuthService`)
- Selectors: kebab-case with `app-` prefix (e.g., `app-login-form`)
- Files: kebab-case (e.g., `login-form.component.ts`)

### TypeScript
- Use strict typing, avoid `any` where possible
- Use interfaces for data models
- Use `readonly` for immutable properties
- Prefer `const` over `let`

### Styling
- Use flexbox or CSS grid for layouts
- Use `gap` property for spacing between flex/grid items
- Prefer CSS custom properties for theming values
- Keep styles scoped to components

## File Structure

```
src/
├── app.component.ts      # Root component (AI generates code here)
├── app.config.ts         # Application configuration
├── main.ts               # Bootstrap entry point
├── styles.scss           # Global styles and Material theme
├── components/           # Shared components
├── services/             # Application services
└── lib/                  # Utilities and helpers
```

## Important Notes

1. The `app.component.ts` is where AI-generated code should be placed
2. Always import `FormsModule` when using `[(ngModel)]`
3. Material form fields require both `MatFormFieldModule` and the input module (e.g., `MatInputModule`)
4. Use `provideAnimations()` in app.config.ts for Material animations
5. Zone.js is imported in main.ts and required for Angular change detection
