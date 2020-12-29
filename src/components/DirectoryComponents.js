import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

//functional components always receive any data passed to them as properties of a single props argument
function RenderDirectoryItem({campsite, onClick}) {
    return (
        <Card onClick={() => onClick(campsite.id)}>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

function Directory(props) {

//setState updates the interface in response to an event handler
//when a new campsite is selected the state changes to that campsite

    const directory = props.campsites.map(campsite => {
        return (
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite} onClick={props.onClick} />
            </div>
        );
    });
//this.state is what's currently on the screen
//made the CampsiteInfo component from the CampsiteInfo class in the CampsiteInfoComponent.js file
//Component is powered by the class
    return (
        <div className="container">
            <div className="row">
                {directory}
            </div>
        </div>
    );
}


export default Directory;