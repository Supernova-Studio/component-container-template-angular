// This is the main entry point for the application.
// The App component (app.component.ts) is where AI-generated code will be placed.
import "zone.js";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app.component.js";
import { appConfig } from "./app.config.js";
import "./index.css";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
