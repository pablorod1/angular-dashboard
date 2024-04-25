import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuidesDataService, Guide } from '../../../services/guides-data.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrl: './guides.component.css'
})
export class GuidesComponent implements OnInit{
  guides!: Guide[];


  constructor (private router: Router, private guidesDataService: GuidesDataService) {}

  ngOnInit() {
    this.guides = this.guidesDataService.getGuides();
  }

  viewGuideList(guide: Guide) {
    this.router.navigate(['/guides', guide.title]);
    console.log(guide);
  }

  viewGuide(subtitle: string) {
    this.router.navigate(['/guide', subtitle]);
  }
}
