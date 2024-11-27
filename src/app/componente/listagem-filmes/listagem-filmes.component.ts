import { Component, OnInit , HostListener} from '@angular/core';
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
       
        forkJoin<any[]>(requests).subscribe((detalhes: any[]) => {
          this.filmes = detalhes;

          
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

  isButtonVisible: boolean = false;

  // Escuta o evento de scroll
  @HostListener('window:scroll', [])
  onScroll() {
    // Define que o botão será visível quando rolar 200px para baixo
    this.isButtonVisible = window.scrollY > 200;
  }

  // Método para rolar até o topo
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
