import CallBackButton from 'component/button/CallBackButton'
import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import "./form-item.css"

const FormItem = (props) => {
    // formItem 是当前的表单块所处的节点 parentFormInfo是父结点， 
    const { action, formItem, parentFormInfo, setParentFormInfo } = props
    const [fieldInfo, setfieldInfo] = useState(formItem)

    const setFieldInfoAttributeAsValue = (attri) => {
        return (val) => {
            fieldInfo[attri] = val;
            console.log(fieldInfo)
            setfieldInfo({ ...fieldInfo })
        }
    }

    const setFieldInfoAttributeWithEvent = (attri) => {
        return (e) => {
            fieldInfo[attri] = e.target.value;
            console.log(fieldInfo)
            setfieldInfo({ ...fieldInfo })
        }
    }

    const setFieldInfoAttributeAsNegativeBool = (attri) => {
        return () => {
            fieldInfo[attri] = !fieldInfo[attri];
            console.log(fieldInfo)
            setfieldInfo({ ...fieldInfo })
        }
    }

    useEffect(() => {
        switch (action) {
            case "CREATE":
                fieldInfo.disabled = true
                fieldInfo.label = (
                    <input type="text" placeholder="input your field name here" onChange={setFieldInfoAttributeWithEvent("fieldName")}/>
                )
                fieldInfo.configureWindow = () => {
                    return (<div>
                        <CallBackButton name={"As title"} callBack={setFieldInfoAttributeAsNegativeBool("asTitle")} />
                        <CallBackButton name={"Important"} callBack={setFieldInfoAttributeAsNegativeBool("important")} />
                        <CallBackButton name={"Required"} callBack={setFieldInfoAttributeAsNegativeBool("required")} />
                        <CallBackButton name={"Add subfields"} callBack={setFieldInfoAttributeAsValue("subFields")}
                            clickNotice={false}
                            paramAsCallBack={() => {
                                fieldInfo.subFields.push({
                                    fieldName: "",
                                    fieldValue:null,
                                    asTitle: false,
                                    important: false,
                                    required: false,
                                    disabled: false,
                                    label: null,
                                    subFields: [],
                                    configureWindow: () => { return <></> }
                                })
                                return fieldInfo.subFields
                            }} />
                        <CallBackButton name={"Delete"} callBack={()=>{
                                parentFormInfo.subFields.forEach((item, i )=>{
                                    if(item === formItem){
                                        parentFormInfo.subFields.splice(i, 1);
                                    }
                                })
                                setParentFormInfo({...parentFormInfo})
                            }} />
                    </div>)
                }
                setfieldInfo({ ...fieldInfo })
                break;
            case "OPERATION":
                let fullFieldName;
                if (fieldInfo.important || fieldInfo.required) {
                    fullFieldName = fieldInfo.fieldName + " *"
                } else {
                    fullFieldName = fieldInfo.fieldName
                }
                fieldInfo.label = (
                    <span>{fullFieldName}</span>
                )
                setfieldInfo({ ...fieldInfo })
                break;
            default:
                throw new Error("Not a supported action(FormItem)")
        }
    }, [action])


    return (
        <div className='formItem'>
            <label htmlFor={fieldInfo.fieldName}>{fieldInfo.label}
                {fieldInfo.asTitle ? <></> : <input type="text" id={fieldInfo.fieldName} disabled={fieldInfo.disabled} required={fieldInfo.required} onChange={setFieldInfoAttributeWithEvent("fieldValue")}/>}
            </label>
            {fieldInfo.configureWindow()}
            <div>{
                fieldInfo.subFields.map((item, key) => {
                    let node = <FormItem action="CREATE" fieldName={key} key={key} formItem={item} parentFormInfo={fieldInfo} setParentFormInfo={setfieldInfo}></FormItem>
                    key++;
                    return node;
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
    parentFormInfo: PropTypes.object.isRequired,
    setParentFormInfo: PropTypes.func.isRequired
}

export default FormItem