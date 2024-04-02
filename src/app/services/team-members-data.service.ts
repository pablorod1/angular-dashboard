import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamMembersDataService {

  getMembers(){
    return [
      {
        id: 1,
        name: 'Javier Martínez',
        imageUrl: '/assets/profile-pictures/profile-picture.webp',
        role: 'Designer',
        email: 'javiermartinez@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 2,
        name: 'John Doe',
        imageUrl: '/assets/profile-pictures/profile-picture2.webp',
        role: 'Developer',
        email: 'janedoe@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 3,
        name: 'Jessica Stones',
        imageUrl: '/assets/profile-pictures/profile-picture3.webp',
        role: 'Manager',
        email: 'jessicastones@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 4,
        name: 'Pedro López',
        imageUrl: '/assets/profile-pictures/profile-picture4.webp',
        role: 'Tester',
        email: 'pedrolopez@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 5,
        name: 'María Elena',
        imageUrl: '/assets/profile-pictures/profile-picture5.webp',
        role: 'Developer',
        email: 'mariaelena@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 6,
        name: 'Carlos Rodríguez',
        imageUrl: '/assets/profile-pictures/profile-picture6.webp',
        role: 'Designer',
        email: 'carlosrodriguez@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 7,
        name: 'Juan Pérez',
        imageUrl: '/assets/profile-pictures/profile-picture7.webp',
        role: 'Developer',
        email: 'juanperez@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 8,
        name: 'Ana Gómez',
        imageUrl: '/assets/profile-pictures/profile-picture8.webp',
        role: 'Manager',
        email: 'anagomez@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      },
      {
        id: 9,
        name: 'Natalia Sánchez',
        imageUrl: '/assets/profile-pictures/profile-picture9.webp',
        role: 'Tester',
        email: 'nataliasanchez@lucentialab.es',
        phoneNumber: '+(34)123-456-789'
      }
    ];
  }
}
