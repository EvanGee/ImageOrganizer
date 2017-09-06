import React from 'react';



const Image = ({
    img,
    section,
    prepareMove,
    extraClass,
    highLighted,
    buttonsDown,
    setButtonDown
    }) => {

    const dragStart = (e) => {
        e.dataTransfer.setData("text", JSON.stringify({ img, section }))
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

    const onMouseDown = e => {
        setButtonDown("0", 1)
        highLighted(section, img)
    }

    const onMouseOver = e => {
        if (buttonsDown[0] > 0 && e.shiftKey)
            highLighted(section, img)
    }


    return (
        <div
            onDragLeave={e => dragLeave(e)}
            onDragEnd={e => dragEnd(e)}
            onDragEnter={e => dragEnter(e)}
            onDragOver={e => dragOver(e)}
            className={img.classes.join(" ") + " " + extraClass}
            onDragStart={e => dragStart(e)}
            onMouseDown={e => onMouseDown(e)}
            onMouseOver={e=>onMouseOver(e)}
            draggable="true"
            style={{ backgroundImage: `url(${img.src})` }}
            alt=""
            id={img.id}>

        </div>
    )

}

export default Image