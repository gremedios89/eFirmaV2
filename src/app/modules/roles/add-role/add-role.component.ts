import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { RoleService } from 'app/core/services/roles/role.service';
import { UserService } from 'app/core/user/user.service';
import { isNullOrEmpty } from 'app/core/utils/typescript';
import { MAT_SELECTSEARCH_DEFAULT_OPTIONS, MatSelectSearchOptions, NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule,
    MatCheckboxModule, MatSelectModule, NgxMatSelectSearchModule],
  providers: [
    {
      provide: MAT_SELECTSEARCH_DEFAULT_OPTIONS,
      useValue: <MatSelectSearchOptions>{
        noEntriesFoundLabel: 'No options found',
      }
    },
  ],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  data = inject(MAT_DIALOG_DATA);
  isEdit: boolean = false;
  selectedRole: any;

  roleForm: FormGroup;

  permissionsList: any[] = [];
  formIsLoading: boolean = true;

  public permissionsMultiFilterCtrl: FormControl<string> = new FormControl<string>('');
  public filteredPermissionsMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  /** flags to set the toggle all checkbox state */
  isIndeterminate = false;
  isChecked = false;

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddRoleComponent>,
    private userService: UserService, private roleService: RoleService
  ) {

  }

  ngOnInit(): void {
    this.getPermissionsList();

    // load the initial reps list
    this.filteredPermissionsMulti.next(this.permissionsList.slice());

    // listen for search field value changes
    this.permissionsMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterPermissionssMulti();
      });  
  }

  initForm(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ0-9 ]*$')]],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ0-9 ]*$')]],
      operationTypes: [[]],
      status: [true, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      if (!this.isEdit) {
        this.roleService.saveRole(this.roleForm.value)
        .pipe(takeUntil(this._onDestroy))
        .subscribe({
          next: (resp) => {
            let result = {
              operation: 'add',
              resp: resp,
            }
            this.dialogRef.close(result);
          },
          error: (error) => {
            this.dialogRef.close(error);
          }
        });
      } else {
        this.roleService.updateRole(this.data.role.id, this.roleForm.value)
        .pipe(takeUntil(this._onDestroy))
        .subscribe({
          next: (resp) => {
            let result = {
              operation: 'edit',
              resp: resp,
            }
            this.dialogRef.close(result);
          },
          error: (error) => {
            this.dialogRef.close(error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    if (!this.formIsLoading) {
      this.setInitialValue();
    }
  }

  getPermissionsList(): void {
    this.formIsLoading = true;
    this.userService.getPermissionsList().subscribe({
      next: (resp) => {
        // load the initial permissions list
        this.permissionsList = resp;
        this.formIsLoading = false;
        
        // load the initial reps list
        this.filteredPermissionsMulti.next(this.permissionsList.slice());
        this.initForm();

        if (!isNullOrEmpty(this.data.role)) {
          this.isEdit = true;
          this.loadRoleData();
        } else {
          this.isEdit = false;
        }
      },
      error: (error) => {
        this.formIsLoading = false;
      }
    })
  }

  loadRoleData(): void {
    // Extraer los idOperationType
    const ids = this.data.role.operationTypes.map(operation => operation.id);

    this.roleForm.patchValue({
      name: this.data.role.name,
      description: this.data.role.name,
      operationTypes: ids,
      status: this.data.role.status,
    });
  }

  protected setInitialValue() {
    this.filteredPermissionsMulti
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
      this.filteredPermissionsMulti.next(this.permissionsList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the permissionss
    this.filteredPermissionsMulti.next(
      this.permissionsList.filter(permission => permission.nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredPermissionsMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        if (selectAllValue) {
          // Extraer los idOperationType
          const ids = val.map(operation => operation.id);
          this.roleForm.get('operationTypes').patchValue(ids);
        } else {
          this.roleForm.get('operationTypes').patchValue([]);
        }
      });
  }

}
