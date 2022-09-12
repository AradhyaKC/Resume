/* eslint-disable jsx-a11y/alt-text */
import "./ImageComponent.css"
import secondMountains from "./SecondMountains.avif";
import tempImage from "./SimpleImage.jpg";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

function ImageComponent(props){

    var stickyRef= useRef(undefined);

    return (
        <div className="image-compo">
            <div className="bgm"></div>
            <div className="bgm-1"></div>
            <img className="image"></img>
            <img className="image-1"></img>
            <button onClick={()=>{
                stickyRef.current.setActiveImageUrlAndSwipe(tempImage,true)}}> Next </button>
            <StickyImageComponent ref={stickyRef}/>
        </div>
    );
}

const StickyImageComponent= forwardRef((props,ref)=>{

    const [stickyState,setStickyState] = useState({
        scrolled:false, isStickyImgEnabled:false,stickyImgSlideClass:"",stickyImg1SlideClass:"",
        activeImgUrl:secondMountains, inactiveImgUrl:secondMountains,
    });

    useImperativeHandle(ref,()=>{
        return {setActiveImageUrlAndSwipe};
    });

    const setActiveImageUrlAndSwipe=(urlString,swipedLeft)=>{
        setStickyState((prevState)=>{
            var newState = {...prevState};
            newState.inactiveImgUrl=newState.activeImgUrl;
            newState.activeImgUrl=urlString;
            return newState;
        });
        handleSwipe(swipedLeft);
    }

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
    const handleSwipe=async (swipedLeft)=>{
        await setStickyState((prevState)=>{
            var newState={...prevState};
            newState.isStickyImgEnabled=!prevState.isStickyImgEnabled;
            if(newState.isStickyImgEnabled){
                if(swipedLeft){
                    newState.stickyImgSlideClass="sticky-img-right-slide-in";
                    newState.stickyImg1SlideClass="sticky-img-left-slide-out"
                }
                else {
                    newState.stickyImgSlideClass="sticky-img-left-slide-in";
                    newState.stickyImg1SlideClass="sticky-img-right-slide-out"
                }
            }else{
                if(swipedLeft){
                    newState.stickyImg1SlideClass="sticky-img-right-slide-in";
                    newState.stickyImgSlideClass="sticky-img-left-slide-out"
                }
                else{
                    newState.stickyImg1SlideClass="sticky-img-left-slide-in";
                    newState.stickyImgSlideClass="sticky-img-right-slide-out"
                }
            }
            return newState;
        });
        const root = document.querySelector(":root");
        setTimeout(()=>{
            setStickyState((prevState)=>{
                var newState={...prevState};
                if(prevState.isStickyImgEnabled){
                    newState.stickyImgSlideClass="";
                    newState.stickyImg1SlideClass="sticky-img-display-none";
                }
                else{
                    newState.stickyImg1SlideClass="";
                    newState.stickyImgSlideClass="sticky-img-display-none";
                }
                return newState;
            })
        }, Number.parseFloat(getComputedStyle(root).getPropertyValue("--sticky-slide-time")[0]) *1000);
    }
    
    useEffect(() => {
        window.addEventListener('scroll',handleScroll);
    });


    return (
        <div className="sticky-bar">
                <div className={stickyState.scrolled?"sticky-img-fade-in":""} style={{
                    width:'100%', height:`${stickyState.scrolled?'min-content':'100%'}`,display:`${(stickyState.scrolled)?"block":"none"}`,
                    position:`${stickyState.scrolled?"fixed":"absolute"}`,top:`${stickyState.scrolled?"0px":""}`
                }}>
                    <img className={"sticky-bar-img " + stickyState.stickyImgSlideClass} style={{
                        content:`url(${stickyState.isStickyImgEnabled?stickyState.activeImgUrl:stickyState.inactiveImgUrl})`
                    }}></img>
                    <img className={"sticky-bar-img-1 " +stickyState.stickyImg1SlideClass}  style={{
                        content:`url(${!stickyState.isStickyImgEnabled?stickyState.activeImgUrl:stickyState.inactiveImgUrl})`
                    }}></img>
                </div>
        </div>
    );
});

export default ImageComponent;