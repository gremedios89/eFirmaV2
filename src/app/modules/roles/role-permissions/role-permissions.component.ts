import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { isNullOrEmpty } from 'app/core/utils/typescript';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [MatDividerModule, MatListModule, MatButtonModule, MatDialogModule],
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.scss'
})
export class RolePermissionsComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  selectedRole: any;

  constructor() {}

  ngOnInit(): void {
    if (!isNullOrEmpty(this.data.role)) {
      this.selectedRole = this.data.role;
    }
  }

}
