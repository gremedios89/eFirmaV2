import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-confirm-create-api-client',
  standalone: true,
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule, ClipboardModule],
  templateUrl: './confirm-create-api-client.component.html',
  styleUrl: './confirm-create-api-client.component.scss'
})
export class ConfirmCreateApiClientComponent {
  data = inject(MAT_DIALOG_DATA);
  isDisable: boolean = true;

  cliqboardClicEvent(): void {
    this.isDisable = false;
  }

}
