import React from 'react';
import {Link} from 'react-router-dom';
import './CoursesListStyle.css';
import editIcon from './edit.svg';
import deleteIcon from './delete.svg';

class SearchInput extends React.Component {
    render() {
        return (
          <input
            className = "search"
            placeholder="Search"
            type="text"
            value={this.props.value}
            onChange={e => this.props.onChange(e.target.value)}
          />
        );
      }
}

class CourseItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleBtn = () => {
        this.setState({isOpen: !this.state.isOpen});
    };

    render() {
        const { name, description, duration, date } = this.props.course;
        const course = this.props.course;
        return (
            <div className="list-wrapper">
                <div>{date}</div>
                <div style={{fontWeight:"bold"}}>{name}</div>
                <div>{description}</div>
                <div>{duration}</div>
                
                <div>
                    <span className="toggle-points" onClick={this.toggleBtn}>...</span>
                    {this.state.isOpen ? (
                    <div style={{position: "relative"}}>
                        <div className="popup-menu">
                        <div className="popup-content"></div>
                            <Link to={`/edit/${course.id}`}>
                                <img src={editIcon} alt="edit" width="12px" height="12px" className="icon"/>Edit
                            </Link>
                            <div 
                                onClick={() => {
                                    this.props.delete(this.props.course.id)}
                                } 
                                style={{cursor:"pointer"}}
                            >
                                <img src={deleteIcon} alt="delete" width="12px" height="12px" className="icon"/>Delete
                            </div>
                        </div>
                    </div>
                    ) : null}
                </div>
            </div>
        );
    }
  }
  
  class CoursesList extends React.Component {
      render() {
          return (
            <div>
                {this.props.courses.map(course => ( 
                    <CourseItem 
                        key={course.id}
                        course={course}
                        delete={this.props.delete}
                    />)
                )}
            </div>
          );
        }
  }

class CoursesListFiltered extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search : ""
        };
    }

    searchCourses = () => {
        return this.props.courses.filter(course => {
          return  course.name.toLowerCase().includes(this.state.search.toLowerCase())
        });
    };
    changeSearch = searchStr => this.setState({ search: searchStr });

    render() {
        return (
            <div>
                <div className="search-container">
                    <SearchInput 
                        placeholder="Search"
                        value={this.state.search}
                        onChange={this.changeSearch}/>
                    <Link to="/add_course" className="add-btn">
                        Add Course
                    </Link>
                </div>
                <CoursesList
                    courses={this.searchCourses()}
                    delete={this.props.delete}/>
            </div>
        );
    }
}

export default CoursesListFiltered;