import React, { useEffect, useState } from "react";
import "./MainComponent.css";

function MainComponent(props){

    const [mainState,setMainState] = useState({selectedPage:0});

    useEffect(()=>{
        let root = document.querySelector(":root");
        root.style.setProperty("--no-of-pages", props.children.length.toString());
    },[]);
    useEffect(()=>{
        let root = document.querySelector(":root");
        root.style.setProperty("--no-of-pages", props.children.length.toString());
        root.style.setProperty("-selected-page",props.activeEle);
        setMainState((prevState)=>{
            var newState = {...prevState};
            newState.selectedPage=props.activeEle;
        });
    },[props.activeEle]);


    return (<main className="main-compo">
        <div className="page-container">
            {props.children.map((element,index)=>{
                //element.style.setProperty('key',index.toString());
                return element;
                // return <div key={index}>
                //     {element}
                //     </div>
            })}
        </div>
    </main>);
}

export default MainComponent;