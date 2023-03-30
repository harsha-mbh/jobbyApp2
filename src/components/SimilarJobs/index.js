import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <Link to={`jobs/${id}`} className="similar-job-item-link">
      <li className="similar-job-card">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <p className="rating">
              <AiFillStar color="#fbbf24" />
              {rating}
            </p>
          </div>
        </div>
        <h1 className="sub-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
        <div className="location-package-container">
          <div className="mini-details-container">
            <ImLocation color="#ffffff" />
            <p className="location">{location}</p>
          </div>
          <div className="mini-details-container">
            <BsBriefcaseFill color="#ffffff" />
            <p className="employment-type">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobs
