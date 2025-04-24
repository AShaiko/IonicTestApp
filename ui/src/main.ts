import { bootstrapApplication } from '@angular/platform-browser';
import { AppModule } from './app/modules/app.module';

bootstrapApplication(AppModule)
  .catch((err) => console.error(err));
