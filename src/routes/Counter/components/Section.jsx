import React from 'react';
import Image from "./Image"
import DragSortableList from 'react-drag-sortable'

const Section = ({
  section,
  addToSection,
  classname,
  updateName,
  moveImg,
  prepareMove
}) => {

  const drop = (e) => {
    e.preventDefault();
    var imgInfo = e.dataTransfer.getData("text")
    imgInfo = JSON.parse(imgInfo)
    if (imgInfo.section.id === section.id) {
      moveImg(imgInfo.section, imgInfo.img)

    } else {
      addToSection(section.id, imgInfo.img)
    }
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }

  const updateSecName = (e) => {
    updateName(section.id, e.target.value)
  }

  return (
    <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={classname} id={section.id} >
      <div className="sectionNames" >
        <input type="text" name="name" value={section.name} onChange={updateSecName} />
      </div>
      {
        section.imgs.map((d, i) => <Image img={d} i={i} key={i} {...{ section, prepareMove }} />)
      }
    </div>
  )
}

export default Section

//<span className="fa fa-pencil fa-2x" aria-hidden="true" onClick></span>

