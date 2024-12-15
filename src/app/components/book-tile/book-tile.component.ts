import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BookTileComponent {
  @Input() book!: Book;
  @Output() bookUpdated = new EventEmitter<void>();

  constructor(private bookService: BookService) { }

  deleteBook(): void {
    if (confirm('Are you sure you want to delete this book?')) {
      const id = parseInt(this.book.isbn);
      if (isNaN(id)) {
        console.error('Invalid ISBN format');
        return;
      }

      this.bookService.deleteBook(id)
        .subscribe({
          next: () => {
            console.log('Book deleted successfully');
            this.bookUpdated.emit();
          },
          error: (error) => {
            console.error('Error deleting book:', error);
          }
        });
    }
  }

  buyBook(): void {
    if (!this.book.descatalogados) {
      const updatedBook = { ...this.book, descatalogados: true };
      this.bookService.updateBook(this.book.isbn, updatedBook)
        .subscribe(() => this.bookUpdated.emit());
    }
  }
} 