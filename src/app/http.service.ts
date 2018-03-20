import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import { environment } from '../environments/environment';

@Injectable()
export class HttpService {
  private baseUrl = environment.apiUrl;
  private baseHeaders = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  public get(path: string): Observable<any> {
    path = this.baseUrl + path;
    console.log('getting at path: ' + path);
    return this.http.get(path, new RequestOptions({headers: this.baseHeaders}));
  }

  public put(path: string, payload = {}): Promise<any> {
    path = this.baseUrl + path;
    return this.http.put(path, JSON.stringify(payload), new RequestOptions({headers: this.baseHeaders})).toPromise()
      .then(response => {
        return response.json();
      });
  }
}
