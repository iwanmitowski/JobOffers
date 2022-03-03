import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/user.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login$(data: Login): Observable<User | null> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map((response: User[]) => {
        const user = response.find(u => u.email === data.email && u.password === data.password);
        console.log(user);
        
        if (user) {
          return user;
        }
        console.log(2);
        
        return null;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  storeUserData(user: User): void {
    delete user.password;
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('loggedUser') || '');
  }
}