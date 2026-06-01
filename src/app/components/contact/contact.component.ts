import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LucideMail, LucideArrowUpRight } from '@lucide/angular';
import { ActionCallComponent } from '../action-call/action-call.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideMail, LucideArrowUpRight, ActionCallComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
