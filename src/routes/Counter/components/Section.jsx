import React from 'react';
import Image from "./Image"
import DragSortableList from 'react-drag-sortable'

const Section = ({section, addToSection, classname, updateName}) => {
  
  const drop = (e) => {
    e.preventDefault();
    var imgId = e.dataTransfer.getData("text");
    var child = document.getElementById(imgId)
    addToSection(section.id, {id: imgId, src: child.src})
  }
  
  const allowDrop = (e) => {
    e.preventDefault();
  }

  const updateSecName = (e) => {
    updateName(section.id, e.target.value)
  }

  var onSort = function(sortedList, dropEvent) {
    console.log("sortedList", sortedList, dropEvent);
 }



    return (
            <div onDrop={(e) =>drop(e)} onDragOver={(e)=>allowDrop(e)} className={classname} id={section.id} >
              <div className="sectionNames" >
                <input type="text" name="name" value={section.name} onChange={updateSecName}/>
                </div>
                <DragSortableList items={section.imgs.map((d, i) => ({content: <Image img={d} i={i} key={i} section={section}/>}))}
                 onSort={onSort} 
                type="horizontal" />
            </div>
    )
}

export default Section

//<span className="fa fa-pencil fa-2x" aria-hidden="true" onClick></span>
              
