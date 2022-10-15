import React from 'react'
import "./client.css"
import Header from 'component/header/Header'
import Footer from 'component/footer/Footer'
import FormDisplay from 'component/form-display/FormDisplay'


const Client = () => {
    return (
        <div className='operatePage page'>
            <Header></Header>
            <main>
                <FormDisplay></FormDisplay>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Client