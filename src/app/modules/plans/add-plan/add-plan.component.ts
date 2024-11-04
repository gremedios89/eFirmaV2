import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatRadioModule } from '@angular/material/radio';
import { ClientsService } from 'app/core/services/clients/clients.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { PlansService } from 'app/core/services/plans/plans.service';
import { isNullOrEmpty } from 'app/core/utils/typescript';

@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule,
    MatCheckboxModule, MatSelectModule, NgxMatSelectSearchModule, MatDatepickerModule, MatRadioModule],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.scss'
})
export class AddPlanComponent implements OnInit {
  private destroy$ = new Subject<void>();

  formPlan: FormGroup;

  isEdit: boolean = false;

  showTipoCliente: boolean = false;

  monedas: any = [];

  tiposPago: any = [];

  showForm: boolean = false;

  data = inject(MAT_DIALOG_DATA);

  selectedPlan: any;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddPlanComponent>,
    private clientsService: ClientsService, private plansService: PlansService
  ) {

  }

  ngOnInit(): void {
    if (isNullOrEmpty(this.data.plan)) {
      this.isEdit = false;
    } else {
      this.selectedPlan = this.data.plan;
      this.isEdit = true;
    }

    // Realiza las dos llamadas de manera concurrente
    forkJoin({
      monedas: this.clientsService.getCoinList().pipe(takeUntil(this.destroy$)),
      tiposPago: this.plansService.getTipoPagoList().pipe(takeUntil(this.destroy$))
    }).subscribe({
      next: ({ monedas, tiposPago }) => {
        // Asigna los resultados a las variables
        this.monedas = monedas;
        this.tiposPago = tiposPago;
        // Inicializa el formulario solo después de obtener los datos
        this.initForm();

        if (this.isEdit) {
          this.initEditForm(this.selectedPlan);
        }
      },
      error: (error) => {
        console.log('Error al cargar datos:', error);
      }
    });
  }

  initForm(): void {
    this.formPlan = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      duracion: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      limiteFirmas: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      limiteCertificados: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      cantidadValidaciones: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      inicio: ['', Validators.required],
      costo: ['', [Validators.required, Validators.min(0.01), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      tipoPago: ['', Validators.required],
      moneda: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')]],
      activo: [true],
      aplicaClienteApi: [false],
      aplicaCliente: [true],
      asociado: [false],
      tipoPlan: [false],
    });
  
    // Escuchar cambios en los controles 'aplicaClienteApi' y 'aplicaCliente'
    this.formPlan.get('aplicaClienteApi')?.valueChanges.subscribe((value: boolean) => {
      this.formPlan.get('tipoPlan')?.setValue(value); // Si aplicaClienteApi es true, tipoPlan es true
    });
  
    this.formPlan.get('aplicaCliente')?.valueChanges.subscribe((value: boolean) => {
      this.formPlan.get('tipoPlan')?.setValue(!value); // Si aplicaCliente es true, tipoPlan es false
    });
  
    this.showForm = true;
  }

  initEditForm(plan: any): void {
    const inicio = new Date(plan.inicio);

    // Convertir a formato ISO
    const inicioDateISO = inicio.toISOString().slice(0, 10);

    this.formPlan.patchValue({
      nombre: plan.nombre,
      duracion: plan.duracion,
      limiteFirmas: plan.limiteFirmas,
      limiteCertificados: plan.limiteCertificados,
      cantidadValidaciones: plan.cantidadValidaciones,
      inicio: inicioDateISO,
      costo: plan.costo,
      tipoPago: plan.tipoPago,
      moneda: plan.moneda,
      descripcion: plan.descripcion,
      activo: plan.activo,
      aplicaClienteApi: plan.aplicaClienteApi,
      aplicaCliente: plan.aplicaCliente,
      asociado: plan.asociado,
      tipoPlan: plan.tipoPlan
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

  onAplicaClienteChange(change: any): void {
    if (change.value === '2') {
      this.showTipoCliente = true;
    } else {
      this.showTipoCliente = false;
    }
  }

}
