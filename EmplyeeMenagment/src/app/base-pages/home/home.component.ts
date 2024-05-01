import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit,OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        document.location.reload();
    }
    name: string;

    ngOnInit(): void {
        if (window && window.sessionStorage && sessionStorage.getItem("userName"))
            this.name = "Hello " + sessionStorage.getItem("userName");
        else
            this.name = '';
    }


}
