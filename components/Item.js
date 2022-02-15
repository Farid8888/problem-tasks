import React,{useContext} from 'react'
import classes from '../styles/Item.module.css'
import { Context } from '../context/context'


export default function Item(props) {
  const editHandler = useContext(Context).editHandler
  const idHandler = useContext(Context).idHandler
  const cardHandler =()=>{
    idHandler(props.ID)
    editHandler()
  }
    let transformClass
    if(props.status === 'Выполнена'){
        transformClass = 'rgb(113, 153, 40)'
    }else if(props.status === 'Открыта'){
        transformClass = 'red'
    }else if(props.status === 'В работе'){
        transformClass = 'rgb(236, 221, 8)'
    }else if(props.status === 'Закрыта'){
        transformClass = 'green'
    }
  return (
    <div className={classes.item} onClick={cardHandler}>
        <div className={classes.stick} style={{backgroundColor:props.statusColor}}></div>
      <div className={classes.id}>{props.ID}</div>
      <div className={classes.name}>{props.target}</div>
      <div className={classes.status} style={{backgroundColor:transformClass}}>{props.status}</div>
      <div className={classes.executor}>{props.executor}</div>
    </div>
  )
}
