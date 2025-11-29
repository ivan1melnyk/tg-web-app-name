import { use, useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';


const Form = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [house_number, setHouseNumber] = useState('');

    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            first_name,
            last_name,
            phone_number,
            country,
            city,
            street,
            house_number,
            subject
        }
        tg.sendData(JSON.stringify(data));  
    }, [first_name, last_name, phone_number, country, city, street, house_number, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData]);

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

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }  

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    }

    const onChangeHouseNumber = (e) => {
        setHouseNumber(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className="form">
            <h2> Regisstration Form</h2>
            <h3>Please enter receiver info</h3>
            <input type="text" placeholder={'first name'} value={first_name} onChange={onChangeFirstName}/>
            <input type="text" placeholder={'last name'} value={last_name} onChange={onChangeLastName}/>
            <input type="text" placeholder={'phone number'} value={phone_number} onChange={onChangePhoneNumber}/>
            <h3>Please enter your adress info</h3>
            <input type="text" placeholder={'Country'} value={country} onChange={onChangeCountry}/>
            <input type="text" placeholder={'City'} value={city} onChange={onChangeCity}/>
            <input type="text" placeholder={'Street'} value={street} onChange={onChangeStreet}/>
            <input type="text" placeholder={'apartment number, floor, etc'} value={house_number} onChange={onChangeHouseNumber}/>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Natural person</option>
                <option value={'legal'}>Legal person</option>
            </select>
            <button>Submit</button>
        </div>
    )
};


export default Form;   