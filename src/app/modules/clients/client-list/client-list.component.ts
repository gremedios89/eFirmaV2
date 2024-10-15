import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClientsService } from 'app/core/services/clients/clients.service';
import { NotificationsService } from 'app/core/services/notifications/notifications.service';
import { Subject, takeUntil } from 'rxjs';
import { AddClientComponent } from '../add-client/add-client.component';
import { ConfirmDeleteClientComponent } from '../confirm-delete-client/confirm-delete-client.component';
import { isNullOrEmpty } from 'app/core/utils/typescript';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule, MatTableModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatSortModule, MatMenuModule, MatDialogModule, MatBadgeModule, RouterOutlet],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  displayedColumns: string[] = ['name', 'lastName', 'nombreCorto', 'codigoReeup', 'contactEmail', 'contactPhone', 'country',
    'province', 'institutional', 'description', 'actions'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mockup = [
    {
        "id": 103,
        "description": "Cliente Móvil Prueba 1",
        "lastName": "Prueba 1",
        "name": "Cliente Móvil",
        "province": "La Habana",
        "address": "Calle 1",
        "contactPhone": "51125478",
        "contactEmail": "prueba1@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 205,
        "description": "",
        "lastName": "Prueba 7",
        "name": "Cliente Movil",
        "province": "La Habana",
        "address": "Calle 7",
        "contactPhone": "57854932",
        "contactEmail": "prueba7@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 206,
        "description": "",
        "lastName": "Prueba 8",
        "name": "Cliente Movil",
        "province": "La Habana",
        "address": "Calle 8",
        "contactPhone": "56743224",
        "contactEmail": "prueba8@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 203,
        "description": "Cliente Móvil Prueba 3",
        "lastName": "Prueba 4",
        "name": "Cliente Movil 4",
        "province": "La Habana",
        "address": "Calle 4",
        "contactPhone": "51125478",
        "contactEmail": "prueba4@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 204,
        "description": "Cliente Móvil Prueba 6",
        "lastName": "Prueba 6",
        "name": "Cliente Movil 6",
        "province": "La Habana",
        "address": "Calle 6",
        "contactPhone": "51125478",
        "contactEmail": "prueba6@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 553,
        "description": "callegfgfg ",
        "lastName": null,
        "name": "Cneurogbgbbgb",
        "province": "Montevideo",
        "address": "calle 30",
        "contactPhone": "509487620",
        "contactEmail": "yisel@ingeniuscuba",
        "institutional": true,
        "country": "Uruguay",
        "certificates": null,
        "nombreCorto": "Cneuro",
        "codigoReeup": "gfdgfg",
        "telefono": "509487620",
        "identificador": null,
        "fechaCreacion": 1701113437764,
        "datosBancariosDtoList": [
            {
                "id": 152,
                "cuentaBancaria": "1111111111111111",
                "nombre": "Nombre de cuenta bancaria",
                "titular": "yuyui",
                "observaciones": "tyuytu",
                "monedas": {
                    "id": 7,
                    "descripcion": "CUP"
                },
                "nombreBanco": "ghjghj",
                "sucursal": "swdwd"
            }
        ],
        "usuario": [],
        "payments": null
    },
    {
        "id": 358,
        "description": "",
        "lastName": "qa",
        "name": "teating",
        "province": "Artemisa",
        "address": "jsjsj",
        "contactPhone": "50948762",
        "contactEmail": "angelica551006@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1002,
        "description": "sdasdasdsadsad",
        "lastName": "Dev",
        "name": "Yoandris",
        "province": "La Habana",
        "address": "asdasdasd",
        "contactPhone": "234324324",
        "contactEmail": "yoandris@ingeniuscuba.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "234324324",
        "identificador": "123123213232",
        "fechaCreacion": 1710784718407,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 452,
        "description": null,
        "lastName": "Gonzalez",
        "name": "Eddy",
        "province": "La Habana",
        "address": "Calle 1ra",
        "contactPhone": "12345",
        "contactEmail": "eddygescandell@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "1234567",
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 305,
        "description": "",
        "lastName": "Quevedo Novo",
        "name": "Yoangel",
        "province": "La Habana",
        "address": "Cuba No. 51 entre Waldo y San Rafael. La Jata,, Guanabacoa ",
        "contactPhone": "53928940",
        "contactEmail": "yoangel821002@nauta.cu",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 507,
        "description": "",
        "lastName": "Chang Ramirez",
        "name": "Wilber Chang",
        "province": "La Habana",
        "address": "Calle Vento, e/ Calle Entrada y Rodriguez Morine, Edificio 5111, Apto 3, Rpto Embil. Municipio Boyeros",
        "contactPhone": "50929404",
        "contactEmail": "wchang@nauta.cu",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 508,
        "description": "",
        "lastName": "Chiang Rojas",
        "name": "Pepito",
        "province": "La Habana",
        "address": "Ave 26 Edif 26 Apto 21 /247 y 249 Abel Santamaría Boyeros La Habana",
        "contactPhone": "58294931",
        "contactEmail": "maykel@3ce.cu",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 510,
        "description": "",
        "lastName": "Bernal Chaveco",
        "name": "Niorge ",
        "province": "La Habana",
        "address": "Carmen 311 #9 entre Márquez y Ferrer, Cerro",
        "contactPhone": "54945415",
        "contactEmail": "niorge07@nauta.cu",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 514,
        "description": "Probando la apk",
        "lastName": "QA",
        "name": "Prueba",
        "province": "La Habana",
        "address": "Ingenius 30",
        "contactPhone": "5359423565",
        "contactEmail": "yasirys@ingeniuscuba.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "5359423565",
        "identificador": "11111111111",
        "fechaCreacion": 1698267505164,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 513,
        "description": "",
        "lastName": "XY",
        "name": "Yasirys",
        "province": "La Habana",
        "address": "Calle 4 #4",
        "contactPhone": "59423565",
        "contactEmail": "ytg1984@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 515,
        "description": "",
        "lastName": "Gainza Martínez",
        "name": "Isledy",
        "province": "La Habana",
        "address": "Ave. 51, Edif. 5, Apto. 3, Arroyo Arenas, La Lisa",
        "contactPhone": "53364003",
        "contactEmail": "igainza@softel.cu",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 304,
        "description": "Cliente Ingenius",
        "lastName": null,
        "name": "Ingenius",
        "province": "La Habana",
        "address": "calle 30, entre 19 y 21, miramar playa",
        "contactPhone": "5350948762",
        "contactEmail": "comercial@ingeniuscuba.com",
        "institutional": true,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": "Ingenius",
        "codigoReeup": "INGe",
        "telefono": "5350948762",
        "identificador": null,
        "fechaCreacion": 1695095426140,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 516,
        "description": "Para firmar documentos",
        "lastName": "Astiazaain",
        "name": "Yisel",
        "province": "La Habana",
        "address": "Calle 30",
        "contactPhone": "550948762",
        "contactEmail": "yisel@ingeniuscuba.co",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "550948762",
        "identificador": "87051211457",
        "fechaCreacion": 1698361495049,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 517,
        "description": "",
        "lastName": "Ast",
        "name": "Yisel",
        "province": "La Habana",
        "address": "calle 30",
        "contactPhone": "50948762",
        "contactEmail": "shelly.ash2013@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 602,
        "description": "",
        "lastName": "Chang Ramirez",
        "name": "Wilber",
        "province": "La Habana",
        "address": "Vento",
        "contactPhone": "50929404",
        "contactEmail": "chang.wilber@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 552,
        "description": "",
        "lastName": "Pérez García ",
        "name": "Daniela",
        "province": "Villa Clara",
        "address": "direccion. particular",
        "contactPhone": "5372856935",
        "contactEmail": "igainza@nauta.cu",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 652,
        "description": "jhvjhvjh",
        "lastName": "Adfwes",
        "name": "Tasd",
        "province": "La Habana",
        "address": "jkhgfyugfhvj jhg ",
        "contactPhone": "52859876",
        "contactEmail": "asd@asd.gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "52859876",
        "identificador": "85796587458",
        "fechaCreacion": 1705940662884,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 804,
        "description": null,
        "lastName": "qa",
        "name": "tester",
        "province": "",
        "address": "",
        "contactPhone": "55555555",
        "contactEmail": "shelly.ash2013@gmail.com",
        "institutional": false,
        "country": "",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "",
        "fechaCreacion": 1706545881944,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 302,
        "description": "",
        "lastName": "Prueba Ingenius",
        "name": "Cliente Movil",
        "province": "La Habana",
        "address": "Calle Ingenius",
        "contactPhone": "58435620",
        "contactEmail": "adrian@ingeniuscuba.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 903,
        "description": "",
        "lastName": "de Moya Puig",
        "name": "Oscar Alejandro",
        "province": "La Habana",
        "address": "Ave 9na esq 130 No 13002 apto 11. Playa",
        "contactPhone": "53228113",
        "contactEmail": "oscardemoyapuig@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1102,
        "description": null,
        "lastName": "Alfonso",
        "name": "Javier",
        "province": null,
        "address": null,
        "contactPhone": null,
        "contactEmail": "javier.alfonso@ingeniuscuba.com",
        "institutional": false,
        "country": null,
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": 1712252617459,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 105,
        "description": "Cliente Móvil Prueba 2",
        "lastName": "Prueba 2",
        "name": "Cliente Móvil P2",
        "province": "La Habana",
        "address": "Calle 2",
        "contactPhone": "52125478",
        "contactEmail": "prueba2@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 354,
        "description": "TEst",
        "lastName": null,
        "name": "PAque Tecnologico",
        "province": "La Habana",
        "address": "UCI",
        "contactPhone": "050948759",
        "contactEmail": "test@gmal.com",
        "institutional": true,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": "PT",
        "codigoReeup": "AAAC",
        "telefono": "050948759",
        "identificador": null,
        "fechaCreacion": 1695227137890,
        "datosBancariosDtoList": [
            {
                "id": 103,
                "cuentaBancaria": "1234567890123456",
                "nombre": "Nombre de cuenta bancaria",
                "titular": "PT",
                "observaciones": "TEst",
                "monedas": {
                    "id": 7,
                    "descripcion": "CUP"
                },
                "nombreBanco": "MEtro",
                "sucursal": "BBBB"
            }
        ],
        "usuario": [],
        "payments": null
    },
    {
        "id": 52,
        "description": "Lorem ipsum dLorem ipsum dolor sit amet Ut voluptatibus repellat",
        "lastName": null,
        "name": "Etecsa",
        "province": "La Habana",
        "address": "Lorem ipsum dLorem ipsum dolor sit amet Ut voluptatibus repellat",
        "contactPhone": "57842569",
        "contactEmail": "etecsa@gmail.com",
        "institutional": true,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": "Etecsa",
        "codigoReeup": "Etecsa",
        "telefono": "57842569",
        "identificador": null,
        "fechaCreacion": 1684409860191,
        "datosBancariosDtoList": [
            {
                "id": 52,
                "cuentaBancaria": "",
                "nombre": "Nombre de cuenta bancaria",
                "titular": "",
                "observaciones": "",
                "monedas": {
                    "id": 0,
                    "descripcion": "USD"
                },
                "nombreBanco": "",
                "sucursal": ""
            }
        ],
        "usuario": [],
        "payments": null
    },
    {
        "id": 902,
        "description": "",
        "lastName": "de Moya Puig",
        "name": "Oscar Alejandro",
        "province": "La Habana",
        "address": "Ave 9na No.13002 apto 11 Esquina 130. Playa",
        "contactPhone": "53228113",
        "contactEmail": "oscardemoya@nauta.cu",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 258,
        "description": "",
        "lastName": "qa",
        "name": "Qa",
        "province": "La Habana",
        "address": "ghj",
        "contactPhone": "5236925",
        "contactEmail": "comercial@ingeniuscuba com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 102,
        "description": "asdd",
        "lastName": "Jorge",
        "name": "Alain",
        "province": "Habana",
        "address": null,
        "contactPhone": "54391235",
        "contactEmail": "potlitel@gmail.com",
        "institutional": true,
        "country": "CUBA",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1203,
        "description": null,
        "lastName": "Tester",
        "name": "QA",
        "province": null,
        "address": "",
        "contactPhone": "11111111",
        "contactEmail": "shelly.ash2013@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "",
        "fechaCreacion": 1712771160102,
        "datosBancariosDtoList": [],
        "usuario": [
            {
                "id": 79,
                "username": "QA",
                "inuse": 1,
                "password": "$2a$10$MDso./BwoAihbuB0N4i8we1553o9rdXWYNP7PjRcq0mnbHHpGLnYK",
                "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJRQSIsIm5iZiI6MTcxOTg2NzcwMiwidHlwZSI6InVzZXIiLCJleHAiOjE3MTk5NDY5MDIsImlhdCI6MTcxOTg2NzcwMn0.xWVgQx7OrddEUzyQgnfuWJjeDbdI-Nh6R8F_wdUVOxCzUwaNz0E1D8fnAjtf3OpKzeu_Gs5z-PlyXHDyoeiK2g",
                "roles": [
                    {
                        "id": 3,
                        "operationTypes": [
                            {
                                "id": 49,
                                "operationType": "signFile",
                                "avaliable": 1,
                                "nombre": "Firmar fichero",
                                "descripcion": "Et vero iste aut consectetur vitae vel quia facilis in placeat dolore id voluptatem voluptas ut omnis beatae id quod magnam?"
                            },
                            {
                                "id": 50,
                                "operationType": "validateCertificateJSON",
                                "avaliable": 1,
                                "nombre": "Validar Certificado en formato JSON",
                                "descripcion": "Cum nihil dolorem est repellendus culpa est consequuntur enim ut reprehenderit temporibus aut sequi labore et iste dicta non totam veniam!"
                            },
                            {
                                "id": 67,
                                "operationType": "updateInuseMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos en uso",
                                "descripcion": "Et laudantium sequi in fuga cupiditate qui earum accusantium eum explicabo asperiores At inventore soluta cum ipsa blanditiis ad dignissimos eaque. "
                            },
                            {
                                "id": 121,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar Planes por el Id del Clientes",
                                "descripcion": "Listar Planes según el identificador del Cliente"
                            },
                            {
                                "id": 66,
                                "operationType": "updateMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos",
                                "descripcion": "Et consequatur laudantium est explicabo iure aut voluptas quia qui deserunt dicta qui aperiam corporis!"
                            },
                            {
                                "id": 125,
                                "operationType": "payForms",
                                "avaliable": 1,
                                "nombre": "Listar las formas de pago",
                                "descripcion": "Listar las formas de pago habilitadas en el Microservicio"
                            },
                            {
                                "id": 60,
                                "operationType": "myDatesUser",
                                "avaliable": 1,
                                "nombre": "Mis datos de usuario",
                                "descripcion": "Vel consectetur provident non reiciendis alias rem quisquam enim non facere autem est omnis excepturi? Ea cumque asperiores"
                            },
                            {
                                "id": 126,
                                "operationType": "statusPayment",
                                "avaliable": 1,
                                "nombre": "Estado del Pago",
                                "descripcion": null
                            },
                            {
                                "id": 51,
                                "operationType": "validateDocumentJSON",
                                "avaliable": 1,
                                "nombre": "Validar Documento en formato JSON",
                                "descripcion": "Lorem ipsum dolor sit amet. Et ullam odio est eligendi explicabo sed maiores autem cum accusantium facilis et quos dolorem."
                            },
                            {
                                "id": 43,
                                "operationType": "validateCertificate",
                                "avaliable": 1,
                                "nombre": "Validar certificado",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit minima eveniet et voluptates iure ut quas odio rem velit consequatur id quisquam beatae et placeat blanditiis?"
                            },
                            {
                                "id": 106,
                                "operationType": "asignarCertificateToClient",
                                "avaliable": 1,
                                "nombre": "Asignar certificados a cliente",
                                "descripcion": "Aut molestiae aliquid qui beatae necessitatibus qui eaque internos qui numquam architecto? Eos cupiditate maxime sit porro perspiciatis aut quisquam sint est praesentium quia 33 maxime dolores et saepe necessitatibus!"
                            },
                            {
                                "id": 116,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar planes segun cliente",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 52,
                                "operationType": "updatePassword",
                                "avaliable": 1,
                                "nombre": "Actualizar contraseña",
                                "descripcion": "Et iusto corrupti et veniam nulla non quos veniam sed quia sunt. Aut sequi modi ea consequuntur ullam aut molestiae mollitia."
                            },
                            {
                                "id": 82,
                                "operationType": "listPlan",
                                "avaliable": 1,
                                "nombre": "Listar total de planes",
                                "descripcion": "Est quia quia eum dolore laborum cum quis earum aut labore optio. Qui ipsa eius sit possimus galisum et similique beatae et unde perferendis in repellat atque sed tempore vero."
                            },
                            {
                                "id": 124,
                                "operationType": "createPayment",
                                "avaliable": 1,
                                "nombre": "Crear pago",
                                "descripcion": "Crear pago "
                            },
                            {
                                "id": 123,
                                "operationType": "asignarCertificateToClientToCertificate",
                                "avaliable": 1,
                                "nombre": "Asignar Certificado a un Cliente",
                                "descripcion": "Asignar un certificado a un cliente"
                            },
                            {
                                "id": 117,
                                "operationType": "signPadesJSON",
                                "avaliable": 1,
                                "nombre": "Firmar Pades",
                                "descripcion": "Firmar un Pades\n"
                            },
                            {
                                "id": 45,
                                "operationType": "checkCertificateStatus",
                                "avaliable": 1,
                                "nombre": "Verificar estado de certificado digital",
                                "descripcion": "Sed velit commodi est accusantium fugiat qui corporis alias est architecto dicta non totam officiis in mollitia dolores. "
                            },
                            {
                                "id": 44,
                                "operationType": "validateSignatures",
                                "avaliable": 1,
                                "nombre": "Validar firma digital",
                                "descripcion": "Est porro commodi hic nostrum sunt est ullam suscipit et numquam totam in officiis illo aut quod iste aut excepturi odit"
                            }
                        ],
                        "description": "Role asignado para los Clientes\n",
                        "name": "Cliente",
                        "status": true
                    }
                ],
                "email": "shelly.ash2013@gmail.com",
                "enable": true,
                "resetPasswordToken": null,
                "expiringDate": null,
                "emailToken": null
            }
        ],
        "payments": null
    },
    {
        "id": 1,
        "description": "Prueba",
        "lastName": "Alfonso",
        "name": "Javier",
        "province": "Habana",
        "address": "Mi direccion",
        "contactPhone": "none",
        "contactEmail": "javier.alfonso@ingeniuscuba.com",
        "institutional": false,
        "country": "CU",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [
            {
                "id": 5,
                "username": "edu123",
                "inuse": 1,
                "password": "$2a$10$5WbLGykSobRnwJbiQ9Zpz.Rajng/PV.a530U7K2iiHMtpBJz0cYru",
                "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlZHUxMjMiLCJuYmYiOjE3MTk4NDk0NTksInR5cGUiOiJ1c2VyIiwiZXhwIjoxNzE5OTI4NjU5LCJpYXQiOjE3MTk4NDk0NTl9.4HWm8PE2tlw6vZXmCFSqlTY-qSXsmq7Npj047wjyvbb08o-SGc1d17yy5nsOLz8aTQW5kuCyHdqNDqZpDaxl3g",
                "roles": [
                    {
                        "id": 1,
                        "operationTypes": [
                            {
                                "id": 50,
                                "operationType": "validateCertificateJSON",
                                "avaliable": 1,
                                "nombre": "Validar Certificado en formato JSON",
                                "descripcion": "Cum nihil dolorem est repellendus culpa est consequuntur enim ut reprehenderit temporibus aut sequi labore et iste dicta non totam veniam!"
                            },
                            {
                                "id": 55,
                                "operationType": "assignRolesToUser",
                                "avaliable": 1,
                                "nombre": "Asignar roles a usuario",
                                "descripcion": "In suscipit ullam et maiores sint in similique repudiandae in eaque illo qui consequuntur distinctio est mollitia illo."
                            },
                            {
                                "id": 57,
                                "operationType": "deleteApiClient",
                                "avaliable": 1,
                                "nombre": "Eliminar Cliente API",
                                "descripcion": "33 sint quia eos commodi ipsa id laborum nihil ea dolor sunt ut dolores modi. "
                            },
                            {
                                "id": 75,
                                "operationType": "deleteUser",
                                "avaliable": 1,
                                "nombre": "Eliminar usuario",
                                "descripcion": "Qui provident quas sit cupiditate omnis ex possimus quis aut inventore molestiae. "
                            },
                            {
                                "id": 88,
                                "operationType": "countUser",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de usuarios",
                                "descripcion": " Ut assumenda aliquid est dolorem voluptatibus vel quasi natus aut quisquam adipisci sed iusto aliquam."
                            },
                            {
                                "id": 61,
                                "operationType": "createClient",
                                "avaliable": 1,
                                "nombre": "Crear cliente",
                                "descripcion": "sit Quis tempora ad assumenda quisquam aut reiciendis Quis At quam illum."
                            },
                            {
                                "id": 68,
                                "operationType": "getUser",
                                "avaliable": 1,
                                "nombre": "Obtener usuario",
                                "descripcion": "At quod voluptatem ut labore quas sed consequatur tenetur et fugit voluptatibus At dicta ullam ea sequi exercitationem."
                            },
                            {
                                "id": 71,
                                "operationType": "listRoles",
                                "avaliable": 1,
                                "nombre": "Listar roles",
                                "descripcion": "Lorem ipsum dolor sit amet. At magnam dolorem est tenetur omnis et omnis exercitationem non molestiae quisquam aut voluptatem nisi?"
                            },
                            {
                                "id": 60,
                                "operationType": "myDatesUser",
                                "avaliable": 1,
                                "nombre": "Mis datos de usuario",
                                "descripcion": "Vel consectetur provident non reiciendis alias rem quisquam enim non facere autem est omnis excepturi? Ea cumque asperiores"
                            },
                            {
                                "id": 126,
                                "operationType": "statusPayment",
                                "avaliable": 1,
                                "nombre": "Estado del Pago",
                                "descripcion": null
                            },
                            {
                                "id": 119,
                                "operationType": "agregarIDCertificate",
                                "avaliable": 1,
                                "nombre": "Obtener información de certificado.",
                                "descripcion": "Obtener información de certificado."
                            },
                            {
                                "id": 43,
                                "operationType": "validateCertificate",
                                "avaliable": 1,
                                "nombre": "Validar certificado",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit minima eveniet et voluptates iure ut quas odio rem velit consequatur id quisquam beatae et placeat blanditiis?"
                            },
                            {
                                "id": 95,
                                "operationType": "signFileUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero de modo inseguro",
                                "descripcion": "ut animi sunt et expedita dicta aut voluptatibus nihil. Sed doloribus molestiae sed sunt adipisci est harum atque eos nemo modi."
                            },
                            {
                                "id": 84,
                                "operationType": "updatePlan",
                                "avaliable": 1,
                                "nombre": "Actualizar un plan",
                                "descripcion": "Non sequi consequatur et deleniti voluptas ut soluta obcaecati aut cupiditate esse quo eligendi quos."
                            },
                            {
                                "id": 93,
                                "operationType": "signFileWithVisualSignature",
                                "avaliable": 1,
                                "nombre": "Firmar fichero con firma visual",
                                "descripcion": "Ea dolor perferendis vel ullam ipsam aut quis deserunt non voluptates optio. Aut aliquam repellendus aut cupiditate necessitatibus ea commodi quam At quidem odit"
                            },
                            {
                                "id": 104,
                                "operationType": "asignarCertificateToPlan",
                                "avaliable": 1,
                                "nombre": "Asignar certificado a plan",
                                "descripcion": "Lorem ipsum dolor sit amet. Est saepe excepturi hic dolorem error aut nesciunt nihil et deserunt minima aut ipsum perspiciatis."
                            },
                            {
                                "id": 82,
                                "operationType": "listPlan",
                                "avaliable": 1,
                                "nombre": "Listar total de planes",
                                "descripcion": "Est quia quia eum dolore laborum cum quis earum aut labore optio. Qui ipsa eius sit possimus galisum et similique beatae et unde perferendis in repellat atque sed tempore vero."
                            },
                            {
                                "id": 103,
                                "operationType": "asignarPlanToClient",
                                "avaliable": 1,
                                "nombre": "Asignar plan a cliente",
                                "descripcion": "Vel quia quod sed error quod vel velit exercitationem est praesentium voluptatibus id similique nihil ut harum doloremque et alias repudiandae."
                            },
                            {
                                "id": 85,
                                "operationType": "createPlan",
                                "avaliable": 1,
                                "nombre": "Crear un plan",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit sint sunt vel obcaecati Quis id impedit provident sit voluptatem omnis non dolorum ducimus quo molestiae modi qui quos aliquid."
                            },
                            {
                                "id": 112,
                                "operationType": "removeCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Eliminar una cuenta bancaria",
                                "descripcion": "asdadasdasdasd"
                            },
                            {
                                "id": 73,
                                "operationType": "updateRole",
                                "avaliable": 1,
                                "nombre": "actualizar roles",
                                "descripcion": "Qui eveniet quaerat sed nemo fugiat in mollitia perspiciatis non quis soluta et exercitationem quia aut optio ducimus quo quam quis.\n\n"
                            },
                            {
                                "id": 96,
                                "operationType": "signEncryptedFile",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado",
                                "descripcion": "Et dicta dolor sit aperiam itaque a ipsam incidunt et sunt tempora."
                            },
                            {
                                "id": 115,
                                "operationType": "asignarDatoBancarioToClient",
                                "avaliable": 1,
                                "nombre": "Asigna un datos bancario con un cliente X.",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 45,
                                "operationType": "checkCertificateStatus",
                                "avaliable": 1,
                                "nombre": "Verificar estado de certificado digital",
                                "descripcion": "Sed velit commodi est accusantium fugiat qui corporis alias est architecto dicta non totam officiis in mollitia dolores. "
                            },
                            {
                                "id": 90,
                                "operationType": "process_register",
                                "avaliable": 1,
                                "nombre": "Proceso de registro",
                                "descripcion": "Et libero maxime qui illum laboriosam aut accusamus optio. Sed aliquam corporis et quia magni est quis temporibus At quia expedita."
                            },
                            {
                                "id": 80,
                                "operationType": "listActualizacion",
                                "avaliable": 1,
                                "nombre": "Listar todas las actualizaciones",
                                "descripcion": "Quo labore voluptatibus ad soluta nisi cum amet voluptas."
                            },
                            {
                                "id": 69,
                                "operationType": "listUser",
                                "avaliable": 1,
                                "nombre": "Listar usuarios",
                                "descripcion": "Aut quaerat corporis est quibusdam quae et minima inventore hic totam aspernatur vel debitis voluptatem et autem libero et quae nisi."
                            },
                            {
                                "id": 114,
                                "operationType": "getCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Obtener los datos de una cuenta bancaria",
                                "descripcion": "sdfsdfsdfsdf"
                            },
                            {
                                "id": 66,
                                "operationType": "updateMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos",
                                "descripcion": "Et consequatur laudantium est explicabo iure aut voluptas quia qui deserunt dicta qui aperiam corporis!"
                            },
                            {
                                "id": 51,
                                "operationType": "validateDocumentJSON",
                                "avaliable": 1,
                                "nombre": "Validar Documento en formato JSON",
                                "descripcion": "Lorem ipsum dolor sit amet. Et ullam odio est eligendi explicabo sed maiores autem cum accusantium facilis et quos dolorem."
                            },
                            {
                                "id": 59,
                                "operationType": "apiCLient",
                                "avaliable": 1,
                                "nombre": "Cliente API",
                                "descripcion": "Sit cupiditate assumenda ad velit nisi et voluptas amet non reiciendis recusandae ab cupiditate internos. Est porro error ab dolor molestiae ex inventore perferendis sed architecto amet."
                            },
                            {
                                "id": 58,
                                "operationType": "listApiClient",
                                "avaliable": 1,
                                "nombre": "Listar Clientes API",
                                "descripcion": "Eos quidem laboriosam sit impedit inventore sed voluptas magni qui provident doloribus eos dolor omnis hic ipsam culpa?"
                            },
                            {
                                "id": 116,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar planes segun cliente",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 83,
                                "operationType": "deletePlan",
                                "avaliable": 1,
                                "nombre": "Eliminar un plan",
                                "descripcion": " Eum expedita laudantium sed laudantium dignissimos cum autem facere aut magnam laboriosam ut aperiam sunt vel iusto tempora."
                            },
                            {
                                "id": 100,
                                "operationType": "getCertificateInfo",
                                "avaliable": 1,
                                "nombre": "Obtener información de certificado",
                                "descripcion": "Qui odit iure qui corrupti atque et voluptatum omnis At perferendis optio sit debitis laudantium!"
                            },
                            {
                                "id": 124,
                                "operationType": "createPayment",
                                "avaliable": 1,
                                "nombre": "Crear pago",
                                "descripcion": "Crear pago "
                            },
                            {
                                "id": 109,
                                "operationType": "listarOperationType",
                                "avaliable": 1,
                                "nombre": "Listar tipos de permisos",
                                "descripcion": "Aut ipsum ducimus et eligendi esse et corrupti temporibus quo magnam voluptatum sit aspernatur voluptatum est omnis deleniti non provident voluptatem."
                            },
                            {
                                "id": 105,
                                "operationType": "getPlan",
                                "avaliable": 1,
                                "nombre": "Obtener información de un plan",
                                "descripcion": "Non doloribus deserunt est atque esse eum consequatur expedita et magnam voluptatem ab cupiditate nemo id similique error."
                            },
                            {
                                "id": 110,
                                "operationType": "createCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Crear cuenta bancaria",
                                "descripcion": "sdfsdfsdf"
                            },
                            {
                                "id": 62,
                                "operationType": "deleteClient",
                                "avaliable": 1,
                                "nombre": "Eliminar Cliente API",
                                "descripcion": "Ut necessitatibus assumenda aut necessitatibus voluptas ea quod quasi sit quia fugit sit incidunt dolor nam autem adipisci."
                            },
                            {
                                "id": 94,
                                "operationType": "signFileWithVisualSignatureUnsafe",
                                "avaliable": 1,
                                "nombre": "Firmar fichero con firma visual insegura",
                                "descripcion": "Ut animi sunt et expedita dicta aut voluptatibus nihil. Sed doloribus molestiae sed sunt adipisci est harum atque eos nemo modi."
                            },
                            {
                                "id": 53,
                                "operationType": "assignPermissionToRole",
                                "avaliable": 1,
                                "nombre": "Asignar permisos a rol",
                                "descripcion": "Et consequuntur magni est reiciendis magni ut voluptatem explicabo! Sed quia rerum aut voluptatem fugit ut aperiam repellat."
                            },
                            {
                                "id": 99,
                                "operationType": "signEncryptedFileUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado inseguro",
                                "descripcion": "Sit necessitatibus vero qui illum odio et atque omnis. Sit fugit exercitationem sit doloribus dolores et doloremque voluptatem. Eum deleniti temporibus quo exercitationem voluptate quo amet porro."
                            },
                            {
                                "id": 101,
                                "operationType": "listarMonedas",
                                "avaliable": 1,
                                "nombre": "Obtener listado de monedas",
                                "descripcion": "Est rerum doloremque eos vitae eveniet sed delectus iure hic error voluptatem ut incidunt obcaecati qui voluptatum inventore in soluta culpa."
                            },
                            {
                                "id": 92,
                                "operationType": "validateSoftelCertificate",
                                "avaliable": 1,
                                "nombre": "Valida certificado de Softel",
                                "descripcion": "Ad iste quos eos earum totam sit quia veniam est atque autem quo dolores minima sit cumque ullam id modi vero."
                            },
                            {
                                "id": 49,
                                "operationType": "signFile",
                                "avaliable": 1,
                                "nombre": "Firmar fichero",
                                "descripcion": "Et vero iste aut consectetur vitae vel quia facilis in placeat dolore id voluptatem voluptas ut omnis beatae id quod magnam?"
                            },
                            {
                                "id": 67,
                                "operationType": "updateInuseMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos en uso",
                                "descripcion": "Et laudantium sequi in fuga cupiditate qui earum accusantium eum explicabo asperiores At inventore soluta cum ipsa blanditiis ad dignissimos eaque. "
                            },
                            {
                                "id": 91,
                                "operationType": "verify",
                                "avaliable": 1,
                                "nombre": "Verificar",
                                "descripcion": "Lorem ipsum dolor sit amet. Ex totam maxime ut consectetur nulla sed esse voluptatibus quo deleniti odit. Et explicabo doloremque ad earum consectetur non sint nemo."
                            },
                            {
                                "id": 47,
                                "operationType": "updateApiClientToken",
                                "avaliable": 1,
                                "nombre": "Actualizar token de Cliente Api",
                                "descripcion": "Ut voluptate temporibus sit placeat saepe cum officiis internos vel facilis fugit?"
                            },
                            {
                                "id": 118,
                                "operationType": "listarMonedas ",
                                "avaliable": 1,
                                "nombre": "Listar Monedas",
                                "descripcion": "Para mostrar las monedas existentes\n"
                            },
                            {
                                "id": 48,
                                "operationType": "testCall",
                                "avaliable": 1,
                                "nombre": "Test Call",
                                "descripcion": "In rerum vitae non unde ipsum ad omnis exercitationem. Est explicabo dolor non quidem velit et ipsam sapiente aut inventore dolorem."
                            },
                            {
                                "id": 89,
                                "operationType": "updateUserRole",
                                "avaliable": 1,
                                "nombre": "Actualizar rol de usuario",
                                "descripcion": "Vel illo numquam et minima maxime et corrupti dolorem At voluptatem rerum sed totam aperiam cum quasi internos qui itaque voluptatem."
                            },
                            {
                                "id": 97,
                                "operationType": "signEncryptedFileWithVisualSignature",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado con firma visual",
                                "descripcion": "Lorem ipsum dolor sit amet. Non libero tempora et perspiciatis asperiores rem galisum repellat non aperiam facere ab quae officia ut distinctio fugiat non placeat atque. "
                            },
                            {
                                "id": 106,
                                "operationType": "asignarCertificateToClient",
                                "avaliable": 1,
                                "nombre": "Asignar certificados a cliente",
                                "descripcion": "Aut molestiae aliquid qui beatae necessitatibus qui eaque internos qui numquam architecto? Eos cupiditate maxime sit porro perspiciatis aut quisquam sint est praesentium quia 33 maxime dolores et saepe necessitatibus!"
                            },
                            {
                                "id": 78,
                                "operationType": "updateActualizacion",
                                "avaliable": 1,
                                "nombre": "Actualizar una actualización",
                                "descripcion": "Lorem ipsum dolor sit amet. Non quia libero ex excepturi cumque aut veniam ipsam et laboriosam iure nam pariatur veritatis qui distinctio possimus ut atque labore!"
                            },
                            {
                                "id": 79,
                                "operationType": "deleteActualizacion",
                                "avaliable": 1,
                                "nombre": "Eliminar una actualización",
                                "descripcion": "Cum reprehenderit nihil ex obcaecati sequi aut dolores odit ut nobis quae. Et voluptates galisum ut eius recusandae nam optio aliquid ea tempora labore ut placeat quia At iusto error ea repellendus nobis!"
                            },
                            {
                                "id": 108,
                                "operationType": "listarClientesSinPlanes",
                                "avaliable": 1,
                                "nombre": "Listar clientes sin planes",
                                "descripcion": "Lorem ipsum dolor sit amet. Ut voluptatibus repellat aut accusamus sint et similique architecto! Ut galisum odit ut voluptate sunt in quod soluta ut praesentium dolor ut omnis deleniti."
                            },
                            {
                                "id": 98,
                                "operationType": "signEncryptedFileWithVisualSignatureUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado con firma visual inseguro",
                                "descripcion": "Aut voluptatem illo et commodi animi ex odit explicabo vel molestiae nesciunt?"
                            },
                            {
                                "id": 117,
                                "operationType": "signPadesJSON",
                                "avaliable": 1,
                                "nombre": "Firmar Pades",
                                "descripcion": "Firmar un Pades\n"
                            },
                            {
                                "id": 46,
                                "operationType": "registerApiClient",
                                "avaliable": 1,
                                "nombre": "Registar token de Cliente Api",
                                "descripcion": "Ut neque velit non enim porro et doloribus voluptatem. Ab dolor saepe et distinctio quaerat eos reprehenderit omnis ut accusantium quas et sunt nobis quo dolorem perspiciatis."
                            },
                            {
                                "id": 56,
                                "operationType": "updateApiClient",
                                "avaliable": 1,
                                "nombre": "Actualizar Cliente API",
                                "descripcion": "Lorem ipsum dolor sit amet. Eos sequi dicta eos sequi voluptas et accusamus facilis nam accusantium adipisci id neque voluptatem."
                            },
                            {
                                "id": 63,
                                "operationType": "updateClient",
                                "avaliable": 1,
                                "nombre": "Actualizar Cliente API",
                                "descripcion": "Aut eligendi ipsa rem atque dolores a illum quam sit velit vero. Id rerum asperiores a eligendi ipsa et tempore placeat ad consequuntur excepturi et molestiae consequatur!"
                            },
                            {
                                "id": 44,
                                "operationType": "validateSignatures",
                                "avaliable": 1,
                                "nombre": "Validar firma digital",
                                "descripcion": "Est porro commodi hic nostrum sunt est ullam suscipit et numquam totam in officiis illo aut quod iste aut excepturi odit"
                            },
                            {
                                "id": 120,
                                "operationType": "reportClienteCertificados",
                                "avaliable": 1,
                                "nombre": "reportClienteCertificados",
                                "descripcion": "reportClienteCertificados"
                            },
                            {
                                "id": 81,
                                "operationType": "countApiClient",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de clientes API",
                                "descripcion": "Aut voluptas velit ut autem perferendis At saepe nihil ex nemo consectetur! Et deleniti internos ea rerum officiis et minus illum aut possimus deleniti."
                            },
                            {
                                "id": 107,
                                "operationType": "asignarCertificateToClientToCertificate",
                                "avaliable": 1,
                                "nombre": "Asociar plan con cliente con certificados",
                                "descripcion": "Cum accusamus veritatis qui fugit perferendis At nihil laudantium ea animi repudiandae. Ut veniam temporibus est illum explicabo aut nostrum quibusdam."
                            },
                            {
                                "id": 70,
                                "operationType": "role",
                                "avaliable": 1,
                                "nombre": "Roles",
                                "descripcion": "Qui itaque deserunt ea dolorem Quis aut ullam omnis! Sit architecto deserunt et aperiam assumenda ut cupiditate autem sit quod totam. Ea adipisci aperiam non facere similique qui dolores repudiandae?"
                            },
                            {
                                "id": 113,
                                "operationType": "updateCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Actualizar los datos de una cuenta bancaria",
                                "descripcion": "sdfsdfsdfsdfdsf"
                            },
                            {
                                "id": 72,
                                "operationType": "deleteRole",
                                "avaliable": 1,
                                "nombre": "Eliminar roles",
                                "descripcion": "Est iusto fugit non pariatur saepe ex illum tenetur qui enim nisi sed autem galisum. Sed omnis deleniti aut ipsam beatae aut magnam maiores hic tempore molestiae cum molestiae accusamus et accusantium sequi aut repellat architecto. "
                            },
                            {
                                "id": 87,
                                "operationType": "countClient",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de clientes",
                                "descripcion": "Vel quod quidem ut eius corrupti 33 nemo sint ad dolores aliquam vel aperiam veniam. Aut amet maiores rem ratione consequatur et voluptatem consequatur qui quod dolores sed quis deleniti."
                            },
                            {
                                "id": 102,
                                "operationType": "listarTipoPago",
                                "avaliable": 1,
                                "nombre": "Obtener listado de Tipos de pagos",
                                "descripcion": "Aut possimus commodi est dolor autem qui suscipit recusandae sit possimus ullam eum nesciunt dolor sed veniam culpa cum autem neque."
                            },
                            {
                                "id": 65,
                                "operationType": "listClient",
                                "avaliable": 1,
                                "nombre": "Listar Clientes",
                                "descripcion": "Ea quibusdam culpa vel aperiam aliquid et voluptas nostrum est dignissimos sint."
                            },
                            {
                                "id": 125,
                                "operationType": "payForms",
                                "avaliable": 1,
                                "nombre": "Listar las formas de pago",
                                "descripcion": "Listar las formas de pago habilitadas en el Microservicio"
                            },
                            {
                                "id": 77,
                                "operationType": "createActualizacion",
                                "avaliable": 1,
                                "nombre": "Crear actualización",
                                "descripcion": "Qui eius possimus et dignissimos corporis aut voluptates cupiditate qui laborum provident."
                            },
                            {
                                "id": 52,
                                "operationType": "updatePassword",
                                "avaliable": 1,
                                "nombre": "Actualizar contraseña",
                                "descripcion": "Et iusto corrupti et veniam nulla non quos veniam sed quia sunt. Aut sequi modi ea consequuntur ullam aut molestiae mollitia."
                            },
                            {
                                "id": 64,
                                "operationType": "client",
                                "avaliable": 1,
                                "nombre": "Cliente",
                                "descripcion": "Lorem ipsum dolor sit amet. Ea voluptas porro aut sequi accusantium est quae aliquam sit debitis velit et voluptatem accusantium hic excepturi labore."
                            },
                            {
                                "id": 76,
                                "operationType": "ultimaActualizacion",
                                "avaliable": 1,
                                "nombre": "Obtener última actualización",
                                "descripcion": "Ut facilis quasi ut nesciunt porro nam suscipit iusto et dolores perspiciatis ab facilis fuga sed nihil accusamus."
                            },
                            {
                                "id": 111,
                                "operationType": "listarCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Listar todas las cuentas bancarias",
                                "descripcion": "asdasdasd"
                            },
                            {
                                "id": 54,
                                "operationType": "assignPermissionToApiClient",
                                "avaliable": 1,
                                "nombre": "Asignar permisos a cliente API",
                                "descripcion": "Qui commodi expedita sed soluta praesentium aut magni debitis et nihil consequatur qui repudiandae laboriosam eum reprehenderit modi."
                            },
                            {
                                "id": 74,
                                "operationType": "createRole",
                                "avaliable": 1,
                                "nombre": "Crear rol",
                                "descripcion": "Qui asperiores distinctio est recusandae vitae est voluptas atque nam ipsa nihil. Eos expedita voluptatem aut quia molestiae id error natus. Et mollitia nihil et quos saepe est earum enim."
                            }
                        ],
                        "description": "Prueba todos permisos",
                        "name": "Superadmin",
                        "status": true
                    }
                ],
                "email": "yisel@ingeniuscuba.com",
                "enable": true,
                "resetPasswordToken": null,
                "expiringDate": null,
                "emailToken": null
            }
        ],
        "payments": null
    },
    {
        "id": 53,
        "description": "werewrwerewrew",
        "lastName": "q",
        "name": "qqweqweqw",
        "province": "La Habana",
        "address": "sdfsdfsdfsdfdsf",
        "contactPhone": "11111111111",
        "contactEmail": "wdewqewew@sadasd.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "11111111111",
        "identificador": "111111111111",
        "fechaCreacion": 1684423972531,
        "datosBancariosDtoList": [
            {
                "id": 53,
                "cuentaBancaria": "",
                "nombre": "Nombre de cuenta bancaria",
                "titular": "",
                "observaciones": "",
                "monedas": {
                    "id": 0,
                    "descripcion": "USD"
                },
                "nombreBanco": "",
                "sucursal": ""
            }
        ],
        "usuario": [],
        "payments": null
    },
    {
        "id": 54,
        "description": "aasssdddd frwef fwef",
        "lastName": "YoTUNO ",
        "name": "YoTUNO",
        "province": "La Habana",
        "address": "dfdfa fwef fewgfwer 345",
        "contactPhone": "58270102",
        "contactEmail": "YoTUNO@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "58270102",
        "identificador": "96102109661",
        "fechaCreacion": 1684437349012,
        "datosBancariosDtoList": [
            {
                "id": 54,
                "cuentaBancaria": "",
                "nombre": "Nombre de cuenta bancaria",
                "titular": "",
                "observaciones": "",
                "monedas": {
                    "id": 0,
                    "descripcion": "USD"
                },
                "nombreBanco": "",
                "sucursal": ""
            }
        ],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1202,
        "description": null,
        "lastName": "Alfonso",
        "name": "Javier",
        "province": null,
        "address": null,
        "contactPhone": null,
        "contactEmail": "javier.alfonso@ingeniuscuba.com",
        "institutional": false,
        "country": null,
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": 1712757601577,
        "datosBancariosDtoList": [],
        "usuario": [
            {
                "id": 78,
                "username": "jalfonso",
                "inuse": 1,
                "password": "$2a$10$35r6bJNhgjtST7j5GOZ7eO0ZPfnPu7SdtvdXEplOTLUTj6xW8N9Ry",
                "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWxmb25zbyIsIm5iZiI6MTcxOTAwMTk3MCwidHlwZSI6InVzZXIiLCJleHAiOjE3MTkwODExNzAsImlhdCI6MTcxOTAwMTk3MH0.zNdXfoHDC6hjoxLwVnBmRcsuqx6vhF-8KTFqMQt7HiqTf5UAmsPlDOzUig1uO96JvQAhWW36F9INcQKmOo1PRQ",
                "roles": [
                    {
                        "id": 1,
                        "operationTypes": [
                            {
                                "id": 50,
                                "operationType": "validateCertificateJSON",
                                "avaliable": 1,
                                "nombre": "Validar Certificado en formato JSON",
                                "descripcion": "Cum nihil dolorem est repellendus culpa est consequuntur enim ut reprehenderit temporibus aut sequi labore et iste dicta non totam veniam!"
                            },
                            {
                                "id": 55,
                                "operationType": "assignRolesToUser",
                                "avaliable": 1,
                                "nombre": "Asignar roles a usuario",
                                "descripcion": "In suscipit ullam et maiores sint in similique repudiandae in eaque illo qui consequuntur distinctio est mollitia illo."
                            },
                            {
                                "id": 57,
                                "operationType": "deleteApiClient",
                                "avaliable": 1,
                                "nombre": "Eliminar Cliente API",
                                "descripcion": "33 sint quia eos commodi ipsa id laborum nihil ea dolor sunt ut dolores modi. "
                            },
                            {
                                "id": 75,
                                "operationType": "deleteUser",
                                "avaliable": 1,
                                "nombre": "Eliminar usuario",
                                "descripcion": "Qui provident quas sit cupiditate omnis ex possimus quis aut inventore molestiae. "
                            },
                            {
                                "id": 88,
                                "operationType": "countUser",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de usuarios",
                                "descripcion": " Ut assumenda aliquid est dolorem voluptatibus vel quasi natus aut quisquam adipisci sed iusto aliquam."
                            },
                            {
                                "id": 61,
                                "operationType": "createClient",
                                "avaliable": 1,
                                "nombre": "Crear cliente",
                                "descripcion": "sit Quis tempora ad assumenda quisquam aut reiciendis Quis At quam illum."
                            },
                            {
                                "id": 68,
                                "operationType": "getUser",
                                "avaliable": 1,
                                "nombre": "Obtener usuario",
                                "descripcion": "At quod voluptatem ut labore quas sed consequatur tenetur et fugit voluptatibus At dicta ullam ea sequi exercitationem."
                            },
                            {
                                "id": 71,
                                "operationType": "listRoles",
                                "avaliable": 1,
                                "nombre": "Listar roles",
                                "descripcion": "Lorem ipsum dolor sit amet. At magnam dolorem est tenetur omnis et omnis exercitationem non molestiae quisquam aut voluptatem nisi?"
                            },
                            {
                                "id": 60,
                                "operationType": "myDatesUser",
                                "avaliable": 1,
                                "nombre": "Mis datos de usuario",
                                "descripcion": "Vel consectetur provident non reiciendis alias rem quisquam enim non facere autem est omnis excepturi? Ea cumque asperiores"
                            },
                            {
                                "id": 126,
                                "operationType": "statusPayment",
                                "avaliable": 1,
                                "nombre": "Estado del Pago",
                                "descripcion": null
                            },
                            {
                                "id": 119,
                                "operationType": "agregarIDCertificate",
                                "avaliable": 1,
                                "nombre": "Obtener información de certificado.",
                                "descripcion": "Obtener información de certificado."
                            },
                            {
                                "id": 43,
                                "operationType": "validateCertificate",
                                "avaliable": 1,
                                "nombre": "Validar certificado",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit minima eveniet et voluptates iure ut quas odio rem velit consequatur id quisquam beatae et placeat blanditiis?"
                            },
                            {
                                "id": 95,
                                "operationType": "signFileUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero de modo inseguro",
                                "descripcion": "ut animi sunt et expedita dicta aut voluptatibus nihil. Sed doloribus molestiae sed sunt adipisci est harum atque eos nemo modi."
                            },
                            {
                                "id": 84,
                                "operationType": "updatePlan",
                                "avaliable": 1,
                                "nombre": "Actualizar un plan",
                                "descripcion": "Non sequi consequatur et deleniti voluptas ut soluta obcaecati aut cupiditate esse quo eligendi quos."
                            },
                            {
                                "id": 93,
                                "operationType": "signFileWithVisualSignature",
                                "avaliable": 1,
                                "nombre": "Firmar fichero con firma visual",
                                "descripcion": "Ea dolor perferendis vel ullam ipsam aut quis deserunt non voluptates optio. Aut aliquam repellendus aut cupiditate necessitatibus ea commodi quam At quidem odit"
                            },
                            {
                                "id": 104,
                                "operationType": "asignarCertificateToPlan",
                                "avaliable": 1,
                                "nombre": "Asignar certificado a plan",
                                "descripcion": "Lorem ipsum dolor sit amet. Est saepe excepturi hic dolorem error aut nesciunt nihil et deserunt minima aut ipsum perspiciatis."
                            },
                            {
                                "id": 82,
                                "operationType": "listPlan",
                                "avaliable": 1,
                                "nombre": "Listar total de planes",
                                "descripcion": "Est quia quia eum dolore laborum cum quis earum aut labore optio. Qui ipsa eius sit possimus galisum et similique beatae et unde perferendis in repellat atque sed tempore vero."
                            },
                            {
                                "id": 103,
                                "operationType": "asignarPlanToClient",
                                "avaliable": 1,
                                "nombre": "Asignar plan a cliente",
                                "descripcion": "Vel quia quod sed error quod vel velit exercitationem est praesentium voluptatibus id similique nihil ut harum doloremque et alias repudiandae."
                            },
                            {
                                "id": 85,
                                "operationType": "createPlan",
                                "avaliable": 1,
                                "nombre": "Crear un plan",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit sint sunt vel obcaecati Quis id impedit provident sit voluptatem omnis non dolorum ducimus quo molestiae modi qui quos aliquid."
                            },
                            {
                                "id": 112,
                                "operationType": "removeCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Eliminar una cuenta bancaria",
                                "descripcion": "asdadasdasdasd"
                            },
                            {
                                "id": 73,
                                "operationType": "updateRole",
                                "avaliable": 1,
                                "nombre": "actualizar roles",
                                "descripcion": "Qui eveniet quaerat sed nemo fugiat in mollitia perspiciatis non quis soluta et exercitationem quia aut optio ducimus quo quam quis.\n\n"
                            },
                            {
                                "id": 96,
                                "operationType": "signEncryptedFile",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado",
                                "descripcion": "Et dicta dolor sit aperiam itaque a ipsam incidunt et sunt tempora."
                            },
                            {
                                "id": 115,
                                "operationType": "asignarDatoBancarioToClient",
                                "avaliable": 1,
                                "nombre": "Asigna un datos bancario con un cliente X.",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 45,
                                "operationType": "checkCertificateStatus",
                                "avaliable": 1,
                                "nombre": "Verificar estado de certificado digital",
                                "descripcion": "Sed velit commodi est accusantium fugiat qui corporis alias est architecto dicta non totam officiis in mollitia dolores. "
                            },
                            {
                                "id": 90,
                                "operationType": "process_register",
                                "avaliable": 1,
                                "nombre": "Proceso de registro",
                                "descripcion": "Et libero maxime qui illum laboriosam aut accusamus optio. Sed aliquam corporis et quia magni est quis temporibus At quia expedita."
                            },
                            {
                                "id": 80,
                                "operationType": "listActualizacion",
                                "avaliable": 1,
                                "nombre": "Listar todas las actualizaciones",
                                "descripcion": "Quo labore voluptatibus ad soluta nisi cum amet voluptas."
                            },
                            {
                                "id": 69,
                                "operationType": "listUser",
                                "avaliable": 1,
                                "nombre": "Listar usuarios",
                                "descripcion": "Aut quaerat corporis est quibusdam quae et minima inventore hic totam aspernatur vel debitis voluptatem et autem libero et quae nisi."
                            },
                            {
                                "id": 114,
                                "operationType": "getCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Obtener los datos de una cuenta bancaria",
                                "descripcion": "sdfsdfsdfsdf"
                            },
                            {
                                "id": 66,
                                "operationType": "updateMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos",
                                "descripcion": "Et consequatur laudantium est explicabo iure aut voluptas quia qui deserunt dicta qui aperiam corporis!"
                            },
                            {
                                "id": 51,
                                "operationType": "validateDocumentJSON",
                                "avaliable": 1,
                                "nombre": "Validar Documento en formato JSON",
                                "descripcion": "Lorem ipsum dolor sit amet. Et ullam odio est eligendi explicabo sed maiores autem cum accusantium facilis et quos dolorem."
                            },
                            {
                                "id": 59,
                                "operationType": "apiCLient",
                                "avaliable": 1,
                                "nombre": "Cliente API",
                                "descripcion": "Sit cupiditate assumenda ad velit nisi et voluptas amet non reiciendis recusandae ab cupiditate internos. Est porro error ab dolor molestiae ex inventore perferendis sed architecto amet."
                            },
                            {
                                "id": 58,
                                "operationType": "listApiClient",
                                "avaliable": 1,
                                "nombre": "Listar Clientes API",
                                "descripcion": "Eos quidem laboriosam sit impedit inventore sed voluptas magni qui provident doloribus eos dolor omnis hic ipsam culpa?"
                            },
                            {
                                "id": 116,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar planes segun cliente",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 83,
                                "operationType": "deletePlan",
                                "avaliable": 1,
                                "nombre": "Eliminar un plan",
                                "descripcion": " Eum expedita laudantium sed laudantium dignissimos cum autem facere aut magnam laboriosam ut aperiam sunt vel iusto tempora."
                            },
                            {
                                "id": 100,
                                "operationType": "getCertificateInfo",
                                "avaliable": 1,
                                "nombre": "Obtener información de certificado",
                                "descripcion": "Qui odit iure qui corrupti atque et voluptatum omnis At perferendis optio sit debitis laudantium!"
                            },
                            {
                                "id": 124,
                                "operationType": "createPayment",
                                "avaliable": 1,
                                "nombre": "Crear pago",
                                "descripcion": "Crear pago "
                            },
                            {
                                "id": 109,
                                "operationType": "listarOperationType",
                                "avaliable": 1,
                                "nombre": "Listar tipos de permisos",
                                "descripcion": "Aut ipsum ducimus et eligendi esse et corrupti temporibus quo magnam voluptatum sit aspernatur voluptatum est omnis deleniti non provident voluptatem."
                            },
                            {
                                "id": 105,
                                "operationType": "getPlan",
                                "avaliable": 1,
                                "nombre": "Obtener información de un plan",
                                "descripcion": "Non doloribus deserunt est atque esse eum consequatur expedita et magnam voluptatem ab cupiditate nemo id similique error."
                            },
                            {
                                "id": 110,
                                "operationType": "createCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Crear cuenta bancaria",
                                "descripcion": "sdfsdfsdf"
                            },
                            {
                                "id": 62,
                                "operationType": "deleteClient",
                                "avaliable": 1,
                                "nombre": "Eliminar Cliente API",
                                "descripcion": "Ut necessitatibus assumenda aut necessitatibus voluptas ea quod quasi sit quia fugit sit incidunt dolor nam autem adipisci."
                            },
                            {
                                "id": 94,
                                "operationType": "signFileWithVisualSignatureUnsafe",
                                "avaliable": 1,
                                "nombre": "Firmar fichero con firma visual insegura",
                                "descripcion": "Ut animi sunt et expedita dicta aut voluptatibus nihil. Sed doloribus molestiae sed sunt adipisci est harum atque eos nemo modi."
                            },
                            {
                                "id": 53,
                                "operationType": "assignPermissionToRole",
                                "avaliable": 1,
                                "nombre": "Asignar permisos a rol",
                                "descripcion": "Et consequuntur magni est reiciendis magni ut voluptatem explicabo! Sed quia rerum aut voluptatem fugit ut aperiam repellat."
                            },
                            {
                                "id": 99,
                                "operationType": "signEncryptedFileUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado inseguro",
                                "descripcion": "Sit necessitatibus vero qui illum odio et atque omnis. Sit fugit exercitationem sit doloribus dolores et doloremque voluptatem. Eum deleniti temporibus quo exercitationem voluptate quo amet porro."
                            },
                            {
                                "id": 101,
                                "operationType": "listarMonedas",
                                "avaliable": 1,
                                "nombre": "Obtener listado de monedas",
                                "descripcion": "Est rerum doloremque eos vitae eveniet sed delectus iure hic error voluptatem ut incidunt obcaecati qui voluptatum inventore in soluta culpa."
                            },
                            {
                                "id": 92,
                                "operationType": "validateSoftelCertificate",
                                "avaliable": 1,
                                "nombre": "Valida certificado de Softel",
                                "descripcion": "Ad iste quos eos earum totam sit quia veniam est atque autem quo dolores minima sit cumque ullam id modi vero."
                            },
                            {
                                "id": 49,
                                "operationType": "signFile",
                                "avaliable": 1,
                                "nombre": "Firmar fichero",
                                "descripcion": "Et vero iste aut consectetur vitae vel quia facilis in placeat dolore id voluptatem voluptas ut omnis beatae id quod magnam?"
                            },
                            {
                                "id": 67,
                                "operationType": "updateInuseMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos en uso",
                                "descripcion": "Et laudantium sequi in fuga cupiditate qui earum accusantium eum explicabo asperiores At inventore soluta cum ipsa blanditiis ad dignissimos eaque. "
                            },
                            {
                                "id": 91,
                                "operationType": "verify",
                                "avaliable": 1,
                                "nombre": "Verificar",
                                "descripcion": "Lorem ipsum dolor sit amet. Ex totam maxime ut consectetur nulla sed esse voluptatibus quo deleniti odit. Et explicabo doloremque ad earum consectetur non sint nemo."
                            },
                            {
                                "id": 47,
                                "operationType": "updateApiClientToken",
                                "avaliable": 1,
                                "nombre": "Actualizar token de Cliente Api",
                                "descripcion": "Ut voluptate temporibus sit placeat saepe cum officiis internos vel facilis fugit?"
                            },
                            {
                                "id": 118,
                                "operationType": "listarMonedas ",
                                "avaliable": 1,
                                "nombre": "Listar Monedas",
                                "descripcion": "Para mostrar las monedas existentes\n"
                            },
                            {
                                "id": 48,
                                "operationType": "testCall",
                                "avaliable": 1,
                                "nombre": "Test Call",
                                "descripcion": "In rerum vitae non unde ipsum ad omnis exercitationem. Est explicabo dolor non quidem velit et ipsam sapiente aut inventore dolorem."
                            },
                            {
                                "id": 89,
                                "operationType": "updateUserRole",
                                "avaliable": 1,
                                "nombre": "Actualizar rol de usuario",
                                "descripcion": "Vel illo numquam et minima maxime et corrupti dolorem At voluptatem rerum sed totam aperiam cum quasi internos qui itaque voluptatem."
                            },
                            {
                                "id": 97,
                                "operationType": "signEncryptedFileWithVisualSignature",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado con firma visual",
                                "descripcion": "Lorem ipsum dolor sit amet. Non libero tempora et perspiciatis asperiores rem galisum repellat non aperiam facere ab quae officia ut distinctio fugiat non placeat atque. "
                            },
                            {
                                "id": 106,
                                "operationType": "asignarCertificateToClient",
                                "avaliable": 1,
                                "nombre": "Asignar certificados a cliente",
                                "descripcion": "Aut molestiae aliquid qui beatae necessitatibus qui eaque internos qui numquam architecto? Eos cupiditate maxime sit porro perspiciatis aut quisquam sint est praesentium quia 33 maxime dolores et saepe necessitatibus!"
                            },
                            {
                                "id": 78,
                                "operationType": "updateActualizacion",
                                "avaliable": 1,
                                "nombre": "Actualizar una actualización",
                                "descripcion": "Lorem ipsum dolor sit amet. Non quia libero ex excepturi cumque aut veniam ipsam et laboriosam iure nam pariatur veritatis qui distinctio possimus ut atque labore!"
                            },
                            {
                                "id": 79,
                                "operationType": "deleteActualizacion",
                                "avaliable": 1,
                                "nombre": "Eliminar una actualización",
                                "descripcion": "Cum reprehenderit nihil ex obcaecati sequi aut dolores odit ut nobis quae. Et voluptates galisum ut eius recusandae nam optio aliquid ea tempora labore ut placeat quia At iusto error ea repellendus nobis!"
                            },
                            {
                                "id": 108,
                                "operationType": "listarClientesSinPlanes",
                                "avaliable": 1,
                                "nombre": "Listar clientes sin planes",
                                "descripcion": "Lorem ipsum dolor sit amet. Ut voluptatibus repellat aut accusamus sint et similique architecto! Ut galisum odit ut voluptate sunt in quod soluta ut praesentium dolor ut omnis deleniti."
                            },
                            {
                                "id": 98,
                                "operationType": "signEncryptedFileWithVisualSignatureUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado con firma visual inseguro",
                                "descripcion": "Aut voluptatem illo et commodi animi ex odit explicabo vel molestiae nesciunt?"
                            },
                            {
                                "id": 117,
                                "operationType": "signPadesJSON",
                                "avaliable": 1,
                                "nombre": "Firmar Pades",
                                "descripcion": "Firmar un Pades\n"
                            },
                            {
                                "id": 46,
                                "operationType": "registerApiClient",
                                "avaliable": 1,
                                "nombre": "Registar token de Cliente Api",
                                "descripcion": "Ut neque velit non enim porro et doloribus voluptatem. Ab dolor saepe et distinctio quaerat eos reprehenderit omnis ut accusantium quas et sunt nobis quo dolorem perspiciatis."
                            },
                            {
                                "id": 56,
                                "operationType": "updateApiClient",
                                "avaliable": 1,
                                "nombre": "Actualizar Cliente API",
                                "descripcion": "Lorem ipsum dolor sit amet. Eos sequi dicta eos sequi voluptas et accusamus facilis nam accusantium adipisci id neque voluptatem."
                            },
                            {
                                "id": 63,
                                "operationType": "updateClient",
                                "avaliable": 1,
                                "nombre": "Actualizar Cliente API",
                                "descripcion": "Aut eligendi ipsa rem atque dolores a illum quam sit velit vero. Id rerum asperiores a eligendi ipsa et tempore placeat ad consequuntur excepturi et molestiae consequatur!"
                            },
                            {
                                "id": 44,
                                "operationType": "validateSignatures",
                                "avaliable": 1,
                                "nombre": "Validar firma digital",
                                "descripcion": "Est porro commodi hic nostrum sunt est ullam suscipit et numquam totam in officiis illo aut quod iste aut excepturi odit"
                            },
                            {
                                "id": 120,
                                "operationType": "reportClienteCertificados",
                                "avaliable": 1,
                                "nombre": "reportClienteCertificados",
                                "descripcion": "reportClienteCertificados"
                            },
                            {
                                "id": 81,
                                "operationType": "countApiClient",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de clientes API",
                                "descripcion": "Aut voluptas velit ut autem perferendis At saepe nihil ex nemo consectetur! Et deleniti internos ea rerum officiis et minus illum aut possimus deleniti."
                            },
                            {
                                "id": 107,
                                "operationType": "asignarCertificateToClientToCertificate",
                                "avaliable": 1,
                                "nombre": "Asociar plan con cliente con certificados",
                                "descripcion": "Cum accusamus veritatis qui fugit perferendis At nihil laudantium ea animi repudiandae. Ut veniam temporibus est illum explicabo aut nostrum quibusdam."
                            },
                            {
                                "id": 70,
                                "operationType": "role",
                                "avaliable": 1,
                                "nombre": "Roles",
                                "descripcion": "Qui itaque deserunt ea dolorem Quis aut ullam omnis! Sit architecto deserunt et aperiam assumenda ut cupiditate autem sit quod totam. Ea adipisci aperiam non facere similique qui dolores repudiandae?"
                            },
                            {
                                "id": 113,
                                "operationType": "updateCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Actualizar los datos de una cuenta bancaria",
                                "descripcion": "sdfsdfsdfsdfdsf"
                            },
                            {
                                "id": 72,
                                "operationType": "deleteRole",
                                "avaliable": 1,
                                "nombre": "Eliminar roles",
                                "descripcion": "Est iusto fugit non pariatur saepe ex illum tenetur qui enim nisi sed autem galisum. Sed omnis deleniti aut ipsam beatae aut magnam maiores hic tempore molestiae cum molestiae accusamus et accusantium sequi aut repellat architecto. "
                            },
                            {
                                "id": 87,
                                "operationType": "countClient",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de clientes",
                                "descripcion": "Vel quod quidem ut eius corrupti 33 nemo sint ad dolores aliquam vel aperiam veniam. Aut amet maiores rem ratione consequatur et voluptatem consequatur qui quod dolores sed quis deleniti."
                            },
                            {
                                "id": 102,
                                "operationType": "listarTipoPago",
                                "avaliable": 1,
                                "nombre": "Obtener listado de Tipos de pagos",
                                "descripcion": "Aut possimus commodi est dolor autem qui suscipit recusandae sit possimus ullam eum nesciunt dolor sed veniam culpa cum autem neque."
                            },
                            {
                                "id": 65,
                                "operationType": "listClient",
                                "avaliable": 1,
                                "nombre": "Listar Clientes",
                                "descripcion": "Ea quibusdam culpa vel aperiam aliquid et voluptas nostrum est dignissimos sint."
                            },
                            {
                                "id": 125,
                                "operationType": "payForms",
                                "avaliable": 1,
                                "nombre": "Listar las formas de pago",
                                "descripcion": "Listar las formas de pago habilitadas en el Microservicio"
                            },
                            {
                                "id": 77,
                                "operationType": "createActualizacion",
                                "avaliable": 1,
                                "nombre": "Crear actualización",
                                "descripcion": "Qui eius possimus et dignissimos corporis aut voluptates cupiditate qui laborum provident."
                            },
                            {
                                "id": 52,
                                "operationType": "updatePassword",
                                "avaliable": 1,
                                "nombre": "Actualizar contraseña",
                                "descripcion": "Et iusto corrupti et veniam nulla non quos veniam sed quia sunt. Aut sequi modi ea consequuntur ullam aut molestiae mollitia."
                            },
                            {
                                "id": 64,
                                "operationType": "client",
                                "avaliable": 1,
                                "nombre": "Cliente",
                                "descripcion": "Lorem ipsum dolor sit amet. Ea voluptas porro aut sequi accusantium est quae aliquam sit debitis velit et voluptatem accusantium hic excepturi labore."
                            },
                            {
                                "id": 76,
                                "operationType": "ultimaActualizacion",
                                "avaliable": 1,
                                "nombre": "Obtener última actualización",
                                "descripcion": "Ut facilis quasi ut nesciunt porro nam suscipit iusto et dolores perspiciatis ab facilis fuga sed nihil accusamus."
                            },
                            {
                                "id": 111,
                                "operationType": "listarCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Listar todas las cuentas bancarias",
                                "descripcion": "asdasdasd"
                            },
                            {
                                "id": 54,
                                "operationType": "assignPermissionToApiClient",
                                "avaliable": 1,
                                "nombre": "Asignar permisos a cliente API",
                                "descripcion": "Qui commodi expedita sed soluta praesentium aut magni debitis et nihil consequatur qui repudiandae laboriosam eum reprehenderit modi."
                            },
                            {
                                "id": 74,
                                "operationType": "createRole",
                                "avaliable": 1,
                                "nombre": "Crear rol",
                                "descripcion": "Qui asperiores distinctio est recusandae vitae est voluptas atque nam ipsa nihil. Eos expedita voluptatem aut quia molestiae id error natus. Et mollitia nihil et quos saepe est earum enim."
                            }
                        ],
                        "description": "Prueba todos permisos",
                        "name": "Superadmin",
                        "status": true
                    }
                ],
                "email": "javier.alfonso@ingeniuscuba.com",
                "enable": true,
                "resetPasswordToken": null,
                "expiringDate": null,
                "emailToken": null
            }
        ],
        "payments": null
    },
    {
        "id": 352,
        "description": "SOftel",
        "lastName": null,
        "name": "SOftel",
        "province": "La Habana",
        "address": "UCI",
        "contactPhone": "050948762",
        "contactEmail": "comercial@ingeniuscuba",
        "institutional": true,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": "SOftel",
        "codigoReeup": "AAAA",
        "telefono": "050948762",
        "identificador": null,
        "fechaCreacion": 1695222907066,
        "datosBancariosDtoList": [
            {
                "id": 102,
                "cuentaBancaria": "1111111111111111",
                "nombre": "Nombre de cuenta bancaria",
                "titular": "sdasdasds",
                "observaciones": "SOftel",
                "monedas": {
                    "id": 7,
                    "descripcion": "CUP"
                },
                "nombreBanco": "Metro",
                "sucursal": "AAAA"
            }
        ],
        "usuario": [],
        "payments": null
    },
    {
        "id": 519,
        "description": "PRobando",
        "lastName": "Romero",
        "name": "Bernardo",
        "province": "La Habana",
        "address": "CAlle 30",
        "contactPhone": "11111111",
        "contactEmail": "bernardo@ingeniuscuba.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": "",
        "codigoReeup": "",
        "telefono": "11111111",
        "identificador": "11111111111",
        "fechaCreacion": 1717439327128,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1252,
        "description": null,
        "lastName": "Savon",
        "name": "Yoandris",
        "province": "La Habana",
        "address": "",
        "contactPhone": "50948127",
        "contactEmail": "yoandris@ingeniuscuba.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "",
        "fechaCreacion": 1712849553704,
        "datosBancariosDtoList": [],
        "usuario": [
            {
                "id": 80,
                "username": "yoandrisprueba1",
                "inuse": 1,
                "password": "$2a$10$kLCdsoepITD1bHyBluUppuR8T.RSh9Hj8W8bYhJ75BQzxZ6ht1Req",
                "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2FuZHJpc3BydWViYTEiLCJuYmYiOjE3MTI4NTQ3NDcsInR5cGUiOiJ1c2VyIiwiZXhwIjoxNzEyOTMzOTQ3LCJpYXQiOjE3MTI4NTQ3NDd9.nadqyRccI8SbsEgT0SpfH4aFQH5dF68tKnPDzsXrs7oHVPOvcZirLjOs72K0We2wlDE6atRDsjV1KAXSSaZeag",
                "roles": [
                    {
                        "id": 3,
                        "operationTypes": [
                            {
                                "id": 49,
                                "operationType": "signFile",
                                "avaliable": 1,
                                "nombre": "Firmar fichero",
                                "descripcion": "Et vero iste aut consectetur vitae vel quia facilis in placeat dolore id voluptatem voluptas ut omnis beatae id quod magnam?"
                            },
                            {
                                "id": 50,
                                "operationType": "validateCertificateJSON",
                                "avaliable": 1,
                                "nombre": "Validar Certificado en formato JSON",
                                "descripcion": "Cum nihil dolorem est repellendus culpa est consequuntur enim ut reprehenderit temporibus aut sequi labore et iste dicta non totam veniam!"
                            },
                            {
                                "id": 67,
                                "operationType": "updateInuseMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos en uso",
                                "descripcion": "Et laudantium sequi in fuga cupiditate qui earum accusantium eum explicabo asperiores At inventore soluta cum ipsa blanditiis ad dignissimos eaque. "
                            },
                            {
                                "id": 121,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar Planes por el Id del Clientes",
                                "descripcion": "Listar Planes según el identificador del Cliente"
                            },
                            {
                                "id": 66,
                                "operationType": "updateMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos",
                                "descripcion": "Et consequatur laudantium est explicabo iure aut voluptas quia qui deserunt dicta qui aperiam corporis!"
                            },
                            {
                                "id": 125,
                                "operationType": "payForms",
                                "avaliable": 1,
                                "nombre": "Listar las formas de pago",
                                "descripcion": "Listar las formas de pago habilitadas en el Microservicio"
                            },
                            {
                                "id": 60,
                                "operationType": "myDatesUser",
                                "avaliable": 1,
                                "nombre": "Mis datos de usuario",
                                "descripcion": "Vel consectetur provident non reiciendis alias rem quisquam enim non facere autem est omnis excepturi? Ea cumque asperiores"
                            },
                            {
                                "id": 126,
                                "operationType": "statusPayment",
                                "avaliable": 1,
                                "nombre": "Estado del Pago",
                                "descripcion": null
                            },
                            {
                                "id": 51,
                                "operationType": "validateDocumentJSON",
                                "avaliable": 1,
                                "nombre": "Validar Documento en formato JSON",
                                "descripcion": "Lorem ipsum dolor sit amet. Et ullam odio est eligendi explicabo sed maiores autem cum accusantium facilis et quos dolorem."
                            },
                            {
                                "id": 43,
                                "operationType": "validateCertificate",
                                "avaliable": 1,
                                "nombre": "Validar certificado",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit minima eveniet et voluptates iure ut quas odio rem velit consequatur id quisquam beatae et placeat blanditiis?"
                            },
                            {
                                "id": 106,
                                "operationType": "asignarCertificateToClient",
                                "avaliable": 1,
                                "nombre": "Asignar certificados a cliente",
                                "descripcion": "Aut molestiae aliquid qui beatae necessitatibus qui eaque internos qui numquam architecto? Eos cupiditate maxime sit porro perspiciatis aut quisquam sint est praesentium quia 33 maxime dolores et saepe necessitatibus!"
                            },
                            {
                                "id": 116,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar planes segun cliente",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 52,
                                "operationType": "updatePassword",
                                "avaliable": 1,
                                "nombre": "Actualizar contraseña",
                                "descripcion": "Et iusto corrupti et veniam nulla non quos veniam sed quia sunt. Aut sequi modi ea consequuntur ullam aut molestiae mollitia."
                            },
                            {
                                "id": 82,
                                "operationType": "listPlan",
                                "avaliable": 1,
                                "nombre": "Listar total de planes",
                                "descripcion": "Est quia quia eum dolore laborum cum quis earum aut labore optio. Qui ipsa eius sit possimus galisum et similique beatae et unde perferendis in repellat atque sed tempore vero."
                            },
                            {
                                "id": 124,
                                "operationType": "createPayment",
                                "avaliable": 1,
                                "nombre": "Crear pago",
                                "descripcion": "Crear pago "
                            },
                            {
                                "id": 123,
                                "operationType": "asignarCertificateToClientToCertificate",
                                "avaliable": 1,
                                "nombre": "Asignar Certificado a un Cliente",
                                "descripcion": "Asignar un certificado a un cliente"
                            },
                            {
                                "id": 117,
                                "operationType": "signPadesJSON",
                                "avaliable": 1,
                                "nombre": "Firmar Pades",
                                "descripcion": "Firmar un Pades\n"
                            },
                            {
                                "id": 45,
                                "operationType": "checkCertificateStatus",
                                "avaliable": 1,
                                "nombre": "Verificar estado de certificado digital",
                                "descripcion": "Sed velit commodi est accusantium fugiat qui corporis alias est architecto dicta non totam officiis in mollitia dolores. "
                            },
                            {
                                "id": 44,
                                "operationType": "validateSignatures",
                                "avaliable": 1,
                                "nombre": "Validar firma digital",
                                "descripcion": "Est porro commodi hic nostrum sunt est ullam suscipit et numquam totam in officiis illo aut quod iste aut excepturi odit"
                            }
                        ],
                        "description": "Role asignado para los Clientes\n",
                        "name": "Cliente",
                        "status": true
                    }
                ],
                "email": "yoandris@ingeniuscuba.com",
                "enable": true,
                "resetPasswordToken": null,
                "expiringDate": null,
                "emailToken": null
            }
        ],
        "payments": null
    },
    {
        "id": 2,
        "description": "Lorem ipsum dLorem ipsum dolor sit amet Ut voluptatibus repellat",
        "lastName": "sasasas",
        "name": "aaaaa",
        "province": "La Habana",
        "address": "Lorem ipsum dLorem ipsum dolor sit amet Ut voluptatibus repellat",
        "contactPhone": "78822579",
        "contactEmail": "alain@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "78822579",
        "identificador": "83052127540",
        "fechaCreacion": 1682530978140,
        "datosBancariosDtoList": [
            {
                "id": 1,
                "cuentaBancaria": "",
                "nombre": "Nombre de cuenta bancaria",
                "titular": "",
                "observaciones": "",
                "monedas": {
                    "id": 0,
                    "descripcion": "USD"
                },
                "nombreBanco": "",
                "sucursal": ""
            }
        ],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1303,
        "description": "wwewewewe",
        "lastName": "wwewew",
        "name": "Jhon",
        "province": "La Habana",
        "address": "wdwewewe",
        "contactPhone": "213232323",
        "contactEmail": "qwq@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "213232323",
        "identificador": "2435443545454",
        "fechaCreacion": 1713473631768,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1304,
        "description": null,
        "lastName": "Li",
        "name": "Juan",
        "province": "La Habana",
        "address": "www",
        "contactPhone": null,
        "contactEmail": "nombre123@empresa.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "12345678912",
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1305,
        "description": null,
        "lastName": "Wi",
        "name": "Lusi",
        "province": "La Habana",
        "address": "wwww",
        "contactPhone": null,
        "contactEmail": "nombre1@empresa.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "12345678912",
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1306,
        "description": null,
        "lastName": "Cruz",
        "name": "Tom",
        "province": "La Habana",
        "address": "www",
        "contactPhone": null,
        "contactEmail": "tom@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "12345678912",
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1307,
        "description": null,
        "lastName": "Cruz",
        "name": "Tom",
        "province": "La Habana",
        "address": "www",
        "contactPhone": null,
        "contactEmail": "nombre@dominio.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "12345678912",
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1302,
        "description": "sdsdsdsdsd",
        "lastName": "Li",
        "name": "Pepe",
        "province": "La Habana",
        "address": "sdsdsdsdsdsd",
        "contactPhone": "123456784",
        "contactEmail": "pepe@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": "123456784",
        "identificador": "12345678912",
        "fechaCreacion": 1713472493354,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1352,
        "description": null,
        "lastName": "Alfonso",
        "name": "Javier",
        "province": null,
        "address": null,
        "contactPhone": null,
        "contactEmail": "jalfonsocu@gmail.com",
        "institutional": false,
        "country": null,
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": 1714753351958,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    },
    {
        "id": 1402,
        "description": null,
        "lastName": "Alfonso",
        "name": "Javier",
        "province": null,
        "address": null,
        "contactPhone": null,
        "contactEmail": "jalfonsocu@gmail.com",
        "institutional": false,
        "country": null,
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": 1715710652478,
        "datosBancariosDtoList": [],
        "usuario": [
            {
                "id": 82,
                "username": "jalfonsocu",
                "inuse": 1,
                "password": "$2a$10$TCm7nlvyVPc7/WJHUa6nAOnR09K2CymYStvqxMcCV9NTPDVX/9z4a",
                "token": null,
                "roles": [
                    {
                        "id": 3,
                        "operationTypes": [
                            {
                                "id": 49,
                                "operationType": "signFile",
                                "avaliable": 1,
                                "nombre": "Firmar fichero",
                                "descripcion": "Et vero iste aut consectetur vitae vel quia facilis in placeat dolore id voluptatem voluptas ut omnis beatae id quod magnam?"
                            },
                            {
                                "id": 50,
                                "operationType": "validateCertificateJSON",
                                "avaliable": 1,
                                "nombre": "Validar Certificado en formato JSON",
                                "descripcion": "Cum nihil dolorem est repellendus culpa est consequuntur enim ut reprehenderit temporibus aut sequi labore et iste dicta non totam veniam!"
                            },
                            {
                                "id": 67,
                                "operationType": "updateInuseMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos en uso",
                                "descripcion": "Et laudantium sequi in fuga cupiditate qui earum accusantium eum explicabo asperiores At inventore soluta cum ipsa blanditiis ad dignissimos eaque. "
                            },
                            {
                                "id": 121,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar Planes por el Id del Clientes",
                                "descripcion": "Listar Planes según el identificador del Cliente"
                            },
                            {
                                "id": 66,
                                "operationType": "updateMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos",
                                "descripcion": "Et consequatur laudantium est explicabo iure aut voluptas quia qui deserunt dicta qui aperiam corporis!"
                            },
                            {
                                "id": 125,
                                "operationType": "payForms",
                                "avaliable": 1,
                                "nombre": "Listar las formas de pago",
                                "descripcion": "Listar las formas de pago habilitadas en el Microservicio"
                            },
                            {
                                "id": 60,
                                "operationType": "myDatesUser",
                                "avaliable": 1,
                                "nombre": "Mis datos de usuario",
                                "descripcion": "Vel consectetur provident non reiciendis alias rem quisquam enim non facere autem est omnis excepturi? Ea cumque asperiores"
                            },
                            {
                                "id": 126,
                                "operationType": "statusPayment",
                                "avaliable": 1,
                                "nombre": "Estado del Pago",
                                "descripcion": null
                            },
                            {
                                "id": 51,
                                "operationType": "validateDocumentJSON",
                                "avaliable": 1,
                                "nombre": "Validar Documento en formato JSON",
                                "descripcion": "Lorem ipsum dolor sit amet. Et ullam odio est eligendi explicabo sed maiores autem cum accusantium facilis et quos dolorem."
                            },
                            {
                                "id": 43,
                                "operationType": "validateCertificate",
                                "avaliable": 1,
                                "nombre": "Validar certificado",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit minima eveniet et voluptates iure ut quas odio rem velit consequatur id quisquam beatae et placeat blanditiis?"
                            },
                            {
                                "id": 106,
                                "operationType": "asignarCertificateToClient",
                                "avaliable": 1,
                                "nombre": "Asignar certificados a cliente",
                                "descripcion": "Aut molestiae aliquid qui beatae necessitatibus qui eaque internos qui numquam architecto? Eos cupiditate maxime sit porro perspiciatis aut quisquam sint est praesentium quia 33 maxime dolores et saepe necessitatibus!"
                            },
                            {
                                "id": 116,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar planes segun cliente",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 52,
                                "operationType": "updatePassword",
                                "avaliable": 1,
                                "nombre": "Actualizar contraseña",
                                "descripcion": "Et iusto corrupti et veniam nulla non quos veniam sed quia sunt. Aut sequi modi ea consequuntur ullam aut molestiae mollitia."
                            },
                            {
                                "id": 82,
                                "operationType": "listPlan",
                                "avaliable": 1,
                                "nombre": "Listar total de planes",
                                "descripcion": "Est quia quia eum dolore laborum cum quis earum aut labore optio. Qui ipsa eius sit possimus galisum et similique beatae et unde perferendis in repellat atque sed tempore vero."
                            },
                            {
                                "id": 124,
                                "operationType": "createPayment",
                                "avaliable": 1,
                                "nombre": "Crear pago",
                                "descripcion": "Crear pago "
                            },
                            {
                                "id": 123,
                                "operationType": "asignarCertificateToClientToCertificate",
                                "avaliable": 1,
                                "nombre": "Asignar Certificado a un Cliente",
                                "descripcion": "Asignar un certificado a un cliente"
                            },
                            {
                                "id": 117,
                                "operationType": "signPadesJSON",
                                "avaliable": 1,
                                "nombre": "Firmar Pades",
                                "descripcion": "Firmar un Pades\n"
                            },
                            {
                                "id": 45,
                                "operationType": "checkCertificateStatus",
                                "avaliable": 1,
                                "nombre": "Verificar estado de certificado digital",
                                "descripcion": "Sed velit commodi est accusantium fugiat qui corporis alias est architecto dicta non totam officiis in mollitia dolores. "
                            },
                            {
                                "id": 44,
                                "operationType": "validateSignatures",
                                "avaliable": 1,
                                "nombre": "Validar firma digital",
                                "descripcion": "Est porro commodi hic nostrum sunt est ullam suscipit et numquam totam in officiis illo aut quod iste aut excepturi odit"
                            }
                        ],
                        "description": "Role asignado para los Clientes\n",
                        "name": "Cliente",
                        "status": true
                    }
                ],
                "email": "jalfonsocu@gmail.com",
                "enable": true,
                "resetPasswordToken": null,
                "expiringDate": null,
                "emailToken": null
            }
        ],
        "payments": null
    },
    {
        "id": 1452,
        "description": null,
        "lastName": "Gainza Martínez",
        "name": "Isledy",
        "province": "",
        "address": "",
        "contactPhone": "59985316",
        "contactEmail": "isledyg@gmail.com",
        "institutional": false,
        "country": "",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": "",
        "fechaCreacion": 1716259292299,
        "datosBancariosDtoList": [],
        "usuario": [
            {
                "id": 83,
                "username": "igainza",
                "inuse": 1,
                "password": "$2a$10$RfJ3xIeQMn1c5gCEb6AJcOxoAKGISSD8nnJ1zhOgum5kKox1yS3wK",
                "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpZ2FpbnphIiwibmJmIjoxNzE4NjUxMDE3LCJ0eXBlIjoidXNlciIsImV4cCI6MTcxODczMDIxNywiaWF0IjoxNzE4NjUxMDE3fQ.nzjQK3IacDuNPo83jnzodisI2qPue1ZxSzI24HkxNgBhprZuP3WI5mF6BS7TLwmUka1pfDWa63pTwXTvdbPmhw",
                "roles": [
                    {
                        "id": 3,
                        "operationTypes": [
                            {
                                "id": 49,
                                "operationType": "signFile",
                                "avaliable": 1,
                                "nombre": "Firmar fichero",
                                "descripcion": "Et vero iste aut consectetur vitae vel quia facilis in placeat dolore id voluptatem voluptas ut omnis beatae id quod magnam?"
                            },
                            {
                                "id": 50,
                                "operationType": "validateCertificateJSON",
                                "avaliable": 1,
                                "nombre": "Validar Certificado en formato JSON",
                                "descripcion": "Cum nihil dolorem est repellendus culpa est consequuntur enim ut reprehenderit temporibus aut sequi labore et iste dicta non totam veniam!"
                            },
                            {
                                "id": 67,
                                "operationType": "updateInuseMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos en uso",
                                "descripcion": "Et laudantium sequi in fuga cupiditate qui earum accusantium eum explicabo asperiores At inventore soluta cum ipsa blanditiis ad dignissimos eaque. "
                            },
                            {
                                "id": 121,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar Planes por el Id del Clientes",
                                "descripcion": "Listar Planes según el identificador del Cliente"
                            },
                            {
                                "id": 66,
                                "operationType": "updateMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos",
                                "descripcion": "Et consequatur laudantium est explicabo iure aut voluptas quia qui deserunt dicta qui aperiam corporis!"
                            },
                            {
                                "id": 125,
                                "operationType": "payForms",
                                "avaliable": 1,
                                "nombre": "Listar las formas de pago",
                                "descripcion": "Listar las formas de pago habilitadas en el Microservicio"
                            },
                            {
                                "id": 60,
                                "operationType": "myDatesUser",
                                "avaliable": 1,
                                "nombre": "Mis datos de usuario",
                                "descripcion": "Vel consectetur provident non reiciendis alias rem quisquam enim non facere autem est omnis excepturi? Ea cumque asperiores"
                            },
                            {
                                "id": 126,
                                "operationType": "statusPayment",
                                "avaliable": 1,
                                "nombre": "Estado del Pago",
                                "descripcion": null
                            },
                            {
                                "id": 51,
                                "operationType": "validateDocumentJSON",
                                "avaliable": 1,
                                "nombre": "Validar Documento en formato JSON",
                                "descripcion": "Lorem ipsum dolor sit amet. Et ullam odio est eligendi explicabo sed maiores autem cum accusantium facilis et quos dolorem."
                            },
                            {
                                "id": 43,
                                "operationType": "validateCertificate",
                                "avaliable": 1,
                                "nombre": "Validar certificado",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit minima eveniet et voluptates iure ut quas odio rem velit consequatur id quisquam beatae et placeat blanditiis?"
                            },
                            {
                                "id": 106,
                                "operationType": "asignarCertificateToClient",
                                "avaliable": 1,
                                "nombre": "Asignar certificados a cliente",
                                "descripcion": "Aut molestiae aliquid qui beatae necessitatibus qui eaque internos qui numquam architecto? Eos cupiditate maxime sit porro perspiciatis aut quisquam sint est praesentium quia 33 maxime dolores et saepe necessitatibus!"
                            },
                            {
                                "id": 116,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar planes segun cliente",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 52,
                                "operationType": "updatePassword",
                                "avaliable": 1,
                                "nombre": "Actualizar contraseña",
                                "descripcion": "Et iusto corrupti et veniam nulla non quos veniam sed quia sunt. Aut sequi modi ea consequuntur ullam aut molestiae mollitia."
                            },
                            {
                                "id": 82,
                                "operationType": "listPlan",
                                "avaliable": 1,
                                "nombre": "Listar total de planes",
                                "descripcion": "Est quia quia eum dolore laborum cum quis earum aut labore optio. Qui ipsa eius sit possimus galisum et similique beatae et unde perferendis in repellat atque sed tempore vero."
                            },
                            {
                                "id": 124,
                                "operationType": "createPayment",
                                "avaliable": 1,
                                "nombre": "Crear pago",
                                "descripcion": "Crear pago "
                            },
                            {
                                "id": 123,
                                "operationType": "asignarCertificateToClientToCertificate",
                                "avaliable": 1,
                                "nombre": "Asignar Certificado a un Cliente",
                                "descripcion": "Asignar un certificado a un cliente"
                            },
                            {
                                "id": 117,
                                "operationType": "signPadesJSON",
                                "avaliable": 1,
                                "nombre": "Firmar Pades",
                                "descripcion": "Firmar un Pades\n"
                            },
                            {
                                "id": 45,
                                "operationType": "checkCertificateStatus",
                                "avaliable": 1,
                                "nombre": "Verificar estado de certificado digital",
                                "descripcion": "Sed velit commodi est accusantium fugiat qui corporis alias est architecto dicta non totam officiis in mollitia dolores. "
                            },
                            {
                                "id": 44,
                                "operationType": "validateSignatures",
                                "avaliable": 1,
                                "nombre": "Validar firma digital",
                                "descripcion": "Est porro commodi hic nostrum sunt est ullam suscipit et numquam totam in officiis illo aut quod iste aut excepturi odit"
                            }
                        ],
                        "description": "Role asignado para los Clientes\n",
                        "name": "Cliente",
                        "status": true
                    }
                ],
                "email": "isledyg@gmail.com",
                "enable": true,
                "resetPasswordToken": null,
                "expiringDate": null,
                "emailToken": null
            }
        ],
        "payments": null
    },
    {
        "id": 1552,
        "description": null,
        "lastName": "Martñin",
        "name": "Nayibi",
        "province": null,
        "address": null,
        "contactPhone": null,
        "contactEmail": "nayibi.321@gmail.com",
        "institutional": false,
        "country": null,
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": 1722956492003,
        "datosBancariosDtoList": [],
        "usuario": [
            {
                "id": 84,
                "username": "nmartin",
                "inuse": 1,
                "password": "$2a$10$/6zog/D84xKkOHN6aeGxfeYW1kFg5FQd3c.jYKyniA3t9Oz7oW43C",
                "token": null,
                "roles": [
                    {
                        "id": 1,
                        "operationTypes": [
                            {
                                "id": 50,
                                "operationType": "validateCertificateJSON",
                                "avaliable": 1,
                                "nombre": "Validar Certificado en formato JSON",
                                "descripcion": "Cum nihil dolorem est repellendus culpa est consequuntur enim ut reprehenderit temporibus aut sequi labore et iste dicta non totam veniam!"
                            },
                            {
                                "id": 55,
                                "operationType": "assignRolesToUser",
                                "avaliable": 1,
                                "nombre": "Asignar roles a usuario",
                                "descripcion": "In suscipit ullam et maiores sint in similique repudiandae in eaque illo qui consequuntur distinctio est mollitia illo."
                            },
                            {
                                "id": 57,
                                "operationType": "deleteApiClient",
                                "avaliable": 1,
                                "nombre": "Eliminar Cliente API",
                                "descripcion": "33 sint quia eos commodi ipsa id laborum nihil ea dolor sunt ut dolores modi. "
                            },
                            {
                                "id": 75,
                                "operationType": "deleteUser",
                                "avaliable": 1,
                                "nombre": "Eliminar usuario",
                                "descripcion": "Qui provident quas sit cupiditate omnis ex possimus quis aut inventore molestiae. "
                            },
                            {
                                "id": 88,
                                "operationType": "countUser",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de usuarios",
                                "descripcion": " Ut assumenda aliquid est dolorem voluptatibus vel quasi natus aut quisquam adipisci sed iusto aliquam."
                            },
                            {
                                "id": 61,
                                "operationType": "createClient",
                                "avaliable": 1,
                                "nombre": "Crear cliente",
                                "descripcion": "sit Quis tempora ad assumenda quisquam aut reiciendis Quis At quam illum."
                            },
                            {
                                "id": 68,
                                "operationType": "getUser",
                                "avaliable": 1,
                                "nombre": "Obtener usuario",
                                "descripcion": "At quod voluptatem ut labore quas sed consequatur tenetur et fugit voluptatibus At dicta ullam ea sequi exercitationem."
                            },
                            {
                                "id": 71,
                                "operationType": "listRoles",
                                "avaliable": 1,
                                "nombre": "Listar roles",
                                "descripcion": "Lorem ipsum dolor sit amet. At magnam dolorem est tenetur omnis et omnis exercitationem non molestiae quisquam aut voluptatem nisi?"
                            },
                            {
                                "id": 60,
                                "operationType": "myDatesUser",
                                "avaliable": 1,
                                "nombre": "Mis datos de usuario",
                                "descripcion": "Vel consectetur provident non reiciendis alias rem quisquam enim non facere autem est omnis excepturi? Ea cumque asperiores"
                            },
                            {
                                "id": 126,
                                "operationType": "statusPayment",
                                "avaliable": 1,
                                "nombre": "Estado del Pago",
                                "descripcion": null
                            },
                            {
                                "id": 119,
                                "operationType": "agregarIDCertificate",
                                "avaliable": 1,
                                "nombre": "Obtener información de certificado.",
                                "descripcion": "Obtener información de certificado."
                            },
                            {
                                "id": 43,
                                "operationType": "validateCertificate",
                                "avaliable": 1,
                                "nombre": "Validar certificado",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit minima eveniet et voluptates iure ut quas odio rem velit consequatur id quisquam beatae et placeat blanditiis?"
                            },
                            {
                                "id": 95,
                                "operationType": "signFileUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero de modo inseguro",
                                "descripcion": "ut animi sunt et expedita dicta aut voluptatibus nihil. Sed doloribus molestiae sed sunt adipisci est harum atque eos nemo modi."
                            },
                            {
                                "id": 84,
                                "operationType": "updatePlan",
                                "avaliable": 1,
                                "nombre": "Actualizar un plan",
                                "descripcion": "Non sequi consequatur et deleniti voluptas ut soluta obcaecati aut cupiditate esse quo eligendi quos."
                            },
                            {
                                "id": 93,
                                "operationType": "signFileWithVisualSignature",
                                "avaliable": 1,
                                "nombre": "Firmar fichero con firma visual",
                                "descripcion": "Ea dolor perferendis vel ullam ipsam aut quis deserunt non voluptates optio. Aut aliquam repellendus aut cupiditate necessitatibus ea commodi quam At quidem odit"
                            },
                            {
                                "id": 104,
                                "operationType": "asignarCertificateToPlan",
                                "avaliable": 1,
                                "nombre": "Asignar certificado a plan",
                                "descripcion": "Lorem ipsum dolor sit amet. Est saepe excepturi hic dolorem error aut nesciunt nihil et deserunt minima aut ipsum perspiciatis."
                            },
                            {
                                "id": 82,
                                "operationType": "listPlan",
                                "avaliable": 1,
                                "nombre": "Listar total de planes",
                                "descripcion": "Est quia quia eum dolore laborum cum quis earum aut labore optio. Qui ipsa eius sit possimus galisum et similique beatae et unde perferendis in repellat atque sed tempore vero."
                            },
                            {
                                "id": 103,
                                "operationType": "asignarPlanToClient",
                                "avaliable": 1,
                                "nombre": "Asignar plan a cliente",
                                "descripcion": "Vel quia quod sed error quod vel velit exercitationem est praesentium voluptatibus id similique nihil ut harum doloremque et alias repudiandae."
                            },
                            {
                                "id": 85,
                                "operationType": "createPlan",
                                "avaliable": 1,
                                "nombre": "Crear un plan",
                                "descripcion": "Lorem ipsum dolor sit amet. Sit sint sunt vel obcaecati Quis id impedit provident sit voluptatem omnis non dolorum ducimus quo molestiae modi qui quos aliquid."
                            },
                            {
                                "id": 112,
                                "operationType": "removeCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Eliminar una cuenta bancaria",
                                "descripcion": "asdadasdasdasd"
                            },
                            {
                                "id": 73,
                                "operationType": "updateRole",
                                "avaliable": 1,
                                "nombre": "actualizar roles",
                                "descripcion": "Qui eveniet quaerat sed nemo fugiat in mollitia perspiciatis non quis soluta et exercitationem quia aut optio ducimus quo quam quis.\n\n"
                            },
                            {
                                "id": 96,
                                "operationType": "signEncryptedFile",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado",
                                "descripcion": "Et dicta dolor sit aperiam itaque a ipsam incidunt et sunt tempora."
                            },
                            {
                                "id": 115,
                                "operationType": "asignarDatoBancarioToClient",
                                "avaliable": 1,
                                "nombre": "Asigna un datos bancario con un cliente X.",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 45,
                                "operationType": "checkCertificateStatus",
                                "avaliable": 1,
                                "nombre": "Verificar estado de certificado digital",
                                "descripcion": "Sed velit commodi est accusantium fugiat qui corporis alias est architecto dicta non totam officiis in mollitia dolores. "
                            },
                            {
                                "id": 90,
                                "operationType": "process_register",
                                "avaliable": 1,
                                "nombre": "Proceso de registro",
                                "descripcion": "Et libero maxime qui illum laboriosam aut accusamus optio. Sed aliquam corporis et quia magni est quis temporibus At quia expedita."
                            },
                            {
                                "id": 80,
                                "operationType": "listActualizacion",
                                "avaliable": 1,
                                "nombre": "Listar todas las actualizaciones",
                                "descripcion": "Quo labore voluptatibus ad soluta nisi cum amet voluptas."
                            },
                            {
                                "id": 69,
                                "operationType": "listUser",
                                "avaliable": 1,
                                "nombre": "Listar usuarios",
                                "descripcion": "Aut quaerat corporis est quibusdam quae et minima inventore hic totam aspernatur vel debitis voluptatem et autem libero et quae nisi."
                            },
                            {
                                "id": 114,
                                "operationType": "getCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Obtener los datos de una cuenta bancaria",
                                "descripcion": "sdfsdfsdfsdf"
                            },
                            {
                                "id": 66,
                                "operationType": "updateMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos",
                                "descripcion": "Et consequatur laudantium est explicabo iure aut voluptas quia qui deserunt dicta qui aperiam corporis!"
                            },
                            {
                                "id": 51,
                                "operationType": "validateDocumentJSON",
                                "avaliable": 1,
                                "nombre": "Validar Documento en formato JSON",
                                "descripcion": "Lorem ipsum dolor sit amet. Et ullam odio est eligendi explicabo sed maiores autem cum accusantium facilis et quos dolorem."
                            },
                            {
                                "id": 59,
                                "operationType": "apiCLient",
                                "avaliable": 1,
                                "nombre": "Cliente API",
                                "descripcion": "Sit cupiditate assumenda ad velit nisi et voluptas amet non reiciendis recusandae ab cupiditate internos. Est porro error ab dolor molestiae ex inventore perferendis sed architecto amet."
                            },
                            {
                                "id": 58,
                                "operationType": "listApiClient",
                                "avaliable": 1,
                                "nombre": "Listar Clientes API",
                                "descripcion": "Eos quidem laboriosam sit impedit inventore sed voluptas magni qui provident doloribus eos dolor omnis hic ipsam culpa?"
                            },
                            {
                                "id": 116,
                                "operationType": "listarPlanesClientesId",
                                "avaliable": 1,
                                "nombre": "Listar planes segun cliente",
                                "descripcion": "sdsdfsdf"
                            },
                            {
                                "id": 83,
                                "operationType": "deletePlan",
                                "avaliable": 1,
                                "nombre": "Eliminar un plan",
                                "descripcion": " Eum expedita laudantium sed laudantium dignissimos cum autem facere aut magnam laboriosam ut aperiam sunt vel iusto tempora."
                            },
                            {
                                "id": 100,
                                "operationType": "getCertificateInfo",
                                "avaliable": 1,
                                "nombre": "Obtener información de certificado",
                                "descripcion": "Qui odit iure qui corrupti atque et voluptatum omnis At perferendis optio sit debitis laudantium!"
                            },
                            {
                                "id": 124,
                                "operationType": "createPayment",
                                "avaliable": 1,
                                "nombre": "Crear pago",
                                "descripcion": "Crear pago "
                            },
                            {
                                "id": 109,
                                "operationType": "listarOperationType",
                                "avaliable": 1,
                                "nombre": "Listar tipos de permisos",
                                "descripcion": "Aut ipsum ducimus et eligendi esse et corrupti temporibus quo magnam voluptatum sit aspernatur voluptatum est omnis deleniti non provident voluptatem."
                            },
                            {
                                "id": 105,
                                "operationType": "getPlan",
                                "avaliable": 1,
                                "nombre": "Obtener información de un plan",
                                "descripcion": "Non doloribus deserunt est atque esse eum consequatur expedita et magnam voluptatem ab cupiditate nemo id similique error."
                            },
                            {
                                "id": 110,
                                "operationType": "createCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Crear cuenta bancaria",
                                "descripcion": "sdfsdfsdf"
                            },
                            {
                                "id": 62,
                                "operationType": "deleteClient",
                                "avaliable": 1,
                                "nombre": "Eliminar Cliente API",
                                "descripcion": "Ut necessitatibus assumenda aut necessitatibus voluptas ea quod quasi sit quia fugit sit incidunt dolor nam autem adipisci."
                            },
                            {
                                "id": 94,
                                "operationType": "signFileWithVisualSignatureUnsafe",
                                "avaliable": 1,
                                "nombre": "Firmar fichero con firma visual insegura",
                                "descripcion": "Ut animi sunt et expedita dicta aut voluptatibus nihil. Sed doloribus molestiae sed sunt adipisci est harum atque eos nemo modi."
                            },
                            {
                                "id": 53,
                                "operationType": "assignPermissionToRole",
                                "avaliable": 1,
                                "nombre": "Asignar permisos a rol",
                                "descripcion": "Et consequuntur magni est reiciendis magni ut voluptatem explicabo! Sed quia rerum aut voluptatem fugit ut aperiam repellat."
                            },
                            {
                                "id": 99,
                                "operationType": "signEncryptedFileUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado inseguro",
                                "descripcion": "Sit necessitatibus vero qui illum odio et atque omnis. Sit fugit exercitationem sit doloribus dolores et doloremque voluptatem. Eum deleniti temporibus quo exercitationem voluptate quo amet porro."
                            },
                            {
                                "id": 101,
                                "operationType": "listarMonedas",
                                "avaliable": 1,
                                "nombre": "Obtener listado de monedas",
                                "descripcion": "Est rerum doloremque eos vitae eveniet sed delectus iure hic error voluptatem ut incidunt obcaecati qui voluptatum inventore in soluta culpa."
                            },
                            {
                                "id": 92,
                                "operationType": "validateSoftelCertificate",
                                "avaliable": 1,
                                "nombre": "Valida certificado de Softel",
                                "descripcion": "Ad iste quos eos earum totam sit quia veniam est atque autem quo dolores minima sit cumque ullam id modi vero."
                            },
                            {
                                "id": 49,
                                "operationType": "signFile",
                                "avaliable": 1,
                                "nombre": "Firmar fichero",
                                "descripcion": "Et vero iste aut consectetur vitae vel quia facilis in placeat dolore id voluptatem voluptas ut omnis beatae id quod magnam?"
                            },
                            {
                                "id": 67,
                                "operationType": "updateInuseMyDates",
                                "avaliable": 1,
                                "nombre": "Actualizar mis datos en uso",
                                "descripcion": "Et laudantium sequi in fuga cupiditate qui earum accusantium eum explicabo asperiores At inventore soluta cum ipsa blanditiis ad dignissimos eaque. "
                            },
                            {
                                "id": 91,
                                "operationType": "verify",
                                "avaliable": 1,
                                "nombre": "Verificar",
                                "descripcion": "Lorem ipsum dolor sit amet. Ex totam maxime ut consectetur nulla sed esse voluptatibus quo deleniti odit. Et explicabo doloremque ad earum consectetur non sint nemo."
                            },
                            {
                                "id": 47,
                                "operationType": "updateApiClientToken",
                                "avaliable": 1,
                                "nombre": "Actualizar token de Cliente Api",
                                "descripcion": "Ut voluptate temporibus sit placeat saepe cum officiis internos vel facilis fugit?"
                            },
                            {
                                "id": 118,
                                "operationType": "listarMonedas ",
                                "avaliable": 1,
                                "nombre": "Listar Monedas",
                                "descripcion": "Para mostrar las monedas existentes\n"
                            },
                            {
                                "id": 48,
                                "operationType": "testCall",
                                "avaliable": 1,
                                "nombre": "Test Call",
                                "descripcion": "In rerum vitae non unde ipsum ad omnis exercitationem. Est explicabo dolor non quidem velit et ipsam sapiente aut inventore dolorem."
                            },
                            {
                                "id": 89,
                                "operationType": "updateUserRole",
                                "avaliable": 1,
                                "nombre": "Actualizar rol de usuario",
                                "descripcion": "Vel illo numquam et minima maxime et corrupti dolorem At voluptatem rerum sed totam aperiam cum quasi internos qui itaque voluptatem."
                            },
                            {
                                "id": 97,
                                "operationType": "signEncryptedFileWithVisualSignature",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado con firma visual",
                                "descripcion": "Lorem ipsum dolor sit amet. Non libero tempora et perspiciatis asperiores rem galisum repellat non aperiam facere ab quae officia ut distinctio fugiat non placeat atque. "
                            },
                            {
                                "id": 106,
                                "operationType": "asignarCertificateToClient",
                                "avaliable": 1,
                                "nombre": "Asignar certificados a cliente",
                                "descripcion": "Aut molestiae aliquid qui beatae necessitatibus qui eaque internos qui numquam architecto? Eos cupiditate maxime sit porro perspiciatis aut quisquam sint est praesentium quia 33 maxime dolores et saepe necessitatibus!"
                            },
                            {
                                "id": 78,
                                "operationType": "updateActualizacion",
                                "avaliable": 1,
                                "nombre": "Actualizar una actualización",
                                "descripcion": "Lorem ipsum dolor sit amet. Non quia libero ex excepturi cumque aut veniam ipsam et laboriosam iure nam pariatur veritatis qui distinctio possimus ut atque labore!"
                            },
                            {
                                "id": 79,
                                "operationType": "deleteActualizacion",
                                "avaliable": 1,
                                "nombre": "Eliminar una actualización",
                                "descripcion": "Cum reprehenderit nihil ex obcaecati sequi aut dolores odit ut nobis quae. Et voluptates galisum ut eius recusandae nam optio aliquid ea tempora labore ut placeat quia At iusto error ea repellendus nobis!"
                            },
                            {
                                "id": 108,
                                "operationType": "listarClientesSinPlanes",
                                "avaliable": 1,
                                "nombre": "Listar clientes sin planes",
                                "descripcion": "Lorem ipsum dolor sit amet. Ut voluptatibus repellat aut accusamus sint et similique architecto! Ut galisum odit ut voluptate sunt in quod soluta ut praesentium dolor ut omnis deleniti."
                            },
                            {
                                "id": 98,
                                "operationType": "signEncryptedFileWithVisualSignatureUnsafe",
                                "avaliable": 1,
                                "nombre": "Firma fichero encriptado con firma visual inseguro",
                                "descripcion": "Aut voluptatem illo et commodi animi ex odit explicabo vel molestiae nesciunt?"
                            },
                            {
                                "id": 117,
                                "operationType": "signPadesJSON",
                                "avaliable": 1,
                                "nombre": "Firmar Pades",
                                "descripcion": "Firmar un Pades\n"
                            },
                            {
                                "id": 46,
                                "operationType": "registerApiClient",
                                "avaliable": 1,
                                "nombre": "Registar token de Cliente Api",
                                "descripcion": "Ut neque velit non enim porro et doloribus voluptatem. Ab dolor saepe et distinctio quaerat eos reprehenderit omnis ut accusantium quas et sunt nobis quo dolorem perspiciatis."
                            },
                            {
                                "id": 56,
                                "operationType": "updateApiClient",
                                "avaliable": 1,
                                "nombre": "Actualizar Cliente API",
                                "descripcion": "Lorem ipsum dolor sit amet. Eos sequi dicta eos sequi voluptas et accusamus facilis nam accusantium adipisci id neque voluptatem."
                            },
                            {
                                "id": 63,
                                "operationType": "updateClient",
                                "avaliable": 1,
                                "nombre": "Actualizar Cliente API",
                                "descripcion": "Aut eligendi ipsa rem atque dolores a illum quam sit velit vero. Id rerum asperiores a eligendi ipsa et tempore placeat ad consequuntur excepturi et molestiae consequatur!"
                            },
                            {
                                "id": 44,
                                "operationType": "validateSignatures",
                                "avaliable": 1,
                                "nombre": "Validar firma digital",
                                "descripcion": "Est porro commodi hic nostrum sunt est ullam suscipit et numquam totam in officiis illo aut quod iste aut excepturi odit"
                            },
                            {
                                "id": 120,
                                "operationType": "reportClienteCertificados",
                                "avaliable": 1,
                                "nombre": "reportClienteCertificados",
                                "descripcion": "reportClienteCertificados"
                            },
                            {
                                "id": 81,
                                "operationType": "countApiClient",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de clientes API",
                                "descripcion": "Aut voluptas velit ut autem perferendis At saepe nihil ex nemo consectetur! Et deleniti internos ea rerum officiis et minus illum aut possimus deleniti."
                            },
                            {
                                "id": 107,
                                "operationType": "asignarCertificateToClientToCertificate",
                                "avaliable": 1,
                                "nombre": "Asociar plan con cliente con certificados",
                                "descripcion": "Cum accusamus veritatis qui fugit perferendis At nihil laudantium ea animi repudiandae. Ut veniam temporibus est illum explicabo aut nostrum quibusdam."
                            },
                            {
                                "id": 70,
                                "operationType": "role",
                                "avaliable": 1,
                                "nombre": "Roles",
                                "descripcion": "Qui itaque deserunt ea dolorem Quis aut ullam omnis! Sit architecto deserunt et aperiam assumenda ut cupiditate autem sit quod totam. Ea adipisci aperiam non facere similique qui dolores repudiandae?"
                            },
                            {
                                "id": 113,
                                "operationType": "updateCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Actualizar los datos de una cuenta bancaria",
                                "descripcion": "sdfsdfsdfsdfdsf"
                            },
                            {
                                "id": 72,
                                "operationType": "deleteRole",
                                "avaliable": 1,
                                "nombre": "Eliminar roles",
                                "descripcion": "Est iusto fugit non pariatur saepe ex illum tenetur qui enim nisi sed autem galisum. Sed omnis deleniti aut ipsam beatae aut magnam maiores hic tempore molestiae cum molestiae accusamus et accusantium sequi aut repellat architecto. "
                            },
                            {
                                "id": 87,
                                "operationType": "countClient",
                                "avaliable": 1,
                                "nombre": "Obtener cantidad de clientes",
                                "descripcion": "Vel quod quidem ut eius corrupti 33 nemo sint ad dolores aliquam vel aperiam veniam. Aut amet maiores rem ratione consequatur et voluptatem consequatur qui quod dolores sed quis deleniti."
                            },
                            {
                                "id": 102,
                                "operationType": "listarTipoPago",
                                "avaliable": 1,
                                "nombre": "Obtener listado de Tipos de pagos",
                                "descripcion": "Aut possimus commodi est dolor autem qui suscipit recusandae sit possimus ullam eum nesciunt dolor sed veniam culpa cum autem neque."
                            },
                            {
                                "id": 65,
                                "operationType": "listClient",
                                "avaliable": 1,
                                "nombre": "Listar Clientes",
                                "descripcion": "Ea quibusdam culpa vel aperiam aliquid et voluptas nostrum est dignissimos sint."
                            },
                            {
                                "id": 125,
                                "operationType": "payForms",
                                "avaliable": 1,
                                "nombre": "Listar las formas de pago",
                                "descripcion": "Listar las formas de pago habilitadas en el Microservicio"
                            },
                            {
                                "id": 77,
                                "operationType": "createActualizacion",
                                "avaliable": 1,
                                "nombre": "Crear actualización",
                                "descripcion": "Qui eius possimus et dignissimos corporis aut voluptates cupiditate qui laborum provident."
                            },
                            {
                                "id": 52,
                                "operationType": "updatePassword",
                                "avaliable": 1,
                                "nombre": "Actualizar contraseña",
                                "descripcion": "Et iusto corrupti et veniam nulla non quos veniam sed quia sunt. Aut sequi modi ea consequuntur ullam aut molestiae mollitia."
                            },
                            {
                                "id": 64,
                                "operationType": "client",
                                "avaliable": 1,
                                "nombre": "Cliente",
                                "descripcion": "Lorem ipsum dolor sit amet. Ea voluptas porro aut sequi accusantium est quae aliquam sit debitis velit et voluptatem accusantium hic excepturi labore."
                            },
                            {
                                "id": 76,
                                "operationType": "ultimaActualizacion",
                                "avaliable": 1,
                                "nombre": "Obtener última actualización",
                                "descripcion": "Ut facilis quasi ut nesciunt porro nam suscipit iusto et dolores perspiciatis ab facilis fuga sed nihil accusamus."
                            },
                            {
                                "id": 111,
                                "operationType": "listarCuentaBancaria",
                                "avaliable": 1,
                                "nombre": "Listar todas las cuentas bancarias",
                                "descripcion": "asdasdasd"
                            },
                            {
                                "id": 54,
                                "operationType": "assignPermissionToApiClient",
                                "avaliable": 1,
                                "nombre": "Asignar permisos a cliente API",
                                "descripcion": "Qui commodi expedita sed soluta praesentium aut magni debitis et nihil consequatur qui repudiandae laboriosam eum reprehenderit modi."
                            },
                            {
                                "id": 74,
                                "operationType": "createRole",
                                "avaliable": 1,
                                "nombre": "Crear rol",
                                "descripcion": "Qui asperiores distinctio est recusandae vitae est voluptas atque nam ipsa nihil. Eos expedita voluptatem aut quia molestiae id error natus. Et mollitia nihil et quos saepe est earum enim."
                            }
                        ],
                        "description": "Prueba todos permisos",
                        "name": "Superadmin",
                        "status": true
                    }
                ],
                "email": "nayibi.321@gmail.com",
                "enable": true,
                "resetPasswordToken": null,
                "expiringDate": null,
                "emailToken": null
            }
        ],
        "payments": null
    },
    {
        "id": 1553,
        "description": "Cliente de prueba 23",
        "lastName": "Remedios Arencibia",
        "name": "Gilberto",
        "province": "PR",
        "address": "Pinar del Rio",
        "contactPhone": "50125478",
        "contactEmail": "gremedios@gmail.com",
        "institutional": false,
        "country": "Cuba",
        "certificates": null,
        "nombreCorto": null,
        "codigoReeup": null,
        "telefono": null,
        "identificador": null,
        "fechaCreacion": null,
        "datosBancariosDtoList": [],
        "usuario": [],
        "payments": null
    }
  ];

  clientsList!: any[];

  readonly dialog = inject(MatDialog);

  constructor(private clientsService: ClientsService, private notificationService: NotificationsService, private _router: Router) {

  }

  ngOnInit(): void {
    this.loadClientList();
  }

  loadClientList(): void {
    this.clientsService.getClientList()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (resp) => {
        this.clientsList = resp;
        this.dataSource = new MatTableDataSource(this.clientsList);
        this.configDataSource();
      },
      error: (error) => {
        console.log(error);
        this.dataSource = new MatTableDataSource(this.mockup);
        this.configDataSource();
      }
    })
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

  addClient(element?: any): void {
    if (isNullOrEmpty(element)) {
        this._router.navigate(['clients/add-client']);
    } else {
        this._router.navigate(['clients/add-client'], {
            queryParams: { id: element.id }
        });
    }
    
  }

  deleteClient(element: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteClientComponent, {
        width: '500px',
        data: {
          client: element
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.clientsService.deleteClient(element.id).subscribe({
            next: (resp) => {
              this.loadClientList();
              this.notificationService.showSuccess(`El Cliente <strong>${element.name}</strong> se ha eliminado exitosamente.`);
            },
            error: (error) => {
              console.log(error);
            }
          });
        }
      });
  }

  assignPermissions(): void {

  }

  getAssociatedUsers(): void {

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
