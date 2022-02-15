import {createContext,useState} from 'react'




export const Context =createContext({
    userId:'',
    idHandler:(id)=>{},
    edit:false,
    editHandler:()=>{}
})


const ContextProvider =(props)=>{
const [userId,setUserId] = useState('')
const [edit,setEdit] = useState(false)
const idHandler = (ID)=>{
    setUserId(ID)
}

const editHandler =()=>{
    setEdit(prevst=>{
        return !prevst
    })
}

    return(
        <Context.Provider value={{userId:userId,idHandler:idHandler,edit:edit,editHandler:editHandler}}>
          {props.children}
        </Context.Provider>
    )
}

export default ContextProvider