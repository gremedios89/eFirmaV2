import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from 'app/core/components/custom-snack-bar/custom-snack-bar.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private snackBarRef: MatSnackBarRef<CustomSnackBarComponent> | null = null;
  onScreenDuration: number = 3000;

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string, actionText: string = '', action?: () => void) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { message, actionText, action, panelClass: 'snack-bar-success' },
      duration: this.onScreenDuration,
      panelClass: 'snack-bar-success',
    });
  }

  showError(message: string, actionText: string = '', action?: () => void) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { message, actionText, action, panelClass: 'snack-bar-error' },
      duration: this.onScreenDuration,
      panelClass: 'snack-bar-error',
    });
  }

  showWarning(message: string, actionText: string = '', action?: () => void) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { message, actionText, action, panelClass: 'snack-bar-warning' },
      duration: this.onScreenDuration,
      panelClass: 'snack-bar-warning',
    });
  }

  closeSnackBar(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss(); // Close the SnackBar
      this.snackBarRef = null; // Reset the reference
    }
  }
}
