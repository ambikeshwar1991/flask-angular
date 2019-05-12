import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from './data.service';
import { Data } from './Data';

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
  data: Data[];
  chart1 = [];
  chart2 = [];
  chart3 = [];
  chart4 = [];
  date = [];
  banks = ['HSBC', 'SC', 'CITI', 'GS', 'DB', 'ML', 'MACQ', 'CS', 'JPM', 'UBS', 'BNP'];
  shareholding = [];

  constructor(private _data: DataService) {
  }

  getData() {
  this.chart1 = [];
  this.shareholding = [];
  this.date = [];
  this._data.list(this.tickerId, this.bankName, this.startDate, this.endDate).subscribe(result => {
    result[0].HSBC.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
        });
	this.chart1 = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    this.date = [];
    this.shareholding = [];
   result[1].SC.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log("SC");
    console.log(this.shareholding);
        });
	this.chart2 = new Chart('canvas1', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
this.date = [];
    this.shareholding = [];
   result[2].CITI.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart3 = new Chart('canvas2', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
this.date = [];
    this.shareholding = [];
   result[3].GS.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log("SC");
    console.log(this.shareholding);
        });
	this.chart4 = new Chart('canvas3', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
	});
      });
  }
}
