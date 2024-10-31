import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private  myAppUrl: string
  private  myApiUrl: string
  constructor(private http:HttpClient) { 
    this.myAppUrl= environment.endpoint
    this.myApiUrl='item'
  }
  getListItem(): Observable<Item[]>{
    return this.http.get<Item[]>(this.myAppUrl + this.myApiUrl)
  }

  deleteItem(id:number): Observable<void>{
   return this.http.delete<void>(this.myAppUrl + this.myApiUrl + "/delete/" + id)
  }

  saveItems(item:Item): Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myApiUrl + "/create", item)
  }

  getListItemId(id:number): Observable<Item>{
    return this.http.get<Item>(this.myAppUrl + this.myApiUrl+"/"+id)
  }

  updateItem(id:number, item:Item):Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + "/update/" + id, item)
  }
}


