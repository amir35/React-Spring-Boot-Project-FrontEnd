import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip } from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import CRUDControllers from '../controllers/CRUDControllers';

function Course({ viewCourses, update }) {

    const crudControllers = new CRUDControllers();

    const [viewTooltip, setViewTooltip] = useState(false);
    const [editTooltip, setEditTooltip] = useState(false);
    const [delTooltip, setDelTooltip] = useState(false);

    const toggleView = () => setViewTooltip(!viewTooltip);
    const toggleEdit = () => setEditTooltip(!editTooltip);
    const toggleDel = () => setDelTooltip(!delTooltip);


    const [courses, setCourses] = useState({
        courseId : "",
        courseName : "",
        courseDescription : "",
        courseImage : ""
    });

    useEffect(() => {
        document.title = "Edit Course | Course App";
        setCourses(viewCourses);
        console.log(viewCourses);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //setCourses([...courses, course]);

    const tableHeader = true;

    const deleteCourse = (id) => {

        console.log(id);

        crudControllers.deleteCourse(id).then(
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
            {/*
            <Card>
                <CardBody>
                    {*//* <CardSubtitle className="font-weight-bold"> Java 8 Course </CardSubtitle>
                    <CardText> This is a java course </CardText> *//*}
                    <CardTitle> Course Id : {course.courseId} </CardTitle>
                    <CardSubtitle className="font-weight-bold"> {course.courseName} </CardSubtitle>
                    <CardText> {course.courseDescription} </CardText>
                    <Container className="text-center">
                        <Button tag = {Link} to={`/edit-course/${course.courseId}` } color="warning" > Update </Button>
                        <Button className="bg-danger ms-2" onClick={() => deleteCourse(course.courseId)}> Delete </Button>
                    </Container>
                </CardBody>
            </Card>
            */}

            <Table striped bordered hover size="lg">

                
                    
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                {  
                    viewCourses.map((course) =>

                <tbody>
                    <tr>
                        <td>{course.courseId}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseDescription}</td>
                        <td>
                            <Button tag={Link} to={`/edit-course/${course.courseId}/view`} color="info " id="viewTooltip"> <GrView /> </Button>
                            <Tooltip
                                placement="top"
                                isOpen={viewTooltip}
                                autohide={false}
                                target="viewTooltip"
                                toggle={toggleView}
                            >
                                View Course
                            </Tooltip>

                            <Button tag={Link} to={`/edit-course/${course.courseId}/edit`} color="warning ms-2" id="editTooltip"> <BiEdit /> </Button>
                            <Tooltip
                                placement="top"
                                isOpen={editTooltip}
                                autohide={false}
                                target="editTooltip"
                                toggle={toggleEdit}
                            >
                                Edit Course
                            </Tooltip>


                            <Button className="bg-danger ms-2" onClick={() => deleteCourse(course.courseId)} id="delTooltip"> <AiFillDelete /> </Button>
                            <Tooltip
                                placement="top"
                                isOpen={delTooltip}
                                autohide={false}
                                target="delTooltip"
                                toggle={toggleDel}
                            >
                                Delete Course
                            </Tooltip>

                        </td>
                    </tr>
                </tbody> 
                    )};
            </Table>

        </div>

    );
}



export default Course;