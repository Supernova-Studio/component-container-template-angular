// This is where AI-generated code will be placed.
// Keep this file empty when uploading your template - Supernova will generate the app content here.
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  template: `
    <div class="demo-container">
      <h1>Angular Material Components</h1>

      <!-- Buttons -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Buttons</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="button-row">
            <button mat-button>Basic</button>
            <button mat-raised-button>Raised</button>
            <button mat-flat-button>Flat</button>
            <button mat-stroked-button>Stroked</button>
            <button mat-icon-button><mat-icon>favorite</mat-icon></button>
            <button mat-fab><mat-icon>add</mat-icon></button>
            <button mat-mini-fab><mat-icon>edit</mat-icon></button>
          </div>
          <div class="button-row">
            <button mat-raised-button color="primary">Primary</button>
            <button mat-raised-button color="accent">Accent</button>
            <button mat-raised-button color="warn">Warn</button>
            <button mat-raised-button disabled>Disabled</button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Form Fields -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Form Fields</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="form-row">
            <mat-form-field appearance="fill">
              <mat-label>Fill appearance</mat-label>
              <input matInput placeholder="Placeholder" />
              <mat-hint>Hint text</mat-hint>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Outline appearance</mat-label>
              <input matInput placeholder="Placeholder" />
              <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
            </mat-form-field>
          </div>
          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>Leave a comment</mat-label>
              <textarea matInput placeholder="Your thoughts..."></textarea>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Checkboxes & Toggles -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Checkboxes, Toggles & Radio</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="toggle-row">
            <mat-checkbox>Checkbox option 1</mat-checkbox>
            <mat-checkbox checked>Checkbox option 2</mat-checkbox>
            <mat-checkbox disabled>Disabled</mat-checkbox>
          </div>
          <div class="toggle-row">
            <mat-slide-toggle>Slide toggle</mat-slide-toggle>
            <mat-slide-toggle checked>Enabled toggle</mat-slide-toggle>
          </div>
          <div class="toggle-row">
            <mat-radio-group [(ngModel)]="selectedRadio">
              <mat-radio-button value="1">Option 1</mat-radio-button>
              <mat-radio-button value="2">Option 2</mat-radio-button>
              <mat-radio-button value="3">Option 3</mat-radio-button>
            </mat-radio-group>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Chips -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Chips</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-chip-set>
            <mat-chip>Angular</mat-chip>
            <mat-chip>Material</mat-chip>
            <mat-chip>Design</mat-chip>
            <mat-chip highlighted>Highlighted</mat-chip>
            <mat-chip disabled>Disabled</mat-chip>
          </mat-chip-set>
        </mat-card-content>
      </mat-card>

      <!-- Progress -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Progress Indicators</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Determinate:</p>
          <mat-progress-bar mode="determinate" value="65"></mat-progress-bar>
          <p>Indeterminate:</p>
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          <p>Buffer:</p>
          <mat-progress-bar mode="buffer" value="40" bufferValue="70"></mat-progress-bar>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: `
    .demo-container {
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 24px;
    }
    mat-card {
      margin-bottom: 16px;
    }
    mat-card-content {
      padding-top: 16px;
    }
    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin-bottom: 12px;
    }
    .form-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 8px;
    }
    mat-form-field {
      min-width: 250px;
    }
    .toggle-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      margin-bottom: 12px;
    }
    mat-radio-button {
      margin-right: 16px;
    }
    mat-progress-bar {
      margin-bottom: 16px;
    }
    p {
      margin: 8px 0;
      font-size: 14px;
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class AppComponent {
  selectedRadio = "1";
}
