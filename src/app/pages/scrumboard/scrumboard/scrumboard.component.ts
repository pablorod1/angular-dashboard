import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScrumboardService, CardProject } from '../../../services/scrumboard.service';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrl: './scrumboard.component.css'
})
export class ScrumboardComponent implements OnInit {
  cards!: CardProject[];
  card!: CardProject;
  cardTitle!: string;

  status: string[] = ['To Do', 'In Progress', 'In Review', 'Done'];

  constructor(private route: ActivatedRoute, private scrumboardService: ScrumboardService){}

  ngOnInit() {
    this.cards = this.scrumboardService.getCardProjects();
    this.route.params.subscribe(params => {
      this.cardTitle = params['title'];
      this.card = this.cards.find(card => card.title === this.cardTitle) || {} as CardProject;
    });
  }

  getStatusSeverity(status: string): string {
    switch(status) {
      case 'To Do':
        return 'bg-secondary text-secondary';
      case 'In Progress':
        return 'bg-primary text-primary';
      case 'In Review':
        return 'bg-danger text-danger';
      case 'Done':
        return 'bg-success text-success';
      default:
        return '';
    }
  }
}
