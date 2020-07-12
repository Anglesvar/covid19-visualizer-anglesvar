import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { CovidService } from '../covid.service';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {
  public pieChartOptions1: ChartOptions = {
    responsive: true,
    plugins:{
      datalabels:{
        display:null
      }
    }
  };
  series;
  chartReady = false;
  public pieChartLabels1: string[];
  public pieChartData1: SingleDataSet;
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];
  states;
  constructor(private covid: CovidService) {
    this.covid.getData().subscribe((response) => {
      console.log("From pie", response);

      this.states = response.statewise;
      this.states = this.states.splice(1);
      this.series = {
        data: this.states.map((v) => {
          return Number(v.confirmed);
        }),
        labels: this.states.map((v) => {
          return v.statecode;
        })
      }
      this.pieChartLabels1 = this.series.labels;
      this.pieChartData1 = this.series.data;
      this.chartReady = true;
    });

  }

  ngOnInit(): void {
  }
  createChart(){
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
}