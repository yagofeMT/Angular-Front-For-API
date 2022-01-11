import { Tipo } from "./Tipo";

export class Category {
    id: number | undefined;
    name: string | undefined;
    icone: string | undefined;
    typeId:number | undefined;
    type: Tipo | undefined;
}