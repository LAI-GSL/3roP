import { Component } from "@angular/core";

@Component({ selector:'app-table',
templateUrl: './table.component.html',
styleUrls: ['./table.component.css']})

export class TableComponent {
    displayedColumns: string[] = ['position', 'Nombre', 'Profesion','Lugar', 'Direccion'];
    dataSource = ESPECIAL_DATA;
}

export interface ElementP {
    Nombre: string;
    position: number;
    Profesion: string;
    Lugar: string;
    Direccion: string;
  }
  
  const ESPECIAL_DATA: ElementP[] = [
    {position: 1, Nombre: 'Ramon Martinez Robles', Profesion:'Dentista', Lugar:'Leon, Guanajuato', Direccion:'Allende #101' },
    {position: 2, Nombre: 'Esteban Gonzales Rosas', Profesion:'Pediatra', Lugar:'San Miguel de Allende, Guanajuato', Direccion:'BLV.Aquiles #102' },
    {position: 3, Nombre: 'Daniel Leyva Rojas', Profesion:'Psicologo', Lugar:'Purisima del Rincon, Guanajuato', Direccion:'Nicolas bravo #12' },
    {position: 4, Nombre: 'Estela Gonzalez Andrade', Profesion:'Cardiologo', Lugar:'Purisima del Rincos, Guajuanto', Direccion:'Altamirano #120' },
    {position: 5, Nombre: 'Gabriela Medina Echeveste', Profesion:'Dentista', Lugar:'San Francisco del Rincon, Guajuato', Direccion:'Allende #210' },
    {position: 6, Nombre: 'Rogelio Cruz Lopez', Profesion:'Cirujano', Lugar:'San Diego de Alejandria, Jalisco', Direccion:'Jalisco 101#' },
    {position: 7, Nombre: 'Laisha Guadalupe Soto Lopez', Profesion:'Abogada', Lugar:'Culiacan, Sinaloa', Direccion:'Rosario #1008' },
    {position: 8, Nombre: 'Angel David Medina Rosales', Profesion:'Nutricionista', Lugar:'Rosarito, Baja California', Direccion:'BLV.Francisco Villa #102' },
    {position: 9, Nombre: 'Liliana Lozano Coronado', Profesion:'Terapeuta', Lugar:'Estado de Mexico', Direccion:'Madero #19' },
    {position: 10, Nombre: 'Ramses Alejandro Ocampo', Profesion:'Contador', Lugar:'Guadalajara, Jalisco', Direccion:'Carranza #1900' },
    {position: 11, Nombre: 'Honey Lisette Torres Ramirez', Profesion:'Analista', Lugar:'Nuevo Leon, Monterrey', Direccion:'Zaragoza #90' },
    {position: 12, Nombre: 'Antonio Rosas Lopez', Profesion:'Diseñador gráfico', Lugar:'Guanajuato, Guanajuato', Direccion:'Hidalgo 20006#' }
  ];