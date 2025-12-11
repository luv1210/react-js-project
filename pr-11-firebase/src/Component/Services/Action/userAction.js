import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase.config";

const loading = ()=>{
    return{
        type:"LOADING"
    }
}

const error = (data)=>{
    return{
        type:"ERROR",
        payload:data
    }
}

const usersignup = ()=>{
    return{
        type:"SIGNUP"
    }
}

const usersignin = (user)=>{
    return{
        type:"SIGNIN",
        payload:user
    }
}

const  usesignout = ()=>{
    return{
        type:"SIGNOUT"
    }
}



export const usersignupasync = (data)=>{
    return async(dispatch) =>{
        dispatch(loading())
        try{
     let res = await createUserWithEmailAndPassword(auth,data.email,data.password)
       updateProfile(res.user,{
        displayName:data.name
       })
        dispatch(usersignup())
        }catch(error){
            dispatch(error(error.message))
        }
    }
}


export const usersigninasync = (data)=>{
    return async(dispatch) =>{
        dispatch(loading())

        try{
     let res = await signInWithEmailAndPassword(auth,data.email,data.password)
        dispatch(usersignin(res.user))
        }catch(error){
            dispatch(error(error.message))
        }
    }
}

export const usersignoutasync = ()=>{
    return async (dispatch) =>{
        dispatch(loading())

        try {
              await signOut(auth)
              dispatch(usesignout())
        } catch (error) {
            dispatch(error(error.message))
            
        }
    }
}

export const googlesinginasync = ()=>{
    
    return async (dispatch)=>{
        dispatch(loading())
        try {
            const provider = new GoogleAuthProvider
            let res =await signInWithPopup(auth,provider)
            dispatch(usersignin(res.user))
        } catch (error) {
            dispatch(error(error.message))
        }
    }
}