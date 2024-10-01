import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_SELECTSEARCH_DEFAULT_OPTIONS, MatSelectSearchOptions, NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { isNullOrEmpty } from 'app/core/utils/typescript';
import { ApiClientsService } from 'app/core/services/api-clients/api-clients.service';

@Component({
  selector: 'app-assign-api-client-permissions',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, ReactiveFormsModule,
    MatSelectModule, MatCheckboxModule, NgxMatSelectSearchModule
  ],
  providers: [
    {
      provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
      useValue: <MatSelectSearchOptions>{
        noEntriesFoundLabel: 'No options found',
      }
    },
  ],
  templateUrl: './assign-api-client-permissions.component.html',
  styleUrl: './assign-api-client-permissions.component.scss'
})
export class AssignApiClientPermissionsComponent implements OnInit, AfterViewInit, OnDestroy{
  data = inject(MAT_DIALOG_DATA);

  permissionsList: any[] = [];

  permissionsForm: FormGroup;
  formIsLoading: boolean = true;

  public permissionsMultiFilterCtrl: FormControl<string> = new FormControl<string>('');
  public filteredPermissionssMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  constructor(private userService: UserService, private fb: FormBuilder, private apiClientsService: ApiClientsService,
    public dialogRef: MatDialogRef<AssignApiClientPermissionsComponent>
  ) {
    this.permissionsForm = this.fb.group({
      operationType: [[]]
    });
  }

  ngOnInit(): void {
    this.getPermissionsList();

    // load the initial reps list
    this.filteredPermissionssMulti.next(this.permissionsList.slice());

    // listen for search field value changes
    this.permissionsMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPermissionssMulti();
      });
  }

  ngAfterViewInit(): void {
    if (!this.formIsLoading) {
      this.setInitialValue();
    }
  }

  protected setInitialValue() {
    this.filteredPermissionssMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredpermissionss are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filterPermissionssMulti() {
    if (!this.permissionsList) {
      return;
    }
    // get the search keyword
    let search = this.permissionsMultiFilterCtrl.value;
    if (!search) {
      this.filteredPermissionssMulti.next(this.permissionsList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the permissionss
    this.filteredPermissionssMulti.next(
      this.permissionsList.filter(permission => permission.nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  getPermissionsList(): void {
    this.formIsLoading = true;
    this.userService.getPermissionsList().subscribe({
      next: (resp) => {
        // load the initial permissions list
        this.permissionsList = resp;
        this.formIsLoading = false;
        
        // load the initial reps list
        this.filteredPermissionssMulti.next(this.permissionsList.slice());

        if (!isNullOrEmpty(this.data.clientApi.operationType)) {
          this.loadPermissions();
        }
      },
      error: (error) => {
        this.formIsLoading = false;
      }
    })
  }

  loadPermissions(): void {
    // Extraer los idOperationType
    const ids = this.data.clientApi.operationType.map(operation => operation.idOperationType);
    this.permissionsForm.patchValue({
      operationType: ids
    });
  }

  onSubmit(): void {
    let params = {
      id_api_client: this.data.clientApi.id,
      list_id_permission: this.permissionsForm.value.operationType
    }

    this.apiClientsService.assignPermissionToApiClient(params).subscribe({
      next: (resp) => {
        this.dialogRef.close(resp);
      },
      error: (error) => {
        this.dialogRef.close(error);
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
