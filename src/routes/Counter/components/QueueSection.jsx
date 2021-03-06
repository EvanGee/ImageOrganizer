import React from 'react';
import Image from "./Image"

const Section = ({ 
  section, 
  addToImgQueue, 
  classname, 
  addImage, 
  prepareMove, 
  addToSection, 
  moveImg,
  highLighted,
  isHighlighted,
  moveHiglighted,
  buttonsDown,
  setButtonDown,
  addClass,
  removeClass,
  removePlaceHolder
  
}) => {

  const drop = (e) => {
    e.preventDefault();
    var imgInfo = e.dataTransfer.getData("text")
    imgInfo = JSON.parse(imgInfo)

    if (isHighlighted){
      moveHiglighted(section, imgInfo.img)
    }
    else if (imgInfo.section.id === section.id) {
      moveImg(imgInfo.section, imgInfo.img)

    } else {
      addToImgQueue(section, imgInfo.img)
    }
  }

  const allowDrop = (e) => {
    e.preventDefault();
  }


  return (
    <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={classname} id={section.id} >

      <div className="QueueContainer center" >
        {
          section.imgs.map((d, i) => {
            return <Image img={d} extraClass="imgQueueImg" i={i} key={i} {...{ section, prepareMove, highLighted, buttonsDown, addClass,
  removeClass, setButtonDown, removePlaceHolder }} />}
            )
        }
      </div>
    </div>
  )
}

export default Section


