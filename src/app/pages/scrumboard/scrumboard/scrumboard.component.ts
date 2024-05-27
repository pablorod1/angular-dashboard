import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ScrumboardService,
  CardProject,
  Task,
  User,
} from '../../../services/scrumboard.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
          height: 0,
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'scaleY(100%)',
          opacity: 1,
        })
      ),
      transition('inactive => active', animate('800ms ease-in-out')),
      transition('active => inactive', animate('800ms ease-in-out')),
    ]),
    trigger('detailsAnimation', [
      state(
        'inactive',
        style({
          height: 0,
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'scaleY(100%)',
          opacity: 1,
        })
      ),
      transition('inactive => active', animate('800ms ease-in-out')),
      transition('active => inactive', animate('800ms ease-in-out')),
    ])
  ],
})
export class ScrumboardComponent implements OnInit {
  // Current Project Data
  cards!: CardProject[];
  card!: CardProject;
  cardTitle!: string;

  users!: User[];
  invitedUsers!: [];

  showDetails: boolean = false;

  // Task Data
  selectedTask!: Task;
  tasks!: Task[];
  newTask!: Task;
  editingTask!: Task;
  filteredTasks!: Task[];

  showEditTaskDialog: boolean = false;
  showAddTaskDialog: boolean = false;
  showInviteUsersDialog: boolean = false;

  // Filters Queries
  showFilters: boolean = false;
  searchQuery: string = '';
  selectedPriorities: string = '';
  selectedTags: string[] = [];
  selectedUsers: string[] = [];

  // Filters Data
  statuses: any[] = [];
  priority: string[] = ['Low', 'Medium', 'High'];
  tags: string[] = ['Design', 'Marketing', 'Development', 'Concept'];

  constructor(
    private route: ActivatedRoute,
    private scrumboardService: ScrumboardService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.users = this.scrumboardService.getUsers();
    this.cards = this.scrumboardService.getCardProjects();
    this.route.params.subscribe((params) => {
      this.cardTitle = params['title'];
      this.card =
      this.cards.find((card) => card.title === this.cardTitle) ||
      ({} as CardProject);
    });

    if (this.card.title !== this.cardTitle){
      this.router.navigate(['/scrumboard-home']);
    }

    // Inicializar tasks
    this.tasks = this.card.tasks;
    this.statuses = [
      { status: 'To Do', tasks: this.getTasksByStatus('To Do')},
      { status: 'In Progress', tasks: this.getTasksByStatus('In Progress')},
      { status: 'In Review', tasks: this.getTasksByStatus('In Review')},
      { status: 'Done', tasks: this.getTasksByStatus('Done')},
    ];
    console.log(this.statuses[0]);
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
    this.editingTask = {
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
    this.showDetails = true;
  }

  // Drag and Drop
  dragStart(task: Task) {
    this.selectedTask = task;
  }
  drop(event: CdkDragDrop<Task[]>, status: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if (this.selectedTask){
      this.selectedTask.status = status;
    }
    console.log(this.selectedTask);
    console.log(status);
  }
  dragEnd(status: string) {
    this.selectedTask.status = status;
    this.selectedTask = {} as Task;
  }

  createTask() {
    this.showAddTaskDialog = true;
  }

  addTask() {
    this.newTask.id = this.tasks.length + 1;
    this.confirmationService.confirm({
      message: 'Are you sure you want to add this task?',
      header: 'Confirmation',
      icon: 'bi bi-exclamation-triangle',
      accept: () => {
        this.tasks.push(this.newTask);
        this.messageService.add({
          key: 'add-task',
          severity: this.getMessageSeverity(this.newTask.status),
          summary: 'Successful',
          detail: 'Task ' + this.newTask.title + ' Created',
          icon: this.getTagIcon(this.newTask.tags[0]),
          life: 3000,
        });
        this.cancelCreateTask();
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

  // Filter Tasks
  getTasksByStatus(status: string): Task[] {
    if (this.searchQuery !== '') {
      return this.getFilteredTasks(this.searchQuery).filter(
        (task) => task.status === status
      );
    } else if (this.selectedPriorities !== '') {
      // Devuelve las tareas que tengan las prioridades seleccionadas
      return this.getFilteredTasksByPriority(this.selectedPriorities).filter(
        (task) => task.status === status
      );
    } else if (this.selectedTags.length > 0) {
      // Devuelve las tareas que tengan las etiquetas seleccionadas
      return this.getFilteredTasksByTags(this.selectedTags).filter(
        (task) => task.status === status
      );
    } else if (this.selectedUsers.length > 0) {
      return this.getFilteredTasksByUsers(this.selectedUsers).filter(
        (task) => task.status === status
      );
    } else if(this.tasks) {
      return this.tasks.filter((task) => task.status === status);
    }

    return [];
  }

  // Devuelve las tasks que contienen searchQuery en el titulo
  getFilteredTasks(searchQuery: string): Task[] {
    return this.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Devuelve las tasks que contienen las prioridades de selectedPriorities
  getFilteredTasksByPriority(selectedPriorities: string): Task[] {
    return this.tasks.filter((task) =>
      selectedPriorities.includes(task.priority)
    );
  }

  // Devuelve las tasks que contienen las etiquetas de selectedTags
  getFilteredTasksByTags(selectedTags: string[]): Task[] {
    return this.tasks.filter((task) =>
      selectedTags.some((tag) => task.tags.includes(tag))
    );
  }
  // Devuelve las tasks que contienen los usuarios de selectedUsers
  getFilteredTasksByUsers(selectedUsers: string[]): Task[] {
    return this.tasks.filter((task) =>
      task.users.some((user) => selectedUsers.includes(user.name))
    );
  }

  // Guarda las tags en selectedTags
  onTagChange(event: Event, tag: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.selectedTags.push(tag);
    } else {
      const index = this.selectedTags.indexOf(tag);
      if (index > -1) {
        this.selectedTags.splice(index, 1);
      }
    }
  }
  // Guarda los usuarios en selectedusers
  onUserChange(event: Event, userName: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.selectedUsers.push(userName);
    } else {
      const index = this.selectedUsers.indexOf(userName);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
  }

  // Clear Filters
  clearFilters() {
    this.searchQuery = '';
    this.selectedPriorities = '';
    this.selectedTags = [];
    this.selectedUsers = [];
  }

  // Fondo y Color del texto para etiquetas
  getStatusBackground(status: string): string {
    switch (status) {
      case 'To Do':
        return 'bg-dark';
      case 'In Progress':
        return 'bg-primary';
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
        return 'text-dark';
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

  getMessageSeverity(status: string): string{
    switch (status) {
      case 'To Do':
        return 'secondary';
      case 'In Progress':
        return 'info';
      case 'In Review':
        return 'danger';
      case 'Done':
        return 'success';
      default:
        return '';
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'To Do':
        return 'bg-dark text-dark';
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

  getStatusIcon(status: string): string{
    switch (status) {
      case 'To Do':
        return 'bi-clipboard';
      case 'In Progress':
        return 'bi-arrow-clockwise';
      case 'In Review':
        return 'bi-clock';
      case 'Done':
        return 'bi-check2';
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
        return 'bi-brush';
      case 'Marketing':
        return 'bi-lightning-charge';
      case 'Development':
        return 'bi-code-slash';
      case 'Concept':
        return 'bi-lightbulb';
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

  deleteTask(task:Task){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete' + task.title +' ?',
      header: 'Confirmation',
      icon: 'bi bi-exclamation-triangle',
      accept: () => {
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Task Deleted',
          life: 3000,
        });
      },
    });
  }

  editTask(task: Task){
    this.editingTask = {...task};
    this.showEditTaskDialog = true;
  }

  updateTask(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to update this task?',
      header: 'Confirmation',
      icon: 'bi bi-exclamation-triangle',
      accept: () => {
        const index = this.tasks.indexOf(this.selectedTask);
        this.tasks[index] = this.editingTask;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Task Updated',
          life: 3000,
        });
        this.showEditTaskDialog = false;
      },
    });
  }

  cancelEditTask(){
    this.showEditTaskDialog = false;
    this.editingTask = {
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

  toggleInviteUsers(){
    this.showInviteUsersDialog = true;
    this.invitedUsers = [];
  }
  cancelInvite(){
    this.showInviteUsersDialog = false;
    this.invitedUsers = [];
  }
  inviteUsers(){
    this.showInviteUsersDialog = false;
    // Añadir invitedUsers a card.users
    this.card.users = this.card.users.concat(this.invitedUsers);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Users Invited',
      life: 3000,
    });
  }
  filterExistingUsers(): User[] {
    let existingUserNames = this.card.users.map(user => user.name);
    return this.users.filter(user => !existingUserNames.includes(user.name));
  }

  formatTitle(title: string): string{
    if (title)
    return title.toLowerCase().replace(/-/g, ' ');
    return ''
  }
}
