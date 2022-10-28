import React, { useContext, useEffect, useState } from 'react'
import "./form-operation.css"
import Header from 'component/header/Header'
import { AuthContext } from 'context/authentication/auth-context'
import FormDisplay from 'component/form-display/FormDisplay'
import { useNavigate } from 'react-router-dom';


const FormOperation = () => {

    const [currentForm, setCurrentForm] = useState({
        form: null
    })

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const PubSub = require('pubsub-js')
        let channel = PubSub.subscribe('form-operation', (msg, data) => {
            let form;
            if (msg === "update-form") {
                //todo: data.id 获取当前正在使用的已经填写好的form 并且setCurrentForm
                setCurrentForm(form)
            } else if (msg === "new-form") {
                //todo: 获取form模板并且渲染
                setCurrentForm(form)
            }
        });
        return () => {
            PubSub.unsubscribe(channel)
        }
    }, [])


    return (

        <div className='operatePage page'>
            <Header></Header>
            <main>
                <FormDisplay></FormDisplay>
            </main>
        </div>
    )
}

export default FormOperation