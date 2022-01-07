import { Tipo } from "./Tipo";

export class Category {
    CategoryId: number | undefined;
    name: string | undefined;
    icone: string | undefined;
    typeId:number | undefined;
    type: Tipo | undefined;
}