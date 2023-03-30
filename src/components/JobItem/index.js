import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    jobDescription,
    companyLogoUrl,
    employmentType,
    location,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-item-card">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div className="location-package-container">
          <div className="mini-details-container">
            <ImLocation color="#ffffff" />
            <p className="location">{location}</p>
          </div>
          <div className="mini-details-container">
            <BsBriefcaseFill color="#ffffff" />
            <p className="employment-type">{employmentType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="description-container">
          <h1 className="sub-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
