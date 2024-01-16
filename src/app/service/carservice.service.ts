import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { ModelSelectionModel, ModelOptionModel, SelectionConfigModel, CarModelModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarserviceService {

  modelSubject = new BehaviorSubject<ModelSelectionModel | null>(null);
  configsSubject = new BehaviorSubject<SelectionConfigModel | null>(null);
  private baseUrl = '/';

  constructor(private http: HttpClient) {}

  getModels(): Observable<CarModelModel[]> {
    return this.http.get<CarModelModel[]>(`${this.baseUrl}models`);
  }

  getModelOptions(code: string): Observable<ModelOptionModel> {
    return this.http.get<ModelOptionModel>(`${this.baseUrl}options/${code}`);
  }
}
