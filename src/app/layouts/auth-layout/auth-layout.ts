import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconHrms } from '../../shared/components/icons/icon-hrms/icon-hrms';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, IconHrms],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
})
export class AuthLayout {
}
