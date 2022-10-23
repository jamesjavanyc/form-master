import CallBackButton from 'component/button/CallBackButton'
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import "./form-item.css"
import CallBackSelect from 'component/select/CallBackSelect';

let id = 0

export class FormItemDetail {
    constructor(id) {
        this.formSerialId = id
        this.asModule = false
        this.title = ""
        this.fieldValue = null
        this.defaultValue = ""
        this.inputType = "text"
        this.important = false
        this.required = false
        this.subFields = []
        this.subFieldsDisplay = "Horizontal left"
    }
    static clone(obj) {
        let cloned;
        if (!obj || obj === null) {
            throw new Error("FormItemDetail clone must have an object")
        } else {
            cloned = new FormItemDetail()
            for (let [key, value] of Object.entries(obj)) {
                cloned[key] = value;
            }

        }
        return cloned;
    }
    configureWindow = function () { return <></> }
}

//递归调用 实现组件在表单内复用
const FormItem = (props) => {
    // formItem 是当前的表单块所处的节点,FormItemDetail的实例 parentFormItem是父节点 
    const { action, formItem, parentFormItem, deleteCurrentSubField, updateView } = props

    const [display, setDisplay] = useState({
        showConfigWindow: false,
    })

    const setFieldInfoAttribute = (attri) => {
        return (val) => {
            formItem[attri] = val;
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
            for (let i = 0; i < formItem.subFields.length; i++) {
                if (formItem.subFields[i] === field) {
                    formItem.subFields.splice(i, 1)
                    break
                }
            }
            updateView()
        }
    }


    useMemo(() => {
        switch (action) {
            case "MODIFY":
            // 以后加载现有模板 并且进行更新
            /* falls through */
            case "CREATE":
                break;
            case "OPERATION":
                break;
            default:
                throw new Error("Not a supported action(FormItem)")
        }
    }, [action])

    const getConfigureWindow = () => {
        if (action === "CREATE" || action === "MODIFY") {
            if (parentFormItem !== formItem) {
                //不是根节点
                return (
                    <>
                        <img src="./icons/setting.png" style={{ display: display.showConfigWindow ? "none" : "inline-block" }} alt="setting" className='fieldItemSetting'
                            onClick={() => {
                                setDisplay(display => ({ ...display, showConfigWindow: !display.showConfigWindow }))
                            }} />
                        <div className='formFieldConfigWindow' style={{ display: display.showConfigWindow ? "flex" : "none" }}>
                            <CallBackButton name={() => { return formItem.asModule ? "As field" : "As Module" }} callBack={setFieldInfoAttributeAsNegativeBool("asModule")} clickNotice={false} />
                            {formItem.asModule ?
                                <></> :
                                <>
                                    <CallBackButton name={() => { return "Important" }} callBack={setFieldInfoAttributeAsNegativeBool("important")} />
                                    <CallBackButton name={() => { return "Required" }} callBack={setFieldInfoAttributeAsNegativeBool("required")} />
                                </>}
                            <CallBackButton name={() => { return "Add subfields" }} callBack={setFieldInfoAttribute("subFields")}
                                clickNotice={false}
                                paramAsCallBack={() => {
                                    formItem.subFields.push(new FormItemDetail(id++))
                                    return formItem.subFields
                                }} />
                            <CallBackButton name={() => { return "Delete" }} clickNotice={false} callBack={() => {
                                deleteCurrentSubField(formItem)
                            }} />
                            <CallBackSelect name={() => { return "Display" }}
                                options={[1, 2, 3]}></CallBackSelect>
                            <CallBackButton name={() => { return "Save as module template" }} callBack={()=>{
                                // TODO： 保存模板
                            }}
                                clickNotice={false} />
                            <CallBackButton name={() => { return "Close" }} callBack={() => {
                                setDisplay(display => ({ ...display, showConfigWindow: !display.showConfigWindow }))
                            }}
                                clickNotice={false} style={{backgroundColor:"rgb(140,140,140)", borderRadius:"5px", width: "80px", margin: "0 auto", padding: "5px 15px", fontWeight: "bold" }} />
                        </div>
                    </>)
            } else {
                // 根节点
                formItem.asModule = true
                formItem.fieldName = "ROOT NODE"
                formItem.subFieldsDisplay = "Vertical left"
                return (<>
                    <div className='formRootConfigWindow'>
                        <CallBackButton name={() => { return "Add Modules" }} callBack={setFieldInfoAttribute("subFields")}
                            clickNotice={false}
                            paramAsCallBack={() => {
                                let module = new FormItemDetail(id++)
                                module.asModule = true
                                formItem.subFields.push(module)
                                return formItem.subFields
                            }} />
                        <CallBackSelect name={() => { return "Display" }} selectTagStyle={{ width: "120px", height: "1.7rem", textAlign: "center" }}
                            options={[1, 2, 3]}></CallBackSelect>
                    </div>
                </>)
            }
        } else {
            return <></>
        }
    }


    const getLabel = () => {
        switch (action) {
            case "MODIFY":
            case "CREATE":
                if (parentFormItem !== formItem) {
                    return (<input type="text" placeholder={formItem.asModule ? "Input your module name here" : "Input your field name here"} onChange={(e) => { setFieldInfoAttribute("fieldName")(e.target.value) }} />)
                } else {
                    return (<React.Fragment />)
                }
            case "OPERATE":
                let fullFieldName;
                if (formItem.important || formItem.required) {
                    fullFieldName = formItem.fieldName + " *"
                } else {
                    fullFieldName = formItem.fieldName
                }
                return (
                    <span>{fullFieldName}</span>
                )
            default:
                throw new Error("Not a supported action(FormItem)")
        }
    }

    const getSubFieldsContainerClassName = () => {
        switch (formItem.subFieldsDisplay) {
            case "Horizontal right":
                return "formSubItemHorizontalReverseDisplay"
            case "Horizontal left":
                return "formSubItemHorizontalDisplay"
            case "Vertical right":
                return "formSubItemVerticalReverseDisplay"
            case "Vertical left":
                return "formSubItemVerticalDisplay"
            default:
                return "formSubItemDefault"
        }

    }

    const getFieldInput = () => {
        switch (action) {
            case "MODIFY":
            /* falls through */
            case "CREATE":
                if (formItem.asModule) {
                    return (<></>)
                } else {
                    return (<input type={formItem.inputType} id={formItem.fieldName} placeholder="Input default value..." required={formItem.required}
                        onChange={(e) => { setFieldInfoAttribute("defaultValue")(e.target.value) }} />)
                }
            case "OPERATE":
                return (<input type={formItem.inputType} id={formItem.fieldName} defaultValue={formItem.defaultValue} required={formItem.required}
                    onChange={(e) => { setFieldInfoAttribute("fieldValue")(e.target.value) }} />)
            default:
                throw new Error("Not a supported action(FormItem)")
        }
    }
    const getLabelStyle = ()=>{
        let style = {paddingBottom:"1rem"}
        if(formItem.asModule){
            style.borderBottom = "1px solid black"
        }else{
            style.borderBottom = "none"
        }
        return style
    }

    return (
        <div className={parentFormItem !== formItem?"rootFormItem":"formItem"} >
            <label className='formItemLabel' htmlFor={formItem.fieldName} style={getLabelStyle()}>
                {getLabel()}
                {getFieldInput()}
                {getConfigureWindow()}
            </label>
            <div className={getSubFieldsContainerClassName()}>{
                formItem.subFields.map((field) => {
                    return <FormItem action={action} key={field.formSerialId}
                        formItem={field} parentFormItem={formItem}
                        deleteCurrentSubField={deleteSubField(field)}
                        updateView={updateView} />
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
    formItem: PropTypes.instanceOf(FormItemDetail).isRequired,
    parentFormItem: PropTypes.instanceOf(FormItemDetail).isRequired,
    deleteCurrentSubField: PropTypes.func.isRequired,
    updateView: PropTypes.func.isRequired
}

export default FormItem