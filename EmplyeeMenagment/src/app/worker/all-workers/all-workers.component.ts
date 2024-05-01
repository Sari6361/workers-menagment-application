import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WorkerService } from '../worker.service';
import { Worker_ } from '../../Models/worker/worker.model';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrl: './all-workers.component.scss'
})
export class AllWorkersComponent implements OnInit {

  workers: Worker_[];
  selectedWorkerEdit: Worker_;

  toUpdate: boolean = false;

  filter: boolean = false;
  
  @ViewChild('searchText') searchText!: ElementRef;

  editWorker(index: number) {
    this.toUpdate = true;
    this.selectedWorkerEdit = this.workers.at(index);
  }

  deleteWorker(workerId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {

      if (result.isConfirmed) {
        this._workerService.updateStatus(workerId, false).subscribe({
          next: (data) => {
            console.log(data.firstName, "update status to false")
            this.updateWorkersList();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        })}
    });
  }


  search(value: string) {
    //filter the workers list
    this.filter = true;
    this.workers = this.workers.filter(w =>
      w.firstName.includes(value) || w.lastName.includes(value) || w.identity.includes(value));
    this.filter = false;
  }

  reset() {
    this.filter = false;
    let menagerId = Number(sessionStorage.getItem("userId"));
    this.searchText.nativeElement.value = '';
    this.updateWorkersList();
  }

  exportList() {
    //export the list to xsl
    var fileName = 'Workers.xlsx';
    // let element = document.getElementById('workers');
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.workers);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fileName);
  }

  updateWorkersList(){
    let menagerId = Number(sessionStorage.getItem("userId"));
    this._workerService.getWorkers(menagerId).subscribe({
      next: (data) => {
        this.workers = data;
        console.log(data);
      },
      error: (err) => console.log(err)
    });
  }
  closeUpdate(){
    this.toUpdate=false;
  }

  constructor(private _workerService: WorkerService) { }

  ngOnInit(): void {
    this.updateWorkersList();
  }
}
