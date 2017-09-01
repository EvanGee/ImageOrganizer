import React from 'react';



const Image = ({ img, section, prepareMove }) => {


    const dragStart = (e) => {
        e.dataTransfer.setData("text", JSON.stringify({ imgId: img.id, sectionId: section.id }))
        //var dragImg = document.createElement('img');
        //dragImg.src = img.src
        //e.dataTransfer.setDragImage(dragImg, 0, 0);
        //e.target.classList.add("dragging")

    }

    const dragOver = (e) => {
        prepareMove(img)
    }

    const dragEnter = (e) => {
        //e.target.classList.add("draggedOver")
    }

    const dragLeave = (e) => {
       // e.target.classList.remove("draggedOver")
    }

    const dragEnd = (e) => {
        //e.target.classList.remove("dragging")
        //e.target.classList.remove("draggedOver")
    }

    return (
        <div className="imgContainer">

            <img
                onDragLeave={(e) => dragLeave(e)}
                onDragEnd={(e) => dragEnd(e)}
                onDragEnter={(e) => dragEnter(e)}
                onDragOver={(e) => dragOver(e)}
                className={img.classes.join(" ")} id={img.id}
                onDragStart={(e) => dragStart(e)}
                draggable="true" src={img.src} alt="" />

        </div>
    )

}

export default Image