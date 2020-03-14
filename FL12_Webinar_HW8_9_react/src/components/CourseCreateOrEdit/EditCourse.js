import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import './CourseInfo.css';

class UpdateProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false
        };
    }

    render() {
        const {type, title, propertyName, propertyValue} = this.props;
        
        if(type === 'input') {
            return (
                <div className={`${propertyName}`}>
                    <div>{title}*</div>
                    <input
                        value={propertyValue}
                        onChange={e => {
                            this.props.changeValue(propertyName, e.target.value);
                            this.setState({ isChanged: true });
                        }}
                    />
                </div>
            )
        } else if (type === 'field') {
            return (
                <div className={`${propertyName}`}>
                    <div>{title}*</div>
                    <textarea
                        rows="5"
                        value={propertyValue}
                        onChange={e => {
                            this.props.changeValue(propertyName, e.target.value);
                            this.setState({ isChanged: true });
                        }}
                    />
                </div>
            )
        } else if (type === 'date') {
            return (
                <div className={`${propertyName}`}>
                    <div>{title}*</div>
                    <input
                        type="date"
                        value={propertyValue}
                        onChange={e => {
                            this.props.changeValue(propertyName, e.target.value);
                            this.setState({ isChanged: true });
                        }}
                    />
                </div>
            )
        }    
    }
}

class EditCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: props.copy(parseInt(props.match.params.id))
        };
    }

    changeProperty = (name, value) => {
        this.setState({
          course: { ...this.state.course, [name]: value }
        });
      };


    getCourseProperties = () => {
        const course = this.state.course;
        return Object.keys(course).filter(key => key !== "id");
    }

    render() {
        return (
            
            <div className="course-info">
                <h1 style={{ fontSize: "40px", paddingTop: "25px", textAlign: "center" }}>
                    {this.props.page}
                </h1>
                <div className="fields">
                {this.getCourseProperties().map(property => property === "description" ? 
                (
                    <UpdateProperty
                        type="field"
                        key={property}
                        title={property === "name" ? "Title": property}
                        propertyName={property}
                        propertyValue={this.state.course[property]}
                        changeValue={this.changeProperty}
                    />
                ) : property === "date" ?
                (
                    <UpdateProperty
                        type="date"
                        key={property}
                        title={property === "name" ? "Title": property}
                        propertyName={property}
                        propertyValue={this.state.course[property]}
                        changeValue={this.changeProperty}
                    />
                ) :
                (
                    <UpdateProperty
                        type="input"
                        key={property}
                        title={property === "name" ? "Title": property}
                        propertyName={property}
                        propertyValue={this.state.course[property]}
                        changeValue={this.changeProperty}
                />
                ) 
                )}
                <div className="btn-container">
                    <Route 
                        render={({ history }) => (
                            <button className="save-btn"
                              type="button"
                              onClick={() => { 
                                  this.props.save(this.state.course);
                                  history.push("/");
                              }}
                            >
                              Save
                            </button>
                          )}
                    />
                    <Link to="/" className="cancel-btn">
                        Cancel
                    </Link>
                </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditCourse);