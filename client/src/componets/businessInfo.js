import React,{Fragment,useState} from "react";



const BusinessInfo = ({businessId}) => {

    const [businesses] = useState([])
        

    try {
            const response = fetch(`http://localhost:5000/getBusinessInfo/${businessId}`)
            
            const parseResponse = response.json();
            console.log(parseResponse)
        } catch (err) {
            console.error(err.message);
        }


        return(
            <Fragment>
                {businesses.map(business =>(
                    <tr key = {businessId}>
                        <td>
                            {business.inspection_result}
                        </td>

                    </tr>
                ))}

            </Fragment>



        )

};

export default BusinessInfo;
