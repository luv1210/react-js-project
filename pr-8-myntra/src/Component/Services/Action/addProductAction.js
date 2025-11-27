

export const addproduct = (data)=>{
    return{
        type:"ADD_PRODUCT",
        payload:data
    }
}


export const getallproduct = ()=>{
    return{
        type:"GET_PRODUCTS"
    }
}