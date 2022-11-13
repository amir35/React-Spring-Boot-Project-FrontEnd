 import React from "react";
import { Link } from "react-router-dom";
//import { ListGroup, ListGroupItem } from 'reactstrap';
import { ListGroup } from 'reactstrap'


function Menu() {
    return (

        <div>
            <ListGroup>
                <Link className="list-group-item" action active to="/" tag="a"> Home </Link>
                <Link className="list-group-item" action        to="/add-course"   tag="a"> Add Course </Link>
                <Link className="list-group-item" action        to="/view-courses" tag="a" > View Courses </Link>
                <Link className="list-group-item" action        to="/import-courses" tag="a" > Import Courses </Link>
                <Link className="list-group-item" action        to="/about"  tag="a" > About </Link>
                <Link className="list-group-item" action        to="/contact"    tag="a" > Contact </Link>
                <Link className="list-group-item" action                 tag="a" > Settings </Link>
            </ListGroup>
        </div>

    );
}

export default Menu;