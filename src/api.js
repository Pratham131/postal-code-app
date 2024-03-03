import axios from "axios"

export default async function getPincodeData( pincode){
    try{
        if(pincode.length === 6){
            alert("6 digit")
        }
        const response = await axios.get()
        const data = response.data;
        return {status: "success", data}
    }
    catch(error){
        return { status: 'error', data: error.message || "Something Went Wrong"}
    }
}