import FormItem from 'component/form-item/FormItem'
import React, { useState } from 'react'
import "./form-design.css"
import { FormItemDetail } from 'component/form-item/FormItem'
import CircularJSON from 'circular-json'
import axiosService from 'axios-config'

export class FormBody {
    constructor() {
        this.title = ""
        this.category = []
        this.rootField = new FormItemDetail(-1)
    }
}

const FormDesign = () => {

    const [formBody, setFormBody] = useState(new FormBody())

    const [display, setDisplay] = useState({
        showCategorySelect: false
    })

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

    const getFormCategory = () => {
        // TODO 获取表单分类
        return ["tax", "internet", "telnet"]
    }

    const saveForm = async (e) => {
        e.preventDefault()
        // console.log(formBody)
        // return
        try {
            //todo: 保存模板
            let res = await axiosService.post("api/echo", { data: CircularJSON.stringify(formBody) })
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const getCategoryDisplay = () => {
        let str = ""
        formBody.category.forEach(cate => {
            str = str + cate + " "
        })
        return str === "" ? "No category" : str
    }
    const categorySwitch = (e) => {
        e.preventDefault()
        setDisplay({ ...display, showCategorySelect: !display.showCategorySelect })
    }

    const categoryHandler = (e) => {
        if (e.target.checked) {
            if (formBody.category.indexOf(e.target.value) === -1) {
                formBody.category.push(e.target.value)
            }
        } else {
            if (formBody.category.indexOf(e.target.value) !== -1) {
                formBody.category.splice(formBody.category.indexOf(e.target.value), 1)
            }
        }
    }


    return (
        <div className='form formDesign'>
            <form>
                <fieldset>
                    <label className='formTitle' htmlFor='formTitle'>
                        <input type="text" id='formTitle' placeholder='Input your form title here...' onChange={(e) => { setAttribute("title")(e.target.value) }} required />
                    </label>
                    <div className='formCategoryCtn'>
                        <p onClick={()=>{setDisplay({...display, showCategorySelect:true})}} style={{ textAlign: "center", margin: "0.7rem auto", textDecoration:"underline" }}>
                            {"Select form category : " + getCategoryDisplay()}</p>
                        <div className='designFormOperationBtn' style={{ margin: "0.7rem auto 0.4rem" }}>
                            {display.showCategorySelect ? <button className='formDesignSelectCategory'
                                onClick={categorySwitch}
                            >{display.showCategorySelect ? "Close" : "Select form category"}</button> : <></>
                            }
                        </div>
                    </div>
                    <ul className='categoryFormDesignCheckBoxCtn' style={{ display: display.showCategorySelect ? "flex" : "none" }}>
                        {getFormCategory().map((category, key) => {
                            return (
                                <li key={key}>
                                    < label htmlFor='formCatalogSelect'>
                                        <input type="checkbox" value={category} onChange={categoryHandler} />
                                        {category}
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                    <FormItem isRoot={true}
                        formItem={formBody.rootField}
                        parentFormItem={formBody.rootField}
                        deleteCurrentSubField={() => { throw Error("Cannot delete the root field of the form.") }}
                        updateView={refresh} />
                </fieldset>
                <div className='designFormOperationBtn'>
                    <input type="submit" value="Save Form" onClick={saveForm} />
                </div>
            </form>
        </div >
    )
}

export default FormDesign
