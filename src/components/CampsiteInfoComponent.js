//display all four campsites
//create onClick eventhandler so the campsite the user clicks on is visible highlighted
//include all info for the site img, title, description, etc
//try to use reactstrap components
//create a class component and export it as default
//use cards to display all 4 campsites
import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
//the CampsiteInfo class is used to make the CampsiteInfo component in DirectoryComponents.js
//class doesn't do anything w/o the Component
class CampsiteInfo extends React.Component {
    render() {
        if (this.props.clickedCampsite) {
             return (
                 <div className="container">
                    <div className="row"> 
                        {this.renderCampsite(this.props.clickedCampsite)}
                        {this.renderComments(this.props.clickedCampsite.comments)}
                    </div>
                </div>
             )
           } else {
               return (
                   <div />
               )
           };
         }
//props has the same name as the state object
//when the state changes that change in data is passed to the components through the props
        renderCampsite(campsite) {
            if (this.props.clickedCampsite) {
                return (
                    <div className="row col-md-5 m-1"> 
                       <Card>
                           <CardImg top width="100%" src={this.props.clickedCampsite.image} alt={this.props.clickedCampsite.name} />
                           <CardBody>
                               <CardTitle>{this.props.clickedCampsite.name}</CardTitle>
                               <CardText>{this.props.clickedCampsite.description}</CardText>
                           </CardBody>
                       </Card>
                    </div>
                )
              } else {
                  return (
                      <div />
                  )
              };

        }
//clickedCampsite attribute was defined in DirectorComponents
//clickedCampsite state is being passed through as a prop
//map calls the function for EACH element in the array and returns a new array
        renderComments(comments) {
            if (this.props.clickedCampsite.comments) {
                return (
                    <div className="col-md-5 m-1">
                      <h4> Comments</h4>
                      {this.props.clickedCampsite.comments.map(comments => {
                        return (
                            <ListGroup>
                                <ListGroupItem key={comments.id}> 
                                    <ListGroupItemHeading>{comments.text}</ListGroupItemHeading> 
                                    <ListGroupItemText>--{comments.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</ListGroupItemText>
                                </ListGroupItem>
                            </ListGroup>
                        );
                      })
                    }
                    </div>
                  )
            } else {
                return (
                    <div />
                )
            };
        }     
}




export default CampsiteInfo;