import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActionCallComponent } from '../action-call/action-call.component';
import { TextLinkComponent } from '../text-link/text-link.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ActionCallComponent, TextLinkComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
