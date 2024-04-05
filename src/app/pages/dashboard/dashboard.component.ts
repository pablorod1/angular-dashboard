import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import { Member } from '../../components/team-members/team-members';
import { TeamMembersDataService } from '../../services/team-members-data.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('containerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-2000px)' }),
        animate('1s ease-out', style({ opacity: 0.8, transform: 'none' })),
      ]),
    ]),
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({  transform: 'translateX(-200px)' }),
        animate('400ms ease-out', style({ transform: 'none' })),
      ]),
    ]),
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-800px)' }),
        animate('600ms ease-out', style({ opacity: 0.8, transform: 'none' })),
      ]),
    ]),
    trigger('buttonsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
    trigger('card1Animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-300px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
    trigger('card2Animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-300px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
    trigger('card3Animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-300px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
    trigger('card4Animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-300px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
    trigger('issuesAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(500px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
    trigger('tasksAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-500px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  selectedProject = 1;
  teamMembers!: Member[];
  @Output() changeData = new EventEmitter<string>();
  containerAnimationFinished = false;
  card1AnimationFinished = false;
  card2AnimationFinished = false;
  card3AnimationFinished = false;
  card4AnimationFinished = false;
  issuesAnimationFinished = false;
  tasksAnimationFinished = false;
  buttonsAnimationFinished = false;
  dropdownAnimationFinished = false;
  scrollPosition = 0;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
  this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (this.scrollPosition > 280 && !this.tasksAnimationFinished) {
    this.tasksAnimationFinished = true;
  }
}

  constructor(
    private teamMembersDataService: TeamMembersDataService,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  ngOnInit(): void {
    this.teamMembers = this.teamMembersDataService.getMembers();
    setTimeout(() => {
      this.buttonsAnimationFinished = true;
    }, 600);
    setTimeout(() => {
      this.containerAnimationFinished = true;
    }, 800);
    setTimeout(() => {
      this.dropdownAnimationFinished = true;
    }, 1700);
    setTimeout(() => {
      this.card1AnimationFinished = true;
    }, 1900);
    setTimeout(() => {
      this.card2AnimationFinished = true;
    }, 2100);
    setTimeout(() => {
      this.card3AnimationFinished = true;
    }, 2300);
    setTimeout(() => {
      this.card4AnimationFinished = true;
    }, 2500);
  }

  selectProject(projectNumber: number) {
    this.selectedProject = projectNumber;
  }
}
