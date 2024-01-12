import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarserviceService {

  modelSubject = new BehaviorSubject<any | null>(null);
  configsSubject = new BehaviorSubject<any | null>(null);
  private baseUrl = '/';

  constructor(private http: HttpClient) {}

  getModels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}models`);
  }

  getModelOptions(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}options/${code}`);
  }
}
