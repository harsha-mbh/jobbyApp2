import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import SkillItem from '../SkillItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {jobData: {}, apistatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobItemData()
  }

  getJobItemData = async () => {
    this.setState({apistatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const updatedJobDetails = {
        id: jobDetails.id,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
        location: jobDetails.location,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        packagePerAnnum: jobDetails.package_per_annum,
      }
      const updatedSimilarJobs = similarJobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        title: eachJob.title,
        rating: eachJob.rating,
      }))
      this.setState({
        apistatus: apiStatusConstants.success,
        jobData: updatedJobDetails,
        similarJobsData: updatedSimilarJobs,
      })
    } else {
      this.setState({apistatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => this.getJobItemData()

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <Header />
      <div className="job-item-page-container">
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-image"
          />
          <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
          <p className="jobs-failure-description">
            We cannot seem to find the page you are looking for
          </p>
          <button
            type="button"
            className="retry-btn"
            onClick={this.onClickRetry}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData
    const updatedLifeAtCompany = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    const {description, imageUrl} = updatedLifeAtCompany
    return (
      <>
        <Header />
        <div className="job-item-page-container">
          <div className="job-item-details-card">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
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
            <div className="heading-container">
              <h1 className="sub-heading">Description</h1>
              <a href={companyWebsiteUrl} className="hyperlink">
                Visit
              </a>
              <BiLinkExternal color="blue" />
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1 className="sub-heading">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachSkill => (
                <SkillItem key={eachSkill.name} skill={eachSkill} />
              ))}
            </ul>
            <h1 className="sub-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
          <div className="similar-jobs-container">
            <h1 className="similar-jobs-heading">Similar Jobs</h1>
            <ul className="similar-jobs-list-container">
              {similarJobsData.map(similarJob => (
                <SimilarJobs key={similarJob.id} similarJob={similarJob} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobItemDetails
