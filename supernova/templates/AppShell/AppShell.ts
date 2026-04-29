import { Component, signal, inject, OnInit } from "@angular/core";
import { DOCUMENT, CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDividerModule } from "@angular/material/divider";
import { MatRippleModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";

// ============================================================================
// Types
// ============================================================================

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

// ============================================================================
// Mock Data
// ============================================================================

const MOCK_USER = {
  name: "Jamie Chen",
  email: "jamie@acme.com",
  initials: "JC",
  role: "Design Lead",
};

const MOCK_WORKSPACE = {
  name: "Acme Corp",
  initials: "AC",
};

const MOCK_DESIGN_SYSTEM = {
  name: "Acme Design System",
  version: "3.2.0",
  brand: "Default",
};

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { id: "overview", label: "Overview", icon: "home" },
      { id: "documentation", label: "Documentation", icon: "menu_book" },
      { id: "analytics", label: "Analytics", icon: "insights" },
      { id: "code-delivery", label: "Code delivery", icon: "code" },
    ],
  },
  {
    title: "Design system data",
    items: [
      { id: "tokens", label: "Design tokens", icon: "palette" },
      { id: "components", label: "Components", icon: "widgets" },
      { id: "assets", label: "Assets", icon: "image" },
      { id: "data-sources", label: "Data sources", icon: "hub" },
    ],
  },
];

const BOTTOM_NAV: NavItem[] = [
  { id: "search", label: "Search", icon: "search" },
  { id: "team", label: "Manage team", icon: "group_add" },
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "support", label: "Contact support", icon: "support_agent" },
];

// ============================================================================
// AppShell Component
// ============================================================================

@Component({
  selector: "app-shell",
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDividerModule,
    MatRippleModule,
    MatMenuModule,
  ],
  template: `
    <div class="app-shell">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="!sidebarExpanded()">
        <!-- Workspace header -->
        <div class="sidebar-header">
          <button class="workspace-switcher" (click)="sidebarExpanded.set(!sidebarExpanded())">
            <span class="workspace-avatar">{{ workspace.initials }}</span>
            @if (sidebarExpanded()) {
              <span class="workspace-info">
                <span class="workspace-name">{{ designSystem.name }}</span>
                <mat-icon class="workspace-chevron">expand_more</mat-icon>
              </span>
            }
          </button>
          @if (sidebarExpanded()) {
            <button class="user-avatar" [matMenuTriggerFor]="userMenu">
              <span>{{ user.initials }}</span>
            </button>
          }
        </div>

        <mat-menu #userMenu="matMenu">
          <div class="user-menu-header">
            <span class="user-name">{{ user.name }}</span>
            <span class="user-email">{{ user.email }}</span>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>account_circle</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>Sign out</span>
          </button>
        </mat-menu>

        <!-- Version & Brand (expanded only) -->
        @if (sidebarExpanded()) {
          <div class="version-bar">
            <div class="version-row">
              <span class="version-label">Version</span>
              <span class="version-value">{{ designSystem.version }}</span>
            </div>
            <div class="version-row">
              <span class="version-label">Brand</span>
              <span class="version-value">{{ designSystem.brand }}</span>
            </div>
          </div>
        }

        <!-- Navigation sections -->
        <nav class="sidebar-nav">
          <div class="nav-sections">
            @for (section of navSections; track section.title) {
              <div class="nav-section">
                @if (section.title && sidebarExpanded()) {
                  <span class="section-title">{{ section.title }}</span>
                }
                @for (item of section.items; track item.id) {
                  <button
                    class="nav-item"
                    [class.active]="selectedNavItem() === item.id"
                    [matTooltip]="sidebarExpanded() ? '' : item.label"
                    matTooltipPosition="right"
                    (click)="selectedNavItem.set(item.id)"
                  >
                    <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
                    @if (sidebarExpanded()) {
                      <span class="nav-label">{{ item.label }}</span>
                    }
                    @if (item.badge && sidebarExpanded()) {
                      <span class="nav-badge">{{ item.badge }}</span>
                    }
                  </button>
                }
              </div>
            }
          </div>

          <!-- Bottom nav -->
          <div class="nav-bottom">
            @for (item of bottomNav; track item.id) {
              <button
                class="nav-item"
                [class.active]="selectedNavItem() === item.id"
                [matTooltip]="sidebarExpanded() ? '' : item.label"
                matTooltipPosition="right"
                (click)="selectedNavItem.set(item.id)"
              >
                <mat-icon class="nav-icon">{{ item.icon }}</mat-icon>
                @if (sidebarExpanded()) {
                  <span class="nav-label">{{ item.label }}</span>
                }
              </button>
            }
          </div>
        </nav>

        <!-- Collapse toggle -->
        <div class="sidebar-footer">
          <mat-divider></mat-divider>
          <button class="collapse-toggle" (click)="sidebarExpanded.set(!sidebarExpanded())">
            <mat-icon>{{ sidebarExpanded() ? 'chevron_left' : 'chevron_right' }}</mat-icon>
          </button>
        </div>
      </aside>

      <!-- Collapse separator with hover toggle -->
      <div class="sidebar-separator" (click)="sidebarExpanded.set(!sidebarExpanded())">
        <div class="separator-handle">
          <mat-icon class="separator-icon">
            {{ sidebarExpanded() ? 'chevron_left' : 'chevron_right' }}
          </mat-icon>
        </div>
      </div>

      <!-- Main content -->
      <main class="main-content">
        <!-- Top bar -->
        <div class="top-bar">
          <span class="top-bar-spacer"></span>
          <button
            class="theme-toggle"
            [matTooltip]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            (click)="toggleTheme()"
          >
            <mat-icon class="theme-icon">{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
        </div>

        <div class="content-placeholder">
          <div class="placeholder-inner">
            <div class="placeholder-icon-wrapper">
              <mat-icon class="placeholder-icon">add</mat-icon>
            </div>
            <div class="placeholder-text">
              <span class="placeholder-title">Your content here</span>
              <span class="placeholder-subtitle">Replace this placeholder with your page content</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
        --sidebar-width: 248px;
        --sidebar-collapsed-width: 64px;
        --sidebar-bg: hsl(var(--sidebar));
        --sidebar-fg: hsl(var(--sidebar-foreground));
        --sidebar-border: hsl(var(--sidebar-border));
        --sidebar-accent-bg: hsl(var(--sidebar-accent));
        --sidebar-accent-fg: hsl(var(--sidebar-accent-foreground));
        --sidebar-muted: hsl(var(--muted-foreground));
      }

      .app-shell {
        display: flex;
        height: 100%;
        background: hsl(var(--background));
      }

      /* ---- Sidebar ---- */
      .sidebar {
        width: var(--sidebar-width);
        background: var(--sidebar-bg);
        color: var(--sidebar-fg);
        display: flex;
        flex-direction: column;
        transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        flex-shrink: 0;
        border-right: 1px solid var(--sidebar-border);
      }

      .sidebar.collapsed {
        width: var(--sidebar-collapsed-width);
      }

      /* ---- Workspace header ---- */
      .sidebar-header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        min-height: 56px;
      }

      .workspace-switcher {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px;
        border: none;
        background: none;
        color: var(--sidebar-fg);
        cursor: pointer;
        border-radius: 8px;
        flex: 1;
        min-width: 0;
        transition: background 0.15s;
      }

      .workspace-switcher:hover {
        background: var(--sidebar-accent-bg);
      }

      .workspace-avatar {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.02em;
        flex-shrink: 0;
      }

      .workspace-info {
        display: flex;
        align-items: center;
        min-width: 0;
        flex: 1;
      }

      .workspace-name {
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .workspace-chevron {
        font-size: 18px;
        width: 18px;
        height: 18px;
        margin-left: 2px;
        color: var(--sidebar-muted);
      }

      .user-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: hsl(var(--chart-2));
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 11px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: opacity 0.15s;
      }

      .user-avatar:hover {
        opacity: 0.85;
      }

      .user-menu-header {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .user-name {
        font-weight: 600;
        font-size: 14px;
        color: hsl(var(--foreground));
      }

      .user-email {
        font-size: 12px;
        color: hsl(var(--muted-foreground));
      }

      /* ---- Version bar ---- */
      .version-bar {
        padding: 8px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        border-bottom: 1px solid var(--sidebar-border);
      }

      .version-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .version-label {
        font-size: 11px;
        color: var(--sidebar-muted);
      }

      .version-value {
        font-size: 11px;
        font-weight: 600;
        color: var(--sidebar-fg);
      }

      /* ---- Navigation ---- */
      .sidebar-nav {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 12px 8px;
      }

      .nav-sections {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .nav-section {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .section-title {
        font-size: 11px;
        font-weight: 600;
        color: var(--sidebar-muted);
        padding: 4px 12px 6px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 7px 12px;
        border: none;
        background: none;
        color: var(--sidebar-muted);
        cursor: pointer;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        width: 100%;
        text-align: left;
        position: relative;
        transition: all 0.1s;
      }

      .nav-item:hover {
        background: var(--sidebar-accent-bg);
        color: var(--sidebar-accent-fg);
      }

      .nav-item.active {
        background: var(--sidebar-accent-bg);
        color: var(--sidebar-accent-fg);
        font-weight: 600;
      }

      .nav-item.active::before {
        content: '';
        position: absolute;
        left: -8px;
        top: 4px;
        bottom: 4px;
        width: 3px;
        border-radius: 0 3px 3px 0;
        background: hsl(var(--primary));
      }

      .nav-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }

      .nav-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
      }

      .nav-badge {
        font-size: 10px;
        font-weight: 700;
        background: hsl(var(--destructive));
        color: hsl(var(--destructive-foreground));
        padding: 1px 6px;
        border-radius: 10px;
        min-width: 18px;
        text-align: center;
      }

      .nav-bottom {
        display: flex;
        flex-direction: column;
        gap: 1px;
        margin-top: 16px;
      }

      /* ---- Sidebar footer ---- */
      .sidebar-footer {
        flex-shrink: 0;
      }

      .collapse-toggle {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        border: none;
        background: none;
        color: var(--sidebar-muted);
        cursor: pointer;
        transition: color 0.15s;
      }

      .collapse-toggle:hover {
        color: var(--sidebar-fg);
      }

      /* ---- Sidebar separator ---- */
      .sidebar-separator {
        position: relative;
        width: 12px;
        flex-shrink: 0;
        cursor: col-resize;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 44px;
      }

      .separator-handle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.15s;
        box-shadow: 0 1px 3px hsl(var(--shadow-color) / 0.08);
        margin-left: -4px;
      }

      .sidebar-separator:hover .separator-handle {
        opacity: 1;
      }

      .separator-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
        color: hsl(var(--muted-foreground));
      }

      /* ---- Main content ---- */
      .main-content {
        flex: 1;
        min-width: 0;
        background: hsl(var(--background));
        border-radius: 12px 0 0 0;
        border-top: 1px solid hsl(var(--border));
        border-left: 1px solid hsl(var(--border));
        overflow: auto;
        display: flex;
        flex-direction: column;
      }

      /* ---- Top bar ---- */
      .top-bar {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        flex-shrink: 0;
      }

      .top-bar-spacer {
        flex: 1;
      }

      .theme-toggle {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid hsl(var(--border));
        background: hsl(var(--card));
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        color: hsl(var(--muted-foreground));
      }

      .theme-toggle:hover {
        background: hsl(var(--accent));
        color: hsl(var(--foreground));
        border-color: hsl(var(--ring));
      }

      .theme-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .content-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 32px;
      }

      .placeholder-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        color: hsl(var(--muted-foreground));
      }

      .placeholder-icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        border: 2px dashed hsl(var(--border));
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .placeholder-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: hsl(var(--muted-foreground));
      }

      .placeholder-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }

      .placeholder-title {
        font-size: 16px;
        font-weight: 600;
        color: hsl(var(--foreground));
      }

      .placeholder-subtitle {
        font-size: 13px;
        color: hsl(var(--muted-foreground));
      }
    `,
  ],
})
export class AppShellComponent implements OnInit {
  private document = inject(DOCUMENT);

  sidebarExpanded = signal(true);
  selectedNavItem = signal("overview");
  isDark = signal(true);

  user = MOCK_USER;
  workspace = MOCK_WORKSPACE;
  designSystem = MOCK_DESIGN_SYSTEM;
  navSections = NAV_SECTIONS;
  bottomNav = BOTTOM_NAV;

  ngOnInit() {
    this.document.body.classList.add("dark");
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
    this.document.body.classList.toggle("dark", this.isDark());
  }
}
