
import './App.css'
import UserInfo from './Components/UserInfo'
import img1 from './assets/img-1.jpg'
import img2 from './assets/img-2.jpg'
import img3 from './assets/img-3.jpg'
import img4 from './assets/img-4.jpg'
import img5 from './assets/img-5.jpg'

function App(){

  return (
    <div>
    
        <h1 style={{marginLeft:"60px"}}>User Information</h1>
        <div className='user-grid'>
         <UserInfo  image={img1}name="Luv Dhameliya" email="luvdhameliya@gmail.com" city='Bhavnagar' age={22} occupation="graphic designer" />

        <UserInfo image={img2} name="Darshik Shekhada" email="darshik@gmail.com" city='Surat' age={23} occupation="Front-End Developer " />

        <UserInfo image={img3} name="meet trapasiya" email="meet@gmail.com" city='Bhavnagar' age={20} occupation="Full-Stack Developer" />
        <UserInfo image={img4} name="krish pajiyawala" email="krish@gmail.com" city='Surat' age={19} occupation="UI & UX Designer" />

        <UserInfo image={img5} name="ravi sidhapura" email="ravi@gmail.com" city='surat' age={25} occupation="Software Engineer" />
     </div>
    </div>
  )
}

export default App
