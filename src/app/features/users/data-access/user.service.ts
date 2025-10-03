import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { type Observable, delay, of } from 'rxjs';
import { type User } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  // MARK: Properties
  private apiUrl = environment.apiUrl;

  // MARK: Constructor
  constructor(private http: HttpClient) { }

  // MARK: Methods
  /**
   * method that fetches the users from the API
   * @returns Observable of User[]
   */
  getUsers(): Observable<User[]> {
    // return of([]);
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      delay(1000) //? 1 second delay to see loading state
    );
  }

  /**
   * method that fetches the user from the API
   * @param id - the id of the user
   * @returns Observable of User
   */
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      delay(1000) //? 1 second delay to see loading state
    );
  }
}