import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  readonly title = input<string>();
  readonly tags = input.required<readonly string[]>();
}
