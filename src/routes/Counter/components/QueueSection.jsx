import React from 'react';
import Image from "./Image"

import DragSortableList from 'react-drag-sortable'
const Section = ({ section, addToSection, classname, addImage }) => {

  const drop = (e) => {
    e.preventDefault();

    var imgId = e.dataTransfer.getData("text");
    var child = document.getElementById(imgId)
    var oldSection = child.parentElement

    addToSection(section.id, { id: imgId, src: child.src })
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  var onSort = function(sortedList, dropEvent) {
    console.log("sortedList", sortedList, dropEvent);
 }




  return (
    <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={classname} id={section.id} >
      <label className="dropButt">
        <span>Upload Files</span>
        <input type="file" style={{ display: "none" }} multiple onChange={(e) => addImage(e)} />
      </label>
      <div className="QueueContainer center" >
        <DragSortableList items={section.imgs.map((d, i) => ({ content: <Image img={d} i={i} key={i} section={section} /> }))}
          onSort={onSort}
          type="horizontal" />
      </div>
    </div>
  )
}

export default Section


