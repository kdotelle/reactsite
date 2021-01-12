import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.campsiteId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating"> Rating </Label>
                {/* eslint-disable-next-line react/jsx-pascal-case*/}
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                  validators={{
                    required,
                  }}
                >
                  <option selected="true" disabled>...</option>
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                  <option value="4"> 4 </option>
                  <option value="5"> 5 </option>
                </Control.select>

                <Errors
                  className="text-danger"
                  model=".rating"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Rating is required",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="author"> Your Name </Label>
                {/* eslint-disable-next-line react/jsx-pascal-case*/}
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />

                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Your name is required",
                    minLength: "Name must be at least 2 characters",
                    maxLength: "Name must be less than 15 characters",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="comment"> Comment </Label>
                {/* eslint-disable-next-line react/jsx-pascal-case*/}
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  placeholder="Enter Comment Here"
                  className="form-control"
                  validators={{
                    required,
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".comment"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Please type a comment",
                  }}
                />
              </div>
              <div className="form-group">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments 
            comments={props.comments}
             addComment={props.addComment}
             campsiteId={props.campsite.id}
             />
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}

function RenderCampsite({ campsite }) {
  if (campsite) {
    return (
      <div className="row col-md-5 m-1">
        <Card>
          <CardImg top width="100%" src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div />;
  }
}
function RenderComments({comments, addComment, campsiteId}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4> Comments</h4>
        {comments.map((comments) => {
          return (
            <ListGroup>
              <ListGroupItem key={comments.id}>
                <ListGroupItemHeading>{comments.text}</ListGroupItemHeading>
                <ListGroupItemText>
                  --{comments.author},{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comments.date)))}
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          );
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  } 
    return <div />;
}

export default CampsiteInfo;
