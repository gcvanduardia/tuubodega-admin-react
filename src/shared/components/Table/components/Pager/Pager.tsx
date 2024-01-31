import React from 'react';
import './Pager.scss';
import { IonButton, IonIcon } from '@ionic/react';
import { chevronBack, chevronForward } from 'ionicons/icons';

interface PagerProps {
    page: number;
    pages: number;
    setPage: (page: number) => void;
}

const Pager: React.FC<PagerProps> = ({page, pages, setPage}) => {

    const handlePage = (operation: string) => {
        if (operation === 'back') {
            if (page > 1) {
                setPage(page - 1);
            }
        }
        if (operation === 'forward') {
            if (page < pages) {
                setPage(page + 1);
            }
        }
    }

    return (
        <div className='pager-position'>
            <div className='pager'>
                <IonButton fill='clear' size='small' shape='round' onClick={() => handlePage('back')}>
                    <IonIcon slot="icon-only" icon={chevronBack} size='large'></IonIcon>
                </IonButton>
                <div className='pager-text'>
                    {`página ${page} de ${pages}`}
                </div>
                <IonButton fill='clear' size='small' shape='round'onClick={() => handlePage('forward')}>
                    <IonIcon slot="icon-only" icon={chevronForward} size='large'></IonIcon>
                </IonButton>
            </div>
        </div>
    )
}

export default Pager;