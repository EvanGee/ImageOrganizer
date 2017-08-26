import React from 'react';



const Image = ({ img, section, prepareMove }) => {

    
    const drag = (e) => {
        e.dataTransfer.setData("text", JSON.stringify({img, section}))
    }
    
    const dragOver = (e) => {
        prepareMove(img)
    }

    return (
        <div className="imgs">

           <img onDragOver={(e)=>dragOver(e)} className="imgs" id={img.id} onDragStart={(e) => drag(e)}  draggable="true"  src={img.src} alt="" />
        </div>
    )

}

export default Image