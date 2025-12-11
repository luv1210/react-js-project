import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase.config"


export const addproduct = ()=>{
    return{
        type:"ADD_PRODUCT",
    }
}


export const getallproduct = (data)=>{
    return{
        type:"GET_PRODUCTS",
        payload:data
    }
}


// export const deleteproduct = (data)=>{
//     return {
//         type:"DELETE_PRODUCT",
//         payload:data
//     }
// } 


export const Editproduct = (data)=>{
    return{
        type:"EDIT_PRODUCT",
        payload:data
    }
}


export const updateProduct = (data)=>{
    return{
        type:"UPDATE_PRODUCT",
        payload:data
    }
}


const Loding = ()=>{
    return{
        type:"LODING"
    }
}

const errormsg = (data)=>{
return{
    type:"ERROR",
    payload:data
}
}

export const addproductAsync  = (data)=>{
    return async(dispatch)=>{
        dispatch(Loding())
        try {
            //  await axios.post(`http://localhost:3000/products`,data)
            await setDoc(doc(db, "products", data.id), data);
        dispatch(addproduct())
        } catch (error) {
            // console.log(error.message)
            // console.log(error)
            dispatch(errormsg(error.message))
        }
       
    }
}


export const getallproductAync = ()=>{
    return async(dispatch)=>{
        dispatch(Loding())
         try {
            // let res = await axios.get('http://localhost:3000/products')
            let records = []
            const res = await getDocs(collection(db, "products"));
            res.forEach(rec => {
                records.push({
                    ...rec.data(), id: rec.id
                })
            });
            dispatch(getallproduct(records))
        } catch (error) {
            console.log(error)
        }
    }
}


export const deleteproductAsync = (id)=>{
    return async(dispatch)=>{
     try{
        //  let res  = await axios.delete(`http://localhost:3000/products/${id}`)
        await deleteDoc(doc(db, "products", id));
         dispatch(getallproductAync())
     }catch(error){
   dispatch(errormsg(error.message))
     }
    }
}


export const editproductAsync = (id)=>{
   return async (dispatch)=>{
     dispatch(Loding())
     try {
        // let res = await axios.get(`http://localhost:3000/products/${id}`)
        let res =await getDoc(doc(db, "products",id));
        console.log(res.data());
        dispatch(Editproduct(res.data()))

     } catch (error) {
       dispatch(errormsg(error.message)) 
     }
   }
}


export const updateProductAsync = (data)=>{
    return async (dispatch)=>{
        try{
            // let res = await axios.put(`http://localhost:3000/products/${data.id}`,data)
            await updateDoc(doc(db, "products", data.id), data);

            dispatch(updateProduct())
        }catch(error){
            dispatch(errormsg(error.message))
        }
    }
}