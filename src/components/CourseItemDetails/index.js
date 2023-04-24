import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiConstantStatus.initial, courseDetails: {}}

  componentDidMount() {
    this.getFullDetails()
  }

  getFullDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiConstantStatus.inProgress})

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        apiStatus: apiConstantStatus.success,
        courseDetails: fetchedData,
      })
    } else {
      this.setState({apiStatus: apiConstantStatus.failure})
    }
  }

  getFullCourses = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="course-card">
        <img src={imageUrl} className="course-img" alt={name} />
        <div>
          <h1 className="heading">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getFullDetails()
  }

  onLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failureView = () => (
    <div className="failure-card">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-btn"
        type="button"
        alt="failure retry"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  allRenderStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.getFullCourses()
      case apiConstantStatus.inProgress:
        return this.onLoadingView()
      case apiConstantStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return <div className="course-full-details">{this.allRenderStatus()}</div>
  }
}

export default CourseItemDetails
