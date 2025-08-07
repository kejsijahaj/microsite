import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Categories } from "./categories/categories";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Categories],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
