import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
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
  chart5 = [];
  chart6 = [];
  chart7 = [];
  chart8 = [];
  chart9 = [];
  chart10 = [];
  chart11 = [];
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
	animationEnabled: true,
        data: {
          labels: this.date,
          datasets: [
	  {
	      label: 'HSBC',
              data: this.shareholding,
              borderColor: '#3cba9f',
	      fill: false,
	      type: 'line',
	      pointRadius: 0,
	      borderWidth: 2,
	      fill: false,
            }
          ]
        },
	options: {
	responsive: true,
          legend: {
            display: true
          },
          scales: {
	  xAxes: [{
	      display: true,
	      ticks: {
			source: 'data',
			autoSkip: true
	    }
            }],
            yAxes: [{
	    scaleLabel: {
	    	display: true,
		labelString: 'Shareholding'
		}
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
	      label: 'SC',
              data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
              label: 'CITI',
              data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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

    console.log(this.shareholding);
        });
	this.chart4 = new Chart('canvas3', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            { 
              label: 'GS',
              data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
    result[4].DB.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart5 = new Chart('canvas4', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'DB',
	      data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
    result[5].ML.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart6 = new Chart('canvas5', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'ML',
	      data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
    result[6].MACQ.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart7 = new Chart('canvas6', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'MACQ',
	      data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
    result[7].CS.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart8 = new Chart('canvas7', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'CS',
	      data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
    result[8].JPM.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart9 = new Chart('canvas8', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'JPM',
	      data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
    result[9].UBS.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart10 = new Chart('canvas9', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'JPM',
	      data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
    result[10].BNP.forEach(y => {
    this.date.push(y.date);
    this.shareholding.push(y.shareholding);
    console.log(this.shareholding);
        });
	this.chart11 = new Chart('canvas10', {
        type: 'line',
        data: {
          labels: this.date,
          datasets: [
            {
              label: 'JPM',
	      data: this.shareholding,
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: true
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
