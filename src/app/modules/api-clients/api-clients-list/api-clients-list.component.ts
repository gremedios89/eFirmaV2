import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ApiClientsService } from 'app/core/services/api-clients/api-clients.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiClient } from '../api-client.interface';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddApiClientComponent } from '../add-api-client/add-api-client.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ConfirmDisabledApiClientComponent } from '../confirm-disabled-api-client/confirm-disabled-api-client.component';
import { ConfirmCreateApiClientComponent } from '../confirm-create-api-client/confirm-create-api-client.component';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { AssignApiClientPermissionsComponent } from '../assign-api-client-permissions/assign-api-client-permissions.component';
import { isNullOrEmpty } from 'app/core/utils/typescript';

@Component({
  selector: 'app-api-clients-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule, MatTableModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSortModule, MatMenuModule, MatDialogModule, AddApiClientComponent, MatBadgeModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DatePipe
  ],
  templateUrl: './api-clients-list.component.html',
  styleUrl: './api-clients-list.component.scss'
})
export class ApiClientsListComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  displayedColumns: string[] = ['name', 'begin_date', 'end_date', 'enabled', 'description', 'actions'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  apiClientsList!: any[];

  readonly dialog = inject(MatDialog);

  constructor(
    private apiClientsService: ApiClientsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _userService: UserService,
    private datePipe: DatePipe,
    private notificationService: NotificationsService,
  ) {  }

  ngOnInit(): void {
    this.loadApiClients();
  }

  loadApiClients(): void {
    this.apiClientsService.getApiClients()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (resp) => {
        this.apiClientsList = resp.map((item: ApiClient) => ({
          id: item.id,
          created: item.created,
          enabled: item.enabled,
          end_date: this.datePipe.transform(item.end_date, 'yyyy-MM-dd'),
          begin_date: this.datePipe.transform(item.begin_date, 'yyyy-MM-dd'),
          identifier: item.identifier,
          description: item.description,
          name: item.name,
          operationType: item.operationType
        }));
        this.dataSource = new MatTableDataSource(this.apiClientsList);
        this.configDataSource();
      },
      error: (error) => {
        console.log(error);
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

  addApiClient(element?: any): void {
    const dialogRef = this.dialog.open(AddApiClientComponent, {
      width: '600px',
      maxHeight: '90vh',
      data: {
        client: element,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!isNullOrEmpty(result)) {
        if (result.operation === 'add') {
          this.notificationService.showSuccess('Cliente API creado exitosamente.');
          const dialogToken = this.dialog.open(ConfirmCreateApiClientComponent, {
            width: '600px',
            disableClose: true,
            data: {
              client: result.token,
            }
          });
        } else if (result.operation === 'edit') {
          this.notificationService.showSuccess(`Cliente API <strong>${element.name}</strong> editado exitosamente.`);
        }
      }
      console.log(`Dialog result: ${result}`);
      if (!isNullOrEmpty(result))
        this.loadApiClients();
    });
  }

  disableApiClient(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDisabledApiClientComponent, {
      width: '500px',
      data: {
        clientApi: element
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiClientsService.disabledApiClient(element).subscribe({
          next: (resp) => {
            this.loadApiClients();
            this.notificationService.showSuccess(`Cliente API <strong>${element.name}</strong> deshabilitado exitosamente.`);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  asignPemisOpenModal(element: any) : void {
    console.log(element);
    const dialogRef = this.dialog.open(AssignApiClientPermissionsComponent, {
      width: '650px',
      data: {
        clientApi: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadApiClients();
        this.notificationService.showSuccess(`Permisos asigandos exitosamente al Cliente API <strong>${element.name}</strong>.`);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
