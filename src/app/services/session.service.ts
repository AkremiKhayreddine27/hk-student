import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class SessionService {


  public url: string = environment.backendBaseURL + '/sessions';
  public monthUrl: string = environment.backendBaseURL + '/months';

  constructor(public http: Http) { }

  store(data: any) {
    return this.http.post(this.url, data).map(response => response.json()).toPromise();
  }

  findByDate(date, startTime, endTime) {
    return this.http.get(this.url +
      '/search/findByDayAndStartTimeAndEndTime?day=' + date +
      '&startTime=' + startTime +
      '&endTime=' + endTime).map(response => response.json()).toPromise();
  }

  getMonth(id) {
    return this.http.get(this.url + '/' + id + '/month').map(response => response.json()).toPromise();
  }

  associateMonth(sessionId, monthId) {
    const headers = new Headers({'Content-Type': 'text/uri-list'});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + '/' + sessionId + '/month', this.monthUrl + '/' + monthId, options)
    .map(response => response.json());
  }

}
