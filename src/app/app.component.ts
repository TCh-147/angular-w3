import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Notes } from '../notes/note.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  public index = 0;
  public modelTitle = "";
  public modelNote = "";
  public notesList: Notes[] = [];
  public titlError = false;
  public noteError = false;
  public isEdited = false;

  public saveNote(){
   
    if(this.modelTitle.length < 5)
      this.titlError = true;
    else this.titlError = false;

    if(this.modelNote.length < 7)
      this.noteError = true;
    else this.noteError = false;
      
    if(!this.noteError && !this.titlError) {

      if(this.isEdited){
        this.notesList[this.index].title = this.modelTitle;
        this.notesList[this.index].note = this.modelNote;
        this.resetTempData();
        this.isEdited = false;
      }
      else{

        this.notesList.push({
          title: this.modelTitle,
          note: this.modelNote
        })
    
        if(this.index >= 0){
          this.index++;
        }
    
        this.resetTempData();

      }

    }

  }

  public selectedNote;

  public editNote(id){

    if(this.selectedNote === id){
      this.selectedNote = -1;
    }
    else{
      this.selectedNote = id;
    }

  }

  public showData(id){

    this.modelTitle = this.notesList[id].title;
    this.modelNote = this.notesList[id].note;
    this.isEdited = true;
    this.index = id;

  }

  public deleteNote(id){

    this.notesList.splice(id, 1);
    this.resetTempData();
    this.isEdited = false;
    
  }

  private resetTempData(){

    this.modelTitle = '';
    this.modelNote = '';

  }

  
}


