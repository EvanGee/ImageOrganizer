import React from 'react';



const Image = ({ img, section }) => {


    const drag = (e) => {
        e.dataTransfer.setData("text", JSON.stringify({img, section}))
       // console.log(section.name)
       // e.dataTransfer.setData("text", img.id);
    }

    const dragOver = (e) => {
        console.log(img.id)
    }

    return (
        <div className="imgs">

           <img onDragOver={(e)=>dragOver(e)} className="imgs" id={img.id} onDragStart={(e) => drag(e)}  draggable="true"  src={img.src} alt="" />
        </div>
    )

}

export default Image