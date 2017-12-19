import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class GradesService {

  public url: string = environment.backendBaseURL + '/grades';

  constructor(public http: Http) { }

  all() {
    return this.http.get(this.url).map(response => response.json()).toPromise();
  }

  find(id) {
    return this.http.get(this.url + '/' + id).map(response => response.json()).toPromise();
  }

  update(id, data) {
    return this.http.put(this.url + '/' + id, data).map(response => response.json()).toPromise();
  }

  destroy(id) {
    return this.http.delete(this.url + '/' + id).map(response => response.json()).toPromise();
  }

  getStudents(grade) {
    return this.http.get(grade._links.students.href).map(response => response.json()).toPromise();
  }

  students(id) {
    return this.http.get(this.url + '/' + id + '/students').map(response => response.json()).toPromise();
  }

  store(data: any) {
    return this.http.post(this.url, data).map(response => response.json()).toPromise();
 }

}
