import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Category {

  constructor(private http: HttpClient) {}

getMainCategories() {
    return this.http.get<any>(`${environment.api.BASE_URL}/mainCategories`);
  }

getCategoryTree(urlKey: string) {
    return this.http
      .get<any>(`${environment.api.BASE_URL}/${urlKey}/tree`)
  }



}
