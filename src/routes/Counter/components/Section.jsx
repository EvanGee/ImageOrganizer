import React from 'react';
import Image from "./Image"



  const allowDrop = (e) => {
    e.preventDefault();
  }

  const drop = (e) => {
    e.preventDefault();

    var data = e.dataTransfer.getData("text");
    var child = document.getElementById(data)
    var oldSection = child.parentElement
    var newSection = e.target
    //newSection.appendChild(child);

    var newSectionId = newSection.id.substring(1)
    var oldSectionId = oldSection.id.substring(1)

    console.log(newSectionId, oldSectionId)
  }




const Section = ({ section, i }) => {
    return (
            <div onDrop={(e) =>drop(e)} onDragOver={(e)=>allowDrop(e)} className="sections" id={":" + section.name} >
    
                {section.name}
                {
                    section.imgs.map((d, i)=><Image img={d} i={i}/>)
                } 
            </div>
    )
}

export default Section


