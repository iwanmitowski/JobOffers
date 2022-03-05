import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = `${environment.apiUrl}/users`

  constructor(private http: HttpClient) {
   }

   getUsers$(): Observable<User[]>{
     return this.http.get<User[]>(this.baseUrl);
   }

   getUser$(id: number): Observable<User>{
     const url = `${this.baseUrl}/${id}`;

     return this.http.get<User>(url);
   }

   patchUser$(user: User): Observable<User>{
       const patchUrl = `${this.baseUrl}/${user.id}`

       return this.http.patch<User>(patchUrl, user);
   }
}
