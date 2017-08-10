import React from 'react'
import PropTypes from 'prop-types'
import Section from "./Section"
import Image from "./Image"

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
}

export const imgOrganizer = ({ sections, imgQueue, addImage, addSection, holdDrag }) => {
  return (
    <div style={{ margin: '0 auto' }} >
      <div className="App-header">

        <label className="dropButt">
          <span>drop files here</span>
          <input type="file" style={{ display: "none" }} multiple onChange={(e) => addImage(e)} />
        </label>

        <button onClick={() => addSection()} className="sectionAddButt">Add A new section</button>

      </div>


      {
        imgQueue.map((d, i)=> <Image img={d} key={i} holdDrag={holdDrag} />)
      }
      {
        sections.map((d, i) => <Section section={d} i={i} key={i}/>)
      }
      
      
    </div>
  )
}
imgOrganizer.propTypes = {
  imgQueue: PropTypes.array.isRequired,
}

export default imgOrganizer
