import React from "react";
import { Card, CardBody } from 'reactstrap';

function Footer() {
    return (

        <div>
            <Card className="text-center my-3 bg-warning " >
                <CardBody style={{height : "50px"}}>
                        <h3> copyright  </h3>
                    
                </CardBody>
            </Card>
        </div>

    );
}

export default Footer;