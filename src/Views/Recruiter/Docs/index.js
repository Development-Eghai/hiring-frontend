import { useCommonState } from "Components/CustomHooks"
import Cookies from "js-cookie";
import { decryptData } from "Security/Crypto/Crypto";

export const ReqHome = () =>{
    const {commonState} = useCommonState();
    console.log(commonState)
    
    return(
        <p>Requirter home</p>
    )
}