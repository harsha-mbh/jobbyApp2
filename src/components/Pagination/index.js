import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md'
import './index.css'

const Pagination = props => {
  const {currentPage, onClickNextPage, onClickPrevPage, totalPages} = props

  const onClickPrevBtn = () => {
    onClickPrevPage()
  }

  const onClickNextBtn = () => {
    onClickNextPage()
  }

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="page-click-button"
        onClick={onClickPrevBtn}
      >
        <MdNavigateBefore width={20} height={20} color="#334155" />
      </button>
      <p className="page-numbers">{`${currentPage} of ${totalPages}`}</p>
      <button
        type="button"
        className="page-click-button"
        onClick={onClickNextBtn}
      >
        <MdNavigateNext width={20} height={20} color="#334155" />
      </button>
    </div>
  )
}

export default Pagination
