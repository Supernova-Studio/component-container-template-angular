import { Component, signal, inject, OnInit } from "@angular/core";
import { DOCUMENT, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatRippleModule } from "@angular/material/core";
import { MatChipsModule } from "@angular/material/chips";

import { StatusBadgeComponent } from "../../patterns/StatusBadge/StatusBadge.js";
import { MOCK_STATUSES } from "../../patterns/StatusBadge/mockData.js";
import dashboardConfig from "./assets/dashboard-config.json";

// ============================================================================
// Types
// ============================================================================

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeValue: number;
  icon: string;
  chartColor: string;
  sparkline: number[];
}

interface ActivityItem {
  id: string;
  user: string;
  initials: string;
  action: string;
  target: string;
  time: string;
  color: string;
  icon: string;
  statusId: string;
}

interface QuickAction {
  label: string;
  icon: string;
  description: string;
  color: string;
}

interface HealthItem {
  name: string;
  status: "healthy" | "warning" | "error";
  percentage: number;
  detail: string;
}

interface TeamMember {
  name: string;
  initials: string;
  role: string;
  color: string;
  status: "online" | "away" | "offline";
}

// ============================================================================
// Mock Data
// ============================================================================

const MOCK_USER = { name: "Jamie" };

const STATS: StatCard[] = [
  {
    title: "Components",
    value: "248",
    change: "+18",
    changeValue: 18,
    icon: "widgets",
    chartColor: "var(--chart-1)",
    sparkline: [30, 45, 35, 50, 42, 58, 65, 72, 68, 80, 75, 88],
  },
  {
    title: "Design Tokens",
    value: "1,842",
    change: "+64",
    changeValue: 64,
    icon: "palette",
    chartColor: "var(--chart-2)",
    sparkline: [40, 38, 45, 55, 60, 58, 70, 75, 82, 78, 85, 92],
  },
  {
    title: "Assets",
    value: "512",
    change: "-3",
    changeValue: -3,
    icon: "image",
    chartColor: "var(--chart-4)",
    sparkline: [60, 58, 62, 55, 52, 50, 48, 52, 50, 47, 45, 48],
  },
  {
    title: "Documentation",
    value: "89",
    change: "+12",
    changeValue: 12,
    icon: "menu_book",
    chartColor: "var(--chart-3)",
    sparkline: [20, 25, 22, 30, 35, 40, 38, 45, 50, 55, 60, 68],
  },
];

const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    user: "Alice Chen",
    initials: "AC",
    action: "updated",
    target: "Color / Primary token set",
    time: "2m ago",
    color: "var(--chart-1)",
    icon: "edit",
    statusId: "published",
  },
  {
    id: "2",
    user: "Marcus Rivera",
    initials: "MR",
    action: "published",
    target: "Button component v2.4",
    time: "18m ago",
    color: "var(--chart-2)",
    icon: "publish",
    statusId: "published",
  },
  {
    id: "3",
    user: "Sarah Kim",
    initials: "SK",
    action: "added",
    target: "Spacing / Layout guidelines",
    time: "1h ago",
    color: "var(--chart-3)",
    icon: "add_circle",
    statusId: "review",
  },
  {
    id: "4",
    user: "James Walsh",
    initials: "JW",
    action: "synced",
    target: "Figma source — Brand icons",
    time: "3h ago",
    color: "var(--chart-5)",
    icon: "sync",
    statusId: "draft",
  },
  {
    id: "5",
    user: "Emma Torres",
    initials: "ET",
    action: "reviewed",
    target: "Typography scale changes",
    time: "5h ago",
    color: "var(--chart-4)",
    icon: "rate_review",
    statusId: "new",
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  { label: "Import tokens", icon: "download", description: "From Figma or JSON", color: "var(--chart-1)" },
  { label: "Add component", icon: "add_circle", description: "Create new entry", color: "var(--chart-2)" },
  { label: "Generate docs", icon: "auto_stories", description: "AI-powered", color: "var(--chart-4)" },
  { label: "Sync sources", icon: "sync", description: "Pull latest", color: "var(--chart-3)" },
];

const HEALTH_ITEMS: HealthItem[] = [
  { name: "Token coverage", status: "healthy", percentage: 94, detail: "1,731 of 1,842 documented" },
  { name: "Component docs", status: "warning", percentage: 72, detail: "179 of 248 documented" },
  { name: "Asset naming", status: "healthy", percentage: 98, detail: "502 of 512 compliant" },
  { name: "A11y checks", status: "error", percentage: 61, detail: "12 components need fixes" },
];

const TEAM: TeamMember[] = [
  { name: "Alice Chen", initials: "AC", role: "Design Lead", color: "var(--chart-1)", status: "online" },
  { name: "Marcus Rivera", initials: "MR", role: "Engineer", color: "var(--chart-2)", status: "online" },
  { name: "Sarah Kim", initials: "SK", role: "Content", color: "var(--chart-3)", status: "away" },
  { name: "James Walsh", initials: "JW", role: "Design", color: "var(--chart-5)", status: "offline" },
];

// ============================================================================
// Dashboard Component
// ============================================================================

@Component({
  selector: "dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatChipsModule,
    StatusBadgeComponent,
  ],
  template: `
    <div class="dashboard">
      <!-- Welcome banner -->
      <section class="welcome-banner">
        <div class="welcome-content">
          <span class="welcome-greeting">Good {{ timeOfDay }}, {{ user.name }}</span>
          <h1>Acme Design System</h1>
          <span class="welcome-meta">
            <span class="meta-pill">v3.2.0</span>
            <span class="meta-pill">Default brand</span>
            <span class="meta-pill online">
              <span class="online-dot"></span>
              {{ onlineCount }} online
            </span>
          </span>
        </div>
        <div class="welcome-actions">
          <button class="theme-toggle" [matTooltip]="isDark() ? 'Light mode' : 'Dark mode'" (click)="toggleTheme()">
            <mat-icon>{{ isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          <button mat-stroked-button class="welcome-btn">
            <mat-icon>file_download</mat-icon>
            Export
          </button>
          <button mat-flat-button color="primary" class="welcome-btn">
            <mat-icon>add</mat-icon>
            New entry
          </button>
        </div>
      </section>

      <!-- Stats row -->
      <section class="stats-row">
        @for (stat of stats; track stat.title) {
          <button class="stat-card" matRipple>
            <div class="stat-top">
              <div class="stat-icon-wrap" [style.background]="'hsl(' + stat.chartColor + ' / 0.12)'" [style.color]="'hsl(' + stat.chartColor + ')'">
                <mat-icon>{{ stat.icon }}</mat-icon>
              </div>
              <span class="stat-change" [class.positive]="stat.changeValue > 0" [class.negative]="stat.changeValue < 0">
                <mat-icon class="change-arrow">{{ stat.changeValue > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                {{ stat.change }}
              </span>
            </div>
            <div class="stat-sparkline">
              <svg viewBox="0 0 120 32" preserveAspectRatio="none" class="sparkline-svg">
                <polyline
                  [attr.points]="getSparklinePoints(stat.sparkline)"
                  fill="none"
                  [attr.stroke]="'hsl(' + stat.chartColor + ')'"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <polyline
                  [attr.points]="getSparklineAreaPoints(stat.sparkline)"
                  [attr.fill]="'hsl(' + stat.chartColor + ' / 0.08)'"
                  stroke="none"
                />
              </svg>
            </div>
            <div class="stat-bottom">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-title">{{ stat.title }}</span>
            </div>
          </button>
        }
      </section>

      <!-- Tabs for main content -->
      <mat-tab-group class="dashboard-tabs" animationDuration="200ms">
        <mat-tab label="Overview">
          <div class="tab-content">
            <!-- Three-column grid -->
            <div class="grid-3col">
              <!-- Activity feed -->
              <div class="feed-card panel">
                <div class="panel-header">
                  <div class="panel-header-left">
                    <mat-icon class="panel-header-icon">history</mat-icon>
                    <span class="panel-header-title">Recent activity</span>
                  </div>
                  <button mat-button class="panel-header-action">View all</button>
                </div>
                <div class="activity-list">
                  @for (item of activity; track item.id) {
                    <div class="activity-item" matRipple>
                      <div class="activity-left">
                        <div class="activity-avatar" [style.background]="'hsl(' + item.color + ')'">
                          {{ item.initials }}
                        </div>
                        <div class="activity-line"></div>
                      </div>
                      <div class="activity-content">
                        <div class="activity-row">
                          <span class="activity-text">
                            <strong>{{ item.user }}</strong>
                            <span class="activity-action-text">{{ item.action }}</span>
                          </span>
                          <span class="activity-time">{{ item.time }}</span>
                        </div>
                        <div class="activity-target-row">
                          <span class="activity-target">
                            <mat-icon class="activity-target-icon">{{ item.icon }}</mat-icon>
                            {{ item.target }}
                          </span>
                          <status-badge
                            [label]="getStatusConfig(item.statusId).label"
                            [icon]="getStatusConfig(item.statusId).icon"
                            [variant]="getStatusConfig(item.statusId).variant"
                          ></status-badge>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Quick actions + Team -->
              <div class="mid-column">
                <!-- Quick actions -->
                <div class="panel">
                  <div class="panel-header">
                    <div class="panel-header-left">
                      <mat-icon class="panel-header-icon">bolt</mat-icon>
                      <span class="panel-header-title">Quick actions</span>
                    </div>
                  </div>
                  <div class="actions-list">
                    @for (action of quickActions; track action.label) {
                      <button class="action-row" matRipple>
                        <div class="action-icon-wrap" [style.background]="'hsl(' + action.color + ' / 0.12)'" [style.color]="'hsl(' + action.color + ')'">
                          <mat-icon>{{ action.icon }}</mat-icon>
                        </div>
                        <div class="action-text">
                          <span class="action-label">{{ action.label }}</span>
                          <span class="action-desc">{{ action.description }}</span>
                        </div>
                        <mat-icon class="action-chevron">chevron_right</mat-icon>
                      </button>
                    }
                  </div>
                </div>

                <!-- Team -->
                <div class="panel">
                  <div class="panel-header">
                    <div class="panel-header-left">
                      <mat-icon class="panel-header-icon">group</mat-icon>
                      <span class="panel-header-title">Team</span>
                    </div>
                    <button mat-icon-button class="panel-header-action-icon" matTooltip="Invite">
                      <mat-icon>person_add</mat-icon>
                    </button>
                  </div>
                  <div class="team-list">
                    @for (member of team; track member.name) {
                      <div class="team-member">
                        <div class="team-avatar-wrap">
                          <div class="team-avatar" [style.background]="'hsl(' + member.color + ')'">{{ member.initials }}</div>
                          <span class="team-status" [class]="member.status"></span>
                        </div>
                        <div class="team-info">
                          <span class="team-name">{{ member.name }}</span>
                          <span class="team-role">{{ member.role }}</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- System health -->
              <div class="panel health-panel">
                <div class="panel-header">
                  <div class="panel-header-left">
                    <mat-icon class="panel-header-icon">monitor_heart</mat-icon>
                    <span class="panel-header-title">System health</span>
                  </div>
                </div>

                <!-- Overall score -->
                <div class="health-score">
                  <div class="score-ring">
                    <svg viewBox="0 0 80 80" class="score-svg">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--border))" stroke-width="6" />
                      <circle
                        cx="40" cy="40" r="34"
                        fill="none"
                        stroke="hsl(var(--chart-2))"
                        stroke-width="6"
                        stroke-linecap="round"
                        stroke-dasharray="213.6"
                        stroke-dashoffset="32"
                        transform="rotate(-90 40 40)"
                      />
                    </svg>
                    <span class="score-text">85%</span>
                  </div>
                  <span class="score-label">Overall health</span>
                </div>

                <div class="health-list">
                  @for (item of healthItems; track item.name) {
                    <div class="health-item">
                      <div class="health-top">
                        <span class="health-name">
                          <span class="health-dot" [class]="item.status"></span>
                          {{ item.name }}
                        </span>
                        <span class="health-pct">{{ item.percentage }}%</span>
                      </div>
                      <div class="health-bar-track">
                        <div
                          class="health-bar-fill"
                          [class]="item.status"
                          [style.width.%]="item.percentage"
                        ></div>
                      </div>
                      <span class="health-detail">{{ item.detail }}</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </mat-tab>
        <mat-tab label="Components">
          <div class="tab-content tab-placeholder">
            <mat-icon class="tab-placeholder-icon">widgets</mat-icon>
            <span>Component browser coming soon</span>
          </div>
        </mat-tab>
        <mat-tab label="Tokens">
          <div class="tab-content tab-placeholder">
            <mat-icon class="tab-placeholder-icon">palette</mat-icon>
            <span>Token explorer coming soon</span>
          </div>
        </mat-tab>
        <mat-tab label="Analytics">
          <div class="tab-content tab-placeholder">
            <mat-icon class="tab-placeholder-icon">insights</mat-icon>
            <span>Analytics dashboard coming soon</span>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .dashboard {
        padding: 28px 36px;
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      /* ---- Welcome banner ---- */
      .welcome-banner {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 28px 32px;
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        border-radius: calc(var(--radius) * 1.5);
        position: relative;
        overflow: hidden;
      }

      .welcome-banner::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 100%;
        background: linear-gradient(135deg, transparent 30%, hsl(var(--primary) / 0.04) 100%);
        pointer-events: none;
      }

      .welcome-greeting {
        font-size: 13px;
        color: hsl(var(--muted-foreground));
        font-weight: 500;
      }

      .welcome-content h1 {
        margin: 4px 0 12px;
        font-size: 26px;
        font-weight: 700;
        color: hsl(var(--foreground));
        letter-spacing: -0.03em;
        line-height: 1.1;
      }

      .welcome-meta {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      .meta-pill {
        font-size: 11px;
        font-weight: 600;
        padding: 3px 10px;
        border-radius: 20px;
        background: hsl(var(--muted));
        color: hsl(var(--muted-foreground));
      }

      .meta-pill.online {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .online-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: hsl(var(--chart-2));
      }

      .welcome-actions {
        display: flex;
        gap: 8px;
        align-items: center;
        z-index: 1;
      }

      .welcome-btn {
        white-space: nowrap;
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
      }

      .theme-toggle mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      /* ---- Stats row ---- */
      .stats-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
      }

      .stat-card {
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        border-radius: calc(var(--radius) * 1.5);
        padding: 18px 20px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        cursor: pointer;
        text-align: left;
        transition: all 0.15s;
      }

      .stat-card:hover {
        border-color: hsl(var(--ring) / 0.3);
        box-shadow: 0 4px 16px hsl(var(--shadow-color) / var(--shadow-opacity));
      }

      .stat-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .stat-icon-wrap {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-icon-wrap mat-icon {
        font-size: 17px;
        width: 17px;
        height: 17px;
      }

      .stat-change {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 11px;
        font-weight: 700;
      }

      .stat-change.positive { color: hsl(var(--chart-2)); }
      .stat-change.negative { color: hsl(var(--destructive)); }

      .change-arrow {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }

      .stat-sparkline {
        height: 32px;
        margin: 2px -4px;
      }

      .sparkline-svg {
        width: 100%;
        height: 100%;
      }

      .stat-bottom {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: hsl(var(--card-foreground));
        letter-spacing: -0.03em;
        line-height: 1;
      }

      .stat-title {
        font-size: 11px;
        color: hsl(var(--muted-foreground));
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      /* ---- Tabs ---- */
      .dashboard-tabs {
        background: hsl(var(--card));
        border: 1px solid hsl(var(--border));
        border-radius: calc(var(--radius) * 1.5);
        overflow: hidden;
      }

      .tab-content {
        padding: 20px;
      }

      .tab-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        min-height: 300px;
        color: hsl(var(--muted-foreground));
        font-size: 14px;
      }

      .tab-placeholder-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        color: hsl(var(--border));
      }

      /* ---- Grid layout ---- */
      .grid-3col {
        display: grid;
        grid-template-columns: 1fr 300px 280px;
        gap: 16px;
        align-items: start;
      }

      .mid-column {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      /* ---- Panels ---- */
      .panel {
        background: hsl(var(--background));
        border: 1px solid hsl(var(--border));
        border-radius: var(--radius);
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid hsl(var(--border));
      }

      .panel-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .panel-header-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        color: hsl(var(--muted-foreground));
      }

      .panel-header-title {
        font-size: 13px;
        font-weight: 600;
        color: hsl(var(--foreground));
      }

      .panel-header-action {
        font-size: 12px;
      }

      .panel-header-action-icon {
        width: 28px;
        height: 28px;
        line-height: 28px;
      }

      .panel-header-action-icon mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      /* ---- Activity feed (timeline style) ---- */
      .activity-list {
        padding: 4px 0;
      }

      .activity-item {
        display: flex;
        gap: 12px;
        padding: 12px 16px;
        cursor: pointer;
      }

      .activity-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }

      .activity-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
        flex-shrink: 0;
        letter-spacing: 0.02em;
      }

      .activity-line {
        width: 2px;
        flex: 1;
        min-height: 8px;
        background: hsl(var(--border));
        border-radius: 1px;
      }

      .activity-item:last-child .activity-line {
        display: none;
      }

      .activity-content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding-top: 4px;
      }

      .activity-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }

      .activity-text {
        font-size: 13px;
        color: hsl(var(--foreground));
        line-height: 1.3;
      }

      .activity-text strong {
        font-weight: 600;
      }

      .activity-action-text {
        color: hsl(var(--muted-foreground));
        margin-left: 4px;
      }

      .activity-target-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .activity-target {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: hsl(var(--primary));
        font-weight: 500;
        padding: 3px 8px;
        background: hsl(var(--primary) / 0.06);
        border-radius: 4px;
        width: fit-content;
      }

      .activity-target-icon {
        font-size: 13px;
        width: 13px;
        height: 13px;
      }

      .activity-time {
        font-size: 11px;
        color: hsl(var(--muted-foreground));
        white-space: nowrap;
        flex-shrink: 0;
      }

      /* ---- Quick actions ---- */
      .actions-list {
        display: flex;
        flex-direction: column;
      }

      .action-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        transition: background 0.1s;
        border-bottom: 1px solid hsl(var(--border));
        color: inherit;
      }

      .action-row:last-child {
        border-bottom: none;
      }

      .action-row:hover {
        background: hsl(var(--accent));
      }

      .action-icon-wrap {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .action-icon-wrap mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }

      .action-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .action-label {
        font-size: 12px;
        font-weight: 600;
        color: hsl(var(--foreground));
      }

      .action-desc {
        font-size: 11px;
        color: hsl(var(--muted-foreground));
      }

      .action-chevron {
        font-size: 16px;
        width: 16px;
        height: 16px;
        color: hsl(var(--muted-foreground));
        opacity: 0;
        transition: opacity 0.1s;
      }

      .action-row:hover .action-chevron {
        opacity: 1;
      }

      /* ---- Team ---- */
      .team-list {
        display: flex;
        flex-direction: column;
        padding: 8px 0;
      }

      .team-member {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 16px;
      }

      .team-avatar-wrap {
        position: relative;
      }

      .team-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: 700;
      }

      .team-status {
        position: absolute;
        bottom: -1px;
        right: -1px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid hsl(var(--background));
      }

      .team-status.online { background: hsl(var(--chart-2)); }
      .team-status.away { background: hsl(var(--chart-3)); }
      .team-status.offline { background: hsl(var(--muted-foreground)); }

      .team-info {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .team-name {
        font-size: 12px;
        font-weight: 600;
        color: hsl(var(--foreground));
      }

      .team-role {
        font-size: 11px;
        color: hsl(var(--muted-foreground));
      }

      /* ---- Health ---- */
      .health-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 20px 0 12px;
      }

      .score-ring {
        position: relative;
        width: 80px;
        height: 80px;
      }

      .score-svg {
        width: 100%;
        height: 100%;
      }

      .score-text {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 700;
        color: hsl(var(--foreground));
      }

      .score-label {
        font-size: 11px;
        color: hsl(var(--muted-foreground));
        font-weight: 500;
      }

      .health-list {
        padding: 4px 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }

      .health-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .health-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .health-name {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 11px;
        font-weight: 500;
        color: hsl(var(--foreground));
      }

      .health-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .health-dot.healthy { background: hsl(var(--chart-2)); }
      .health-dot.warning { background: hsl(var(--chart-3)); }
      .health-dot.error { background: hsl(var(--destructive)); }

      .health-pct {
        font-size: 11px;
        font-weight: 700;
        color: hsl(var(--foreground));
      }

      .health-bar-track {
        height: 4px;
        border-radius: 2px;
        background: hsl(var(--border));
        overflow: hidden;
      }

      .health-bar-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .health-bar-fill.healthy { background: hsl(var(--chart-2)); }
      .health-bar-fill.warning { background: hsl(var(--chart-3)); }
      .health-bar-fill.error { background: hsl(var(--destructive)); }

      .health-detail {
        font-size: 10px;
        color: hsl(var(--muted-foreground));
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  private document = inject(DOCUMENT);
  private statuses = MOCK_STATUSES;
  private config = dashboardConfig;

  isDark = signal(true);
  user = MOCK_USER;
  stats = STATS;
  activity = RECENT_ACTIVITY.slice(0, this.config.maxActivityItems);
  quickActions = QUICK_ACTIONS;
  healthItems = HEALTH_ITEMS;
  team = TEAM;
  onlineCount = TEAM.filter((m) => m.status === "online").length;

  get timeOfDay(): string {
    const h = new Date().getHours();
    const g = this.config.greeting;
    if (h < 12) return g.morning;
    if (h < 17) return g.afternoon;
    return g.evening;
  }

  ngOnInit() {
    this.document.body.classList.add("dark");
  }

  toggleTheme() {
    this.isDark.update((v) => !v);
    this.document.body.classList.toggle("dark", this.isDark());
  }

  getStatusConfig(statusId: string) {
    return this.statuses.find((s) => s.id === statusId) ?? this.statuses[1];
  }

  getSparklinePoints(data: number[]): string {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    return data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * 120;
        const y = 30 - ((v - min) / range) * 28;
        return `${x},${y}`;
      })
      .join(" ");
  }

  getSparklineAreaPoints(data: number[]): string {
    const line = this.getSparklinePoints(data);
    return `0,32 ${line} 120,32`;
  }
}
