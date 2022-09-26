import './App.css';
import ImageComponent from './ImageComponent.js';
import NavComponent from './NavComponent';
import MainComponent from './MainComponent';
import ProjectComponent from './ProjectComponent';
import doggie from "./doggie.gif";
import { useState } from 'react';
import secondMount from "./SecondMountains.avif";
import orangeMount from "./OrangeishMountains.jpg";
import stickySecond from "./WhiteMountains-cropped.jpg";
import stickyOrange from "./OrangeishMountains-cropped.jpg";
import linearSticky from "./linearSticky.png";
import blankPerson from "./blankPerson.jpg";


// still need to make ImageComponent usable on larger screens and also picture tag srcset; 
function App() {
  const [tempState,setTempState] = useState(0);
  const Calltest = async (index)=>{
    await setTempState((prevState)=>{
      if(prevState==0) return 1; else return 0;
    });
  }

  function ImageData(props){
    const [index,setIndex] =useState(0);
    const ImageJSXAndData = [{
      img:secondMount, backgroundClass:"orange-mountains", stickyImg:linearSticky,
      jsx:
      <div className='dim-background'>
          <div className='temp-container' style={{color:'white'}}>
            <div style={{fontSize:"1.5rem",fontWeight:'500'}}> Hi There !</div>
            <div style={{fontSize:"2.4rem",fontWeight:"700"}}>I'm Aradhya.</div>
            <div style={{fontSize:"1.6rem",fontWeight:"600"}}> An Aspiring web and game developer</div>
          </div>
        </div>
    }];

    return (<ImageComponent backgroundImg={ImageJSXAndData[0].img} swipedLeft={props.swipedLeft}
      backgroundClass={ImageJSXAndData[0].backgroundClass} stickyImg={ImageJSXAndData[0].stickyImg}>
      {ImageJSXAndData[0].jsx}
    </ImageComponent>);
  }

  return (
    <div className='App'>
      <ImageData index='0' swipedLeft={true}/>
      <NavComponent callOnElementClick ={Calltest}>
        <div>Hello World</div>
        <div>Web Projects</div>
      </NavComponent>
      <MainComponent>
        <div index='0'  style={{marginTop:"20px" }}>
          <div style={{display:"flex", alignContent:"center",flexDirection:"column", width:"clamp(275px,80vw,1200px)"}}>
            <div style={{fontSize:"2rem", textAlign:'center'}}>About Me</div>
            <div style={{textAlign:'center', marginTop:"10px"}}> <img style={{width:"150px",height:"150px", borderRadius:"50%"}} src={blankPerson}></img></div>
            <div style={{}}>
                <p className='heading'>Hi I'm <span style={{ fontWeight:"600"}}>Aradhya</span>, </p>
                <p className="about-text">
                Aspiring Game programmer, with a keen interest in developing games, game engines with the
                help of software like SFML, DIrectX and Unity. Currently working on a 2D hypercasual game in
                unity. Looking to develop and improve my knowledge in C++ and C# and gain experience to
                become comfortable using UE4 and unity.I esnjoy transforming complex problems into simple and intuitive solutions.
                I love to explore and learn new things.
                </p>
                <p className="about-text">
                Committed to the idea of life-long learning, I am a full stack developer with a passion for Javascript, React, and all things web development.
                </p>
                <p className="about-text"> 
                 Outside of developement, I enjoy playing the guitar ,video games and watching movies .  
                </p>
            </div>

              {/* Skills */}
            <p className='heading'>My Skills</p>
            <div className='skills-container'> 
              <ArrangeSkill skillName="HTML" ImgSrc="devicon-html5-plain colored"/>
              <ArrangeSkill skillName="CSS" ImgSrc="devicon-css3-plain colored"/>
              <ArrangeSkill skillName="Javascript" ImgSrc="devicon-javascript-plain colored"/>
              <ArrangeSkill skillName="React.js" ImgSrc="devicon-react-original colored"/>
              <ArrangeSkill skillName=".NET" ImgSrc="devicon-dotnetcore-plain colored"/>
              <ArrangeSkill skillName="Nodejs" ImgSrc="devicon-nodejs-plain colored"/>
              <ArrangeSkill skillName="Unity" ImgSrc="devicon-unity-original colored"/>
              <ArrangeSkill skillName="webpack" ImgSrc="devicon-webpack-plain colored"/>
              <ArrangeSkill skillName="Unreal" ImgSrc="devicon-unrealengine-plain colored"/>
              {/* <ArrangeSkill skillName="HTML" ImgSrc="devicon-nodejs-plain colored"/> */}
            </div>
          </div>
        </div>  

        <div index='1'>
          <ProjectComponent index='1' ImgSrc={doggie}>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
            <h1>Hello World</h1>
          </ProjectComponent>
        </div>
      </MainComponent>
    </div>
  );
}

function ArrangeSkill(props){
  return (
    <div style={{margin:"10px"}}>
    <i className={"skill-img " + props.ImgSrc}/>
    <div  style={{textAlign:'center'}} className='about-text'>{props.skillName}</div>
    </div>
  );
}

export default App;
