
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBrasil'
})
export class DataBrasilPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const data = new Date(value);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
}

