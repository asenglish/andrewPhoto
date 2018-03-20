import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../environments/environment';

@Injectable()
export class HttpService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public get(path: string): Observable<any> {
    path = this.baseUrl + path;
    return this.http.get(path);
  }

  public put(path: string, payload = {}): Promise<any> {
    path = this.baseUrl + path;
    return this.http.put(path, payload).toPromise()
      .then(response => {
        return response;
      });
  }
}
