import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snack-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-snack-bar.component.html',
  styleUrl: './custom-snack-bar.component.scss'
})
export class CustomSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBarRef: MatSnackBarRef<CustomSnackBarComponent>) {}

  onActionClick(): void {
    if (this.data.action) {
      this.data.action();
    } else {
      this.snackBarRef.dismiss(); // Cierra el SnackBar
    }
  }
 
}
