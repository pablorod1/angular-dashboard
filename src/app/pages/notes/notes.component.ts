import { Component } from '@angular/core';

interface Note {
  content: string;
  color: string;
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
  showCreateNoteDialog: boolean = false;
  noteColors: NoteColor[] = [
    { color: '#ffeb3b', tooltip: 'Yellow' },
    { color: '#aeea00', tooltip: 'Green' },
    { color: '#80deea', tooltip: 'Blue' },
    { color: '#ff80ab', tooltip: 'Pink' },
    { color: '#ff9e00', tooltip: 'Orange' },
    { color: '#f2f2f3', tooltip: 'Empty' },
  ];
  notes: Note[] = [];
  newNote: Note = {
    content: '',
    color: '#ffffff',
  };

  createNote() {
    this.notes.push(this.newNote);
    this.newNote = {
      content: '',
      color: '#ffffff',
    };
    this.showCreateNoteDialog = false;
  }

  cancelCreateNote() {
    this.showCreateNoteDialog = false;
    this.newNote = {
      content: '',
      color: '#ffffff',
    };
  }

  getProgressBarColor() {
    return this.newNote.content.length === 171 ? 'red' : 'gray'; // Change 'red' and 'blue' to the colors you want
  }

  getFontSize(noteContent: string) {
    if (noteContent.length > 10) {
      return '14px'; // Smaller font size for long content
    } else {
      return '24px'; // Larger font size for short content
    }
  }

}
