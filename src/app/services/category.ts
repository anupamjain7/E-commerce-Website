import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Category {

  constructor(private http: HttpClient) {}

  

  getMainCategories(): Observable<any> {
    return this.http.get<any>(environment.api.mainCategoriesUrl).pipe(
      map((res:any) => res.data.filter((item: any) => item.showInMenu))
    );
  }

  getMenCategories(): Observable<any> {
    return this.http.get<any>(environment.api.menTreeUrl).pipe(
      map((res:any) => {
        const data = res.data;
        const allCategories: any[] = [];

        if (data.subCategory) allCategories.push(...data.subCategory);
        if (data.childCategory) allCategories.push(...data.childCategory);

        return allCategories;
      })
    );
  }
}
