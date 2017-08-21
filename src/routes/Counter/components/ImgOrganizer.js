import React from 'react'
import PropTypes from 'prop-types'
import Section from "./Section"
import Image from "./Image"

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
}

export const imgOrganizer = ({ sections, imgQueue, addImage, addSection, addToImgQueue, addToSection}) => {
  return (
    <div >
      <div className="App-header">

        <label className="dropButt">
          <span>drop files here</span>
          <input type="file" style={{ display: "none" }} multiple onChange={(e) => addImage(e)} />
        </label>

        <button onClick={() => addSection()} className="sectionAddButt">Add A new section</button>

      </div>
      <div className="row" >
        <div className="col-3">
        <Section section={imgQueue} addToSection={addToImgQueue} classname={"imgQueue"}/>
        </div>
        <div className="col-9">
        {
          sections.map((d, i) => <Section section={d} key={i} addToSection={addToSection} classname={"sections"} />)
        }
        </div>
      </div>
      
    </div>
  )
}
imgOrganizer.propTypes = {

}

export default imgOrganizer
