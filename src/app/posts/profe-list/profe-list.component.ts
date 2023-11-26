import { Component, OnInit, OnDestroy, } from "@angular/core";
import {Profe} from "../profe.model";
import { ProfeService } from "../profe.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-profe-list',
  templateUrl: './profe-list.component.html',
  styleUrls: ['./profe-list.component.css']
})
export class ProfeListComponent implements OnInit, OnDestroy  {

  profes: Profe [] = [];
    private profesSub!: Subscription;

    constructor(public profeService: ProfeService){}

    ngOnInit() {
        this.profeService.getProfe();
      this.profesSub =  this.profeService.getProfeUpdateListener()
        .subscribe((profes:Profe[])=>{
            this.profes = profes
        })
    }
    ngOnDestroy() {
      this.profesSub.unsubscribe();
  }

    onDelete(profeId: string | undefined) {
      if(profeId){
        this.profeService.deleteProfe(profeId)
      }
      
  }}