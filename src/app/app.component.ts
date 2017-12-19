import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from './services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

import { MatSnackBar } from '@angular/material';

declare var FCMPlugin;
declare var cordova;
declare var FileTransfer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  show = false;
  version = 'v1.1';

  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';
  previousUrl = '';
  currentUrl = '';

  constructor(public snackBar: MatSnackBar, public http: Http, public userService: UserService, public router: Router) {
    this.router.events.pairwise().forEach((event) => {
        event.forEach(e => {
          if (e instanceof NavigationEnd) {
           this.previousUrl = this.currentUrl;
           this.currentUrl = e.url;
          }
        });
    });
  }


  ngOnInit() {
    /*
    this.http.get(environment.backendBaseURL + '/version').map(response => response.text()).toPromise().then(version => {
        if (this.version !== version) {
          this.snackBar.open('Cette application a un nouveau mis à jour', '', {
            duration: 10000,
          });
         this.updateApp();
        }
    });
    */
     // this.getFcmToken();
  }

  /*
  updateApp() {
    const fileURL = 'cdvfile://localhost/persistent/hk.apk';
    const browserFileUrl = 'c:/hkdownload';
    const fileTransfer = new FileTransfer();
    const uri = encodeURI('https://hk-student-test.herokuapp.com/upload/android-debug.apk');

    fileTransfer.download(
        uri,
        browserFileUrl,
        function(entry) {
            alert('download complete: ' + entry.toURL());
            cordova.plugins.webintent.startActivity({
              action: cordova.plugins.webintent.ACTION_VIEW,
              url: 'file://' + entry.toURL(),
              type: 'application/vnd.android.package-archive'
            },
            function () {},
            function () {
              alert('Failed to open URL via Android Intent.');
              console.log('Failed to open URL via Android Intent. URL: ' + entry.toURL());
            }
        );
        },
        function(error) {
            alert('download error source ' + error.source);
            alert('download error target ' + error.target);
            alert('download error code' + error.code);
        },
        false
    );
  }

  getFcmToken() {
    FCMPlugin.getToken((token) => {
      this.userService.update(1, token).subscribe();
    }, (err) => {
      alert('error retrieving token: ' + err);
    });
    FCMPlugin.onNotification(function(data){
      if (data.wasTapped) {
        // Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(data) );
      }else {
        // Notification was received in foreground. Maybe the user needs to be notified.
        alert( JSON.stringify(data) );
      }
    });
  }
  */
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  closeSidebar() {
    if (this.show === true) {
      this.show = false;
    }
  }
  showSidebar() {
      this.show = true;
  }
}
