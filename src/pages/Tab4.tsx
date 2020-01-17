import React, {useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    useIonViewWillEnter
} from '@ionic/react';
import './Tab4.css';

interface Response {
    user: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    location: string;
    message: string;
    received_datetime: string;
    message_id: string;
}


const Tab4Page: React.FC = () => {

    const [data, setData] = useState<Response[]>([]);

    useIonViewWillEnter(async () => {
        const result = await fetch("https://cors-anywhere.herokuapp.com/http://139.99.124.43:3000/monitoring/get_responses")

        const fetchData = await result.json();
        setData(fetchData)
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>DRR Mobile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList lines="none">
                    {data.map((response, idx) => <ResponseItem key={idx} response={response}/>)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

const ResponseItem: React.FC<{ response: Response }> = ({response}) => {
    return (
        <IonCard>
            <IonCardHeader className="messageCardHeader">
                <IonCardTitle><h5>{response.location}</h5></IonCardTitle>
                <IonCardSubtitle>{response.first_name} {response.last_name} | {response.contact_number}</IonCardSubtitle>
                <IonCardSubtitle>{response.received_datetime}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="messageCardContent">
                {response.message}
            </IonCardContent>
        </IonCard>
    );
}

export default Tab4Page;
