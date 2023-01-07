import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router';
import { API_STATUS } from '../../config/common';
import { ViewerGetPresentation } from '../../service/PersentationService';
import Error from '../Error/Error';
import PageLoading from '../PageLoading/PageLoading';
import ViewerScreen from './ViewerScreen';
import { SOCKET_TYPE, SOCKET_URL } from "../../config";
import io from "socket.io-client";
import { useToast } from "../../hook/useToast";

const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
});

const JoiningPage = () => {
    const [loading, setLoading] = useState(true);
    const [validUrl, setValidUrl] = useState(false);
    const [presentation, setPresentation] = useState(false);
    const param = useParams();
    
    const toast = useToast();

    const handelChangePresentation = (data) => {
        console.log(data);
        const pre = data.presentation || [];
        setPresentation(pre);
        // toast.info("Người chủ trì đã thay đổi nội dung")

    }

    useEffect(() => {
        try {
            socket.connect();

            socket.on(SOCKET_TYPE.CHANGE_PRESENTATION, handelChangePresentation);
        } catch (error) {
            console.log(error);
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const verifyJoinLink = async () => {
            try {
                const res = await ViewerGetPresentation({
                    inviteCode: param.shareCode
                })
                // console.log(res);
                if (res.status === API_STATUS.OK) {
                    setLoading(false);
                    setValidUrl(true);
                    setPresentation(res.data[0]);
                }
                else{
                    setLoading(false);
                    setValidUrl(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                setValidUrl(false);
            }
        };
        verifyJoinLink();
    }, [param]);

    if(loading){
        return <PageLoading></PageLoading>
    }

    if(!validUrl){
        return <Error></Error>
    }

    return (
        <ViewerScreen presentation={presentation}></ViewerScreen>
    )
}

export default JoiningPage