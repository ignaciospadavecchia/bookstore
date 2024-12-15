import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { EditorialListComponent } from './components/editorial-list/editorial-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'editoriales', component: EditorialListComponent }
];
