import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonList, IonItem, IonThumbnail, IonText } from '@ionic/react';
import './Productos.scss';

import { get } from "../../shared/services/api/api";
import { useTable } from 'react-table';

interface Producto {
    ImagenPrin: string;
    Nombre: string;
    Proveedor: string;
    PrecioUnit: string;
    ArticuloEn: boolean;
    CategoriaEn: boolean;
    ProveedorEn: boolean;
}

interface Column {
    Header: any;
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

    const columns: Column[] = React.useMemo(
        () => [
            {
                Header: 'Imagen',
                accessor: 'ImagenPrin' as keyof Producto,
                Cell: ({ value }: { value: string }) => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={value} style={{ width: '50px', height: '50px' }} />
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
                    <div style={{ textAlign: 'right' }}>
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)}
                    </div>
                )
            },
            {
                Header: () => (<div style={{ lineHeight: '1em', height: '2em', overflow: 'hidden', minWidth: '120px' }}>Enable<br />(Prod-Cat-Prov)</div>),
                accessor: 'ArticuloEn' as keyof Producto,
                Cell: ({ row: { original } }: { row: { original: Producto } }) => (
                    <div>
                        {original.ArticuloEn ? 'Si' : 'No'}-{original.CategoriaEn ? 'Si' : 'No'}-{original.ProveedorEn ? 'Si' : 'No'}
                    </div>
                )
            }
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<Producto>({ columns, data: Productos })

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <div style={{ overflowX: 'auto', scrollbarWidth: 'thin' }}>
                                <table {...getTableProps()}>
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map(row => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => (
                                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                    ))}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Productos;