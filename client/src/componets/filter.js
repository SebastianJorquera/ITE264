import React,{Fragment,useState} from "react";
import {Button,Form, FormControl} from 'react-bootstrap'

const Filter = () => {

    
    const [business_name,setName] = useState("");
    const [businesses, setBusinesses] = useState([])

    const onSubmitForm = async e => {

        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/search/?business_name=${business_name}`);

            const parseResponse = await response.json();

            setBusinesses(parseResponse)
            console.log(parseResponse);
        } catch (err) {
            console.error(err.message);
        }

    }

    return(
        
        <Fragment>
         
            <Form inline onSubmit={onSubmitForm}>
                <FormControl
                type="text" 
                name="businessName"
                placeholder="Search" 
                className="mr-sm-2"
                value={business_name}
                onChange={e => setName(e.target.value)}
                />
                <Button 
                variant="outline-info" 
                type="submit"
                >Search</Button>
            </Form>
            
    
            <table className="table my-5">
            <thead>
                <tr>
                <th>First Name</th>
                </tr>
            </thead>
            
            
            <tbody>
                {businesses.map(business => (
                <tr key={business.business_id}> 
                    <td>{business.business_name}
                    </td> 
                
                </tr>
                ))}
                
            </tbody>
        </table>              


        </Fragment>
    )


};

export default Filter;
