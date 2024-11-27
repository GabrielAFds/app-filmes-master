import { Component, HostListener } from '@angular/core';
import { FilmeService } from '../../servicos/filme.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  filmes: any[] = []; 
  ids: string[] = ['tt11315808', 'tt1201607', 'tt2283362', 'tt1877830']; 

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
   
    this.ids.forEach((id) => {
      this.filmeService.getFilmeById(id).subscribe(
        (response) => {
          this.filmes.push(response); 
        },
        (error) => {
          console.error(`Erro ao carregar o filme com ID ${id}:`, error);
        }
      );
    });
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
