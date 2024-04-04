import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { WorkerService } from '../worker.service';
import { Worker_ } from '../../Models/worker/worker.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrl: './all-workers.component.scss'
})
export class AllWorkersComponent implements OnInit {

  workers: Worker_[];
  selectedWorkerEdit: Worker_;
  selectedWorkerDetailes: Worker_;
  toUpdate: boolean = false;
  filter: boolean = false;
  @ViewChild('searchText') searchText!: ElementRef;

  editWorker(index: number) {
    this.toUpdate = true;
    this.selectedWorkerEdit = this.workers.at(index);
  }

  deleteWorker(workerId: number) {
    this._workerService.updateStatus(workerId, false).subscribe({
      next: (data) => console.log(data.firstName, "update status to false")
    });
  }

  moreDetailes(index: number) {
    this.selectedWorkerDetailes = this.workers.at(index);
  }

  search(value: string) {
    //filter the workers list
    this.filter = true;
    this.workers = this.workers.filter(w => 
      w.firstName.includes(value) || w.lastName.includes(value) || w.identity.includes(value));
      this.filter=false;
  }

  reset() {
    this.filter = false;
    let menagerId = Number(sessionStorage.getItem("userId"));
    this.searchText.nativeElement.value='';
    this._workerService.getWorkers(menagerId).subscribe({
      next: (data) => {
        this.workers = data;
        console.log(data);
      },
      error: (err) => console.log(err)
    });
  }

  exportList() {
    //export the list to xsl
    var fileName = 'Workers.xlsx';
    let element = document.getElementById('workers');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  constructor(private _workerService: WorkerService) { }

  ngOnInit(): void {
    let menagerId = Number(sessionStorage.getItem("userId"));
    this._workerService.getWorkers(menagerId).subscribe({
      next: (data) => {
        this.workers = data;
        console.log(data);
      },
      error: (err) => console.log(err)
    });
  }
}
