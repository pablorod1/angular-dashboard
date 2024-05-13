import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ScrumboardService,
  CardProject,
  Task,
} from '../../../services/scrumboard.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrl: './scrumboard.component.css',
  providers: [ConfirmationService, MessageService],
  animations: [
    trigger('filtersAnimation', [
      state(
        'inactive',
        style({
          transform: 'height: 0%',
          visibility: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'height: 100%',
          opacity: 1,
          visibility: 'visible',
        })
      ),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out')),
    ]),
  ],
})

export class ScrumboardComponent implements OnInit {
  cards!: CardProject[];
  card!: CardProject;
  cardTitle!: string;
  selectedTask!: Task;
  tasks!: Task[];
  showAddTaskDialog: boolean = false;
  newTask!: Task;
  filteredTasks!: Task[];
  searchQuery: string = '';
  showFilters: boolean = false;

  status: string[] = ['To Do', 'In Progress', 'In Review', 'Done'];
  priority: string[] = ['Low', 'Medium', 'High'];
  tags: string[] = ['Design', 'Marketing', 'Development', 'Concept'];

  constructor(
    private route: ActivatedRoute,
    private scrumboardService: ScrumboardService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cards = this.scrumboardService.getCardProjects();
    this.route.params.subscribe((params) => {
      this.cardTitle = params['title'];
      this.card =
        this.cards.find((card) => card.title === this.cardTitle) ||
        ({} as CardProject);
    });
    // Inicializar tasks
    this.tasks = this.card.tasks;
    this.newTask = {
      id: 0,
      title: '',
      taskImage: '',
      description: '',
      status: '',
      priority: '',
      dueDate: '',
      tags: [],
      users: [],
    };
  }

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  // Drag and Drop
  dragStart(task: Task) {
    this.selectedTask = task;
  }
  drop(status: string) {
    if (this.selectedTask) {
      // Actualizar Status
      this.selectedTask.status = status;
    }
  }
  dragEnd() {
    this.selectedTask = {} as Task;
  }

  createTask() {
    this.showAddTaskDialog = true;
    this.newTask = {
      id: 0,
      title: '',
      taskImage: '',
      description: '',
      status: '',
      priority: '',
      dueDate: '',
      tags: [],
      users: [],
    };
  }

  addTask() {
    this.newTask.id = this.tasks.length + 1;
    this.newTask.dueDate = this.formatDate(this.newTask.dueDate);
    console.log(this.newTask);
    this.confirmationService.confirm({
      message: 'Are you sure you want to add this task?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tasks.push(this.newTask);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Task Created',
          life: 3000,
        });
        this.cancelCreateTask();
        console.log(this.tasks);
      },
    });
  }

  cancelCreateTask() {
    this.showAddTaskDialog = false;
    this.newTask = {
      id: 0,
      title: '',
      taskImage: '',
      description: '',
      status: '',
      priority: '',
      dueDate: '',
      tags: [],
      users: [],
    };
  }

  // Filter Tasks by Status
  getTasksByStatus(status: string): Task[] {
    if (this.searchQuery === ''){
      return this.tasks.filter((task) => task.status === status);
    } else {
      return this.getFilteredTasks(this.searchQuery).filter((task) => task.status === status);
    }
  }

  getFilteredTasks(searchQuery: string): Task[]{
    return this.tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Fondo y Color del texto para etiquetas
  getStatusBackground(status: string): string {
    switch (status) {
      case 'To Do':
        return 'bg-secondary';
      case 'In Progress':
        return 'bg-primary ';
      case 'In Review':
        return 'bg-danger';
      case 'Done':
        return 'bg-success ';
      default:
        return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'To Do':
        return 'text-secondary';
      case 'In Progress':
        return 'text-primary';
      case 'In Review':
        return 'text-danger';
      case 'Done':
        return 'text-success';
      default:
        return '';
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
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

  getPrioritySeverity(priority: string): string {
    switch (priority) {
      case 'Low':
        return 'bg-success text-success';
      case 'Medium':
        return 'bg-warning text-warning';
      case 'High':
        return 'bg-danger text-danger';
      default:
        return '';
    }
  }
  getTagColor(tag: string): string {
    switch (tag) {
      case 'Design':
        return 'bg-success text-success';
      case 'Marketing':
        return 'bg-info text-info';
      case 'Development':
        return 'bg-warning text-warning';
      case 'Concept':
        return 'bg-primary text-primary';
      default:
        return '';
    }
  }
  getTagIcon(tag: string): string {
    switch (tag) {
      case 'Design':
        return 'fa-brush';
      case 'Marketing':
        return 'fa-bullhorn';
      case 'Development':
        return 'fa-code';
      case 'Concept':
        return 'fa-lightbulb';
      default:
        return '';
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = months[d.getMonth()];
    const day = d.getDate();

    return `${day} ${month} ${year}`;
  }
}
