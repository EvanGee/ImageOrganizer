import React from 'react';
import Image from "./Image"

const Section = ({section, addToSection}) => {
  
  const drop = (e) => {
    e.preventDefault();

    var imgId = e.dataTransfer.getData("text");
    var child = document.getElementById(imgId)

    var oldSection = child.parentElement
    var newSection = e.target
    var newSectionId = newSection.id
    console.log(newSectionId)
    console.log(e.target)
    var oldSectionId = oldSection.id
    //addToSection(newSectionId, {id: imgId, src: child.src})
  }
  
  const allowDrop = (e) => {
    e.preventDefault();
  }

    return (
            <div onDrop={(e) =>drop(e)} onDragOver={(e)=>allowDrop(e)} className="sections" id={section.id} >
    
                {section.name}
                {
                    section.imgs.map((d, i)=><Image img={d} i={i}/>)
                } 
            </div>
    )
}

export default Section


