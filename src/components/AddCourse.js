import React, { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import CRUDControllers from './../controllers/CRUDControllers';


function AddCourse() {

    //const [record, setRecord] = useState([]);

    const crudControllers = new CRUDControllers();

    //const [toggleHeading, setToggleHeading] = useState(true);

    const [course, setCourse] = useState({
        courseName : "",
        courseDescription : ""
    });


    const handleInputChange = ( event ) => {

        const name = event.target.name;
        //console.log(name);
        const value = event.target.value;
        //console.log(value);
        setCourse( { ...course, [name] : value } );
    }

    const handleSubmit = ( event ) => {

        event.preventDefault();
        //console.log( course );
        //const newCourse = { ...course };
        //setRecord( [ ...record, newCourse]);
        console.log(course);
        addCourseToServer(course);
        setCourse({ courseName : "" , courseDescription : ""});
    }

    //adding new course to server
    const addCourseToServer = (course) => {
        crudControllers.saveCourse(course).then(
            (response) => {
                console.log(response);
                console.log("Success");

            },
            (error) => {
                console.log(error);
                console.log("Failed");
            }
        )
    }

    return (

        <div>

            {/*
            <Form>

                <FormGroup row>
                    <Label for="name" sm={2} > Name </Label>
                    <Col sm={10}>
                        <Input id="name" name="name" placeholder="Virat Kohli" type="text"  />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="mail" sm={2} > Email </Label>
                    <Col sm={10}>
                        <Input id="mail" name="email" placeholder="abc@xyz.com" type="email"  />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="password" sm={2} > Password </Label>
                    <Col sm={10}>
                        <Input  id="password" name="password" placeholder="" type="password" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="select" sm={2} > Occupation </Label>
                    <Col sm={10}>
                        <Input id="select" name="select" type="select" >
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                            <option>
                                4
                            </option>
                            <option>
                                5
                            </option>
                        </Input>
                    </Col>
                </FormGroup>
                

                <FormGroup row>
                    <Label for="profile" sm={2} > Profile Picture </Label>
                    <Col sm={10}>
                        <Input id="profile" name="profile" type="file" />
                    </Col>
                </FormGroup>
                
                <FormGroup>
                        <Button>
                            Submit
                        </Button>
                </FormGroup>
            </Form>
        */}

            <Form action="" onSubmit={ handleSubmit } >
                <FormGroup row>
                    <Label for="courseName" sm={2} > Course Name </Label>
                    <Col sm={10}>
                        <Input id="courseName" autoComplete="off" name="courseName" 
                        value={course.courseName} 
                        placeholder="Java" 
                        onChange={handleInputChange}
                        type="text" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="courseDescription" sm={2} > Course Description </Label>
                    <Col sm={10}>
                        <Input id="courseDescription" autoComplete="off" name="courseDescription" 
                        value={course.courseDescription} 
                        placeholder="This is Java" 
                        onChange={handleInputChange}
                        type="text" />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button type="submit">
                        Submit
                    </Button>
                </FormGroup>

            </Form>

            {/*<ViewCourses record = { record } /> */}


        </div>
    );
}

export default AddCourse;