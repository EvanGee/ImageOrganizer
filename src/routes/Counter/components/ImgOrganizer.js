import React from 'react'
import PropTypes from 'prop-types'
import Section from "./Section"
import Image from "./Image"
import QueueSection from "./QueueSection"
const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
}

export const imgOrganizer = ({ sections, imgQueue, addImage, addSection, addToImgQueue, addToSection, updateName, download }) => {
  

  return (
    <div >
      <div className="App-header">

        <span className="fa fa-cloud-download fa-4x downloadButn col-3" aria-hidden="true" onClick={download}></span>

        <button onClick={() => addSection()} className="sectionAddButt">Add A new section</button>
      </div>

      <div className="row" >
        <div className="col-3">
          <QueueSection section={imgQueue} addToSection={addToImgQueue} classname={"imgQueue"} addImage={addImage} />
        </div>
        <div className="col-9">
          {
            sections.map((d, i) => <Section section={d} key={i} addToSection={addToSection} classname={"sections"} updateName={updateName} />)
          }
        </div>

      </div>
      <div className="row">
      </div>
    </div>
  )
}
imgOrganizer.propTypes = {

}

export default imgOrganizer
//<span className="fa fa-trash fa-4x trashButn col-9" aria-hidden="true"></span>
