 import axios from "axios";
 import {BASE_URL} from './../utils/Constant';

 class CRUDControllers {

    async saveCourse(course)
    {
        let response = await axios.post(BASE_URL + `/courses`, course);
        return response;
    }

    async getCourseFromServer(id)
    {
        let response = await axios.get(BASE_URL + `/courses/${id}`);
        return response;
    }

    async getAllCoursesFromServer(number, pageSize)
    {
        let response = await axios.get(BASE_URL + `/courses?pageNumber=${number}&pageSize=${pageSize}`);
        return  response;
    }

    async updateCourse(course)
    {
        let response = await axios.put(BASE_URL + `/courses`, course);
        return response;
    }

    async deleteCourse(id)
    {
        let response = await axios.delete(BASE_URL + `/courses/${id}`);
        return response;
    }
 }

 export default CRUDControllers;