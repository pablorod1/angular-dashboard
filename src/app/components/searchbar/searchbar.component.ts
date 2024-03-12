import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  visible: boolean = false;

  position: string = 'center';

  showDialog(position: string) {
      this.position = position;
      this.visible = true;
  }
}
