import { useEffect, useState } from 'react';
import configCatClient from '../utils/ConfigCatClient';


export default function MessageBar() {

    const [message, setMessage] = useState("")


    useEffect(() => {

        configCatClient.getValueAsync("messageForUsers", false, { identifier: "nabil" }).then(d => {
            setMessage(d)
        })

    }, [])

    return (
        <div>
            {message}
        </div>
    )
}