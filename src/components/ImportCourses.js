import React, { useState } from "react";
import { Form, FormGroup, FormText, Input, Label, Col, Button } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ImportCourses() {

    const [state, setState] = useState({
        selectedFile: null
    })

    const navigate = useNavigate();

    const onFileChange = (event) => {

        setState({ selectedFile: event.target.files[0] });
    }

    const onFileUpload = () => {

          // Create an object of formData
          const formData = new FormData();

          // Update the formData object
          /*formData.append(
            "myFile",
            state.selectedFile,
            state.selectedFile.name
          );*/

          formData.append('file', state.selectedFile);

          // Details of the uploaded file
          console.log(state.selectedFile);

          // Request made to the backend api
          // Send formData object
          //axios.post("api/uploadfile", formData);
          axios.post(`http://localhost:9191/course/upload`, formData,
                {
                                    headers: {
                                       // "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                                       // "Content-type": "multipart/form-data",
                                    },
                                }
          ).then(
            (response) => {
                    console.log("Successfully uploaded");
                    toast.success("Course Added from File");
                    navigate("/view-courses");


                },
             (error) => {
                    console.log("Not uploaded")
             }
                   )
        };

    // File content to be displayed after
    // file upload is complete
    const fileData = () => {
          if (state.selectedFile) {
            return (
              <div>
                <h2>File Details:</h2>
                <p>File Name: {state.selectedFile.name}</p>
                <p>File Type: {state.selectedFile.type}</p>
                 <p>
                  Last Modified:{" "}
                  {state.selectedFile.lastModifiedDate.toDateString()}
                </p>

              </div>
            );
          } else {
            return (
              <div>
                <br />
                <h4>Choose before Pressing the Upload button</h4>
              </div>
            );
          }
        };

    return (
        <div>
            <h1>Import Courses</h1>
            <Form>
                <FormGroup row>
                    <Label for="exampleFile" sm={2}> File </Label>
                    <Col sm={10}>
                      <Input id="exampleFile" name="file" type="file" onChange={ onFileChange} />
                      <FormText>
                        This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                      </FormText>
                    </Col>
                 </FormGroup>
                 <FormGroup>
                    <Button onClick={onFileUpload}> Submit </Button>
                 </FormGroup>
            </Form>

            {fileData()}
            <ToastContainer />
        </div>
    )
}

export default ImportCourses;