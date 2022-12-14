import axiosService from 'axios-config'
import React, {useState, useMemo} from 'react'
import "./nav.css"

const CategoryNav = () => {
    const [formCategory, setFormCategory] = useState(["tax 2022 intake","I765 intake","green card renew"])
    const [forms, setForms] = useState(["test","test","test"])

    useMemo(() => {
        const getAllCategory = async()=>{
            let res = await axiosService.get("api/category/all")
            // setFormCategory(res.data)
        }
        getAllCategory()
    }, [])

    const iconClick = ()=>{
    }

    return (
        <div className='navigateBar'>
            <img className="navIcon headerIcon" onClick={iconClick} src="./icons/nav.png" alt="nav icon"/>
            <nav>
                <ul className='formCategory'>
                    {formCategory.map((category,i=1)=>{
                        return <li key={i}>
                            <p>{category}</p>
                            <ul className='formIndexList'>
                                {forms.map((form,j=1)=>{
                                    return <li key={j}>
                                        {form}
                                    </li>
                                })}
                            </ul>
                        </li>
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default CategoryNav