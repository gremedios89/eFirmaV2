import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RoleService } from 'app/core/services/roles/role.service';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmDeleteRoleComponent } from '../confirm-delete-role/confirm-delete-role.component';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { AddRoleComponent } from '../add-role/add-role.component';
import { isNullOrEmpty } from 'app/core/utils/typescript';
import { RolePermissionsComponent } from '../role-permissions/role-permissions.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule, MatTableModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSortModule, MatMenuModule, MatDialogModule, MatBadgeModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  displayedColumns: string[] = ['name', 'status', 'description', 'actions'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  roleList!: any[];

  readonly dialog = inject(MatDialog);

  constructor(private roleService: RoleService, private notificationService: NotificationsService,) {

  }

  ngOnInit(): void {
    this.loadRoleList();
  }

  loadRoleList(): void {
    this.roleService.getRoleList()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (resp) => {
        this.roleList = resp;
        this.dataSource = new MatTableDataSource(this.roleList);
        this.configDataSource();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  configDataSource(): void {
    if (this.paginator && this.sort) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.error('Paginator or Sort not available');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRole(element?: any): void {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '600px',
      data: {
        role: element,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrEmpty(result)) {
        if (result.operation === 'add') {
          this.notificationService.showSuccess(`El Rol <strong>${result.resp.name}</strong> creado exitosamente.`);
        } else if (result.operation === 'edit') {
          this.notificationService.showSuccess(`El Rol <strong>${element.name}</strong> editado exitosamente.`);
        }
      }
      console.log(`Dialog result: ${result}`);
      if (!isNullOrEmpty(result))
        this.loadRoleList();
    });
  }

  deleteRole(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteRoleComponent, {
      width: '500px',
      data: {
        role: element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roleService.deleteRole(element.id).subscribe({
          next: (resp) => {
            this.loadRoleList();
            this.notificationService.showSuccess(`El Rol <strong>${element.name}</strong> se eliminado exitosamente.`);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  viewPermissionsList(element: any): void {
    const dialogRef = this.dialog.open(RolePermissionsComponent, {
      width: '600px',
      maxHeight: '550px',
      data: {
        role: element
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
