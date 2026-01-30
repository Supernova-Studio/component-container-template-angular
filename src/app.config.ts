// This is the application configuration for Angular.
// Add your top-level configuration here: providers, services, etc.
import { ApplicationConfig, ErrorHandler } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { SnErrorHandler } from "../supernova/helpers/sn-error-handler";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    { provide: ErrorHandler, useClass: SnErrorHandler },
  ],
};
