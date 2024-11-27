import { Component } from '@angular/core';
import { ScrollService } from './servicos/scroll.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-filmes';

  constructor(private scrollService: ScrollService) {}

  // Método para chamar o serviço de scroll
  scrollToTop(): void {
    this.scrollService.scrollToTop();
  }
}
