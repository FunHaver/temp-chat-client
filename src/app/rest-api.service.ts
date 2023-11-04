import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private rootUrl: string = 'http://localhost:3000';
  private apiBase = 'api';
  private apiUrl = ''; 

  constructor(private http: HttpClient) { 
    this.rootUrl = this.rootUrl.length > 0 ? this.rootUrl : window.location.origin;
    this.apiUrl = `${this.rootUrl}/${this.apiBase}`
  }


  apiGet(endPoint: string){
    let apiEndpoint: string = `${this.apiUrl}/${endPoint}`;
    return this.http.get(apiEndpoint, { observe: 'response' })
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('Request Error: ', error.error);
    } else {
      console.error(`Server returned code ${error.status}. Error message: `, error.error)
    }

    return throwError(()=>{
      return new Error('Error with API Request.')
    });
  }

  hello(){
    const helloRequest = this.apiGet('hello');
    helloRequest.subscribe(res => {
      console.log(res.headers);
      console.log(res.body);
    })
  }
}
