import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from './data.service';
import { Data } from './Data';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tickerId: string;
  bankName: string;
  startDate: NgbDate;
  endDate: NgbDate;
  data: Data[];
  banks = ['HSBC', 'SC', 'CITI', 'GS', 'DB', 'ML', 'MACQ', 'CS', 'JPM', 'UBS', 'BNP'];
  charts = Array(this.banks.length).fill('');

  constructor(private _data: DataService) {
  }

  isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  padNumber(value: number) {
    if (this.isNumber(value)) {
      return `0${value}`.slice(-2);
    } else {
      return '';
    }
  }

  dateToString(date: NgbDate) {
    if (date && date.year && date.month && date.day) {
      return `${date.year}-${this.padNumber(date.month)}-${this.padNumber(date.day)}`;
    }
    return '';
  }

  createChart(index: number, label: string, labelData: any, data: any) {
    return new Chart('canvas_' + index, {
      type: 'line',
      animationEnabled: true,
      data: {
        labels: labelData,
        datasets: [
          {
            label: label,
            data: data,
            borderColor: '#3cba9f',
            fill: false,
            type: 'line',
            pointRadius: 0,
            borderWidth: 2
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
  }

  getData() {
    let shareholding,
      date;
    this._data.list(this.tickerId, this.dateToString(this.startDate), this.dateToString(this.endDate)).subscribe(result => {
      for (let i = 0; i < this.banks.length; i++) {
        shareholding = [];
        date = [];
        result[i][this.banks[i]].forEach(y => {
          date.push(y.date);
          shareholding.push(y.shareholding);
        });
        this.charts[i] = this.createChart(i, this.banks[i], date, shareholding);
      }
    });
  }
}
