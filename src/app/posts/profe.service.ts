import { Injectable } from "@angular/core";
import { Profe } from "./profe.model";
import { Subject } from "rxjs";
//NUEVO
import { HttpClient } from "@angular/common/http";
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProfeService{

    private profes: Profe[] = []; //Primer matriz
    private profeUpdate = new Subject<Profe[]>();

    constructor(private http: HttpClient){}
    getProfe(){
        this.http.get<{message: string, profes:any}>('http://localhost:1000/api/profe')
        .pipe(map((profeData)=>{
            return profeData.profes.map((profe:any) =>{
                return{
                    id: profe._id,
                    name: profe.name,
                    profesion: profe.profesion,
                    phoneNumber: profe.phoneNumber,
                    email: profe.email,
                    direction: profe.direction,
                    country: profe.country
                };
            });
        }))
        .subscribe((publicacionTransformada) =>{
            this.profes = publicacionTransformada;
            this.profeUpdate.next([...this.profes]);
        });
    }
    getProfeUpdateListener(){ //FUNCION DE OBSERVABLE
        return this.profeUpdate.asObservable();
    }
    addPost(name: string, profesion: string, phoneNumber:string, email:string, direction:string, country:string ){
        const profe: Profe = { 
            name: name,
            profesion: profesion,
            phoneNumber:phoneNumber,
            email:email,
            direction:direction,
            country:country
            }
        this.http.post<{message: string}>('http://localhost:1000/api/profe', profe)
        .subscribe((responseData) =>{
            console.log(responseData.message);
            this.profes.push(profe);
            this.profeUpdate.next([...this.profes]);
        });    
        
    }
    //AGREGUÉ ESTO
      deleteProfe(profeId: string){
        this.http.delete("http://localhost:1000/api/profe/" + profeId)
        .subscribe(()=>{
            this.profes = this.profes.filter(profe => profe.id !== profeId);
            this.profeUpdate.next([...this.profes]);
        }, error => {
            console.error(error);
          });
      }

      getProfeNames() {
        return this.http.get<{ message: string; names: string[] }>('URL para obtener nombres de profesionales')
          .pipe(map((data) => {
            return data.names;
          }));
      }
}
