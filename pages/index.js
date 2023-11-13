import React,{useState,useContext} from "react";
import Layout from "../components/Layout";
import classes from '../styles/MainPage.module.css'
import MapItems from "../components/MapItems";
import Modal from "../components/Modal";
import EditCard from "../components/EditCard";
import {tenantguid} from '../config/apiKey'
import { Context } from "../context/context";
import {items} from '../data/data'

export default function Index(props) {
  const [modal,setModal] = useState(false)
  const edit = useContext(Context).edit
  
  const modalHandler =()=>{
    setModal((prevst)=>{
      return !prevst
    })
  }
  return (
    <Layout>
      <div className={classes.main}>
        <button type="button" onClick={modalHandler}>Создать Заявку</button>
      </div>
      <div className={classes.mapItems}>
      <MapItems items={items}/>
      </div>
      {modal && <Modal modalHandler={modalHandler}/>}
      {edit && <EditCard users={props.users} statuses={props.statuses}/>}
    </Layout>
  );
}


// export async function getServerSideProps(){
//   const res =await fetch(`http://intravision-task.test01.intravision.ru/odata/tasks?tenantguid=${tenantguid}`)
//   const data = await res.json()
//   const resp =await fetch(`http://intravision-task.test01.intravision.ru/api/${tenantguid}/Statuses`)
//   const statuses = await resp.json()
//   const respon =await fetch(`http://intravision-task.test01.intravision.ru/api/${tenantguid}/Users`)
//   const users = await respon.json()
//   return{
//     props:{
//        items:data,
//        statuses:statuses,
//        users:users
//     }
//   }
// }

