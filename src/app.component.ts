// This is where AI-generated code will be placed.
// Keep this file empty when uploading your template - Supernova will generate the app content here.
import { Component } from "@angular/core";
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
  IonCheckbox,
} from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    FormsModule,
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
    IonCheckbox,
  ],
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Welcome</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Login</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-item>
              <ion-input
                label="Email"
                labelPlacement="floating"
                type="email"
                placeholder="Enter your email"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-input
                label="Password"
                labelPlacement="floating"
                type="password"
                placeholder="Enter your password"
              ></ion-input>
            </ion-item>

            <ion-item lines="none">
              <ion-checkbox slot="start"></ion-checkbox>
              <ion-label>Remember me</ion-label>
            </ion-item>

            <ion-button expand="block" class="ion-margin-top">
              Sign In
            </ion-button>
            <ion-button expand="block" fill="outline">
              Cancel
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-app>
  `,
})
export class AppComponent {}
