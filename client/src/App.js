import React,{Fragment,useState} from "react";
import BingMapsReact from "bingmaps-react";
import {Navbar,Form,FormControl,Button, Table} from 'react-bootstrap'
import './App.css';

//components
//import Filter from "./componets/filter"
import InputReview from "./componets/inputReview"
import ListReview from "./componets/ListReview"
import MyReactApp from "./componets/locationMap"

function App() {

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
        <Navbar variant="dark" sticky="top" className="navBar">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Form inline onSubmit={onSubmitForm}>
            <FormControl
            type="text" 
            name="businessName"
            placeholder="Search" 
            className="mr-sm-2"
            value={business_name}
            onChange={e => setName(e.target.value)}
            />
            <Button type="submit" className="searchButton">Search</Button>
          </Form>
        </Navbar>

        <MyReactApp/>
          
          <Table className="Table" borderless >

            <tbody className="text-center" >

            
              
              {businesses.map(business => (
                <tr key={business.business_id}> 


                  <td className="tboy">
                  <div className="card cardDetail">
                  <div className="card-body center">
                    <div className="myMap">
                      <BingMapsReact

                          width="500px"
                          bingMapsKey="AhYrGa2cB6rqHpU93DAzZtfbzwF8O_hYD0RQPUEQBnieSvNSptgmQzMTQ5mViHSk"
                          
                          mapOptions={{
                            navigationBarMode: "square"
                          }}
                        
                          viewOptions={{
                            center: { latitude: business.latitude, longitude: business.longitude },
                            supportedMapTypes: "canvasDark",
                            zoom: 15
                            }}

                          

                        />
                    </div>  


                    <div className="textColor">{business.business_name}</div>
                    <div className="textColor">{business.inspection_result}</div>
                    <InputReview businessId={business.business_id}/>
                    <ListReview businessId={business.business_id}/>
                         

                    
                  </div> 
                  </div>
                  </td> 
                  
                </tr>
              ))}
            
                   
            </tbody>
          </Table>              
                
        

      </Fragment>
    )


};


export default App;
