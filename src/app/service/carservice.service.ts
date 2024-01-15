import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { TeslaModelModel, ModelSelectionModel, ModelOptionModel, ConfigsSelectionModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarserviceService {

  modelSubject = new BehaviorSubject<ModelSelectionModel | null>(null);
  configsSubject = new BehaviorSubject<ConfigsSelectionModel | null>(null);
  private baseUrl = '/';

  constructor(private http: HttpClient) {}

  getModels(): Observable<TeslaModelModel[]> {
    return this.http.get<TeslaModelModel[]>(`${this.baseUrl}models`);
  }

  getModelOptions(code: string): Observable<ModelOptionModel> {
    return this.http.get<ModelOptionModel>(`${this.baseUrl}options/${code}`);
  }
}
