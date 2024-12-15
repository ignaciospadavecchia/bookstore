import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Editorial } from '../../models/editorial';
import { EditorialService } from '../../services/editorial.service';

@Component({
  selector: 'app-editorial-list',
  templateUrl: './editorial-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class EditorialListComponent implements OnInit {
  editoriales: Editorial[] = [];

  constructor(private editorialService: EditorialService) { }

  ngOnInit(): void {
    this.loadEditoriales();
  }

  loadEditoriales(): void {
    this.editorialService.getEditoriales()
      .subscribe(editoriales => this.editoriales = editoriales);
  }
} 