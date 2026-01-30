// This is where AI-generated code will be placed.
// Keep this file empty when uploading your template - Supernova will generate the app content here.
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  template: `
    <div class="demo-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Welcome</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput placeholder="Enter your email" />
          </mat-form-field>
          <mat-checkbox>Remember me</mat-checkbox>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>Cancel</button>
          <button mat-raised-button color="primary">Submit</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: `
    .demo-container {
      max-width: 400px;
      margin: 48px auto;
    }
    mat-card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-top: 16px;
    }
    mat-form-field {
      width: 100%;
    }
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `,
})
export class AppComponent {}
