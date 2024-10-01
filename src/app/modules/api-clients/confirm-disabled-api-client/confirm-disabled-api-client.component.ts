import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-api-client',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './confirm-disabled-api-client.component.html',
  styleUrl: './confirm-disabled-api-client.component.scss'
})
export class ConfirmDisabledApiClientComponent {
  data = inject(MAT_DIALOG_DATA);

}
