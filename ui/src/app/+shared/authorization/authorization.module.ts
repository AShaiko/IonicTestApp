import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AuthorizationState } from './store/authorization.state';
import { AuthorizationApiService } from './services/authorization-api.service';

@NgModule({
    imports: [NgxsModule.forFeature([AuthorizationState])],
    providers: [AuthorizationApiService]
})
export class AuthorizationModule {
    constructor(@Optional() @SkipSelf() parentModule: AuthorizationModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only');
        }
    }
}
