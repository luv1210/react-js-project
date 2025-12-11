import { use } from "react"

const initial = {
    user:JSON.parse(localStorage.getItem("user"))||null,
    isCreated:false,
    error:"",
    loading:false
}

export const userReducer = (state =initial,action)=>{
switch(action.type){
  case "LOADING":
    return{
      ...state,
      loading:true
    }

  case "ERROR":
    return{
      ...state,
      error:action.payload
    }
   case "SIGNUP":
    return{
      ...state,
      isCreated:true
    }
   case "SIGNIN":
    localStorage.setItem('user',JSON.stringify(action.payload))
    return{
      ...state,
      user:action.payload,
      isCreated:false
    }

    case "SIGNOUT":
      localStorage.removeItem('user')
      return{
        ...state,
        user:null
      }
    default:
      return state;
  }
}