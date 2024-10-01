/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'heroicons_solid:home',
        link : '/home'
    },
    {
        id   : 'clientesAPI',
        title: 'Clientes API',
        type : 'basic',
        icon : 'heroicons_solid:tv',
        link : '/api-clients'
    },
    {
        id   : 'permisos',
        title: 'Permisos',
        type : 'basic',
        icon : 'heroicons_solid:shield-check',
        link : '/permissions'
    },
    {
        id   : 'clientes',
        title: 'Clientes',
        type : 'basic',
        icon : 'heroicons_solid:users',
        link : '/clients'
    },
    {
        id   : 'roles',
        title: 'Roles',
        type : 'basic',
        icon : 'heroicons_solid:arrows-right-left',
        link : '/roles'
    },
    {
        id   : 'usuarios',
        title: 'Usuarios',
        type : 'basic',
        icon : 'heroicons_solid:user-group',
        link : '/users'
    },
    {
        id   : 'planes',
        title: 'Planes',
        type : 'basic',
        icon : 'heroicons_solid:briefcase',
        link : '/plans'
    },
    {
        id   : 'reportes',
        title: 'Reportes',
        type : 'basic',
        icon : 'heroicons_solid:document-chart-bar',
        link : '/reports'
    },
    {
        id   : 'cerrar_sesion',
        title: 'Cerrar sesión',
        type : 'basic',
        icon : 'heroicons_solid:power',
        link : '/close_sesion'
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
