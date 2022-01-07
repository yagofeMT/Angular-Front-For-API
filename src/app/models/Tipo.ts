import { Injectable } from "@angular/core";
import { AppModule } from "../app.module";

@Injectable({
    providedIn: AppModule
})
export class Tipo {
    TypeId : number | undefined;
    Nome : string | undefined;
}