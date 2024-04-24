import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.css',

})
export class BlogPostsComponent {
  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }

  posts = [
    {
      img: '../../../assets/ppl-vacations.webp',
      category: 'People',
      title: 'Vacations in the mountains of Switzerland are amazing',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis et nunc aliquam ultricies.',
      userImg: '../../../assets/profile-pictures/profile-picture6.webp',
      userName: 'John Doe',
    },
    {
      img: '../../../assets/street.webp',
      category: 'Shopping',
      title: 'Shopping in the streets of Paris is a must-do experience',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis et nunc aliquam ultricies.',
      userImg: '../../../assets/profile-pictures/profile-picture10.webp',
      userName: 'Jane Doe',
    },
    {
      img: '../../../assets/city.webp',
      category: 'Travel',
      title: 'Traveling to the city of love, Paris, is a dream come true',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis et nunc aliquam ultricies.',
      userImg: '../../../assets/profile-pictures/profile-picture2.webp',
      userName: 'Pedro López',
    },
  ]
}
