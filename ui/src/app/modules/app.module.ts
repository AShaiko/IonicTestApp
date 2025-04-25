import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { AppComponent } from "../app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AuthorizationModule } from "../+shared/authorization/authorization.module";
import { HttpClientModule } from "@angular/common/http";
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot([], { developmentMode: true}),
		NgxsRouterPluginModule.forRoot(),
		NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false, disabled: false }),
		NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false }),

    AuthorizationModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
