import './index.css'

const NotFound = () => (
  <div className="failure-card">
    <img
      className="failure-img"
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
    />
    <h1 className="heading">Page Not FOund</h1>
    <p className="failure-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
