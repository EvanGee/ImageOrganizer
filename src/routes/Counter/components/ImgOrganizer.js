import React from 'react'
import PropTypes from 'prop-types'
import Section from "./Section"
import Image from "./Image"
import QueueSection from "./QueueSection"
const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
}

export const imgOrganizer = (props = {
  sections,
  imgQueue,
  addImage,
  addSection,
  addToImgQueue,
  addToSection,
  updateName,
  download,
  moveImg,
  prepareMove,
  deleteSection
}) => {


  return (
    <div >
      <div className="App-header row">
        <label className="col-xs-6 col-sm-2 col-md-2 col-lg-2 btn hand">
          <span>Upload</span>
          <input type="file" style={{ display: "none" }} className="inputBtn" multiple onChange={(e) => props.addImage(e)} />
        </label>
        <span className="col-xs-6 col-sm-2 col-md-2 col-lg-2 hand btn" aria-hidden="true" onClick={props.download}>Export</span>
        <span className="col-xs-0 col-sm-4 col-md-5 col-lg-5" /> 
        <span className="col-xs-12 col-sm-2 col-md-2 col-lg-2 name">Your name here</span>
      </div>

      <div className="row" >
        <div className="col-3">
          <QueueSection section={props.imgQueue} {...props} classname={"imgQueue"} />
        </div>
        <div className="col-9">
          {
            props.sections.map((section, i) => <Section key={i} section={section} classnames={["sections"]}  {...props} />)
          } 
          <span onClick={() => props.addSection()} className="sectionAddButt fa fa-plus-circle fa-3x hand"  aria-hidden="true"></span>
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
