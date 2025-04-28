import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthUserResolver } from "../resolvers/auth-user.resolver";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected currentUserResolver: AuthUserResolver) {}

  canActivate(): Observable<boolean> {
    return this.currentUserResolver.resolve().pipe(map(user => !!user));
  }
}
