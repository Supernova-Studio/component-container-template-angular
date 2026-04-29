# Components

This project uses **Angular Material** (`@angular/material` v19). Prefer Material components over custom HTML for any standard UI element.

## Available modules

Import from `@angular/material/<module>`:

| Module | Key elements | Use for |
|--------|-------------|---------|
| `button` | `mat-button`, `mat-raised-button`, `mat-flat-button`, `mat-icon-button`, `mat-stroked-button` | All clickable actions |
| `card` | `mat-card`, `mat-card-content`, `mat-card-header`, `mat-card-actions` | Content containers, stat cards |
| `icon` | `mat-icon` | Icons (see icons.md) |
| `toolbar` | `mat-toolbar` | Top bars, headers |
| `sidenav` | `mat-sidenav-container`, `mat-sidenav`, `mat-sidenav-content` | App shell sidebar layouts |
| `list` | `mat-list`, `mat-nav-list`, `mat-list-item` | Navigation, feeds, data lists |
| `tabs` | `mat-tab-group`, `mat-tab` | Tabbed sections |
| `menu` | `mat-menu`, `mat-menu-item`, `[matMenuTriggerFor]` | Dropdowns, context menus |
| `divider` | `mat-divider` | Section separators |
| `progress-bar` | `mat-progress-bar` | Progress indicators, health bars |
| `chips` | `mat-chip`, `mat-chip-set` | Tags, filters, badges |
| `tooltip` | `[matTooltip]` | Hover hints |
| `form-field` | `mat-form-field`, `matInput` | Text inputs (requires `FormsModule` for `ngModel`) |
| `table` | `mat-table`, `mat-header-row`, `mat-row` | Data tables |
| `dialog` | `mat-dialog` | Modal dialogs |
| `snack-bar` | `MatSnackBar` | Toast notifications |
| `slide-toggle` | `mat-slide-toggle` | Boolean toggles |
| `select` | `mat-select`, `mat-option` | Dropdowns |
| `badge` | `[matBadge]` | Notification counts |

## Preferred patterns

- Use `mat-flat-button color="primary"` for primary actions, `mat-stroked-button` for secondary
- Use `mat-icon-button` for icon-only actions, always pair with `[matTooltip]`
- Use `mat-card` with `appearance="outlined"` for content panels
- Use `mat-nav-list` with `mat-list-item` for sidebar navigation
- Use `matRipple` directive on custom clickable elements for consistent touch feedback
- Use `mat-tab-group` for switching between views in the same context
