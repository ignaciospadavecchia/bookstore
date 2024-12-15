export interface Book {
  isbn: string;
  titulo: string;
  paginas: number;
  precio: number;
  fotoPortadaUrl: string;
  autorId: number;
  editorialId: number;
  descatalogados: boolean | null;
  autor: any | null;
  editorial: any | null;
} 