import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachItem from '../EachItem'

import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courseList: [], isStatus: apiConstantStatus.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isStatus: apiConstantStatus.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        isStatus: apiConstantStatus.success,
        courseList: fetchedData,
      })
    } else {
      this.setState({isStatus: apiConstantStatus.failure})
    }
  }

  getAllCourses = () => {
    const {courseList} = this.state
    return (
      <ul className="all-course-list">
        {courseList.map(each => (
          <EachItem eachCourse={each} key={each.id} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getData()
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
    const {isStatus} = this.state

    switch (isStatus) {
      case apiConstantStatus.success:
        return this.getAllCourses()
      case apiConstantStatus.inProgress:
        return this.onLoadingView()
      case apiConstantStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Courses</h1>
        <div className="result">{this.allRenderStatus()}</div>
      </div>
    )
  }
}

export default Home
