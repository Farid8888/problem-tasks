import React, { useEffect, useRef, useState,useContext } from "react";
import ReactDOM from "react-dom";
import classes from '../styles/Modal.module.css';
import {AiOutlineClose} from 'react-icons/ai'
import {tenantguid} from '../config/apiKey'
import {Context} from '../context/context'


function Modal(props) {
    const [isBrowser, setIsBrowser] = useState(false);
    const idHandler = useContext(Context).idHandler
    const editHandler =useContext(Context).editHandler
    useEffect(() => {
      setIsBrowser(true);
    }, []);

const nameRef =useRef()
const descriptionRef =useRef()
const submitHandler =async(e)=>{
e.preventDefault()
const name =nameRef.current.value
const description =descriptionRef.current.value
const objBody ={
    name:name,
    description:description
}
const res = await fetch(`http://intravision-task.test01.intravision.ru/api/${tenantguid}/Tasks`,{
    method:'POST',
    headers:{'Content-Type':'application/json',accept: 'application/json'},
    body:JSON.stringify(objBody)
})
const data = await res.json()
idHandler(data)
props.modalHandler()
}

    if (isBrowser) {
        return ReactDOM.createPortal(
            <div className={classes.modal}>
             <div className={classes.newTask}>Новая Заявка <AiOutlineClose onClick={props.modalHandler}/></div>
             <form className={classes.control} onSubmit={submitHandler}>
             <div className={classes.name}>
                 <label htmlFor='name'>Название</label>
                 <textarea id="name" rows='5' type='text' ref={nameRef} required/>
             </div>
             <div className={classes.name}> 
                 <label htmlFor="description">Описание</label>
                 <textarea type='text' id='description' rows='8' ref={descriptionRef} required/>
             </div>
             <button type="submit" onClick={editHandler}>Сохранить</button>
             </form>
            </div>, 
            document.getElementById("modal-root")
        );
      } else {
        return null;
      }    
  
}

export default Modal;