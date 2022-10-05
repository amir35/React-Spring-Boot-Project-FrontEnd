import React, { useEffect, useState } from "react";
import Course from "./Course";
import axios from "axios";
import { Pagination, PaginationItem, PaginationLink, Container } from "reactstrap";



function ViewCourses({ records }) {

    const [page, setPage] = useState(1);

    console.log(page);

    //const [courses, setCourses] = useState([]);

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
        getAllCoursesFromServer(0,3);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const getAllCoursesFromServer = (number, pageSize) => {
        axios.get(`http://localhost:9191/courses?pageNumber=${number}&pageSize=${pageSize}`).then(
            (response) => {
                console.log(response.data);
                setCourses(response.data);
                console.log("Total Elements: " + courses.totalElements);
                setPage(number);
            },
            (error) => {
                console.log(error);
            }

        )
    }


    const updateCourseList = (id) => {

        setCourses(courses.filter((course) => course.courseId !== id));

    }



    return (
        <div>
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

            {courses.content.length > 0 ?
                courses.content.map((item) => <Course course={item} update={updateCourseList} />) :
                "No Courses"}

            <Container className="text-center">
                <Pagination aria-label="Page navigation example" size="md">
                    <PaginationItem disabled={courses.number===0} >
                        <PaginationLink previous onClick={ () => getAllCoursesFromServer(courses.number-1, 3)}>
                            Previous
                        </PaginationLink>
                    </PaginationItem>

                    {
                        [...Array(courses.totalPages)].map((item, index) => (

                            <PaginationItem active={index === courses.number} onClick={ () => getAllCoursesFromServer(index, 3)}>
                                <PaginationLink >

                                    {index+1}

                                </PaginationLink>
                            </PaginationItem>

                        ))
                    }





                    <PaginationItem disabled={courses.last} >
                        <PaginationLink next onClick={ () => getAllCoursesFromServer(courses.number+1, 3)}>
                            Next
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </Container>


        </div>
    );
}

export default ViewCourses;