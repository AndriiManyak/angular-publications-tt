import { Component } from '@angular/core';
import { parsedPublications } from '../api/api.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  publications = [];

  ngOnInit(): void {
    this.publications = parsedPublications;
  }
}
