import { Role } from "./role.model";

export class Worker_{
    id:number;
    firstName:string;
    lastName:string;
    identity:string;
    adress:string;
    email:string;
    kind:number;
    status:boolean;
    startDate:Date;
    dateOfBirth:Date;
    roles:Array<Role>
}
