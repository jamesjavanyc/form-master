import CallBackButton from 'component/button/CallBackButton'
import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types';
import "./form-item.css"

let id = 0

export class FormItemDetail{
    constructor(id){
        this.formSerialId=id
        this.fieldName= ""
        this.fieldValue= null
        this.asTitle= false
        this.important= false
        this.required= false
        this.disabled= false
        this.subFields= []
    }
    configureWindow = function(){ return <></> }
}



//递归调用 实现组件在表单内复用
const FormItem = (props) => {
    // formItem 是当前的表单块所处的节点,FormItemDetail的实例 parentFormItem是父节点 
    const { action, formItem, parentFormItem, deleteCurrentSubField ,updateView} = props

    //利用闭包 进行数据更新
    const setFieldInfoAttributeAsValue = (attri) => {
        return (val) => {
            formItem[attri] = val;
            updateView()
        }
    }

    const setFieldInfoAttributeWithEvent = (attri) => {
        return (e) => {
            formItem[attri] = e.target.value;
            updateView()
        }
    }

    const setFieldInfoAttributeAsNegativeBool = (attri) => {
        return () => {
            formItem[attri] = !formItem[attri];
            updateView()
        }
    }

    //提供给子节点 让子节点自己删除自己
    const deleteSubField = (field) => {
        return () => {
            for(let i = 0; i < formItem.subFields.length; i ++) {
                if (formItem.subFields[i] === field) {
                    console.log(field)
                    formItem.subFields.splice(i, 1)
                    break
                }
            }
            updateView()
        }
    }

    useMemo(() => {
        switch (action) {
            case "CREATE":
                formItem.disabled = true
                formItem.configureWindow = () => {
                    if (typeof parentFormItem.title === "undefined") {
                        //不是根节点
                        return (<div>
                            <CallBackButton name={"As title"} callBack={setFieldInfoAttributeAsNegativeBool("asTitle")} />
                            <CallBackButton name={"Important"} callBack={setFieldInfoAttributeAsNegativeBool("important")} />
                            <CallBackButton name={"Required"} callBack={setFieldInfoAttributeAsNegativeBool("required")} />
                            <CallBackButton name={"Add subfields"} callBack={setFieldInfoAttributeAsValue("subFields")}
                                clickNotice={false}
                                paramAsCallBack={() => {
                                    formItem.subFields.push(new FormItemDetail(id++))
                                    return formItem.subFields
                                }} />
                            <CallBackButton name={"Delete"} clickNotice={false} callBack={() => {
                                deleteCurrentSubField(formItem)
                            }} />
                        </div>)
                    } else {
                        // 根节点
                        formItem.asTitle = true
                        return (
                            <div>
                                <CallBackButton name={"Add subfields"} callBack={setFieldInfoAttributeAsValue("subFields")}
                                    clickNotice={false}
                                    paramAsCallBack={() => {
                                        formItem.subFields.push(new FormItemDetail(id++))
                                        return formItem.subFields
                                    }} />
                            </div>
                        )
                    }
                }
                break;
            case "OPERATION":
                break;
            default:
                throw new Error("Not a supported action(FormItem)")
        }
    }, [action])

    const getLabel = ()=>{
        switch(action){
            case "CREATE":
                if (typeof parentFormItem.title === "undefined") {
                    return (<input type="text" placeholder={formItem.asTitle?"Input your fieldset title here":"Input your field name here"} onChange={setFieldInfoAttributeWithEvent("fieldName")} />)
                }else{
                    return (<React.Fragment/>)
                }
            case "OPERATE":
                let fullFieldName;
                if (formItem.important || formItem.required) {
                    fullFieldName = formItem.fieldName + " *"
                } else {
                    fullFieldName = formItem.fieldName
                }
                return(
                    <span>{fullFieldName}</span>
                )
            default:
                throw new Error("Not a supported action(FormItem)")
        }
    }


    return (
        <div className='formItem'>
            <label htmlFor={formItem.fieldName}>
                {getLabel()}
                {formItem.asTitle ? <></> : <input type="text" id={formItem.fieldName} disabled={formItem.disabled} required={formItem.required} onChange={setFieldInfoAttributeWithEvent("fieldValue")} />}
            </label>
            {formItem.configureWindow()}
            <div>{
                formItem.subFields.map((field) => {
                    return  <FormItem action={action} key={field.formSerialId} 
                                formItem={field} parentFormItem={formItem} 
                                deleteCurrentSubField={deleteSubField(field)} 
                                updateView={updateView}/>
                })
            }</div>
        </div>
    )
}

FormItem.defaultProps = {
    action: "CREATE",
}
FormItem.propTypes = {
    action: PropTypes.string.isRequired,
    formItem: PropTypes.object.isRequired,
    parentFormItem: PropTypes.object.isRequired,
    deleteCurrentSubField: PropTypes.func.isRequired,
    updateView: PropTypes.func.isRequired
}

export default FormItem