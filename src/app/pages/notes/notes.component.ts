import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  providers: [ConfirmationService, MessageService],
})
export class NotesComponent implements OnInit {
  createNotes: boolean = false;
  cursor: boolean = true;

  showCreateNoteDialog: boolean = false;
  showEditNoteDialog: boolean = false;
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
  editNote: Note = {
    id: 0,
    content: '',
    color: '#ffffff',
    posx: 0,
    posy: 0,
  };

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // localStorage.clear();
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
  }

  // Seleccionar crear nota toolbar
  showCreateDialog(){
    // Active Class Toolbar
    this.showCreateNoteDialog = true;
    this.cursor = false;
    this.createNotes = true;
  }

  // Seleccionar cursor toolbar
  showCursor(){
    this.cursor = true;
    this.createNotes = false;
  }

  // Crear Nota
  createNote() {
    this.newNote.id = this.notes.length + 1;
    this.newNote.posx = this.firstPosx;
    this.newNote.posy = this.firstPosy;
    this.notes.push(this.newNote);
    localStorage.setItem('notes', JSON.stringify(this.notes));
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

  // Editar Nota
  cancelEditNote() {
    this.showEditNoteDialog = false;
    this.editNote = {
      id: 0,
      content: '',
      color: '#ffffff',
      posx: 0,
      posy: 0,
    };
    this.showCursor();
  }
  editNoteDialog(note: Note) {
    this.editNote = note;
    this.showEditNoteDialog = true;
    this.cursor = false;
    this.createNotes = true;
  }
  updateNote() {
    this.notes = this.notes.map((note) =>
      note.id === this.editNote.id ? this.editNote : note
    );
    localStorage.setItem('notes', JSON.stringify(this.notes));
    this.showEditNoteDialog = false;
    this.editNote = {
      id: 0,
      content: '',
      color: '#ffffff',
      posx: 0,
      posy: 0,
    };
    this.showCursor();
  }

  // Duplicar Nota
  duplicateNote(note: Note) {
    const newNote = { ...note, id: this.notes.length + 1 };
    this.notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  // Eliminar Nota
  deleteNote(note: Note){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this note?',
      accept: () => {
        this.notes = this.notes.filter((n) => n.id !== note.id);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Note Deleted',
          life: 3000,
        });
      },
    });
  }

  // Ordenar Nota
  moveFront(note: Note) {
    // Sumar 1 a todos los ids de las notas menos a la seleccionada
    this.notes = this.notes.map((n) =>
      n.id === note.id ? n : { ...n, id: n.id - 1 }
    );
    // Actualizar id de la nota seleccionada
    note.id = this.notes.length;
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  moveBack(note: Note) {
    // Restar 1 a todos los ids de las notas menos a la seleccionada
    this.notes = this.notes.map((n) =>
      n.id === note.id ? n : { ...n, id: n.id + 1 }
    );
    // Actualizar id de la nota seleccionada
    note.id = 1;
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  moveUp(note: Note) {
    // Cambiar id de la nota con la siguiente
    const noteAux = this.notes.find((n) => n.id === note.id + 1);
    if (noteAux){
      note.id = noteAux.id;
      noteAux.id = note.id - 1;
    }
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  moveDown(note: Note) {
    // Cambiar id de la nota con la anterior
    const noteAux = this.notes.find((n) => n.id === note.id - 1);
    if (noteAux){
      note.id = noteAux.id;
      noteAux.id = note.id + 1;
    }
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  getFontSize(noteContent: string) {
    if (noteContent.length > 10) {
      return '14px'; // Letra pequeña para texto largo
    } else {
      return '24px'; // Letra grande para texto corto
    }
  }

  // Drag and Drop
  dragStart(note: Note) {
    this.draggedNote = note;
  }
  drop(event: MouseEvent) {
    if (this.draggedNote) {
      // Actualizar posx y posy a la posicion del cursor - noteSize/2
      this.draggedNote.posx = event.clientX - 90;
      this.draggedNote.posy = event.clientY - 90;
    }
    // Guardar en localStorage
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  dragEnd() {
    this.draggedNote = null;
  }

  // Seleccionar Nota
  selectNote(note: Note){
    this.draggedNote = note;
  }
}
