import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailsDataService {

  getMailsData(){
    return [
      {
        sender: 'Pedro López',
        title: 'Reunion',
        message: 'We should meet at 7pm',
        timestamp: 'Mar 13, 12:50 PM',
        img: '../../../assets/profile-picture4.webp',
        readed: false,
      },
      {
        sender: 'Jessica Stones',
        title: 'Report',
        message: 'I finished the report, please check it out',
        timestamp: 'Mar 13, 11:30 AM',
        img: '../../../assets/profile-picture3.webp',
        readed: false,
      },
      {
        sender: 'John Doe',
        title: 'Party',
        message: 'Dude, I heard you are going to the party tonight, is that true?',
        timestamp: 'Mar 13, 10:00 AM',
        img: '../../../assets/profile-picture2.webp',
        readed: false,
      },
      {
        sender: 'Maria Elena',
        title: 'Project',
        message: 'I need your help with the project',
        timestamp: 'Mon 12, 10:00 AM',
        img: '../../../assets/profile-picture5.webp',
        readed: true,
      },
      {
        sender: 'Natalia Sánchez',
        title: 'Meeting',
        message: "Don't forget to bring the documents for the meeting",
        timestamp: 'Mon 12, 9:00 AM',
        img: '../../../assets/profile-picture9.webp',
        readed: true,
      },

    ]
  }
}
