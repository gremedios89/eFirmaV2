import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { isNullOrEmpty } from 'app/core/utils/typescript';
import { ApiClientsService } from 'app/core/services/api-clients/api-clients.service';


@Component({
  selector: 'app-add-api-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatDialogModule, MatButtonModule,
    MatCheckboxModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-api-client.component.html',
  styleUrl: './add-api-client.component.scss'
})
export class AddApiClientComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  isEdit: boolean = false;
  selectedApiClient: any;

  apiClientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddApiClientComponent>,
    private apiClientsService: ApiClientsService
  ) { }

  ngOnInit(): void {
    if (isNullOrEmpty(this.data.client)) {
      this.isEdit = false;
      this.initForm();
    } else {
      this.selectedApiClient = this.data.client;
      this.isEdit = true;
      this.initEditForm(this.data.client);
    } 
  }

  initForm(): void {
    this.apiClientForm = this.fb.group({
      enabled: [true],
      identifier: [this.generateRandomString(40), [Validators.required]],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ0-9 ]*$')]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ0-9 ]*$')]],
      begin_date: [new Date(), [Validators.required]],
      end_date: [null, [Validators.required, this.endDateValidator.bind(this)]],
    });
  
    // Escuchar cambios en `begin_date`
    this.apiClientForm.get('begin_date')?.valueChanges.subscribe(() => {
      const endDateControl = this.apiClientForm.get('end_date');
  
      // Forzar la validación de `end_date` cuando cambie `begin_date`
      if (endDateControl) {
        endDateControl.updateValueAndValidity();  // Volver a validar `end_date`
      }
    });
  }  

  initEditForm(apiClient: any): void {
    const beginDate = new Date(apiClient.begin_date);
    const endDate = new Date(apiClient.end_date);

    // Convertir a formato ISO
    const beginDateISO = beginDate.toISOString().slice(0, 10);
    const endDateISO = endDate.toISOString().slice(0, 10);

    this.initForm();

    this.apiClientForm.patchValue({
      enabled: apiClient.enabled,
      identifier: apiClient.identifier,
      description: apiClient.description,
      name: apiClient.name,
      begin_date: beginDateISO,
      end_date: endDateISO
    });
  }

  // Función para generar un random string de 40 caracteres
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Validador personalizado para end_date que debe ser mayor a begin_date
  endDateValidator(control: AbstractControl): ValidationErrors | null {
    const beginDate = this.apiClientForm?.get('begin_date')?.value;
    const endDate = control.value;
  
    if (!beginDate || !endDate) {
      return { endDateInvalid: true };
    }
  
    // Convertir ambas fechas a objetos Date y comparar solo la parte de la fecha
    const begin = new Date(beginDate);
    const end = new Date(endDate);
  
    const beginDateFormatted = new Date(begin.getFullYear(), begin.getMonth(), begin.getDate());
    const endDateFormatted = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
    // La end_date debe ser estrictamente mayor que la begin_date
    return endDateFormatted > beginDateFormatted ? null : { endDateInvalid: true };
  }

  onSubmit(): void {
    if (this.apiClientForm.valid) {
      if (!this.isEdit) {
        let apiClientDataAdd = {
          ...this.apiClientForm.value,
          enabled: this.apiClientForm.value.enabled ? 1 : 0,
          begin_date: new Date(this.apiClientForm.value.begin_date).getTime(),
          end_date: new Date(this.apiClientForm.value.end_date).getTime()
        }
        // Adicionar API Client
        this.apiClientsService.createApiClient(apiClientDataAdd).subscribe({
          next: (resp) => {
            let result = {
              operation: 'add',
              token: resp,
            }
            this.dialogRef.close(result);
          },
          error: (error) => {
            this.dialogRef.close(error);
          }
        });
      } else {
        // Editar API Client
        let apiClientDataEdit = {
          ...this.apiClientForm.value,
          created: this.selectedApiClient.created,
          begin_date: new Date(this.apiClientForm.value.begin_date).getTime(),
          end_date: new Date(this.apiClientForm.value.end_date).getTime(),
          identifier: this.selectedApiClient.identifier,
        }
        this.apiClientsService.editApiClient(apiClientDataEdit, this.selectedApiClient.id).subscribe({
          next: (resp) => {
            let result = {
              operation: 'edit',
              client: resp,
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

  // Función para cancelar y cerrar el diálogo
  onCancel(): void {
    this.dialogRef.close();
  }

}
