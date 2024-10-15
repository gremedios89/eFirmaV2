import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule,
    MatCheckboxModule, MatSelectModule, NgxMatSelectSearchModule, MatDatepickerModule, MatRadioModule],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.scss'
})
export class AddPlanComponent implements OnInit {
  formPlan: FormGroup;

  isEdit: boolean = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddPlanComponent>,) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formPlan = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      duracion: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      limiteFirmas: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      limiteCertificados: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      inicio: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0.01), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      tipoPago: ['', Validators.required],
      moneda: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      planActivo: [true],
      aplicaClienteApi: [false],
      aplicaCliente: [true]
    });
  }

  onSubmit() {
    if (this.formPlan.valid) {
      console.log(this.formPlan.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
