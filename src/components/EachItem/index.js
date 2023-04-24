import {Link} from 'react-router-dom'

import './index.css'

const EachItem = props => {
  const {eachCourse} = props

  const {id, name, logoUrl} = eachCourse
  return (
    <Link to={`/courses/${id}`}>
      <li className="list-item">
        <img className="course-logo" src={logoUrl} alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default EachItem
