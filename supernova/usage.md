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

## Ionic Framework

### Importing Components
- Import Ionic components individually from `@ionic/angular/standalone`
- Each component is imported separately (e.g., `IonButton`, `IonCard`, `IonInput`)

```typescript
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/angular/standalone";

@Component({
  standalone: true,
  imports: [IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, IonInput, IonItem, IonLabel],
  // ...
})
```

### App Structure
- Always wrap the app content in `<ion-app>`
- Use `<ion-header>` with `<ion-toolbar>` for headers
- Use `<ion-content>` for scrollable page content

```html
<ion-app>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Page Title</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <!-- Page content here -->
  </ion-content>
</ion-app>
```

### Common Ionic Components

**Buttons:**
```html
<ion-button>Default</ion-button>
<ion-button color="primary">Primary</ion-button>
<ion-button color="secondary">Secondary</ion-button>
<ion-button fill="outline">Outline</ion-button>
<ion-button fill="clear">Clear</ion-button>
<ion-button expand="block">Full Width</ion-button>
<ion-button size="small">Small</ion-button>
```

**Cards:**
```html
<ion-card>
  <ion-card-header>
    <ion-card-title>Title</ion-card-title>
    <ion-card-subtitle>Subtitle</ion-card-subtitle>
  </ion-card-header>
  <ion-card-content>Content here</ion-card-content>
</ion-card>
```

**Form Inputs:**
```html
<ion-item>
  <ion-input
    label="Email"
    labelPlacement="floating"
    type="email"
    placeholder="Enter email"
  ></ion-input>
</ion-item>

<ion-item>
  <ion-textarea
    label="Message"
    labelPlacement="floating"
    placeholder="Enter message"
  ></ion-textarea>
</ion-item>
```

**Form Controls:**
```html
<ion-item>
  <ion-checkbox slot="start"></ion-checkbox>
  <ion-label>Check me</ion-label>
</ion-item>

<ion-item>
  <ion-toggle>Toggle me</ion-toggle>
</ion-item>

<ion-radio-group>
  <ion-item>
    <ion-radio value="1">Option 1</ion-radio>
  </ion-item>
  <ion-item>
    <ion-radio value="2">Option 2</ion-radio>
  </ion-item>
</ion-radio-group>
```

**Lists:**
```html
<ion-list>
  <ion-item>
    <ion-label>Item 1</ion-label>
  </ion-item>
  <ion-item>
    <ion-label>Item 2</ion-label>
  </ion-item>
</ion-list>
```

### Ionicons
- Use `<ion-icon name="icon-name"></ion-icon>` for icons
- Import `IonIcon` from `@ionic/angular/standalone`
- Icon names use kebab-case (e.g., `heart`, `add-circle`, `arrow-back`)
- Browse icons at https://ionic.io/ionicons

```html
<ion-icon name="heart"></ion-icon>
<ion-icon name="settings-outline"></ion-icon>
<ion-button>
  <ion-icon slot="start" name="add"></ion-icon>
  Add Item
</ion-button>
```

### Theming
- Use `color="primary"`, `color="secondary"`, `color="tertiary"`, `color="success"`, `color="warning"`, `color="danger"` for themed components
- The theme is configured globally in `styles.scss` via CSS custom properties

### Utility Classes
- `ion-padding` - Add padding to content
- `ion-margin` - Add margin
- `ion-text-center` - Center text
- `ion-hide` / `ion-show` - Show/hide elements

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
├── styles.scss           # Global styles and Ionic theme
├── components/           # Shared components
├── services/             # Application services
└── lib/                  # Utilities and helpers
```

## Important Notes

1. The `app.component.ts` is where AI-generated code should be placed
2. Always wrap content in `<ion-app>` as the root element
3. Always import `FormsModule` when using `[(ngModel)]`
4. Import each Ionic component individually from `@ionic/angular/standalone`
5. Use `<ion-item>` to wrap form inputs like `<ion-input>`, `<ion-checkbox>`, etc.
6. Zone.js is imported in main.ts and required for Angular change detection
7. Ionic styles are imported globally in `styles.scss`
