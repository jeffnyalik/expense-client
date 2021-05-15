import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class JwtInterceptor implements HttpInterceptor {

    constructor (private auth: AuthService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>> 
    {
        // add authorization header with jwt token if available
        let currentUser = localStorage.getItem('token');

        if (currentUser) 
        {
            request = request.clone({
                setHeaders: 
                {
                     Authorization: `Bearer ${currentUser}` 
                    
                }
            });
        }

        return next.handle(request);
    }
}