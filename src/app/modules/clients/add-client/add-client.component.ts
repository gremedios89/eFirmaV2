import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ClientsService } from 'app/core/services/clients/clients.service';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, MatRadioModule, MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent implements OnInit {
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

  constructor(private fb: FormBuilder, private clientsService: ClientsService ) {

  }

  ngOnInit(): void {
    this.clientsService.getCoinList().subscribe({
      next: (resp) => {
        this.monedas = resp;
        this.initForm();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  changeValue(event: any): void {
    if (event.value === 'natural') {
      this.institutional = false;
    } else if (event.value === 'juridico') {
      this.institutional = true;
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

}
