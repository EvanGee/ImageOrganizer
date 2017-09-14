import React from 'react';
import Image from "./Image"
import DragSortableList from 'react-drag-sortable'

const Section = ({
  section,
  addToSection,
  classnames,
  updateName,
  moveImg,
  prepareMove,
  deleteSection,
  isHighlighted,
  moveHiglighted,
  highLighted,
  buttonsDown,
  setButtonDown,
  addClass,
  removeClass
}) => {

  const drop = (e) => {
    e.preventDefault();
    var imgInfo = e.dataTransfer.getData("text")
    imgInfo = JSON.parse(imgInfo)
    setButtonDown(0, 0)

    //moving within a section
    if (imgInfo.section.id === section.id) {
      moveImg(imgInfo.section, imgInfo.img)

    } else {
      if (isHighlighted) {
        moveHiglighted(section, imgInfo.img)
      } else {
        
        addToSection(section, imgInfo.img)
      }
    }
  }

  const allowDrop = (e) => {
    e.preventDefault();

  }

  const updateSecName = (e) => {
    updateName(section.id, e.target.value)
  }

  const deleteSec = () => {
    if (section.imgs.length > 0) {
      console.log("do you want to delete images too??")
    }
    deleteSection(section)
  }

  const onDragEnter = (e) => {

  }

  const onDragExit = (e) => {
  }


  return (
    <div
      onDrop={e => drop(e)}
      onDragOver={e => allowDrop(e)}
      onDragEnter={e => onDragEnter(e)}
      onDragExit={e => onDragExit(e)}
      className={classnames.join(" ")}
      id={section.id} >
      <div className="sectionNameContainer" >
        <input type="text" name="name" value={section.name} onChange={updateSecName} className="sectionName" />
        <span className="fa fa-times fa-2x closeX" onClick={() => deleteSec()} aria-hidden="true" />
      </div>
      {
        section.imgs.map((d, i) => <Image extraClass="sectionImg" img={d} i={i} key={i} {...{ section, prepareMove, highLighted, buttonsDown, setButtonDown, addClass, removeClass }} />)
      }
    </div>
  )
}

export default Section

//<span className="fa fa-pencil fa-2x" aria-hidden="true" onClick></span>

