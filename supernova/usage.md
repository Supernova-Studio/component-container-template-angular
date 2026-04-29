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
  imports: [CommonModule, MatButtonModule],
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
@if (isVisible) {
  <div>Content</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
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

This project uses [Angular Material](https://material.angular.io/) (`@angular/material` v19) as its component library. The prebuilt `azure-blue` theme is loaded globally via `src/index.css`, and Material Icons are available via Google Fonts CDN.

### How to import Material components

Import each module you need from its sub-entry point:

```typescript
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
```

Add them to the component's `imports` array:

```typescript
@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>My Card</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Card content here</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button>Action</button>
        <button mat-raised-button color="primary">Primary</button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class MyComponent {}
```

### Icons

Use `<mat-icon>` with the Material Icons font. Browse available icons at https://fonts.google.com/icons.

```html
<mat-icon>home</mat-icon>
<mat-icon>settings</mat-icon>
<mat-icon>chevron_left</mat-icon>
```

### Common patterns

**Toolbar with sidenav:**
```typescript
template: `
  <mat-sidenav-container>
    <mat-sidenav [opened]="open" mode="side">
      <mat-nav-list>
        @for (item of items; track item.label) {
          <a mat-list-item>
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.label }}</span>
          </a>
        }
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar>
        <button mat-icon-button (click)="open = !open">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Title</span>
      </mat-toolbar>
    </mat-sidenav-content>
  </mat-sidenav-container>
`
```

**Form with inputs:**
```typescript
imports: [MatFormFieldModule, MatInputModule, FormsModule],
template: `
  <mat-form-field appearance="outline">
    <mat-label>Name</mat-label>
    <input matInput [(ngModel)]="name" />
  </mat-form-field>
`
```

**Data table:**
```typescript
imports: [MatTableModule],
template: `
  <table mat-table [dataSource]="data">
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef>Name</th>
      <td mat-cell *matCellDef="let row">{{ row.name }}</td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>
`
```

## Custom Template

This repository uses Angular Material as its primary UI library. Build on the existing Material foundation rather than introducing additional libraries.

### Theming & Styling
- The prebuilt `azure-blue` theme is applied globally in `src/index.css`
- Use CSS custom properties in `index.css` for global theme tokens (colors, spacing, typography)
- Keep component styles scoped; use shared variables for consistency
- Use Material's built-in theming where possible (e.g. `color="primary"`)

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
├── index.css             # Global styles, Material theme import
├── components/           # Shared components
├── services/             # Application services
└── lib/                  # Utilities and helpers
```

## Important Notes

1. The `app.component.ts` is where AI-generated code should be placed
2. Always import `FormsModule` when using `[(ngModel)]`
3. Zone.js is imported in main.ts and required for Angular change detection
4. Angular Material is pre-installed — use it for buttons, cards, lists, toolbars, icons, etc.
5. Material Icons are loaded via CDN in `index.html`
