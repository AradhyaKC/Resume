/* eslint-disable jsx-a11y/alt-text */
import "./ImageComponent.css"
import { useEffect, useState } from "react";

function ImageComponent(props){

    const [stickyState,setStickyState] = useState({
        scrolled:false, isStickyImgEnabled:false
    });

    const handleScroll=() => {
        const offset=window.scrollY;
        const root = document.querySelector(":root");
        let tempVar =Number.parseFloat(getComputedStyle(root).getPropertyValue("--image-compo-height").charAt(0));
        tempVar=(tempVar*10) + Number.parseFloat(getComputedStyle(root).getPropertyValue("--image-compo-height").charAt(0));
        tempVar=tempVar *(window.innerHeight/100);
        tempVar=tempVar- Number.parseFloat(getComputedStyle(root).getPropertyValue("--sticky-height").slice(0,2));
        
        if(offset > tempVar-10)
          setStickyState((prevState)=>{
            var newState = {...prevState};
            newState.scrolled=true; 
            return newState;
          });
        else
        setStickyState((prevState)=>{
            var newState = {...prevState};
            newState.scrolled=false; 
            return newState;
          });

    }
    
      useEffect(() => {
        window.addEventListener('scroll',handleScroll)
      });

    return (
        <div className="image-compo">
            <div className="bgm"></div>
            <div className="bgm-1"></div>
            <img className="image"></img>
            <img className="image-1"></img>
            <div className="sticky-bar">
                <img className="sticky-bar-img" style={{
                        display:`${(stickyState.scrolled && stickyState.isStickyImgEnabled)?"block":"none"}`,
                        position:`${stickyState.scrolled?"fixed":"absolute"}`,top:`${stickyState.scrolled?"0px":""}`
                    }}></img>
                <img className={`sticky-bar-img-1 ${stickyState.isStickyImgEnabled?"":"sticky-img-left-slide-in"}`}
                    style={{
                        display:`${(stickyState.scrolled && !stickyState.isStickyImgEnabled)?"block":"none"}`,
                        position:`${stickyState.scrolled?"fixed":"absolute"}`,top:`${stickyState.scrolled?"0px":""}`
                    }}></img>
            </div>
        </div>
    );
}

export default ImageComponent;