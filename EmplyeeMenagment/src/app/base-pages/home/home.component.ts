import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    name: string;

    ngOnInit(): void {
        if (window && window.sessionStorage && sessionStorage.getItem("userName"))
            this.name = "Hello " + sessionStorage.getItem("userName");
        else
            this.name = '';
    }


}
