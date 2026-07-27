import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cxp-menu-sidebar-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './cxp-menu-sidebar-item.html',
  styleUrl: './cxp-menu-sidebar-item.css',
})
export class CxpMenuSidebarItem {
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
