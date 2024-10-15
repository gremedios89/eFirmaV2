import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { PlansService } from 'app/core/services/plans/plans.service';
import { Subject, takeUntil } from 'rxjs';
import { PlanDetailsComponent } from '../plan-details/plan-details.component';
import { AddPlanComponent } from '../add-plan/add-plan.component';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink, MatCardModule, MatPaginatorModule, MatTableModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSortModule, MatMenuModule, MatDialogModule, MatBadgeModule],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.scss'
})
export class PlanListComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  displayedColumns: string[] = ['nombre', 'cantidadFirmas', 'costo', 'activo', 'cantidad_certificados', 'descripcion', 'actions'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  planList!: any[];

  readonly dialog = inject(MatDialog);

  constructor(private plansService: PlansService) {

  }

  ngOnInit(): void {
    this.loadPlanList();
  }

  loadPlanList(): void {
    this.plansService.getPlansList()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (resp) => {
        this.planList = resp;
        this.dataSource = new MatTableDataSource(this.planList);
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

  addPlan(element?: any): void {
    const dialogRef = this.dialog.open(AddPlanComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: {
        role: element,
      },
    });
  }

  deletePlan(): void {

  }

  planDetail(element: any): void {
    const dialogRef = this.dialog.open(PlanDetailsComponent, {
      width: '600px',
      data: {
        plan: element,
      },
    });
  }

}
