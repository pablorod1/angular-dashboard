import { Component, OnInit } from '@angular/core';
import {
  ScrumboardService,
  User,
  CardProject,
  Icon,
  Task,
} from '../../../services/scrumboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scrumboard-home',
  templateUrl: './scrumboard-home.component.html',
  styleUrl: './scrumboard-home.component.css',
})
export class ScrumboardHomeComponent implements OnInit {
  cardProjects: CardProject[] = [];
  users: User[] = [];
  icons: Icon[] = [];
  showCreateBoardDialog: boolean = false;

  createBoardForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private scrumboardService: ScrumboardService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cardProjects = this.scrumboardService.getCardProjects();
    this.users = this.scrumboardService.getUsers();
    this.icons = this.scrumboardService.getIcons();

    this.createBoardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      icon: [''],
      users: [[]],
    });
  }

  // Redirect to Invoice Details
  viewScrumboard(scrumboard: CardProject) {
    // format title
    scrumboard.title = scrumboard.title.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/scrumboard', scrumboard.title]);
  }

  onCreateBoard() {
    this.submitted = true;
    if (this.createBoardForm.valid) {
      this.showCreateBoardDialog = false;
      // Add Task[]
      this.createBoardForm.value.tasks = [];
      this.scrumboardService.addCardProject(this.createBoardForm.value);
      this.createBoardForm.reset();
    }
  }

  cancelCreateBoard() {
    this.showCreateBoardDialog = false;
    this.createBoardForm.reset();
  }

  formatTitle(title: string): string{
    return title.toLowerCase().replace(/-/g, ' ');
  }


}
