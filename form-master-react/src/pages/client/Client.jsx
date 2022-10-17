import React from 'react'
import "./client.css"
import Header from 'component/header/Header'
import Footer from 'component/footer/Footer'
import FormDisplay from 'component/form-display/FormDisplay'
import FormDesign from 'component/form-design/FormDesign'


const Client = () => {
    return (
        <div className='operatePage page'>
            <Header></Header>
            <main>
                {/* <FormDisplay></FormDisplay> */}
                <FormDesign></FormDesign>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Client