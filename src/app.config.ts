// This is the application configuration for Angular.
// Add your top-level configuration here: providers, services, etc.
import { ApplicationConfig, ErrorHandler } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from "@ionic/angular/standalone";
import { SnErrorHandler } from "../supernova/helpers/sn-error-handler";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: ErrorHandler, useClass: SnErrorHandler },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
  ],
};
