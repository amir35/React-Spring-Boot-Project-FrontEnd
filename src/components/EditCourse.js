import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CRUDControllers from './../controllers/CRUDControllers';
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";


function EditCourse() {

    const crudControllers = new CRUDControllers();

    const [cid, setCid] = useState(true);

    const [isDisabled, setIsDisabled] = useState(false);

    const navigate = useNavigate();

    const { courseId } = useParams();

    const { mode } = useParams();

    const [course, setCourse] = useState({
        courseName : "",
        courseDescription : ""
    });

    const id = parseInt(courseId);


    useEffect(() => {
        document.title = "Edit Course | Course App";
        getCourseFromServer();

        console.log(mode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCourseFromServer = () => {
        crudControllers.getCourseFromServer(id).then(
            (response) => {
                console.log(response.data);
                setCourse(response.data);
                if(mode === "view")
                {
                    setIsDisabled(true);
                }
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
            navigate(`/edit-course/${id}/view`);
            setIsDisabled(true);
            //setCourse({ courseName : "" , courseDescription : ""});
        
    }

    //adding updated course to server
    const addCourseToServer = (course) => { 

        crudControllers.updateCourse(course).then(
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

    const doEdit = (id) => {

        setIsDisabled(false);
        console.log(id);
        navigate(`/edit-course/${id}/edit`);

    }

    //console.log({ courseId } );

    return (
        <div>
            {
                mode === "view" ? <h1>View Course</h1> : <h1>Edit Course</h1>
            }
            {
                cid ? <h2> Course Id: {course.courseId} </h2> : ""
            }

            <img src={require('./../image/vk.jpeg')} width="140" height="150" alt="Logo" />

            <Form action="" onSubmit={handleSubmit} className="my-3" >
                <FormGroup row>
                    <Label for="courseName" sm={4} > Course Name </Label>
                    <Col sm={8}>
                        <Input id="courseName" autoComplete="off" name="courseName" 
                        value={course.courseName} 
                        placeholder="Java" 
                        onChange={handleInputChange}
                        type="text" 
                        disabled={isDisabled} />
                        
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="courseDescription" sm={4} > Course Description </Label>
                    <Col sm={8}>
                        <Input id="courseDescription" autoComplete="off" name="courseDescription" 
                        value={course.courseDescription} 
                        placeholder="This is Java" 
                        onChange={handleInputChange}
                        type="text" 
                        disabled={isDisabled} />
                    </Col>
                </FormGroup>

                {
                    mode === "edit" ?
                    <FormGroup><Button type="submit">Submit </Button></FormGroup> :
                    <Button onClick={() => doEdit(course.courseId)} color="warning ms-2" id="editTooltip">Edit Course  <BiEdit /> </Button>


                }
                

            </Form>

        </div>
    )
};


export default EditCourse;