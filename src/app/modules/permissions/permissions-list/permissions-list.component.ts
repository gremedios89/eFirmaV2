import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PermissionsService } from 'app/core/services/permissions/permissions.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-permissions-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatPaginatorModule, MatTableModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatSortModule, 
  ],
  templateUrl: './permissions-list.component.html',
  styleUrl: './permissions-list.component.scss'
})
export class PermissionsListComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  displayedColumns: string[] = ['nombre', 'operationType', 'avaliable', 'descripcion'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  permissionsList!: any[];

  constructor(private permissionService: PermissionsService,) {

  }

  ngOnInit(): void {
    this.loadPermissionsList();
  }

  loadPermissionsList(): void {
    this.permissionService.getPermissionsList()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (resp) => {
        this.permissionsList = resp;
        this.dataSource = new MatTableDataSource(this.permissionsList);
        this.configDataSource();
      }
    });
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

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
