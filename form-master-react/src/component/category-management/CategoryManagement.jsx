import React,{useMemo} from 'react'
import axiosService from 'axios-config'

const CategoryManagement = () => {

    const requestAddCategoryHandler = ()=>{

    }
    const requestUpdateCategoryHandler = ()=>{

    }
    const requestDeleteCategoryHandler = ()=>{

    }

    useMemo(() => {
        const getAllCategory = async()=>{
            let res = await axiosService.get("api/category/all")
            console.log(res)
        }
        getAllCategory()
    }, [])

    return (
        <div>
            <ul>

            </ul>
        </div>
    )
}

export default CategoryManagement