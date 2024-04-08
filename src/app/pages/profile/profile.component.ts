import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  editSkills = false;
  newSkill = '';
  skills: any[] = [
    {label: 'HTML5'},
    {label: 'CSS3'},
    {label: 'JavaScript'},
  ];
  overviewTasks: any[] = [
    {label: 'Web Design', value: '50%', icon: 'bi bi-pencil-fill', color: 'primary'},
    {label: 'Mobile Template', value: '30%', icon: 'bi bi-phone-fill', color: 'success'},
    {label: 'Backend API', value: '80%', icon: 'bi bi-server', color: 'danger'},
    {label: 'Web Markup', value: '10%', icon: 'bi bi-code-slash', color: 'warning'},
  ]

  cancelEditingSkills(){
    this.editSkills = false;
    this.skills = [
      {label: 'HTML5'},
      {label: 'CSS3'},
      {label: 'JavaScript'},
    ]
  }

  addSkill(){
    this.skills.push({label: this.newSkill});
  }
}
