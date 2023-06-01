import axios from "axios";
import { createContext, useContext, useState } from "react";

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({children}) =>{
    
    const [user, setUser] = useState({
        name:'',
        surname:'',
        email:'',
        password:'',
        password2:''
    })
    const [dato, setDato] = useState(true)
    const [fechasReservadas, setFechasReservadas] = useState([])
    const [filtrado, setFiltrado] = useState([])
    const [numCalen, setNumCalen] = useState(2)
    const [estarLoggueado, setEstarLoggueado] = useState("oculto")
    const [ocultoReg, setOcultoReg] = useState("oculto")
    const [ocultoLog, setOcultoLog] = useState("oculto")
    const [ocultoAdmin, setOcultoAdmin] = useState("oculto")
    const [ocultoRes, setOcultoRes] = useState("")
    const [incorrecto, setIncorrecto] = useState("")
    const [name, setName] = useState({campo: "", valido: ""})
    const [surname, setSurname] = useState({campo: "", valido: ""})
    const [email, setEmail] = useState({campo: "", valido: ""})
    const [password, setPassword] = useState({campo: "", valido: ""})
    const [password2, setPassword2] = useState({campo: "", valido:""})
    const [validez, setValidez] = useState("")
    
    return(
        <ContextGlobal.Provider value={{
            dato, setDato,
            fechasReservadas, setFechasReservadas,
            filtrado, setFiltrado,
            numCalen, setNumCalen,
            estarLoggueado, setEstarLoggueado,
            user, setUser,
            incorrecto, setIncorrecto,
            ocultoReg, setOcultoReg,
            ocultoLog, setOcultoLog,
            ocultoAdmin, setOcultoAdmin,
            ocultoRes, setOcultoRes,
            name, setName,
            surname, setSurname,
            email, setEmail,
            password, setPassword,
            password2, setPassword2,
            validez, setValidez,
            }}>
            {children}
        </ContextGlobal.Provider>
    );
};

export const useGlobalStates = () => {
    return useContext(ContextGlobal)
}