import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Login } from "../models/login.model";
import { User } from "src/app/users/user.interface";

@Injectable({
    providedIn: 'root' // Singleton
})
export class AuthService{
    
    
    constructor(private http: HttpClient) {
        
    }
 
    login$(data: Login): Observable<User>{
        return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
            map((response: User[])=>{
                const user = response.find(u => u.email === data.email && u.password === data.password);

                if (user) {
                    return user;
                }

                return null as any;
            })
        );
    }

    register$(user: User): Observable<User>{
        user.role = 'user';
        return this.http.post<User>(`${environment.apiUrl}/users`,user);
    }

    getUsers$(): Observable<User[]>{
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    storeUserData(user: User): void{
        delete user.password;

        localStorage.setItem('loggedUser', JSON.stringify(user));
    }

    getUserFromStorage(): User{
        let user = localStorage.getItem('loggedUser');

        if (user) {
          return JSON.parse(user);
        }

        return null as any;
    }


    logout$(): void{
        localStorage.removeItem('loggedUser');
    }
}