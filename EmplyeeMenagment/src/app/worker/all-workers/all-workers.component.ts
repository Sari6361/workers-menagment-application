import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../worker.service';
import { Worker_ } from '../../Models/worker/worker.model';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrl: './all-workers.component.scss'
})
export class AllWorkersComponent implements OnInit {

  workers: Worker_[];


  constructor(private _workerService: WorkerService) { }

  ngOnInit(): void {
    this._workerService.getWorkers().subscribe({
      next:(data)=>{
        this.workers=data;
      },
      error:(err)=>console.log(err)
    });
  }
}
