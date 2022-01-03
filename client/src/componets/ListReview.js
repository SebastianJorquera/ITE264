import React, { Fragment,useEffect,useState } from "react";
import {Button, Table,Modal}from "react-bootstrap"
import "../componets/businessvew.css"

const ShowComments = ({businessId}) =>{
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[comments,setComments] = useState([]);

        const  getComment = async () => {
            try {
                
                const response = await fetch(`http://localhost:5000/businessReview/${businessId}`)
                const jsonData = await response.json()
                
                setComments(jsonData)
            } catch (err) {
                console.error(err.message)
            }
        };

        useEffect( () => {
            getComment();
        });

        console.log(comments);
    return(
        <Fragment>

            <Button
                className="buttonColor"
                variant="primary"
                onClick={handleShow}
            >
                Show Reviews
            </Button>
        
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="lg"
            >
                <Modal.Body>

                <Table className="text-center " borderless>
                    <tbody className="second">
                        {comments.map( comment => (
                            <tr key = {comment.commentId}>
                                <td>{comment.comment} </td> 
                            </tr>
                    ))}
                    </tbody>
                </Table>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="buttonColor" variant="primary" onClick={handleClose}>
                        Close Reviews
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
};


export default ShowComments;
