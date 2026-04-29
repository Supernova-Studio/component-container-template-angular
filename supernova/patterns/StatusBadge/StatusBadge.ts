import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

// ============================================================================
// Types
// ============================================================================

export type StatusVariant = "success" | "warning" | "error" | "info" | "default";

export interface StatusConfig {
  id: string;
  label: string;
  icon: string;
  variant: StatusVariant;
}

// ============================================================================
// StatusBadge Component
// ============================================================================

@Component({
  selector: "status-badge",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  template: `
    <span
      class="badge"
      [class]="variant"
      [matTooltip]="tooltip"
    >
      @if (icon) {
        <mat-icon class="badge-icon">{{ icon }}</mat-icon>
      }
      <span class="badge-label">{{ label }}</span>
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 10px 2px 6px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        line-height: 1;
        white-space: nowrap;
        transition: opacity 0.15s;
        cursor: default;
      }

      .badge:hover {
        opacity: 0.85;
      }

      .badge-icon {
        font-size: 13px;
        width: 13px;
        height: 13px;
      }

      .badge-label {
        padding-top: 1px;
      }

      /* Variants */
      .success {
        background: hsl(var(--chart-2) / 0.12);
        color: hsl(var(--chart-2));
      }

      .warning {
        background: hsl(var(--chart-3) / 0.12);
        color: hsl(var(--chart-3));
      }

      .error {
        background: hsl(var(--destructive) / 0.12);
        color: hsl(var(--destructive));
      }

      .info {
        background: hsl(var(--chart-5) / 0.12);
        color: hsl(var(--chart-5));
      }

      .default {
        background: hsl(var(--muted));
        color: hsl(var(--muted-foreground));
      }
    `,
  ],
})
export class StatusBadgeComponent {
  @Input() label = "";
  @Input() icon = "";
  @Input() variant: StatusVariant = "default";
  @Input() tooltip = "";
}
