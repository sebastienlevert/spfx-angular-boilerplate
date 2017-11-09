import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

export abstract class DataService {
  protected extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  protected handleError (error: Response | any) : ErrorObservable<string> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}