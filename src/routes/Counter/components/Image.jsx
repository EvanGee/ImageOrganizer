import React from 'react';



const Image = ({
    img,
    section,
    prepareMove,
    extraClass,
    highLighted,
    buttonsDown,
    setButtonDown,
    addClass,
    removeClass
    }) => {

    const dragStart = (e) => {
        e.dataTransfer.setData("text", JSON.stringify({ img, section }))
        //var dragImg = document.createElement('img');
        //dragImg.src = img.src
        //e.dataTransfer.setDragImage(dragImg, 0, 0);
        //e.target.classList.add("dragging")


    }

    const dragOver = (e) => {

        var rect = e.target.getBoundingClientRect();
        var x = e.clientX
        var y = e.clientY
        var midX = (rect.right - rect.left) / 2
        var midX = rect.right - midX
        var midY = (rect.bottom - rect.top) / 2
        var midY = rect.bottom - midY
        var direction =
            {
                left: false,
                top: false,
                bottom: false,
                right: false
            }

        if (x < midX) {
            direction.left = true
          
        } else {
            direction.right = true
        }
        if (y < midY) {
            direction.top = true
        } else {
            direction.bottom = true
        }
        prepareMove(img, direction)
        //should probably add a place holder image or something instead of css
        if (direction.left === true) {
            addClass(img, "moveLeft");
        }
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
        setButtonDown(0, 1)
        if (e.shiftKey)
            highLighted(section, img)
    }

    const onMouseUp = e => {
        setButtonDown(0, 0)
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
            onMouseOver={e => onMouseOver(e)}
            onMouseUp={e => onMouseUp(e)}
            draggable="true"
            style={{ backgroundImage: `url(${img.src})` }}
            alt=""
            id={img.id}>

        </div>
    )

}

export default Image