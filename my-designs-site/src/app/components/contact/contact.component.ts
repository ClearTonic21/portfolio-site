import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LucideMail, LucideArrowUpRight } from '@lucide/angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideMail, LucideArrowUpRight],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {}
