import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../shared/header/header';


@Component({
  selector: 'app-based-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './based-layout.html',
  styleUrl: './based-layout.scss'
})
export class BasedLayout {

}
