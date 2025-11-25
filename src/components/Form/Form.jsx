import { use, useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';


const Form = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));  
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, []);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send data'
        });
    }, []);

    useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className="form">
            <h3>Please enter data</h3>
            <input type="text" placeholder={'Country'} value={country} onChange={onChangeCountry}/>
            <input type="text" placeholder={'City'} value={city} onChange={onChangeCity}/>
            <input type="text" placeholder={'Street'} value={street} onChange={onChangeStreet}/>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Natural person</option>
                <option value={'legal'}>Legal person</option>
            </select>
            <button>Submit</button>
        </div>
    )
};


export default Form;   