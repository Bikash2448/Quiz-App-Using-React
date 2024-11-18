import { useState } from 'react'
import './App.css'
import QuizApp from './Components/QuizApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='flex justify-center bg-gray-800 items-center flex-col  h-screen w-screen border rounded-md border-black '>
        <div className='font-bold text-[3rem]'> <span className='text-blue-800'>Where</span> <span className='text-green-800'>Knowledge</span><span className='text-orange-800'> Meets</span> <span className='text-red-700'>Fun</span>  </div>
        <QuizApp/>
      </div>
    </>
  )
}

export default App
