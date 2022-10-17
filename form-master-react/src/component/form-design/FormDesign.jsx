import FormItem from 'component/form-item/FormItem'
import React,{useState} from 'react'
import "./form-design.css"

const FormDesign = () => {
const [formBody, setFormBody] = useState({
    title:"",
    subFields:[]
})

const addInput = (e)=>{
    e.preventDefault()
    formBody.subFields.push({
        fieldName: "",
        fieldValue:null,
        asTitle: false,
        important: false,
        required: false,
        disabled: false,
        label: null,
        subFields: [],
        configureWindow: () => { return <></> }
    });
    setFormBody({...formBody})
}

    return (
        <div className='formDesign'>
            <form>
                <fieldset>
                    <legend>Add form</legend>
                    <label htmlFor='formTitle'><input type="text" id='formTitle' placeholder='Input your form title here...' required/></label>
                    <button onClick={addInput}>Add Form Modules</button>
                    <div>
                        {formBody.subFields.map((item, key)=>{
                            let node = <FormItem action="CREATE" key={key} formItem={item} parentFormInfo={formBody} setParentFormInfo={setFormBody} />
                            key++;
                            return node;
                        })}
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default FormDesign