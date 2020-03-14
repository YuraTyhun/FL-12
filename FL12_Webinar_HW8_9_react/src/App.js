import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import CoursesListFiltered from './components/Courses/CoursesListFiltered';
import NewCourse from './components/CourseCreateOrEdit/NewCourse';
import EditCourse from './components/CourseCreateOrEdit/EditCourse';
import coursesTest from './courses.json';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: coursesTest
    };
  }
  
  addCourse = newCourse => {
    this.setState({ courses: [...this.state.courses, newCourse] });
  };

  deleteCourse = id => {
    const {courses} = this.state;
    this.setState({courses: courses.filter(course => course.id !== id)})
  };

  getNewCourseId = () => {
    const { courses } = this.state;
    const maximumId = courses.length ? Math.max(...courses.map(course => course.id)) : 0;
    return maximumId + 1;
  };

  createNewCourse = () => {
    return {
      id: this.getNewCourseId(),
      name: "",
      description: "",
      duration: "",
      authors: "",
      date: ""
    };
  };

  updateCourseItem = updCourse => {
    const {courses} = this.state;
    courses.splice(courses.findIndex(course => course.id === updCourse.id),1,updCourse);
    this.setState({courses});
  };

  copyCourseId = id => {
    return {...this.state.courses.find(course => course.id === id)}
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className='container'>
              <Switch>
                <Route path='/' exact>
                  <CoursesListFiltered 
                    courses={this.state.courses}
                    delete={this.deleteCourse}
                  />
                </Route>
                <Route path='/add_course'>
                  <NewCourse
                    page="New course" 
                    course={this.createNewCourse()}
                    save={this.addCourse}
                  />
                </Route>
                <Route path='/edit/:id'>
                  <EditCourse
                    page="Edit course"
                    copy={this.copyCourseId}
                    save={this.updateCourseItem}
                    courses={this.state.courses}
                  />
                </Route>
              </Switch>
          </div>
        </BrowserRouter>
      </div>
      
          
    );
  }
}

export default App;
