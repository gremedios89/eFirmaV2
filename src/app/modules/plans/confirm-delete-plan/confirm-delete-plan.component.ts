import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-plan',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './confirm-delete-plan.component.html',
  styleUrl: './confirm-delete-plan.component.scss'
})
export class ConfirmDeletePlanComponent {
  data = inject(MAT_DIALOG_DATA);
}
