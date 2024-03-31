import { Worker_ } from "../worker/worker.model";

export class Menager {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    identity: string;
    workers: Worker_[];
}