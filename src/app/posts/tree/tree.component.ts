import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

interface areaNode {
    name: string;
    children?: areaNode[];
  }
  
  const TREE_DATA: areaNode[] = [
    {
      name: '¿Con quién puedes agendar una cita?',
      children: [
        {
            name: 'Área de Medicina y Salud',
            children: [{name: 'Cardiólogo'}, {name: 'Pediatra'},{name: 'Ginecólogo'},{name: 'Psicólogo'},{name: 'Dentista'}, {name: 'Nutricionista'}, {name: 'Terapeuta'}]
          },
        {
          name: 'Negocios y Finanzas',
          children: [{name: 'Contador'}, {name: 'Analista'}],
        },
        {
          name: 'Derecho',
          children: [{name: 'Abogado'}, {name: 'Asistente legal'}],
        },
        {
            name: 'Diseño y Comunicación',
            children: [{name: 'Diseñador gráfico'}, {name: 'Diseñador de moda'}, {name: 'Arquitecto'},{name: 'Periodista'}]
          },
      ],
    },
  ];
  interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
  }


@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.css'],
    standalone: true,
    imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class TreeComponent{
    private _transformer = (node: areaNode, level: number) => {
        return {
          expandable: !!node.children && node.children.length > 0,
          name: node.name,
          level: level,
        };
      };
    
      treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable,
      );
    
      treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
      );
    
      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    
      constructor() {
        this.dataSource.data = TREE_DATA;
      }
    
      hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}