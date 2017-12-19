import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class DayService {
  public url: string = environment.backendBaseURL + '/days';

  constructor(public http: Http) { }

  all() {
    return this.http.get(this.url).map(response => response.json()).toPromise();
  }

  findByName(name: string) {
    return this.http.get(this.url + '/search/findByName?name=' + name).map(response => response.json()).toPromise();
  }


}
