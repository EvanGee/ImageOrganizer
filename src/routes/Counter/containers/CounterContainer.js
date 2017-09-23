import { connect } from 'react-redux'
import { addImage, addSection, addToSection, addToImgQueue,
        updateName, download, move_img, prepare_move, deleteSection,
        highLighted, moveHiglighted, setButtonDown, addClass,
        removeClass, changeDownloadName} from '../modules/counter'


/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import page from '../components/ImgOrganizer'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch) => ({
  addImage : (e) => dispatch(addImage(e)),
  addSection : () => dispatch(addSection()),
  addToImgQueue   : (section, img) => dispatch(addToImgQueue(section, img)),
  addToSection : (section, img) => dispatch(addToSection(section, img)),
  highLighted: (section, img) => dispatch(highLighted(section, img)),
  updateName: (sectionId, name) => dispatch(updateName(sectionId, name)),
  download: () => dispatch(download()),
  moveImg: (section, img) => dispatch(move_img(section, img)),
  prepareMove: (imgToDropOn, direction) => dispatch(prepare_move(imgToDropOn, direction)),
  deleteSection: (section) => dispatch(deleteSection(section)),
  moveHiglighted: (section, extraImg) => dispatch(moveHiglighted(section, extraImg)),
  setButtonDown: (btnNum, val) => dispatch(setButtonDown(btnNum, val)),
  addClass: (item, clas) => dispatch(addClass(item, clas)),
  removeClass: (item, clas) => dispatch(removeClass(item, clas)),
  changeDownloadName: (name) => dispatch(changeDownloadName(name))
})


const mapStateToProps = (state) => ({
  imgQueue : state.imgOrganizer.imgQueue,
  sections : state.imgOrganizer.sections,
  isHighlighted: (() => state.imgOrganizer.highLighted.length > 0)(),
  buttonsDown: state.imgOrganizer.buttonsDown,
  downloadName: state.imgOrganizer.downloadName
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(page)
