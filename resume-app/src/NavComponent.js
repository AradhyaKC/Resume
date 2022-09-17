import { useEffect, useRef, useState } from "react";
import "./NavComponent.css";

function NavComponent(props){
    var stickyHeight= useRef(0);
    var tempVar =useRef(0);
    var parentFuncCall= useRef(0);
    const [navState,setNavState] = useState(()=>{
        stickyHeight.current = document.querySelector(":root");
        stickyHeight.current =getComputedStyle(stickyHeight.current).getPropertyValue("--sticky-height");
        stickyHeight.current =stickyHeight.current.slice(0,stickyHeight.current.length-2);
        stickyHeight.current= Number.parseFloat(stickyHeight.current);

        let root = document.querySelector(":root"); 
        tempVar.current =getComputedStyle(root).getPropertyValue("--image-compo-height");
        tempVar.current = tempVar.current.slice(0,tempVar.current.length-2);
        tempVar.current= Number.parseFloat(tempVar.current);
        tempVar.current=tempVar.current *(window.innerHeight/100);
        tempVar.current=tempVar.current-stickyHeight.current;

        parentFuncCall.current = props.callOnElementClick;

        return {scrolled:false, selectedEle:0};
    });

    const setSelectedEle=(eleIndex)=>{
        let root = document.querySelector(':root');
        root.style.setProperty('--i',eleIndex.toString());
        setNavState((prevState)=>{
            var newState = {...prevState};
            newState.selectedEle = eleIndex;
            return newState;
        });
    }

    const handleScroll=(element)=>{
        var scrolled=false;
        if(window.scrollY>=tempVar.current) 
            scrolled=true;

        return scrolled;
    };

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            setNavState((prevState)=>{
                var newState = {...prevState};
                newState.scrolled=handleScroll(document.querySelector('.sticky-bar'));
                return newState;
            });
        });
        setSelectedEle(0);
    },[]);

    return (
    <nav className="navbar" style={{position:(navState.scrolled?'fixed':"static"), 
        top:(navState.scrolled?`${stickyHeight.current}px`:'')} } >
            <div className="nav-items-container">
                <div className="nav-bottom-slider"></div>
                {props.children.map((element,index)=>{
                    return <div key={index} onClick={()=>{
                        if(navState.selectedEle==index) return;
                        setSelectedEle(index);
                        parentFuncCall.current(index);
                        }}>
                        {element}
                    </div>
                })}
            </div>
    </nav>
    );
}

export default NavComponent;