import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Command } from '../../shared/interfaces/command';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent {
  messages: Observable<Command[]>;

  constructor(private notificationsService: NotificationsService) {
    this.messages = this.notificationsService.messagesOutput;
  }

  public clearMessage(id: number) {
    this.notificationsService.clearMessage(id);
  }
}
