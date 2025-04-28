import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AuthorizationState } from './store/authorization.state';
import { AuthorizationApiService } from './services/authorization-api.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthUserResolver } from './resolvers/auth-user.resolver';

@NgModule({
  imports: [NgxsModule.forFeature([AuthorizationState])],
  providers: [
    AuthGuard,
    AuthUserResolver,
    AuthorizationApiService
  ]
})
export class AuthorizationModule {
  constructor(@Optional() @SkipSelf() parentModule: AuthorizationModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
}
