import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../servicos/filme.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.css']
})
export class ListagemFilmesComponent implements OnInit {
  filmes: any[] = [];
  generos: string[] = [];
  generoSelecionado: string = '';
  titulo: string = '';

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.buscarFilmes();
  }

  buscarFilmes(): void {
    this.filmeService.getFilmes(this.titulo).subscribe((data: any) => {
      if (data.Search) {
        const requests = data.Search.map((filme: any) =>
          this.filmeService.getFilmeById(filme.imdbID)
        );
        // Adicione o tipo explícito no retorno do forkJoin
        forkJoin<any[]>(requests).subscribe((detalhes: any[]) => {
          this.filmes = detalhes;

          // Extrair gêneros únicos
          this.generos = Array.from(
            new Set(
              this.filmes.flatMap((filme: any) => (filme.Genre ? filme.Genre.split(', ') : []))
            )
          );
        });
      }
    });
  }

  filtrarPorGenero(): void {
    if (this.generoSelecionado) {
      this.filmes = this.filmes.filter((filme: any) =>
        filme.Genre?.includes(this.generoSelecionado)
      );
    } else {
      this.buscarFilmes(); // Recarrega todos os filmes se nenhum gênero for selecionado
    }
  }
}
