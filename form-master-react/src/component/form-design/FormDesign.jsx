import FormItem from 'component/form-item/FormItem'
import React, { useState } from 'react'
import "./form-design.css"
import { FormItemDetail } from 'component/form-item/FormItem'
import axios from 'axios'
import CircularJSON from 'circular-json'

export class FormBody{
    constructor(){
        this.title=""
        this.category =[]
        this.rootField= new FormItemDetail(-1)
    }
}

const FormDesign = () => {

    const [formBody, setFormBody] = useState(new FormBody())

    const setAttribute = (attri) => {
        return (value) => {
            formBody[attri] = value
            refresh()
        }
    }
    const refresh = () => {
        let newBody = new FormBody()
        newBody.title = formBody.title
        newBody.rootField = formBody.rootField
        setFormBody(newBody)
    }
    
    const saveForm = async(e)=>{
        e.preventDefault()
        try{
            //todo: 保存模板
            let res =await axios.post("api/echo",{data:CircularJSON.stringify(formBody)})
            console.log(res.data)
        }catch (error){
            console.error(error)
        }
    }


    return (
        <div className='formDesign'>
            <form>
                <fieldset>
                    <label className='formTitle' htmlFor='formTitle'>
                        <input type="text" id='formTitle' placeholder='Input your form title here...' onChange={ (e)=>{ setAttribute("title")(e.target.value)}} required />
                    </label>
                    <FormItem action="CREATE"
                        formItem={formBody.rootField}
                        parentFormItem={formBody.rootField}
                        deleteCurrentSubField={() => { throw Error("Cannot delete the root field of the form.") }}
                        updateView={refresh} />
                </fieldset>
                <input type="submit" onClick = {saveForm}/>
            </form>
        </div>
    )
}

export default FormDesign
