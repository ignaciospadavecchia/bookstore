import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../models/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private apiUrl = 'https://localhost:7128/api/Editoriales';

  constructor(private http: HttpClient) { }

  getEditoriales(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>(this.apiUrl);
  }
} 