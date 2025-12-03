import { getproductData, setProductData } from "../Storage/StorageData"

const initialvalue = 
    {
        products: [],
        product: null,
        isLoding: false,
        isCreated:false,
        isUpdate:false,
        errMSG:""
    }





export const AddProductRedux = (state = initialvalue, action) => {

    switch (action.type) {
        case "LODING":
            return{
                ...state,
                isLoding:true
            }
        case "ERROR":
            return{
                ...state,
                errMSG:action.payload
            }    
        case "ADD_PRODUCT":
            return {
                ...state,
                isCreated:true,
                errMSG:""
            }

        case "GET_PRODUCTS":
            return{
                ...state,
                products:action.payload,
                isCreated:false,
                isLoding:false,
                isUpdate:false,
            }
        // case "DELETE_PRODUCT":
        //     const productall = getproductData()
        //     let uproducts = productall.filter((product)=>product.id !==action.payload)
        //     setProductData(uproducts)
        //     return{
        //         ...state,
        //         products:uproducts
        //     }     
        case "EDIT_PRODUCT" :       
      return{
        ...state,
        product:action.payload,
        isLoding:false
      }

      case "UPDATE_PRODUCT" :
      
     return{
      ...state,
      product:null,
      isUpdate:true
     }       
        default:
            return state
    }
}