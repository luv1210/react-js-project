import { useDispatch, useSelector } from 'react-redux'
import Coupon from './coupon-code/Coupon'
import Shop from './Shop/Shop'
import Slider1 from './Sliders/Slider-1'
import Slider2 from './Sliders/Slider-2'
import Slider3 from './Sliders/Slider-3'
import Slider4 from './Sliders/Slider-4'
import Slider5 from './Sliders/Slider-5'
import { useEffect } from 'react'
import { getallproduct } from '../Services/Action/AddProductAction'
import Allproducts from './AllProducts/Allproducts'
const Home=()=> {
 const dispatch = useDispatch()
    const {products} = useSelector(state=>state)
  console.log(products)
  const brand  = products.map((product)=> product.brand)
  const subcategory  = products.map((product)=> product.subcategory)
  // console.log(brand)
  // console.log(subcategory)
 useEffect(()=>{
  dispatch(getallproduct())
 },[])
  return (
    <>
    <Coupon/>
    <Slider1/>
    <Slider2/>
    <Slider3/>
    <Slider4/>
    <Slider5/>
    <Shop/>
    <Allproducts/>


      
        
       
        
      
    </>
  )
}

export default Home