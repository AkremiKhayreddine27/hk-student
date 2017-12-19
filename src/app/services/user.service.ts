import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {

  public url: string = environment.backendBaseURL + '/users';

  constructor(public http: Http) { }

  update(id, token) {
    return this.http.patch(this.url + '/' + id, {
      token : token
    }).map(response => response.json());
  }

}
