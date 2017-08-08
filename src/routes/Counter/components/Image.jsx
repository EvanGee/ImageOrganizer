import React from 'react';
const drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
}


const Section = ({ img, i }) => {
    return <img className="imgs" id={"img" + i} draggable="true" onDragStart={(e) => drag(e)} src={img.src} alt="" />
    
}

export default Section