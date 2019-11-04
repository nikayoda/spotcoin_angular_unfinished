import {Component, OnInit} from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5002/testhub')
      .build();

    connection.start().then(() => {
      console.log('Connected');
    }).catch(error => {
      return console.error(error);
    });

    connection.on('Test', (message: string) => {
      console.log(message);
    });
  }
}
