import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';

@Injectable()
export class StudentService {

  public gradesUrl: string = environment.backendBaseURL + '/grades';
  public studentsUrl: string = environment.backendBaseURL + '/students';
  public monthsUrl: string = environment.backendBaseURL + '/months';

  constructor(public http: Http) { }

  find(id) {
    return this.http.get(this.studentsUrl + '/' + id).map(response => response.json()).toPromise();
  }

  associateGrade(studentId, gradeId) {
    const headers = new Headers({'Content-Type': 'text/uri-list'});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.studentsUrl + '/' + studentId + '/grade', this.gradesUrl + '/' + gradeId, options)
    .map(response => response.json());
  }

  store(data: any) {
    return this.http.post(this.studentsUrl, data).map(response => response.json()).toPromise();
  }

  update(id, data: any) {
    return this.http.put(this.studentsUrl + '/' + id, data).map(response => response.json()).toPromise();
  }

  destroy(id) {
    return this.http.delete(this.studentsUrl + '/' + id).map(response => response.json()).toPromise();
  }

  getMonths(student) {
    return this.http.get(student._links.months.href).map(response => response.json()).toPromise();
  }

  findLastMonth(student) {
    return this.http.get(
      this.monthsUrl + '/search/findFirstByStudentIdOrderByStartDateDesc?student_id=' + student.id)
      .map(response => response.json())
      .toPromise();
  }

}
