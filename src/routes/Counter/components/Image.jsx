import React from 'react';



const Image = ({ img, section }) => {

    const onDragOver = (e, direction) => {
        console.log(direction)
        console.log(e.target)
    }

    const onDrop = (e, dir) => {
        console.log(section.id)
    }
    const drag = (e) => {
        e.dataTransfer.setData("text", img.id);
    }

    return (
        <div className="imgs">
            <div onDrop={(e)=>onDrop(e, "left")} style={{ width: "50%", float: "left"}}/>
            <div onDragOver={(e)=>onDragOver(e, "right")} style={{ width: "50%", float: "right" }}/>
            <img className="imgs" id={img.id} onDragStart={(e) => drag(e)}  draggable="true"  src={img.src} alt="" />
        </div>
    )

}

export default Image