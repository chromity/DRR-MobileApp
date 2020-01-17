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
import './Tab2.css';

interface Tweet {
    user: string;
    tweet_id: string;
    tweet_created_at: string;
    tweet_text: string;
    tweet_media_url: string;
    tweet_favorite_count: string;
    tweet_retweet_count: string;
    hazard: string;
}


const Tab2Page: React.FC = () => {

    const [data, setData] = useState<Tweet[]>([]);

    useIonViewWillEnter(async () => {
        const result = await fetch("https://cors-anywhere.herokuapp.com/http://139.99.124.43:3000/monitoring/get_tweets")

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
                    {data.map((tweet, idx) => <TweetItem key={idx} tweet={tweet}/>)}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

const TweetItem: React.FC<{ tweet: Tweet }> = ({tweet}) => {
    return (
        <IonCard className="tweetCard">
            <img src={tweet.tweet_media_url}/>

            <IonCardHeader className="tweetCardHeader">
                <IonCardSubtitle>{tweet.tweet_created_at} | {tweet.user}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="tweetCardContent">
                {tweet.tweet_text}
            </IonCardContent>
        </IonCard>
    );
}

export default Tab2Page;
