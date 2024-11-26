import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataBrasil'
})
export class DataBrasilPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    // Convertendo a string para Date
    const data = new Date(value);

    // Verificando se a data é válida
    if (isNaN(data.getTime())) {
      return 'Data inválida'; // ou qualquer valor de fallback
    }

    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
}



