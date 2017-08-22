import React from 'react';
import Image from "./Image"

const Section = ({section, addToSection, classname, updateName}) => {
  
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

  const updateSecName = (e) => {
    updateName(section.id, e.target.value)

  }

    return (
            <div onDrop={(e) =>drop(e)} onDragOver={(e)=>allowDrop(e)} className={classname} id={section.id} >
              <div className="sectionNames" >
                <input type="text" name="name" value={section.name} onChange={updateSecName}/>
                </div>
              
                {
                    section.imgs.map((d, i)=><Image img={d} i={i} key={i}/>)
                } 
            </div>
    )
}

export default Section

//<span className="fa fa-pencil fa-2x" aria-hidden="true" onClick></span>
              
