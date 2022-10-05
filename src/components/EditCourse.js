import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function EditCourse() {

    const [cid, setCid] = useState(true);

    const { courseId } = useParams();

    const [course, setCourse] = useState({
        courseName : "",
        courseDescription : ""
    });

    const id = parseInt(courseId);


    useEffect(() => {
        document.title = "Edit Course | Course App";
        getCourseFromServer();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCourseFromServer = () => {
        axios.get(`http://localhost:9191/course/${id}`).then(
            (response) => {
                console.log(response.data);
                setCourse(response.data);
            },
            (error) => {
                console.log(error);
            }

        )
    }

    const handleInputChange = ( event ) => {

        const name = event.target.name;
        const value = event.target.value;
        setCourse( { ...course, [name] : value } );
    }

    const handleSubmit = ( event ) => {

        event.preventDefault();
        console.log(course);
        addCourseToServer(course);
        setCourse({ courseName : "" , courseDescription : ""});
    }

    //adding updated course to server
    const addCourseToServer = (course) => {

        axios.put(`http://localhost:9191/course`, course).then(
            (response) => {
                console.log("Success");
                setCid(false);

            },
            (error) => {
                console.log(error);
                console.log("Failed");
            }
        )
    }

    //console.log({ courseId } );

    return (
        <div>
            <h1>Edit Course</h1>
            {
                cid ? <h2> Course Id: {course.courseId} </h2> : ""
            }

            <Form action="" onSubmit={handleSubmit} >
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

        </div>
    )
};


export default EditCourse;