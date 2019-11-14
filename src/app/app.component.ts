import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  errMessage: string;
  notesList: Array<Note>;
  note: Note;

  constructor(private noteService: NotesService) {
    this.notesList = [];
    this.note = new Note();
  }
  ngOnInit() {
    this.noteService.getNotes().subscribe(res => {
      this.notesList = res;
    },
    error => {
      this.errMessage = error.message;
    }
    );
  }
  addNote() {
    if (this.note.title == null ||  this.note.text == null) {
      this.errMessage = `Title and Text both are required fields`;
    } else {
      this.errMessage = '';
      this.noteService.addNote(this.note).subscribe(addedNote => {
      this.notesList.push(addedNote);
    },
    error => {
      this.errMessage = error.message;
    }
    );
  }
}
}
