import React from 'react';



const Section = ({ img, holdDrag }) => {

    const drag = (e) => {
        holdDrag(img)
        e.dataTransfer.setData("text", img.id);
    }
    return <img className="imgs" id={img.id} draggable="true" onDragStart={(e) => drag(e)} src={img.src} alt="" />

}

export default Section