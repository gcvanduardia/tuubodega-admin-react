import React, { useEffect } from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import Table from "../../shared/components/Table/Table";
import useApi from '../../shared/services/api/api';
import './Operaciones.scss';

interface Transaction {
    IdTransaccion: string;
    Valor: number;
    Referencia: string;
    Moneda: string;
    MetodoPago: string;
    Estado: string;
    FechaEnvio: string;
    FechaCreacion: string;
}
interface Column {
    Header: string;
    accessor: keyof Transaction;
    Cell?: ({ value, row }: { value: any, row: { original: Transaction } }) => JSX.Element;
}

const Operaciones: React.FC = () => {

    const { apiReq } = useApi();
    const columns: Column[] = React.useMemo(
        () => [
            { Header: 'ID Transacción', accessor: 'IdTransaccion' },
            {
                Header: 'Valor',
                accessor: 'Valor' as keyof Transaction,
                Cell: ({ value }: { value: number }) => (
                    <div className='table-aling-right'>
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)}
                    </div>
                )
            },
            { Header: 'Referencia', accessor: 'Referencia' },
            { Header: 'Moneda', accessor: 'Moneda' },
            { Header: 'Metodo de Pago', accessor: 'MetodoPago' },
            { Header: 'Estado', accessor: 'Estado' },
            {
                Header: 'Fecha de Envío',
                accessor: 'FechaEnvio',
                Cell: ({ value }: { value: string }) => (
                    <div>
                        {Date.parse(value) ? new Date(value).toLocaleDateString() : value}
                    </div>
                )
            },
            {
                Header: 'Fecha de Creación',
                accessor: 'FechaCreacion',
                Cell: ({ value }: { value: string }) => (
                    <div>
                        {Date.parse(value) ? new Date(value).toLocaleDateString() : value}
                    </div>
                )
            }
        ], []
    );
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        apiReq('GET', `payments/records`)
            .then((response: any) => {
                if (response) {
                    const data = (Array.isArray(response.data) && response.data?.length) ? response.data : [];
                    setTransactions(data);
                }
            })
            .catch((error: any) => {
                console.error('Error al obtener las transacciones', error);
            });
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid fixed>
                    <IonRow>
                        <IonCol size="12">
                            <Table columns={columns} data={transactions}></Table>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default Operaciones;