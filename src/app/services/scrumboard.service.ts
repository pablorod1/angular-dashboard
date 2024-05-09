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
  id: string;
  title: string;
  description: string;
  icon: Icon;
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class ScrumboardService {


  constructor() { }

  icons: Icon[] = [
    {
      id: 1,
      name: 'Calendar',
      icon: 'bi-calendar'
    },
    {
      id: 2,
      name: 'Person',
      icon: 'bi-person'
    },
    {
      id: 3,
      name: 'File',
      icon: 'bi-file'
    },
    {
      id: 4,
      name: 'Envelope',
      icon: 'bi-envelope'
    },
    {
      id: 5,
      name: 'Image',
      icon: 'bi-image'
    },
    {
      id: 6,
      name: 'Clipboard',
      icon: 'bi-clipboard'
    },
    {
      id: 7,
      name: 'List',
      icon: 'bi-list'
    },
    {
      id: 8,
      name: 'Card',
      icon: 'bi-card'
    },
    {
      id: 9,
      name: 'To Do',
      icon: 'bi-kanban'
    },
    {
      id: 10,
      name: 'Check',
      icon: 'bi-check'
    }
  ]

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
      id: '1',
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
      ]
    },
    {
      id: '2',
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
      ]
    },
    {
      id: '3',
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

  addCardProject(card: CardProject){
    this.cardProjects.push(card);
  }
}
