import {Resource} from "./resource";

export class Category {
    id!: number;
    name!: string;
    resources!: Array<Resource>;
}
