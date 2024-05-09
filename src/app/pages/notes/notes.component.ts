import { Component } from '@angular/core';

interface Note {
  id: number;
  content: string;
  color: string;
  posx: number;
  posy: number;
}
interface NoteColor {
  color: string;
  tooltip: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  createNotes: boolean = false;
  cursor: boolean = true;

  showCreateNoteDialog: boolean = false;
  firstPosx = 180;
  firstPosy = 160;

  noteColors: NoteColor[] = [
    { color: '#ffeb3b', tooltip: 'Yellow' },
    { color: '#aeea00', tooltip: 'Green' },
    { color: '#80deea', tooltip: 'Blue' },
    { color: '#ff80ab', tooltip: 'Pink' },
    { color: '#ff9e00', tooltip: 'Orange' },
    { color: '#f2f2f3', tooltip: 'Empty' },
  ];

  draggedNote: Note | undefined | null;

  notes: Note[] = [];
  newNote: Note = {
    id: 0,
    content: '',
    color: '#ffffff',
    posx: 0,
    posy: 0,
  };

  showCreateDialog(){
    // Active Class Toolbar
    this.showCreateNoteDialog = true;
    this.cursor = false;
    this.createNotes = true;
  }

  showCursor(){
    this.cursor = true;
    this.createNotes = false;
  }

  createNote() {
    // Create Note
    this.newNote.id = this.notes.length + 1;
    this.newNote.posx = this.firstPosx;
    this.newNote.posy = this.firstPosy;
    this.notes.push(this.newNote);
    this.newNote = {
      id: 0,
      content: '',
      color: '#ffffff',
      posx: 0,
      posy: 0,
    };
    this.firstPosx += 20;
    this.firstPosy += 20;
  }

  cancelCreateNote() {
    this.showCreateNoteDialog = false;
    this.newNote = {
      id: 0,
      content: '',
      color: '#ffffff',
      posx: 0,
      posy: 0,
    };
    this.showCursor();
  }

  getProgressBarColor() {
    // Cambia a color rojo cuando se completa
    return this.newNote.content.length === 171 ? 'red' : 'gray';
  }

  getFontSize(noteContent: string) {
    if (noteContent.length > 10) {
      return '14px'; // Letra pequeña para texto largo
    } else {
      return '24px'; // Letra grande para texto corto
    }
  }

  dragStart(note: Note) {
    this.draggedNote = note;
  }

  drop(event: MouseEvent) {
    if (this.draggedNote) {
      // Actualizar posx y posy a la posicion del cursor - noteSize/2
      this.draggedNote.posx = event.clientX - 90;
      this.draggedNote.posy = event.clientY - 90;
      this.draggedNote = null;
    }
  }

  dragEnd() {
    this.draggedNote = null;
  }

}
