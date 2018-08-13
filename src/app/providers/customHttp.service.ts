import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Urls } from '../configs/urls';

@Injectable()
export class CustomHttpService {

    constructor(private httpClient: HttpClient, private urls : Urls) { }

    private getAccessToken() {

        return (localStorage.getItem('appointer-token') || '');

    }

    private addHeaders(optionalHeaders?: HttpHeaders) {

        let requestHeaders = new HttpHeaders()
            .set('Authorization', this.getAccessToken());
        // .set('Content-Type', 'application/json');
        if (optionalHeaders) {
            for (const header of optionalHeaders.keys()) {
                requestHeaders = requestHeaders.append(header, optionalHeaders.get(header));
            }
        }
        return requestHeaders;
    }



    get(url: string, options?: HttpHeaders) {

        let headers = this.addHeaders(options);

        return this.httpClient.get(this.urls.base_url + url, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(url: string, body: any, options?: HttpHeaders) {

        let headers = this.addHeaders(options);


        return this.httpClient.post(this.urls.base_url + url, body, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(url: string, body: any, options?: HttpHeaders) {

        let headers = this.addHeaders(options);


        return this.httpClient.put(this.urls.base_url + url, body, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(url: string, options?: HttpHeaders) {

        let headers = this.addHeaders(options);


        return this.httpClient.delete(this.urls.base_url + url, { headers: headers, observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    postForLogin(body: any) {

        return this.httpClient.post(this.urls.base_url + '/login', body, { observe: 'response' })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: HttpResponse<any>) {

        // console.log('inside extract data', res);
        return res.body || res.status;
    }

    private handleError(err: HttpErrorResponse) {
        console.log('inside handle error', err);
        let errorInfo: any = {};

        if (err.error instanceof Error || err.error instanceof ProgressEvent) {
            /**A client-side or network error occurred. Handle it accordingly.*/
            // console.log('An error occurred:', );
            errorInfo.status = err.status;
            errorInfo.status === 0
                ? errorInfo.msg = "Some error occured, Couldn't connect to server"
                : errorInfo.msg = err.message || 'Some unknown error occured';
        } else {

            /**The backend returned an unsuccessful response code.*/
            // console.log('Server occurred:', err);
            errorInfo.status = err.status;
            errorInfo.msg = err.error.error || err.error.message || 'Internal Server Error';
        }
        return Observable.throw(errorInfo);

    }

}
