import { Role } from "./role.model";

export class workerModel{
    id:number;
    firstName:string;
    lastName:string;
    identity:string;
    adress:string;
    email:string;
    status:boolean;
    startDate:Date;
    roles:Array<Role>;
    menagerId:number;
}