import { Component, EventEmitter, Output } from '@angular/core';
import { CxpIconUserCircle } from "cyberxp-ui";

@Component({
  selector: 'ams-basic-info-view',
  standalone: true,
  imports: [CxpIconUserCircle],
  templateUrl: './basic-info-view.html',
  styleUrl: './basic-info-view.css',
})
export class AmsBasicInfoView {
  @Output() edit = new EventEmitter<void>();

  firstName = 'Feliciano';
  middleName = '';
  lastName = 'Marinas';
  suffix = 'Jr.';

  onEdit(): void {
    this.edit.emit();
  }
}