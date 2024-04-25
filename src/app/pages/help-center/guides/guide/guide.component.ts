import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuidesDataService, Guide } from '../../../../services/guides-data.service';
@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent implements OnInit {
  guideTitle!: string;
  guide!: Guide;
  guides!: Guide[];

  constructor(private route: ActivatedRoute, private guidesDataService: GuidesDataService) {}

  ngOnInit(): void {
    this.guides = this.guidesDataService.getGuides();
    this.route.params.subscribe(params => {
      this.guideTitle = params['title'];
      this.guide = this.guides.find(guidesList => guidesList.title === this.guideTitle) || {} as Guide;
    });
  }
}
