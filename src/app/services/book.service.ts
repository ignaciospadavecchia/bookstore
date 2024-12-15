import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://localhost:7128';
  private apiUrl = `${this.baseUrl}/libros`;
  private apiUrlDelete = `${this.baseUrl}/api/Libros`;

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/libros`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrlDelete}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlDelete}/${id}`);
  }
}