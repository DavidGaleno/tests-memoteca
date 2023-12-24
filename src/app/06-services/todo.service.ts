import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  add(todo: any) {
    return this.http.post<any>('...', todo).pipe(map((r) => r.json()));
  }

  getTodos() {
    return this.http.get<any>('...').pipe(map((r) => r.json()));
  }

  delete(id: number) {
    return this.http.delete<any>('...').pipe(map((r) => r.json()));
  }
}
