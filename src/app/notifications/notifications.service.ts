import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

import { Command } from '../shared/interfaces/command';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter(message => message.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, []),
    );
  }

  public addSuccess(message: string) {
    const id = this.rendomId();

    this.messagesInput.next({
      id,
      text: message,
      type: 'success',
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  public addError(message: string) {
    const id = this.rendomId();

    this.messagesInput.next({
      id: this.rendomId(),
      text: message,
      type: 'error',
    });

    setTimeout(() => {
      this.clearMessage(id);
    }, 5000);
  }

  public clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  private rendomId(): number {
    return Math.round(Math.random() * 10000);
  }
}
