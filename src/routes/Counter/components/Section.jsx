import React from 'react';
import Image from "./Image"

const Section = ({section, addToSection, classname}) => {
  
  const drop = (e) => {
    e.preventDefault();

    var imgId = e.dataTransfer.getData("text");
    var child = document.getElementById(imgId)
    var oldSection = child.parentElement

    addToSection(section.id, {id: imgId, src: child.src})
  }
  
  const allowDrop = (e) => {
    e.preventDefault();
  }

    return (
            <div onDrop={(e) =>drop(e)} onDragOver={(e)=>allowDrop(e)} className={classname} id={section.id} >
              <div>
                {section.name + " "}
                <span className="fa fa-pencil fa-2x" aria-hidden="true"></span>
              </div>
                {
                    section.imgs.map((d, i)=><Image img={d} i={i} key={i}/>)
                } 
            </div>
    )
}

export default Section


