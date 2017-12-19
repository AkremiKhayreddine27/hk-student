import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class MonthService {

  public url: string = environment.backendBaseURL + '/months';
  public studentsUrl: string = environment.backendBaseURL + '/students';

  constructor(public http: Http) { }


  store(data: any) {
    return this.http.post(this.url, data).map(response => response.json()).toPromise();
  }

  getSessions(month) {
    return this.http.get(month._links.sessions.href).map(response => response.json()).toPromise();
  }

  getStudent(month) {
    return this.http.get(month._links.student.href).map(response => response.json()).toPromise();
  }

  associateStudent(monthId, studentId) {
    const headers = new Headers({'Content-Type': 'text/uri-list'});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/' + monthId + '/student', this.studentsUrl + '/' + studentId, options)
    .map(response => response.json());
  }

  update(id, data) {
    return this.http.patch(this.url + '/' + id, data).map(response => response.json());
  }
}
