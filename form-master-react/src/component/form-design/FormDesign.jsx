import FormItem from 'component/form-item/FormItem'
import React, { useState } from 'react'
import "./form-design.css"
import { FormItemDetail } from 'component/form-item/FormItem'
import axios from 'axios'
import CircularJSON from 'circular-json'


const FormDesign = () => {
    const [formBody, setFormBody] = useState({
        title: "",
        rootField: new FormItemDetail()
    })

    const setAttributeWithEvent = (attri) => {
        return (e) => {
            formBody[attri] = e.target.value
            setFormBody({ ...formBody })
        }
    }
    const refresh = () => {
        setFormBody({ ...formBody })
    }
    const test = async(e)=>{
        e.preventDefault()
        try{
            let res =await axios.post("http://localhost:5000/echo",{data:CircularJSON.stringify(formBody)})
            console.log(res.data)
        }catch (e){
            console.error(e)
        }
    }


    return (
        <div className='formDesign'>
            <form>
                <fieldset>
                    <legend>Add form</legend>
                    <label htmlFor='formTitle'>
                        <input type="text" id='formTitle' placeholder='Input your form title here...' onChange={setAttributeWithEvent("title")} required />
                    </label>
                    <FormItem action="CREATE"
                        formItem={formBody.rootField}
                        parentFormItem={formBody}
                        deleteCurrentSubField={() => { throw Error("Cannot delete the root field of the form.") }}
                        updateView={refresh} />
                </fieldset>
                <input type="submit" onClick = {test}/>
            </form>
        </div>
    )
}

export default FormDesign

        // {
        //             fieldName: "",
        //             fieldValue:null,
        //             asTitle: false,
        //             important: false,
        //             required: false,
        //             disabled: false,
        //             label: null,
        //             subFields: [],
        //             configureWindow: () => { return <></> }
        //         }