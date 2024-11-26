import { Component } from '@angular/core';
import { FilmeService } from '../../servicos/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  filmes: any[] = []; // Array para armazenar os filmes

  constructor(private filmeService: FilmeService) {}
}
