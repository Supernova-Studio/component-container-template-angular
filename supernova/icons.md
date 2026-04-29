# Icons

This project uses **Material Icons** via `<mat-icon>`. The icon font is loaded from Google Fonts CDN in `index.html`.

## Usage

```html
<mat-icon>icon_name</mat-icon>
```

Import `MatIconModule` from `@angular/material/icon` in the component's `imports` array.

## Commonly used icons

### Navigation
`home`, `menu`, `chevron_left`, `chevron_right`, `expand_more`, `arrow_back`, `arrow_forward`, `close`

### Actions
`add`, `edit`, `delete`, `search`, `settings`, `download`, `upload`, `sync`, `publish`, `share`

### Content
`widgets`, `palette`, `image`, `menu_book`, `description`, `code`, `insights`, `hub`

### Status
`check_circle`, `warning`, `error`, `info`, `pending`, `trending_up`, `trending_down`

### People
`account_circle`, `group`, `person_add`, `group_add`, `support_agent`

### Misc
`notifications_none`, `dark_mode`, `light_mode`, `bolt`, `auto_stories`, `design_services`, `monitor_heart`, `hexagon`, `rate_review`, `fiber_new`, `history`, `add_circle`, `dashboard_customize`

## Guidelines

- Use outlined style icons (the default) for consistency
- Prefer semantic icon names that describe the action, not the shape
- Always pair icon-only buttons with `[matTooltip]` for accessibility
- Browse the full catalog at https://fonts.google.com/icons
