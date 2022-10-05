import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Container } from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";

function Course({ course, update }) {

    const deleteCourse = (id) => {

        console.log(id);

        axios.delete(`http://localhost:9191/course/${id}`).then(
            (response) => {
                console.log(response)
                //
                update(id);

            },
            (error) => {
                console.log(error);
            }
        )
    }


    return (

        <div>
            <Card>
                <CardBody>
                    {/* <CardSubtitle className="font-weight-bold"> Java 8 Course </CardSubtitle>
                    <CardText> This is a java course </CardText> */}
                    <CardTitle> Course Id : {course.courseId} </CardTitle>
                    <CardSubtitle className="font-weight-bold"> {course.courseName} </CardSubtitle>
                    <CardText> {course.courseDescription} </CardText>
                    <Container className="text-center">
                        <Button tag = {Link} to={`/edit-course/${course.courseId}` } color="warning" > Update </Button>
                        <Button className="bg-danger ms-2" onClick={() => deleteCourse(course.courseId)}> Delete </Button>
                    </Container>
                </CardBody>
            </Card>

        </div>

    );
}



export default Course;