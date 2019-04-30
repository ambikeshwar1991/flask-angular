import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tickerId: string;
  bankName: string;
  startDate: string;
  endDate: string;
  tableData = [];

  constructor(private _data: DataService) {
  }

  getData() {
    this._data.list(this.tickerId, this.bankName, this.startDate, this.endDate).subscribe(data => {
      this.tableData = data.result;
    });
  }
}
