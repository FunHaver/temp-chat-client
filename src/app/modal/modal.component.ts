import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-modal',
    imports: [],
    template: `
    <div class="modal" (click)="toggleVisibility()">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-head">
          <h1>{{headerTitle}}</h1>
          <button (click)="toggleVisibility()" class="close-button">X</button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./modal.component.scss']
})
export class MobileRoomControlsComponent {
  @Input() visibilityBool!: boolean;
  @Input() headerTitle!: string;
  @Output() modalVisChange = new EventEmitter<boolean>();

  toggleVisibility(){
    this.visibilityBool = !this.visibilityBool;
    this.modalVisChange.emit(this.visibilityBool);
  }

}
