import React from 'react';
import Image from "./Image"

const Section = ({ section, addToImgQueue, classname, addImage, prepareMove, addToSection, moveImg }) => {

  const drop = (e) => {
    e.preventDefault();
    var imgInfo = e.dataTransfer.getData("text")
    imgInfo = JSON.parse(imgInfo)
    if (imgInfo.section.id === section.id) {
      moveImg(imgInfo.section, imgInfo.img)

    } else {
      addToImgQueue(section.id, imgInfo.img)
    }

  }

  const allowDrop = (e) => {
    e.preventDefault();
  }


  return (
    <div onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)} className={classname} id={section.id} >
      <label className="dropButt">
        <span>Upload Files</span>
        <input type="file" style={{ display: "none" }} multiple onChange={(e) => addImage(e)} />
      </label>
      <div className="QueueContainer center" >
        {
          section.imgs.map((d, i) => <Image img={d} i={i} key={i} {...{ section, prepareMove }} />)
        }
      </div>
    </div>
  )
}

export default Section


