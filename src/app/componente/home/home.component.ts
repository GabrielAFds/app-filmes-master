import { Component } from '@angular/core';
import { FilmeService } from '../../servicos/filme.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  filmes: any[] = []; // Lista de filmes para armazenar múltiplos resultados
  ids: string[] = ['tt11315808', 'tt1201607', 'tt2283362', 'tt1877830']; // IDs dos filmes (exemplo)

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    // Itera sobre a lista de IDs e busca os filmes
    this.ids.forEach((id) => {
      this.filmeService.getFilmeById(id).subscribe(
        (response) => {
          this.filmes.push(response); // Adiciona cada filme à lista
        },
        (error) => {
          console.error(`Erro ao carregar o filme com ID ${id}:`, error);
        }
      );
    });
  }
}
