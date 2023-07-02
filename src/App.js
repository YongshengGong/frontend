
// import React, { useEffect, useState } from "react";
import './App.css';
import Me from './Me/me.png';
import Me1 from './Me/me1.png';

import { useState, useEffect } from "react";
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

function App() {
  
  // ********************************股票*************************************
  
  const [stock, setStock] = useState("");
  
  // Fetch weather data
  useEffect(() => { //刷新页面以后会自动运行其中的function
    fetch("https://financialmodelingprep.com/api/v3/quote-short/BABA?apikey=68a80a230cd5b27e2f97f807322671c9")
      .then((response) => response.json()) //response是固定的  没有实际意义
      .then((data) => {  //下载的最新的数据
        //console.log(data);//单纯只是显示在console里，删掉无所谓。
        setStock(data[0]); //data是网站给的array，给什么用什么,也不一定是array；对应56行57行
      });
  }, []);

const [hover,setHover]=useState(false);
const handleMouseEnter=()=>{setHover(true)};
const handleMouseLeave=()=>{setHover(false)};

const [isOpen, setIsOpen] = useState(false);
const ref = useRef(null);

const handleClickOutside = (event) => {
  if (!ref.current.contains(event.target)&&!event.target.classList.contains('Nav-link1')) {
    // (ref.current && !ref.current.contains(event.target))
    setIsOpen(false);
  }
};

useEffect(() => {
  document.addEventListener('click', handleClickOutside, true);
  return () => {
    document.removeEventListener('click', handleClickOutside, true);
  };
}, []);


const Star = () => {
  const top = Math.random() * 100 + "%";
  const left = Math.random() * 100 + "%";
  const animation = `twinkle ${Math.random() * 2 + 1}s infinite ${
    Math.random() < 0.5 ? "alternate" : ""
  }`;
  return <div className="star" style={{ top, left, animation }}></div>;
};
  // *********************************************************************

  return (
    <div className="App"> {/* Biggest container*/}



      <nav className='Nav'>
        <a href='#homePage' className='Nav-link'>Home</a>
        <a href='#about-blank' className='Nav-link'>About</a>
        <a href='#project-blank' className='Nav-link'>Project</a>
        <a className='Nav-link' style={{marginRight:20}}>Contact</a>
        <button ref={ref} onClick={() => setIsOpen(!isOpen)} className='ShowNavMenuBtn'>Menu</button>
        <div className={`DropDownMenu ${isOpen ? 'open' : ''}`}>
          <div style={{ display: "flex", flexDirection: 'column', marginLeft: '20%' }}>
            <a href='#homePage' className='Nav-link1'>Home</a>
            <a href='#about-blank' className='Nav-link1'>About</a>
            <a href='#project-blank' className='Nav-link1'>Project</a>
            <a className='Nav-link1'>Contact</a>
          </div>
        </div>
      </nav>


 

      <div className='HomePage' id='homePage'>
      <div className="sky">
        {[...Array(900)].map((_, index) => (
          <Star key={index} />
        ))}
      </div>
      
        <div className='intro'>
          <div className="selfIntro1">Yongsheng Gong</div>
          <div className="selfIntro2">React Developer</div>
          <div className="selfIntro3">
            <p >Hi, I'm Yongsheng Gong(or you can just call me Peter Gong),</p>
            <p>A passionate software developer loccated at Markham. </p>
          </div>
        </div>
        {/* below is spinning disc **************************************************************************************/}
        <div className='discContainer'>
          <div className="disc">
            <p style={{ transform: 'translateY(110px) translateX(2px)' }}>REACT</p>
            <p style={{ transform: 'translateY(-87px) translateX(2px) rotate(180deg)' }}>JAVASCRIPT</p>
            <p style={{ transform: 'translateY(-37px) translateX(80px) rotate(-90deg)' }}>NODE/EXPRESS</p>
          </div>
          <div className="discCenter">
            <p style={{ transform: 'translateY(30px) translateX(0px)' }}>HTML</p>
            <p style={{ transform: 'translateY(30px) translateX(0px)' }}>CSS</p>
          </div>
        </div>
        <div className='water'></div>
      </div>



      <div style={{ width: '90%', height: 80 }} id='about-blank'></div>



      <div className='About' id='about'>
        <div className="heartANDpicture">
          <div className="Heart">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {hover === false ? (<img src={Me} style={{ height: 350, width: 300, borderRadius: '20%' }} />) :
              (<img src={Me1} style={{ height: 350, width: 290, borderRadius: '20%' }} />)}
          </div>
        </div>
        <div style={{ width: 400, height: 500, display: 'flex', alignItems: 'center' }}>
          <p style={{ textAlign: "center" }}>
            I'm a beginner in software development, with a strong focus on React.
            I'm currently looking for my first professional role where I can apply my React knowledge.
            Despite not having formal work experience,
            I've honed my skills through personal projects and I'm eager to bring this experience to a professional setting
          </p>
        </div>
      </div>



      <div style={{ width: '0%', height: 80, backgroundColor: 'rgba(193, 170, 170, 0.107)' }} id='project-blank'></div>



      <div className="Project" id='project'>
        <nav style={{
          display: "flex",
        }}>
          <Link to="/ToDoList" style={{ marginRight: 10}}><button style={{cursor:'pointer'}}>ToDoList</button></Link>
          <Link to='/Employee'><button>Employee</button></Link>
          <Link to='./ECommerce'>ECommerce</Link>
        </nav>
      </div>

 


      {/* Below is stock ******************************************************/}

      <div>
        <h2>Live Stock Price</h2>
        <div>{stock.symbol}</div>
        <div>{stock.price}</div>
      </div>

      


    
    </div>

    
)                                                                         

}



export default App;

