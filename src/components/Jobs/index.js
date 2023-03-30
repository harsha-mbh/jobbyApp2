import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import FiltersGroup from '../FiltersGroup'
import Pagination from '../Pagination'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: {},
    jobsApiStatus: apiStatusConstants.initial,
    profileApiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentTypeQuery: [],
    minimumpackageQuery: '',
    currentPage: 1,
    totalPages: '',
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfileData()
  }

  onClickNextPage = () => {
    const {totalPages, currentPage} = this.state
    if (currentPage < totalPages) {
      this.setState(prevState => ({currentPage: prevState.currentPage + 1}))
    }
  }

  onClickPrevPage = () => {
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(prevState => ({currentPage: prevState.currentPage - 1}))
    }
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.loading})
    const {searchInput, employmentTypeQuery, minimumpackageQuery} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${minimumpackageQuery}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedData = data.jobs
    const updatedData = fetchedData.map(eachJob => ({
      id: eachJob.id,
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({
      jobsList: updatedData,
      totalPages: Math.ceil(updatedData.length / 5),
      jobsApiStatus: apiStatusConstants.success,
    })
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({profileApiStatus: apiStatusConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = data.profile_details
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedProfileDetails,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeMinSalary = id => {
    this.setState({minimumpackageQuery: id}, this.getJobsData)
  }

  onChangeEmploymentType = target => {
    const {id, checked} = target
    this.setState(prevState => {
      const employmentTypeQuery = [...prevState.employmentTypeQuery]
      if (checked) {
        employmentTypeQuery.push(id)
      } else {
        const index = employmentTypeQuery.indexOf(id)
        if (index > -1) {
          employmentTypeQuery.splice(index, 1)
        }
      }
      return {employmentTypeQuery}
    }, this.getJobsData)
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onClickSearchBtn = () => {
    this.getJobsData()
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">Bharath Harsha</h1>
        <p className="short-bio">FullStack Developer</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-container">
      <button
        type="button"
        className="profile-retry-btn"
        onClick={this.onClickRetryProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileLoadingView = () => (
    <div className="profile-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.loading:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList, currentPage, totalPages} = this.state
    const endIndex = currentPage * 5
    const startIndex = endIndex - 5
    const currentJobsList = jobsList.slice(startIndex, endIndex)
    return (
      <>
        <ul className="jobs-list-container">
          {currentJobsList.map(eachJob => (
            <JobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
        <Pagination
          onClickNextPage={this.onClickNextPage}
          onClickPrevPage={this.onClickPrevPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </>
    )
  }

  renderNoJobsView = () => (
    <div className="empty-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsListSuccessView = () => {
    const {jobsList} = this.state
    return jobsList.length === 0
      ? this.renderNoJobsView()
      : this.renderJobsListView()
  }

  renderJobDetails = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  renderFiltersGroup = () => {
    const {minimumpackageQuery, employmentTypeQuery} = this.state
    return (
      <FiltersGroup
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        onChangeMinSalary={this.onChangeMinSalary}
        minimumpackageQuery={minimumpackageQuery}
        employmentTypeQuery={employmentTypeQuery}
        onChangeEmploymentType={this.onChangeEmploymentType}
      />
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="search-profile-container">
            <div className="search-container-mobile">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderProfileDetails()}
            <hr className="separator" />
            {this.renderFiltersGroup()}
          </div>
          <div className="search-jobs-container-desktop">
            <div className="search-container-desktop">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-btn"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
