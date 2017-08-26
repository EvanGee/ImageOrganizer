import React from 'react';
import Image from "./Image"

import DragSortableList from 'react-drag-sortable'
const Section = ({ section, addToSection, classname, addImage }) => {

  const drop = (e) => {
    e.preventDefault();

    var imgInfo = e.dataTransfer.getData("text")
    imgInfo = JSON.parse(imgInfo)
    console.log(imgInfo)
    if (imgInfo.section.id === section.id){
      console.log("THIS IS THE SAME SECTION")
    } else {
      console.log("THIS IS A DIFFERENT SECTION")
    }
   // var imgId = e.dataTransfer.getData("text");
    //var child = document.getElementById(imgId)

    //addToSection(section.id, { id: imgId, src: child.src })
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  var onSort = function (sortedList, dropEvent) {
    console.log("sortedList", sortedList, dropEvent);
  }




  return (
    <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={classname} id={section.id} >
      <label className="dropButt">
        <span>Upload Files</span>
        <input type="file" style={{ display: "none" }} multiple onChange={(e) => addImage(e)} />
      </label>
      <div className="QueueContainer center" >
        {
          section.imgs.map((d, i) => <Image img={d} i={i} key={i} section={section} />)
        }
      </div>
    </div>
  )
}

export default Section


