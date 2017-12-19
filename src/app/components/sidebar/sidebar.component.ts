import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public elementRef;

  @Output() close: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  constructor() { }

  closeSidebar() {
    this.close.emit(null);
  }
}
