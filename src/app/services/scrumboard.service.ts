import { Injectable } from '@angular/core';

export interface User{
  id: number;
  name: string;
  imageUrl: string;
}

export interface Icon{
  id: number;
  name: string;
  icon: string;
}

export interface CardProject{
  id: number;
  title: string;
  description: string;
  icon: Icon;
  users: User[];
  tasks: Task[];
}

export interface Task{
  id: number;
  taskImage?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  users: User[];
  tags: string[];
  dueDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrumboardService {


  constructor() { }

  icons: Icon[] = [
    { id: 1, name: 'Alarm', icon: 'bi-alarm' },
    { id: 2, name: 'Basket', icon: 'bi-basket' },
    { id: 3, name: 'Bell', icon: 'bi-bell' },
    { id: 4, name: 'Book', icon: 'bi-book' },
    { id: 5, name: 'Briefcase', icon: 'bi-briefcase' },
    { id: 6, name: 'Building', icon: 'bi-building' },
    { id: 7, name: 'Calendar', icon: 'bi-calendar' },
    { id: 8, name: 'Camera', icon: 'bi-camera' },
    { id: 9, name: 'Chat', icon: 'bi-chat' },
    { id: 10, name: 'Check Circle', icon: 'bi-check-circle' },
    { id: 11, name: 'Cloud', icon: 'bi-cloud' },
    { id: 12, name: 'Code Slash', icon: 'bi-code-slash' },
    { id: 13, name: 'Collection', icon: 'bi-collection' },
    { id: 14, name: 'Compass', icon: 'bi-compass' },
    { id: 15, name: 'CPU', icon: 'bi-cpu' },
    { id: 16, name: 'Cup', icon: 'bi-cup' },
    { id: 17, name: 'Diagram', icon: 'bi-diagram-3' },
    { id: 18, name: 'Envelope', icon: 'bi-envelope' },
    { id: 19, name: 'Flag', icon: 'bi-flag' },
    { id: 20, name: 'Folder', icon: 'bi-folder' },
    { id: 21, name: 'Gear', icon: 'bi-gear' },
    { id: 22, name: 'Globe', icon: 'bi-globe' },
    { id: 23, name: 'Graph Up', icon: 'bi-graph-up' },
    { id: 24, name: 'Heart', icon: 'bi-heart' },
    { id: 25, name: 'House', icon: 'bi-house' },
    { id: 26, name: 'Image', icon: 'bi-image' },
    { id: 27, name: 'Inbox', icon: 'bi-inbox' },
    { id: 28, name: 'Key', icon: 'bi-key' },
    { id: 29, name: 'Laptop', icon: 'bi-laptop' },
    { id: 30, name: 'Lightbulb', icon: 'bi-lightbulb' },
    { id: 31, name: 'List Task', icon: 'bi-list-task' },
    { id: 32, name: 'Lock', icon: 'bi-lock' },
    { id: 33, name: 'Map', icon: 'bi-map' },
    { id: 34, name: 'Music Note', icon: 'bi-music-note' },
    { id: 35, name: 'Palette', icon: 'bi-palette' },
    { id: 36, name: 'Pencil', icon: 'bi-pencil' },
    { id: 37, name: 'Phone', icon: 'bi-phone' },
    { id: 38, name: 'Pin', icon: 'bi-pin' },
    { id: 39, name: 'Printer', icon: 'bi-printer' },
    { id: 40, name: 'Receipt', icon: 'bi-receipt' },
    { id: 41, name: 'Save', icon: 'bi-save' },
    { id: 42, name: 'Scissors', icon: 'bi-scissors' },
    { id: 43, name: 'Search', icon: 'bi-search' },
    { id: 44, name: 'Shield', icon: 'bi-shield' },
    { id: 45, name: 'Shop', icon: 'bi-shop' },
    { id: 46, name: 'Star', icon: 'bi-star' },
    { id: 47, name: 'Stickies', icon: 'bi-stickies' },
    { id: 48, name: 'Sun', icon: 'bi-sun' },
    { id: 49, name: 'Table', icon: 'bi-table' },
    { id: 50, name: 'Tags', icon: 'bi-tags' },
    { id: 51, name: 'Terminal', icon: 'bi-terminal' },
    { id: 52, name: 'Tools', icon: 'bi-tools' },
    { id: 53, name: 'Trash', icon: 'bi-trash' },
    { id: 54, name: 'Trophy', icon: 'bi-trophy' },
    { id: 55, name: 'Truck', icon: 'bi-truck' },
    { id: 56, name: 'Upload', icon: 'bi-upload' },
    { id: 57, name: 'Wallet', icon: 'bi-wallet' },
    { id: 58, name: 'Watch', icon: 'bi-watch' },
    { id: 59, name: 'WiFi', icon: 'bi-wifi' },
    { id: 60, name: 'Wrench', icon: 'bi-wrench' }
  ];

  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      imageUrl: '../../../../assets/profile-pictures/profile-picture.webp'
    },
    {
      id: 2,
      name: 'Jane Doe',
      imageUrl: '../../../../assets/profile-pictures/profile-picture2.webp'
    },
    {
      id: 3,
      name: 'Alice',
      imageUrl: '../../../../assets/profile-pictures/profile-picture3.webp'
    },
    {
      id: 4,
      name: 'Bob',
      imageUrl: '../../../../assets/profile-pictures/profile-picture4.webp'
    },
    {
      id: 5,
      name: 'Charlie',
      imageUrl: '../../../../assets/profile-pictures/profile-picture5.webp'
    },
    {
      id: 6,
      name: 'David',
      imageUrl: '../../../../assets/profile-pictures/profile-picture6.webp'
    },
    {
      id: 7,
      name: 'Eve',
      imageUrl: '../../../../assets/profile-pictures/profile-picture7.webp'
    },
    {
      id: 8,
      name: 'Frank',
      imageUrl: '../../../../assets/profile-pictures/profile-picture8.webp'
    },
    {
      id: 9,
      name: 'Grace',
      imageUrl: '../../../../assets/profile-pictures/profile-picture9.webp'
    },
    {
      id: 10,
      name: 'Henry',
      imageUrl: '../../../../assets/profile-pictures/profile-picture10.webp'
    }
  ]

  cardProjects: CardProject[] = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Project 1 description',
      icon: {
        id: 1,
        name: 'Calendar',
        icon: 'bi-calendar'
      },
      users: [
        {
          id: 1,
          name: 'John Doe',
          imageUrl: '../../../../assets/profile-pictures/profile-picture10.webp'
        },
        {
          id: 2,
          name: 'Jane Doe',
          imageUrl: '../../../../assets/profile-pictures/profile-picture8.webp'
        },
        {
          id: 3,
          name: 'Alice',
          imageUrl: '../../../../assets/profile-pictures/profile-picture4.webp'
        }
      ],
      tasks: [
        {
          id: 1,
          taskImage: 'assets/city.webp',
          title: 'Task 1',
          description: 'Task 1 description',
          status: 'To Do',
          dueDate: '28 Jun 2024',
          priority: 'Low',
          users: [
            {
              id: 1,
              name: 'John Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture2.webp'
            },
            {
              id: 2,
              name: 'Jane Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture5.webp'
            }
          ],
          tags: ['Design', 'Marketing']
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Task 2 description',
          status: 'In Progress',
          dueDate: '15 Jul 2024',
          priority: 'High',
          users: [
            {
              id: 3,
              name: 'Alice',
              imageUrl: '../../../../assets/profile-pictures/profile-picture6.webp'
            },
            {
              id: 4,
              name: 'Bob',
              imageUrl: '../../../../assets/profile-pictures/profile-picture7.webp'
            }
          ],
          tags: ['Development', 'Concept']
        },
        {
          id: 3,
          taskImage: 'assets/bridge_wallpaper.webp',
          title: 'Task 3',
          description: 'Task 3 description',
          status: 'In Review',
          dueDate: '10 Aug 2024',
          priority: 'Medium',
          users: [
            {
              id: 5,
              name: 'Charlie',
              imageUrl: '../../../../assets/profile-pictures/profile-picture8.webp'
            },
            {
              id: 6,
              name: 'David',
              imageUrl: '../../../../assets/profile-pictures/profile-picture9.webp'
            }
          ],
          tags: ['Design', 'Development']
        },
        {
          id: 4,
          taskImage: 'assets/car_vacations.webp',
          title: 'Task 4',
          description: 'Task 4 description',
          status: 'Done',
          dueDate: '13 May 2024',
          priority: 'Low',
          users: [
            {
              id: 7,
              name: 'Eve',
              imageUrl: '../../../../assets/profile-pictures/profile-picture10.webp'
            },
            {
              id: 8,
              name: 'Frank',
              imageUrl: '../../../../assets/profile-pictures/profile-picture.webp'
            }
          ],
          tags: ['Concept', 'Marketing']
        },
        {
          id: 5,
          title: 'Task 5',
          description: 'Task 5 description',
          status: 'To Do',
          dueDate: '5 Jun 2024',
          priority: 'High',
          users: [
            {
              id: 1,
              name: 'John Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture2.webp'
            },
            {
              id: 2,
              name: 'Jane Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture5.webp'
            }
          ],
          tags: ['Design', 'Development']
        },
        {
          id: 6,
          title: 'Task 6',
          description: 'Task 6 description',
          taskImage: 'assets/river.webp',
          status: 'In Progress',
          dueDate: '15 Jul 2024',
          priority: 'Medium',
          users: [
            {
              id: 3,
              name: 'Alice',
              imageUrl: '../../../../assets/profile-pictures/profile-picture3.webp'
            },
            {
              id: 4,
              name: 'Bob',
              imageUrl: '../../../../assets/profile-pictures/profile-picture4.webp'
            }
          ],
          tags: ['Development', 'Concept']
        },
        {
          id: 7,
          title: 'Task 7',
          description: 'Task 7 description',
          status: 'In Review',
          dueDate: '10 Aug 2024',
          priority: 'Low',
          users: [
            {
              id: 5,
              name: 'Charlie',
              imageUrl: '../../../../assets/profile-pictures/profile-picture5.webp'
            },
            {
              id: 6,
              name: 'David',
              imageUrl: '../../../../assets/profile-pictures/profile-picture6.webp'
            }
          ],
          tags: ['Design', 'Marketing']
        },
        {
          id: 8,
          title: 'Task 8',
          description: 'Task 8 description',
          status: 'Done',
          dueDate: '13 May 2024',
          priority: 'High',
          users: [
            {
              id: 7,
              name: 'Eve',
              imageUrl: '../../../../assets/profile-pictures/profile-picture7.webp'
            },
            {
              id: 8,
              name: 'Frank',
              imageUrl: '../../../../assets/profile-pictures/profile-picture8.webp'
            }
          ],
          tags: ['Marketing', 'Design']
        }
      ]
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Project 2 description',
      icon: {
        id: 2,
        name: 'Person',
        icon: 'bi-person'
      },
      users: [
        {
          id: 1,
          name: 'John Doe',
          imageUrl: '../../../../assets/profile-pictures/profile-picture2.webp'
        },
        {
          id: 2,
          name: 'Jane Doe',
          imageUrl: '../../../../assets/profile-pictures/profile-picture5.webp'
        },
        {
          id: 3,
          name: 'Alice',
          imageUrl: '../../../../assets/profile-pictures/profile-picture6.webp'
        },
        {
          id: 4,
          name: 'Bob',
          imageUrl: '../../../../assets/profile-pictures/profile-picture7.webp'
        },
        {
          id: 5,
          name: 'Charlie',
          imageUrl: '../../../../assets/profile-pictures/profile-picture8.webp'
        },
        {
          id: 6,
          name: 'David',
          imageUrl: '../../../../assets/profile-pictures/profile-picture9.webp'
        }
      ],
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Task 1 description',
          status: 'To Do',
          dueDate: '5 Jun 2024',
          priority: 'High',
          users: [
            {
              id: 1,
              name: 'John Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture.webp'
            },
            {
              id: 2,
              name: 'Jane Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture2.webp'
            }
          ],
          tags: ['Design', 'Development']
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Task 2 description',
          status: 'In Progress',
          dueDate: '',
          priority: 'Medium',
          users: [
            {
              id: 3,
              name: 'Alice',
              imageUrl: '../../../../assets/profile-pictures/profile-picture3.webp'
            },
            {
              id: 4,
              name: 'Bob',
              imageUrl: '../../../../assets/profile-pictures/profile-picture4.webp'
            }
          ],
          tags: ['Development', 'Concept']
        },
        {
          id: 3,
          title: 'Task 3',
          description: 'Task 3 description',
          status: 'In Review',
          dueDate: '',
          priority: 'Low',
          users: [
            {
              id: 5,
              name: 'Charlie',
              imageUrl: '../../../../assets/profile-pictures/profile-picture5.webp'
            },
            {
              id: 6,
              name: 'David',
              imageUrl: '../../../../assets/profile-pictures/profile-picture6.webp'
            }
          ],
          tags: ['Design', 'Marketing']
        },
        {
          id: 4,
          title: 'Task 4',
          description: 'Task 4 description',
          status: 'Done',
          dueDate: '',
          priority: 'High',
          users: [
            {
              id: 7,
              name: 'Eve',
              imageUrl: '../../../../assets/profile-pictures/profile-picture7.webp'
            },
            {
              id: 8,
              name: 'Frank',
              imageUrl: '../../../../assets/profile-pictures/profile-picture8.webp'
            }
          ],
          tags: ['Marketing', 'Design']
        }
      ]
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Project 3 description',
      icon: {
        id: 3,
        name: 'File',
        icon: 'bi-file'
      },
      users: [
        {
          id: 1,
          name: 'John Doe',
          imageUrl: '../../../../assets/profile-pictures/profile-picture7.webp'
        },
        {
          id: 2,
          name: 'Jane Doe',
          imageUrl: '../../../../assets/profile-pictures/profile-picture9.webp'
        },
        {
          id: 3,
          name: 'Alice',
          imageUrl: '../../../../assets/profile-pictures/profile-picture10.webp'
        }
      ],
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Task 1 description',
          status: 'To Do',
          dueDate: '',
          priority: 'High',
          users: [
            {
              id: 1,
              name: 'John Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture2.webp'
            },
            {
              id: 2,
              name: 'Jane Doe',
              imageUrl: '../../../../assets/profile-pictures/profile-picture5.webp'
            }
          ],
          tags: ['Tag 1', 'Tag 2']
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Task 2 description',
          status: 'In Progress',
          dueDate: '',
          priority: 'Low',
          users: [
            {
              id: 3,
              name: 'Alice',
              imageUrl: '../../../../assets/profile-pictures/profile-picture6.webp'
            },
            {
              id: 4,
              name: 'Bob',
              imageUrl: '../../../../assets/profile-pictures/profile-picture7.webp'
            }
          ],
          tags: ['Tag 3', 'Tag 4']
        },
        {
          id: 3,
          title: 'Task 3',
          description: 'Task 3 description',
          status: 'In Review',
          dueDate: '',
          priority: 'Medium',
          users: [
            {
              id: 5,
              name: 'Charlie',
              imageUrl: '../../../../assets/profile-pictures/profile-picture8.webp'
            },
            {
              id: 6,
              name: 'David',
              imageUrl: '../../../../assets/profile-pictures/profile-picture9.webp'
            }
          ],
          tags: ['Tag 5', 'Tag 6']
        },
        {
          id: 4,
          title: 'Task 4',
          description: 'Task 4 description',
          status: 'Done',
          dueDate: '',
          priority: 'Low',
          users: [
            {
              id: 7,
              name: 'Eve',
              imageUrl: '../../../../assets/profile-pictures/profile-picture10.webp'
            },
            {
              id: 8,
              name: 'Frank',
              imageUrl: '../../../../assets/profile-pictures/profile-picture.webp'
            }
          ],
          tags: ['Tag 7', 'Tag 8']
        }
      ]
    },
  ]

  getUsers(){
    return this.users;
  }

  getCardProjects(){
    return this.cardProjects;
  }

  getIcons(){
    return this.icons;
  }

  getTasks(){
    return this.cardProjects.map(project => project.tasks).flat();

  }

  addCardProject(card: CardProject){
    this.cardProjects.push(card);
  }
}
