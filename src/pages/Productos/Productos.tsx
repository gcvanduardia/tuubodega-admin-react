import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonInput, IonButtons, IonIcon, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import { search } from 'ionicons/icons';
import './Productos.scss';

import { get } from "../../shared/services/api/api";
import Table from "../../shared/components/Table/Table";

interface Producto {
    Id: number;
    ImagenPrin: string;
    Nombre: string;
    Proveedor: string;
    PrecioUnit: string;
    ArticuloEn: boolean;
    CategoriaEn: boolean;
    ProveedorEn: boolean;
}

interface Column {
    Header: string | (() => JSX.Element);
    accessor: keyof Producto;
    Cell?: ({ value, row }: { value: any, row: { original: Producto } }) => JSX.Element;
}

const Productos: React.FC = () => {

    const [Productos, setProductos] = useState([]);

    useEffect(() => {
        getProductos();
    }, []);

    useEffect(() => {
        console.log("Productos from Productos.tsx: ", Productos);
    }, [Productos]);

    const getProductos = async () => {
        const response = await get('articulos/search-admin');
        if (response) {
            setProductos(response[0]);
        }
    }

    const irDetalle = (id: number) => {
        console.log("irDetalle: ", id);
    }

    const columns: Column[] = React.useMemo(
        () => [
            {
                Header: () => (<div>Imagen<br />(detalle)</div>),
                accessor: 'ImagenPrin' as keyof Producto,
                Cell: ({ row: { original } }: { row: { original: Producto } }) => (
                    <div className='table-justifiy-center img-pointer' onClick={() => irDetalle(original.Id)}>
                        <img src={original.ImagenPrin} alt={original.Id.toString()} className='img-product' />
                    </div>
                )
            },
            {
                Header: 'Nombre',
                accessor: 'Nombre' as keyof Producto,
            },
            {
                Header: 'Proveedor',
                accessor: 'Proveedor' as keyof Producto,
            },
            {
                Header: 'PrecioUnit',
                accessor: 'PrecioUnit' as keyof Producto,
                Cell: ({ value }: { value: number }) => (
                    <div className='table-aling-right'>
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)}
                    </div>
                )
            },
            {
                Header: () => (<div className='header-enable'>Enable<br />(Prod-Cat-Prov)</div>),
                accessor: 'ArticuloEn' as keyof Producto,
                Cell: ({ row: { original } }: { row: { original: Producto } }) => (
                    <div>
                        {original.ArticuloEn ? 'Si' : 'No'}-{original.CategoriaEn ? 'Si' : 'No'}-{original.ProveedorEn ? 'Si' : 'No'}
                    </div>
                )
            }
        ],
        []
    );

    return (
        <IonPage>
            <IonHeader mode='ios'>
                <IonToolbar>
                    <IonGrid fixed className='ion-no-padding'>
                        <IonRow>
                            <IonCol size="12">
                                <IonToolbar className='no-border'>
                                    <IonButtons slot='start'>
                                        <div className='search-content'>
                                            <IonInput type="text" placeholder='Buscar...' className='ion-no-padding search'></IonInput>
                                            <IonButton fill='clear' slot='end'>
                                                <IonIcon slot="icon-only" icon={search}></IonIcon>
                                            </IonButton>
                                        </div>
                                    </IonButtons>
                                    <IonButtons slot='start'>
                                        <div className='search-content'>
                                            <IonSelect value="peperoni" placeholder="Proveedor" class='search2' multiple={true} interface='popover'>
                                                <IonSelectOption value=":peperoni}">Peperoni</IonSelectOption>
                                                <IonSelectOption value="hawaii">Hawaii</IonSelectOption>
                                            </IonSelect>
                                        </div>
                                    </IonButtons>
                                    <IonButtons slot='start'>
                                        <div className='search-content'>
                                            <IonSelect value="peperoni" placeholder="Enabled" class='search2' multiple={true} interface='popover'>
                                                <IonSelectOption value=":peperoni}">Peperoni</IonSelectOption>
                                                <IonSelectOption value="hawaii">Hawaii</IonSelectOption>
                                            </IonSelect>
                                        </div>
                                    </IonButtons>
                                </IonToolbar>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <Table columns={columns} data={Productos}></Table>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Productos;