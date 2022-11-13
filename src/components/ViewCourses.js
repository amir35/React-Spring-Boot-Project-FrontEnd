import React, { useEffect, useState } from "react";
import Course from "./Course";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink, Container, Tooltip, Button, Table, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import CRUDControllers from './../controllers/CRUDControllers';




function ViewCourses({ records }) {

    const crudControllers = new CRUDControllers();

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true)

    // Modal open state
    const [modal, setModal] = React.useState(false);
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    const [viewTooltip, setViewTooltip] = useState(false);
    const [editTooltip, setEditTooltip] = useState(false);
    const [delTooltip, setDelTooltip] = useState(false);

    const toggleView = () => setViewTooltip(!viewTooltip);
    const toggleEdit = () => setEditTooltip(!editTooltip);
    const toggleDel = () => setDelTooltip(!delTooltip);

    const [courses, setCourses] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        last: false,
        number: ''
    });

    useEffect(() => {

        document.title = "All Course | Course App";
        getAllCoursesFromServer(0, 3);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getAllCoursesFromServer = (number, pageSize) => {
        setModal(false);
        crudControllers.getAllCoursesFromServer(number, pageSize).then(
            (response) => {
                setCourses(response.data);
                //console.log("Total Elements: " + courses.totalElements);
                setPage(number);
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }

        )
    }


    const updateCourseList = (id) => {

        setCourses(courses.filter((course) => course.courseId !== id));
        //navigate("/view-courses");

    }

    const deleteCourse = (id) => {
        console.log(id);
        crudControllers.deleteCourse(id).then(
            (response) => {
                console.log(response)
                //navigate("/view-courses");
                getAllCoursesFromServer(0, 3);

            },
            (error) => {
                console.log(error);
            }
        )
    }



    return (
        <div isLoading ={isLoading}>
            <h1>All Courses</h1>
            {/* <Course /> */}
            {/*
            <Course course={ {title: "Java Full Stack", description: "Learn Java with React"}}/>
            <Course course={ {title: "Python", description: "Learn Python with Django framework"}}/>
            */}

            {/*
            {
                records.length > 0 ?
                records.map( (item) => setCourses([ ...courses, item])) : ""
            }
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
                {courses.content.length > 0 ?
                    courses.content.map((item) =>

                        <tbody>
                            <tr>
                                <td>{item.courseId}</td>
                                <td>{item.courseName}</td>
                                <td>{item.courseDescription}</td>
                                <td>
                                    <Button tag={Link} to={`/edit-course/${item.courseId}/view`} color="info " id="viewTooltip"> <GrView /> </Button>
                                    <Tooltip
                                        placement="top"
                                        isOpen={viewTooltip}
                                        autohide={false}
                                        target="viewTooltip"
                                        toggle={toggleView}
                                    >
                                        View Course
                                    </Tooltip>

                                    <Button tag={Link} to={`/edit-course/${item.courseId}/edit`} color="warning ms-2" id="editTooltip"> <BiEdit /> </Button>
                                    <Tooltip
                                        placement="top"
                                        isOpen={editTooltip}
                                        autohide={false}
                                        target="editTooltip"
                                        toggle={toggleEdit}
                                    >
                                        Edit Course
                                    </Tooltip>

                                    <Button className="bg-danger ms-2" onClick={toggle} id="delTooltip"> <AiFillDelete /> </Button>

                                    <Tooltip
                                        placement="top"
                                        isOpen={delTooltip}
                                        autohide={false}
                                        target="delTooltip"
                                        toggle={toggleDel}
                                    >
                                        Delete Course
                                    </Tooltip>

                                    <Modal isOpen={modal} toggle={toggle}>
                                        <ModalHeader
                                            toggle={toggle}>Delete Selected Course</ModalHeader>
                                        <ModalBody>
                                            Are you sure you want to Delete course with Id: {item.courseId} ?
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={() => deleteCourse(item.courseId)} >Yes</Button>
                                            <Button color="success" onClick={toggle} >No</Button>
                                        </ModalFooter>
                                    </Modal>

                                </td>
                            </tr>
                        </tbody>
                    ) : "No Courses"}
            </Table>



            <Container className="text-center">
                <Pagination aria-label="Page navigation example" size="md">
                    <PaginationItem disabled={courses.number === 0} >
                        <PaginationLink previous onClick={() => getAllCoursesFromServer(courses.number - 1, 3)}>
                            Previous
                        </PaginationLink>
                    </PaginationItem>

                    {
                        [...Array(courses.totalPages)].map((item, index) => (

                            <PaginationItem active={index === courses.number} onClick={() => getAllCoursesFromServer(index, 3)}>
                                <PaginationLink >

                                    {index + 1}

                                </PaginationLink>
                            </PaginationItem>

                        ))
                    }





                    <PaginationItem disabled={courses.last} >
                        <PaginationLink next onClick={() => getAllCoursesFromServer(courses.number + 1, 3)}>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </Container>

        </div>
    );
}

export default ViewCourses;