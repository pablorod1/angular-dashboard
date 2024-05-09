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

  constructor(private route: ActivatedRoute, private scrumboardService: ScrumboardService){}

  ngOnInit() {
    this.cards = this.scrumboardService.getCardProjects();
    this.route.params.subscribe(params => {
      this.cardTitle = params['title'];
      this.card = this.cards.find(card => card.title === this.cardTitle) || {} as CardProject;
    });
  }
}
