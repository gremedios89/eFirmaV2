import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'app/core/services/clients/clients.service';
import { isNullOrEmpty } from 'app/core/utils/typescript';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, MatRadioModule, MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent implements OnInit, OnDestroy {
  isEdit: boolean = false;
  selectedClient: any;

  horizontalStepperForm: UntypedFormGroup;
  clientForm: FormGroup;
  institutional: boolean;

  provincias: any = [
    { name: 'Pinar del Río' },
    { name: 'Artemisa' },
    { name: 'La Habana' },
    { name: 'Mayabeque' },
    { name: 'Matanzas' },
    { name: 'Cienfuegos' },
    { name: 'Villa Clara' },
    { name: 'Sancti Spíritus' },
    { name: 'Ciego de Ávila' },
    { name: 'Camagüey' },
    { name: 'Las Tunas' },
    { name: 'Granma' },
    { name: 'Holguín' },
    { name: 'Santiago de Cuba' },
    { name: 'Guantánamo' },
    { name: 'Isla de la Juventud' },
  ];

  monedas: any = [];
  clientId: any;

  private destroy$ = new Subject<void>();


  constructor(private fb: FormBuilder, private clientsService: ClientsService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadCoins();
  }

  private loadCoins(): void {
    this.clientsService.getCoinList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (monedas) => {
          this.monedas = monedas;
          this.handleQueryParams();  // Pasamos al manejo de los queryParams
        },
        error: (error) => {
          console.log('Error al cargar monedas:', error);
        }
      });
  }

  private handleQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (queryParams) => {
          this.clientId = queryParams.id;
          this.isEdit = !!this.clientId;
  
          if (this.isEdit) {
            this.loadClient(); // Cargar los detalles del cliente si es edición
          } else {
            this.initForm(); // Inicializar el formulario si no es edición
          }
        },
        error: (error) => {
          console.log('Error al manejar query params:', error);
        }
      });
  }

  private loadClient(): void {
    this.clientsService.getClientById(this.clientId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (client) => {
          this.handleEditMode(client); // Lógica de edición
        },
        error: (error) => {
          console.log('Error al cargar el cliente:', error);
        }
      });
  }
  
  private handleEditMode(client: any): void {
    this.selectedClient = client;
    // Convierte y pasa el valor institucional como string a changeValue
    this.changeValue({ value: this.selectedClient.institutional.toString() });

    this.loadClientData(this.selectedClient);
  }

  loadClientData(client: any): void {
    if (!isNullOrEmpty(client)) {
      if (!client.institutional) {
        this.horizontalStepperForm.get('step1')?.patchValue({
          nombre: client.name,
          apellidos: client.lastName,
          correo: client.contactEmail,
          ciPasaporte: client.identificador,
          direccion: client.address,
          telefono: client.contactPhone,
          pais: client.country,
          provincia: client.province,
          descripcion:  client.description,
        });
      } else {
        this.horizontalStepperForm.get('step1')?.patchValue({
          nombre: client.name,
          nombreCorto: client.nombreCorto,
          correo: client.contactEmail,
          direccion: client.address,
          codigoReeup: client.codigoReeup,
          telefono: client.contactPhone,
          pais: client.country,
          provincia: client.province,
          descripcion:  client.description,
        });
      }
    }
  }

  changeValue(event: any): void {
    if (event.value === 'true') {
      this.institutional = true;
    }  else if (event.value === 'false') {
      this.institutional = false;
    }
    this.initForm();
  }

  initForm(): void {
    this.horizontalStepperForm = this.fb.group({
      step1: this.fb.group({
        nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
        nombreCorto: [{ value: '', disabled: !this.institutional }, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
        apellidos: [{ value: '', disabled: this.institutional }, [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
        correo: ['', [Validators.required, Validators.email]],
        ciPasaporte: [{ value: '', disabled: this.institutional }, [Validators.required, this.ciPasaporteValidator]],
        direccion: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#%/\\s]+$')]],
        codigoReeup: [{ value: '', disabled: !this.institutional }, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')]],
        telefono: ['', [Validators.required, Validators.pattern('^\\d{8,10}$')]],
        pais: ['Cuba', Validators.required],
        provincia: ['', Validators.required],
        descripcion: ['', Validators.required],
      }),
      step2: this.fb.array([]),
    });
    this.addBankAccount()
  }

  addBankAccount(): void {
    const bankAccountForm = this.fb.group({
      numeroCuenta: ['', [Validators.required, Validators.pattern('^\\d{16}$')]],
      titular: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      moneda: ['', Validators.required],
      observaciones: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      banco: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      sucursal: ['', [Validators.required, Validators.pattern('^\\d{4}$')]],
    });
  
    this.bankAccounts.push(bankAccountForm);
  }
  
  get bankAccounts(): FormArray {
    return this.horizontalStepperForm.get('step2') as FormArray;
  }

  removeBankAccount(index: number): void {
    this.bankAccounts.removeAt(index);
  }

  // Validador personalizado para CI/Pasaporte
  ciPasaporteValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (/^\d{11}$/.test(value)) { // CI válido
      return null;
    } else if (/^[A-Z]\d{6,7}$/.test(value)) { // Pasaporte válido
      return null;
    }
    return { invalidCiPasaporte: true };
  }

  onSubmit(): void {
    console.log(this.clientForm.value);
  }

  onCancel(): void {
    //this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
