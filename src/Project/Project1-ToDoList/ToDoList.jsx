import React, {useState,useEffect,useRef} from 'react'
import {HashLink} from 'react-router-hash-link'
import './ToDoList.css';
import { CaretDownOutlined } from '@ant-design/icons';
import { CaretUpOutlined  } from '@ant-design/icons';
import HB from './HB.jpg';


const ToDoList=()=>{

   const [score,setScore]=useState(JSON.parse(localStorage.getItem('m')||JSON.stringify({Win:0,Lose:0,Tie:0})));
   
  

    const handleRock=()=>{
        const rand=Math.random();
        let result='';
        if(rand>=0&&rand<1/3){
            result='scissor';
            setScore(prev=>({...prev,Win:prev.Win+1}));
            alert(`You chose Rock, the computer chose ${result},you WON! Win:${score.Win+1},Lose:${score.Lose},Tie:${score.Tie}`);
        }
        else if(rand>=1/3&&rand<2/3){
            result='rock';
            setScore(prev=>({...prev,Tie:prev.Tie+1}));
            alert(`You chose Rock, the computer chose ${result},it's a TIE! Win:${score.Win},Lose:${score.Lose},Tie:${score.Tie+1}`);
        }
        else if(rand>=2/3&&rand<1){
            result='paper';
            setScore(prev=>({...prev,Lose:prev.Lose+1}));
            alert(`You chose Rock, the computer chose ${result},you LOST! Win:${score.Win},Lose:${score.Lose+1},Tie:${score.Tie}`);
        }
    }

    const handleScissor=()=>{
        const rand=Math.random();
        let result='';
        if(rand>=0&&rand<1/3){
            result='scissor';
            setScore(prev=>({...prev,Tie:prev.Tie+1}));
            alert(`You chose Scissor, the computer chose ${result},it's a TIE! Win:${score.Win},Lose:${score.Lose},Tie:${score.Tie+1}`);
        }
        else if(rand>=1/3&&rand<2/3){
            result='rock';
            setScore(prev=>({...prev,Lose:prev.Lose+1}));
            alert(`You chose Scissor, the computer chose ${result},you LOST! Win:${score.Win},Lose:${score.Lose+1},Tie:${score.Tie}`);
        }
        else if(rand>=2/3&&rand<1){
            result='paper';
            setScore(prev=>({...prev,Win:prev.Win+1}));
            alert(`You chose Scissor, the computer chose ${result},you WON! Win:${score.Win+1},Lose:${score.Lose},Tie:${score.Tie}`);
        }
    }

    const handlePaper=()=>{
        const rand=Math.random();
        let result='';
        if(rand>=0&&rand<1/3){
            result='scissor';
            setScore(prev=>({...prev,Lose:prev.Lose+1}));
            alert(`You chose Paper, the computer chose ${result},you LOST! Win:${score.Win},Lose:${score.Lose+1},Tie:${score.Tie}`);
        }
        else if(rand>=1/3&&rand<2/3){
            result='rock';
            setScore(prev=>({...prev,Win:prev.Win+1}));
            alert(`You chose Paper, the computer chose ${result},you WON! Win:${score.Win+1},Lose:${score.Lose},Tie:${score.Tie}`);
        }
        else if(rand>=2/3&&rand<1){
            result='paper';
            setScore(prev=>({...prev,Tie:prev.Tie+1}));
            alert(`You chose Paper, the computer chose ${result},it's a TIE! Win:${score.Win},Lose:${score.Lose},Tie:${score.Tie+1}`);
        }
    }

    const handleReset=()=>{
       setScore({...score,Win:0,Lose:0,Tie:0});
        alert(`Now all scores have been cleared!`)
    }

    const [num,setNum]=useState(0);
    const handleNum=(num)=>{
        setNum(t=>t+num);
        setNum(t=>t+num);
    }

    useEffect(()=>{localStorage.setItem('m',JSON.stringify(score))},[score]);

    

   const [expand,setExpand]=useState(false);
   const handleExpand=()=>{
    setExpand(!expand);
   }

   const ref=useRef(null);
  useEffect(()=>{ref.current.focus()},[]);

return(
    

    <div style={{width:'100%',height:'100%'}}>
        <HashLink to='/#project-blank'>Go Back</HashLink>

        <div>
            <button onClick={handleRock}>Rock</button>
            <button onClick={handleScissor}>Scissor</button>
            <button onClick={handlePaper}>Paper</button>
            <button onClick={handleReset}>Reset</button>
        </div>

        <div>
            <button onClick={()=>{handleNum(-1)}}>-</button>
            <span>{num}</span>
            <button onClick={()=>{handleNum(1)}}>+</button>
        </div>



        <div style={{margin:'250px'}}>
            <div className={`container ${expand?'expand':''}`}>
                <div className='content'>
                    祝老爸生日快乐  Happy Birthday!!!!!!!!!!!🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂🎂
                     <img src={HB} style={{height:230,width:270}}></img>
 
                </div>
            </div>
            {expand? (<button onClick={handleExpand} className='expandBTN'>
                       <CaretUpOutlined />收起
                    </button>):
                    (<button onClick={handleExpand} className='expandBTN'>
                        <CaretDownOutlined />展开
                    </button>)
                }
        </div>

      <input ref={ref} className='son'></input>

    </div>
     


)
}

export default ToDoList;