import React,{Fragment,useState} from "react";
import { Form, FormControl,Button } from "react-bootstrap";
import "../componets/businessvew.css"

const InputReview = ({businessId}) =>{
  console.log(businessId)
    const[comment,setTheReview] = useState("");

    const onSubmitReview = async e => {
       e.preventDefault();
        try {
            const body = {comment,businessId};
            const response = await fetch("http://localhost:5000/review",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            setTheReview('')
            console.log(response)
        }catch(err){
            console.error(err.message)
        }
    };

    
    return(
        
        <Fragment>
        <Form  onSubmit={onSubmitReview} 
        className="review-container">
          <FormControl

            className="textarea"
            as="textarea"
            rows={3}
            type="text"
            value={comment}
            onChange={e => setTheReview(e.target.value)}
            
          />
          <Button 
          className="submit" 
          variant="outline-primary" 
          type="submit"
          >Post Review</Button>
        </Form>
      </Fragment>
    );
};

export default InputReview;