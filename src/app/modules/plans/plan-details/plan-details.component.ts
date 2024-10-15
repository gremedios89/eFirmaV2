import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-plan-details',
  standalone: true,
  imports: [CommonModule, MatLabel, MatDialogModule, MatButtonModule],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.scss'
})
export class PlanDetailsComponent {
  data = inject(MAT_DIALOG_DATA);

  constructor( public dialogRef: MatDialogRef<PlanDetailsComponent>,) {

  }

  onClose(): void {
    this.dialogRef.close();
  }
}
