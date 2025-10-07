import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReviewForm from './Components/reiwew'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ReviewForm/>
    </>
        )
}

export default App
