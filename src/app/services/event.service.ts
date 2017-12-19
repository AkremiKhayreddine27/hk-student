import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class EventService {

  public url: string = environment.backendBaseURL + '/events';
  public gradesUrl: string = environment.backendBaseURL + '/grades';
  public dayUrl: string = environment.backendBaseURL + '/days';

  constructor(public http: Http) { }

  all() {
    return this.http.get(this.url).map(response => response.json()).toPromise();
  }

  find(id) {
    return this.http.get(this.url + '/' + id).map(response => response.json()).toPromise();
  }

  findByDay(day) {
    return this.http.get(this.url + '/search/findByDayIdOrderByStartTime?dayId=' + day).map(response => response.json()).toPromise();
  }

  getGrades(event) {
    return this.http.get(event._links.grades.href).map(response => response.json()).toPromise();
  }

  associateGrade(eventId, gradesUri) {
    const headers = new Headers({'Content-Type': 'text/uri-list'});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/' + eventId + '/grades', gradesUri, options)
    .map(response => response.json());
  }

  associateDay(eventId, dayId) {
    const headers = new Headers({'Content-Type': 'text/uri-list'});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/' + eventId + '/day', this.dayUrl + '/' + dayId, options)
    .map(response => response.json());
  }

  store(data: any) {
    return this.http.post(this.url, data).map(response => response.json()).toPromise();
  }

  destroy(id) {
    return this.http.delete(this.url + '/' + id).map(response => response.json()).toPromise();
  }

}
