import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuidesDataService, Guide } from '../../../../services/guides-data.service';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.component.html',
  styleUrl: './guide-list.component.css'
})
export class GuideListComponent implements OnInit{
  guides!: Guide[];
  guide!: Guide;
  guideTitle!: string;

  constructor (private route: ActivatedRoute, private guidesDataService: GuidesDataService) {}

  ngOnInit() {
    this.guides = this.guidesDataService.getGuides();
    this.route.params.subscribe(params => {
      this.guideTitle = params['title'];
      this.guide = this.guides.find(guide => guide.title === this.guideTitle) || {} as  Guide;
      console.log(this.guide);
    });
  }
}
