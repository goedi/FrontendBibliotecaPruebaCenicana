import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Autor } from 'src/app/modelo/Autor';
import { InformeServicioService } from '../servicio/informe-servicio.service';
//import DataLabelsPlugin from 'chart.js-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartData: ChartData<'bar'>
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: { min: 0 }
    },
    plugins: {
      legend: { display: true, },
    }
  };
  public barChartType: ChartType = 'bar';
  data = new Array
  autores = new FormGroup({
    autor: new FormControl()
  })
  listaAutores = new Array
  constructor(private infomeService: InformeServicioService) {
    this.barChartData = this.setDatosEnLabels(this.data, '')
  }


  ngOnInit(): void {
    this.infomeService.totalPublicaciones().subscribe(
      response => {
        this.data = response.respuesta
        console.log(response);

        this.setDatosEnLabels(this.data, '')
      }
    )
    this.infomeService.listaAutores().subscribe(
      response => {
        this.listaAutores = response.respuesta

      }
    )
  }

  selectAutores() {
    let temp = this.autores.value.autor
    let autor: Autor = new Autor
    temp = temp.split(' - ')
    temp = temp[1]

    this.listaAutores.forEach(element => {

      this.listaAutores.forEach(element => {
        if (temp === element.identificacion) {
          autor = element
        }
      });
    });
    this.barChartData = this.setDatosEnLabels(this.data, temp)
  }

  setDatosEnLabels(array: Array<any>, id_autor: string) {
    let temp = new Array
    let ChartData: any
    temp = array.sort(function (a, b) {
      if (a.año > b.año) {
        return 1;
      }
      if (a.año < b.año) {
        return -1;
      }
      return 0;
    });
    if (id_autor != '') {
      temp = array.filter(autor => autor.id_autor === id_autor)
      console.log(temp);
      let setlabel: String[] = []
      let dataset = new Array

      temp.forEach(element => {
        setlabel.push(element.año)
      });

      let label = ['Articulo', 'Libro']
      let libro: number[] = []
      let articulo: number[] = []
      
      setlabel.forEach(element => {
        for (let i = 0; i < temp.length; i++) {
          if(element == temp[i].año){
            if(temp[i].tipo == 'libro'){
              libro.push(temp[i].total)
            }
            else{
              libro.push(0)
            }
          }
        }
        for (let i = 0; i < temp.length; i++) {
          if(element == temp[i].año){
            if(temp[i].tipo == 'articulo'){
              articulo.push(temp[i].total)
            }
            else{
              articulo.push(0)
            }
          }
        }
      });

      ChartData = {
        labels: setlabel,
        datasets: [{ data: libro, label: 'Libro' },{ data: articulo, label: 'Articulo' }]
      }
    }
    console.log(ChartData);
    return ChartData
  }


}
