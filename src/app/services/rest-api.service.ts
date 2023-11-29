import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private rootUrl: string = window.location.origin;
  private apiBase = 'api';
  private apiUrl = ''; 

  constructor(private http: HttpClient) { 
    this.rootUrl = this.rootUrl.includes('localhost') ? "http://localhost:3000" : window.location.origin;
    this.apiUrl = `${this.rootUrl}/${this.apiBase}`
  }

  getRootUrl(){
    return this.rootUrl;
  }
  
  apiGet(endPoint: string, params?: object){
    let apiEndpoint: string = `${this.apiUrl}/${endPoint}`;
    let newParams = undefined;
    if(params){
      let httpParams = new HttpParams();
      for(const [key, value] of Object.entries(params)){
        newParams = httpParams.set(key, value);
      }
    }
    return this.http.get(apiEndpoint, { "observe": 'response', "params": newParams})
    .pipe(
      catchError(this.handleError)
    )
  }

  apiPost(endPoint: string, payload: object){
    let apiEndpoint: string = `${this.apiUrl}/${endPoint}`;
    return this.http.post(apiEndpoint, payload, { "observe": 'response' })
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){


    return throwError(()=>{
      if(error.status === 0){
        console.error(error);
        throw ('Request Error');
      } else if (error.status === 404) {
        throw ("404");
      } else {
        throw ('Error with API Request.')
      }
    });
  }

}
