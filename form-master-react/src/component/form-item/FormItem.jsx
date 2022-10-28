import CallBackButton from 'component/button/CallBackButton'
import React, { useState } from 'react'
import CallBackSelect from 'component/select/CallBackSelect';
import PropTypes from 'prop-types';
import "./form-item.css"

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
        this.subFieldsDisplay = "Vertical"
        this.notes = ""
        this.asIndex = false
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
}

//递归调用 实现组件在表单内复用
const FormItem = (props) => {
    // formItem 是当前的表单块所处的节点,FormItemDetail的实例 parentFormItem是父节点 
    const { formItem, parentFormItem, deleteCurrentSubField, updateView, isRoot, itemStyle } = props

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


    const getConfigureWindow = () => {
        if (!isRoot) {
            //不是根节点
            return (
                <>
                    <div className='formFieldConfigWindow' style={{ display: display.showConfigWindow ? "flex" : "none" }}>
                        <CallBackButton name={() => { return formItem.asModule ? "As field" : "As Module" }} callBack={setFieldInfoAttributeAsNegativeBool("asModule")} clickNotice={false} />
                        {formItem.asModule ?
                            <></> :
                            <>
                                <CallBackButton name={() => { return "Important" }} callBack={setFieldInfoAttributeAsNegativeBool("important")} />
                                <CallBackButton name={() => { return "Required" }} callBack={setFieldInfoAttributeAsNegativeBool("required")} />
                                <CallBackButton name={() => { return "Index" }} callBack={setFieldInfoAttributeAsNegativeBool("asIndex")} />
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
                        {/* <CallBackSelect name={() => { return "Display" }}
                                options={[1, 2, 3]}></CallBackSelect> */}
                        <CallBackButton name={() => { return "To " + (formItem.subFieldsDisplay === "Horizontal" ? "Vertical" : "Horizontal") }}
                            clickNotice={false}
                            callBack={() => {
                                if (formItem.subFieldsDisplay === "Horizontal") {
                                    formItem.subFieldsDisplay = "Vertical"
                                } else {
                                    formItem.subFieldsDisplay = "Horizontal"
                                }
                                updateView()
                            }} />
                        <CallBackButton name={() => { return "Save as module template" }} callBack={() => {
                            // TODO： 保存模板
                        }}
                            clickNotice={false} />
                        {formItem.asModule?<></>:<CallBackSelect name={() => { return "Type" }} selectTagStyle={{ width: "100%", height: "1.7rem", textAlign: "center" }}
                            options={["text","select"]}
                            onSelectCallBack={(e)=>{
                                formItem.inputType = e.target.value
                                updateView()
                                console.log(formItem)
                            }}
                            />}
                        <CallBackButton name={() => { return "Close" }} callBack={() => {
                            setDisplay(display => ({ ...display, showConfigWindow: !display.showConfigWindow }))
                        }}
                            clickNotice={false} style={{ backgroundColor: "rgb(140,140,140)", borderRadius: "5px", width: "80px", margin: "0 auto", padding: "5px 15px", fontWeight: "bold" }} />
                    </div>
                </>)
        } else {
            // 根节点
            formItem.asModule = true
            formItem.fieldName = "ROOT NODE"
            formItem.subFieldsDisplay = "Vertical"
            return (
                <>
                    <div className='formRootConfigWindow'>
                        <CallBackButton name={() => { return "Add Modules" }} callBack={setFieldInfoAttribute("subFields")}
                            clickNotice={false}
                            paramAsCallBack={() => {
                                let module = new FormItemDetail(id++)
                                module.asModule = true
                                formItem.subFields.push(module)
                                return formItem.subFields
                            }} />
                        <CallBackButton name={() => { return "To " + (formItem.subFieldsDisplay === "Horizontal" ? "Vertical" : "Horizontal") }}
                            clickNotice={false}
                            callBack={() => {
                                if (formItem.subFieldsDisplay === "Horizontal") {
                                    formItem.subFieldsDisplay = "Vertical"
                                } else {
                                    formItem.subFieldsDisplay = "Horizontal"
                                }
                                updateView()
                            }} />
                    </div>
                </>)
        }
    }



    const getLabelStyle = () => {
        if (isRoot) {
            return {}
        }
        let style = { marginTop: "5px" }
        if (formItem.asModule) {
            if (formItem.subFieldsDisplay === "Vertical") {
                style = {
                    ...style,
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid black",
                    width: "100%"
                }
            } else if (formItem.subFieldsDisplay === "Horizontal") {
                style = {
                    ...style,
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid black",
                }
            }
        } else {
            style = { ...style, borderBottom: "none" }
        }
        return style
    }


    return (
        <div className={isRoot ? "rootFormItem" : "formItem"} style={itemStyle} >
            <label className='formItemLabel' htmlFor={formItem.fieldName} style={getLabelStyle()}>
                {isRoot ? <></> :
                    <input type="text" placeholder={formItem.asModule ? "Input your module name here" : "Input your field name here"} onCompositionEnd={(e) => { setFieldInfoAttribute("fieldName")(e.target.value) }} />}
                {formItem.asModule ?
                    <></> :
                    <input type={formItem.inputType} id={formItem.fieldName}
                        placeholder={formItem.inputType === "text" ? "Input default value..." : "eg. : Male&Female"} required={formItem.required}
                        onCompositionEnd={(e) => { setFieldInfoAttribute("defaultValue")(e.target.value) }} />
                }
                {isRoot ? <></> :
                    <img src={display.showConfigWindow ? "./icons/close.png" : "./icons/setting.png"}
                        // style={{ display: display.showConfigWindow ? "none" : "inline-block" }} 
                        alt="setting" className='fieldItemSetting'
                        onClick={() => {
                            setDisplay({ ...display, showConfigWindow: !display.showConfigWindow })
                        }} />}
            </label>
            {getConfigureWindow()}
            <ul className='subFieldList' style={{
                flexDirection: formItem.subFieldsDisplay === "Vertical" ? "column" : "row"
            }}>{
                    formItem.subFields.map((field) => {
                        return <li key={field.formSerialId}>
                            <FormItem
                                formItem={field} parentFormItem={formItem}
                                deleteCurrentSubField={deleteSubField(field)}
                                updateView={updateView} />
                        </li>
                    })
                }</ul>
        </div>
    )
}

FormItem.defaultProps = {
    isRoot: false
}
FormItem.propTypes = {
    isRoot: PropTypes.bool,
    formItem: PropTypes.instanceOf(FormItemDetail).isRequired,
    parentFormItem: PropTypes.instanceOf(FormItemDetail).isRequired,
    deleteCurrentSubField: PropTypes.func.isRequired,
    updateView: PropTypes.func.isRequired
}

export default FormItem


    // case "OPERATE":
    //     let fullFieldName;
    //     if (formItem.important || formItem.required) {
    //         fullFieldName = formItem.fieldName + " *"
    //     } else {
    //         fullFieldName = formItem.fieldName
    //     }
    //     return (
    //         <span>{fullFieldName}</span>
    //     )