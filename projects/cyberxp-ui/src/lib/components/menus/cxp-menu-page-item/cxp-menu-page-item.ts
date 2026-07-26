import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cxp-menu-page-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cxp-menu-page-item.html',
  styleUrl: './cxp-menu-page-item.css',
})
export class CxpMenuPageItem {
  @Input({ required: true })
  route = '';

  @Input()
  exact = false;

  @Input()
  disabled = false;

  @Input()
  ariaLabel?: string;

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }
}
