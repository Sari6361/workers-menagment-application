import { Role } from "./role.model";

export class Worker_{
    id:number;
    firstName:string;
    lastName:string;
    identity:string;
    address:string;
    email:string;
    kind:number;
    status:boolean;
    startDate:Date;
    dateOfBirth:Date;
    roles:Array<Role>;
    menagerId:number;
}
