import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import './Productos.scss';

import { get } from "../../shared/services/api/api";
import Table from "../../shared/components/Table/Table";
import Pager from "../../shared/components/Table/components/Pager/Pager";
import HeaderSearch from "./components/HeaderSearch/HeaderSearch";

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

    const [productos, setProductos] = useState([]);
    const [results, setResults] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getProductos();
    }, []);

    useEffect(() => {
        console.log("Productos from Productos.tsx: ", Productos);
        console.log("Results from Productos.tsx: ", results);
        console.log("pageSize from Productos.tsx: ", pageSize);
        console.log("Pages from Productos.tsx: ", pages);
    }, [Productos]);


    const getProductos = async (params: string = '') => {
        const response = await get(`articulos/search-admin${params}`);
        if (response) {
            setProductos(response[0]);
            console.log("*****response[1]: ", response[1]);
            if (response[1] === undefined) return;
            setResults(response[1][0].Resultados);
            setPageSize(response[1][0].PageZise);
            setPages(Math.ceil(response[1][0].Resultados / response[1][0].PageZise));
        }
    }

    const handleSearch = (searchStr: string, pageNumber: number = 1) => {
        setSearch(searchStr);
        console.log("searchStr desde Productos.tsx: ", searchStr);
        setPage(1);
        getProductos(`?search=${searchStr}&pageNumber=${pageNumber}`);
    };

    const handlePage = (page: number) => {
        console.log("handlePage: ", page);
        setPage(page);
        getProductos(`?search=${search}&pageNumber=${page}`);
    };

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
                Header: () => (<div>Enable<br/><div className='header-enable'>(Prod-Cat-Prov)</div></div>),
                accessor: 'ArticuloEn' as keyof Producto,
                Cell: ({ row: { original } }: { row: { original: Producto } }) => (
                    <div className='table-aling-center'>
                        {original.ArticuloEn ? 'Si' : 'No'}-{original.CategoriaEn ? 'Si' : 'No'}-{original.ProveedorEn ? 'Si' : 'No'}
                    </div>
                )
            }
        ],
        []
    );

    return (
        <IonPage>
            <HeaderSearch onSearch={handleSearch} />
            <IonContent fullscreen>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <IonText className='text-productos'>{results} productos</IonText>
                            <Table columns={columns} data={productos}></Table>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <Pager page={page} pages={pages} setPage={handlePage}/>
            {/* <div className='pager-position'>
                <div className='pager'>
                    <IonButton fill='clear' size='small' shape='round'>
                        <IonIcon slot="icon-only" icon={chevronBack} size='large'></IonIcon>
                    </IonButton>
                    <div className='pager-text'> 
                    {`página ${page} de ${pages}`}
                    </div>
                    <IonButton fill='clear' size='small' shape='round'>
                        <IonIcon slot="icon-only" icon={chevronForward} size='large'></IonIcon>
                    </IonButton>
                </div>
            </div> */}
        </IonPage>
    );
}

export default Productos;