import { useEffect, useRef, useState } from "react";
import "./ProjectComponent.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import myGif from "./firstgif.gif";
import {gsap} from 'gsap';

gsap.registerPlugin(ScrollTrigger);

function ProjectComponent(props){

    const [tempState,setTempState] = useState(0);
    var projectContainerRef= useRef(undefined);
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setTempState(Date.now());
            //console.log(150-(1000/window.innerWidth) * (1000/window.innerWidth) * 13);
        });

        var myGasp = gsap.timeline();
        // myGasp.set("bgm-img",{transformOrigin:"left center"});
        myGasp.fromTo(".bgm-img",
            {
                y:`${projectContainerRef.current.scrollHeight* 0.3 }`,
            },{
                y:`${projectContainerRef.current.scrollHeight * 0}`,
                scrollTrigger:{trigger:".project-container",markers:true,scrub:true},
            });
        
        var secondGasp= gsap.timeline();
        secondGasp.fromTo(".project-desc",{
            y:`${projectContainerRef.current.scrollHeight* 1 }`,
        },{
            y:`${projectContainerRef.current.scrollHeight* 0.1 }`,
            scrollTrigger:{trigger:".project-container",markers:true,scrub:true},
        });
        
    },[]);

    return(
      <div ref={projectContainerRef} className='project-container'>
          <img  src={props.imgSrc?props.imgSrc:myGif}  className='bgm-img' style={{
            left:(window.innerWidth* Number.parseInt(props.index))+ (window.innerWidth/100) * (window.innerWidth/100) *1}}>
          </img>
          <div className='project-desc' style={{left: (window.innerWidth* Number.parseInt(props.index))
          +((window.innerWidth/100) * (window.innerWidth/100) *2.4)
          +(150-(1000/window.innerWidth) * (1000/window.innerWidth) * 13)}}>
            {props.children}
          </div>
      </div>
        );
}


export default ProjectComponent;
