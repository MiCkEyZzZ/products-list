import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input()
  control: any = FormControl;

  @Input()
  inputType: string;

  @Input()
  label: string;

  @Input()
  id: string | number;

  @Input()
  placeholder: string;

  @Input()
  controlType = 'input';

  @Input()
  className: string;

  public showErrors() {
    const { dirty, touched, errors } = this.control;

    return dirty && touched && errors;
  }
}
