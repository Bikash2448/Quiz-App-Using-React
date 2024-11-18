import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'

const QuizApp = () => {
    const [quizData, setQuizData] = useState(null)
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [ans, setAns] = useState()
    const [answered, setAnswered] = useState(false); 
    const [score, setScore] = useState(0)
    const [attemptQuiz,setAttemptQuiz]=useState(0)
    

    async function fatchdata() {
        const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium"
        const response = await axios.get(url)
        setQuizData(response.data.results)
        setCurrentQIndex(0); // Reset index for the new quiz
        setAnswered(false); // Reset answered state
        setAns(null);
        
    }

    const options = useMemo(() => {
        if (!quizData) return [];
        return [
            ...quizData[currentQIndex].incorrect_answers, 
            quizData[currentQIndex].correct_answer,      
        ].sort(() => Math.random() - 0.5);
    }, [quizData, currentQIndex]);

    const correctAns =quizData && quizData[currentQIndex].correct_answer
      console.log("all", options);
    
    console.log("option",correctAns)

    useEffect(()=>{
        fatchdata()
    },[])
    useEffect(()=>{
        if (currentQIndex && currentQIndex >= quizData.length - 1) {
            fatchdata()
        }
    },[])

    const handleOptionClick =(e)=>{
        setAns(e)
        setAnswered(true)

        if (e === correctAns) {
            setScore((prevScore) => prevScore + 1);
        }
        if(e){
            setAttemptQuiz((prev)=>prev+1)
        }
        
    }
    
    const handleNext = () => {
        setCurrentQIndex((prev) => prev + 1);
        setAnswered(false);
        setAns(null); // Clear the selected answer
    };

    if (quizData && currentQIndex >= quizData.length-1) {
        return (
            <button
                onClick={()=>fatchdata()} // Fetch new quiz data
                className="p-3 mt-4 bg-blue-500 text-white rounded-md"
                >
                    More Quiz
                </button>
        );
    }
    
    
  return (
    <div className='h-auto w-[28%] bg-slate-500 m-6 p-4 text-center flex flex-col font-bold rounded-md border border-black '>
         
        <div>
            <h1 className='text-2xl'>{quizData && quizData? quizData[currentQIndex].question:<span className='text-xl font-bold'>Loading Data.......</span>}</h1>    
        </div>
        <div>
            
            <h2 className='flex flex-col'>
                    {quizData && 
                    options.map((e,i)=>
                    <button
                       onClick={()=>handleOptionClick(e)}
                        key={i}
                        className={`p-3 my-2 border  text-red-800 rounded-md  ${answered ? (e === correctAns ? 'bg-green-500' : e === ans ? 'bg-red-500' : 'bg-gray-300') : 'bg-gray-100 transform transition duration-100 hover:scale-104 hover:bg-blue-500'}`}
                        >
                        {e}
                    </button>)}
            </h2>
        </div>
        <div>
            <button onClick={handleNext}
                    // disabled={!answered || currentQIndex >= quizData.length - 1}
                    className="py-2 px-6 mt-4 bg-blue-500 text-white rounded-md disabled:bg-gray-400">Next</button>
        </div>
        <div>
            <h2 className="mt-4">Score: {score}/{attemptQuiz}</h2>
        </div>
        
    </div>
  )
}

export default QuizApp