import { getproductData, setProductData } from "../Storage/StorageData"

const initialvalue = 
    {
        products: getproductData(),
        product: null,
        isLoding: false
    }





export const AddProductRedux = (state = initialvalue, action) => {

    switch (action.type) {
        case "ADD_PRODUCT":
            let data = getproductData()
            data.push(action.payload)
            setProductData(data)
            return {
                ...state,
                products: data
            }

        case "GET_PRODUCTS":
            const allproducts = getproductData()
            return{
                ...state,
                products:allproducts ||[]
            }    
        default:
            return state
    }
}