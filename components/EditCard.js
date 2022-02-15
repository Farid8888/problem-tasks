import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import classes from "../styles/EditCard.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { tenantguid } from "../config/apiKey";
import { Context } from "../context/context";
import moment from "moment";
import 'moment/locale/ru'
import {ImCalendar} from 'react-icons/im'
import TagMap from "./TagMap";


function EditCard(props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [data, setData] = useState({tags:[]});
  const [comments,setComments] = useState([])
  console.log(data.tags);
  const userId = useContext(Context).userId;
  console.log(userId);
  const editHandler = useContext(Context).editHandler;
  useEffect(() => {
    setIsBrowser(true);
    fetch(
      `http://intravision-task.test01.intravision.ru/api/${tenantguid}/Tasks/${userId}`,
      {
        method: "GET",
      }
    )
      .then((data) => data.json())
      .then((resData) => {
        return setData(resData);
      });
  }, [userId]);

  

  const [status, setStatus] = useState();
  const statusChangeHandler = (e) => {
    setStatus(e.target.value);
  };
  const [executor,setExecutor] = useState()
  const changeExecutorHandler=(e)=>{
      setExecutor(e.target.value)
  }
  console.log(status);
  let colorChange;
  if (status === "Закрыта") {
    colorChange = "#3cb371";
  } else if (status === "Отложена") {
    colorChange = "#909090";
  } else if (status === "Согласование договора") {
    colorChange = "#fcad51";
  } else if (status === "В работе") {
    colorChange = "#fcad51";
  } else if (status === "Открыта") {
    colorChange = "#fd5e53";
  } else if (status === "Выполнена") {
    colorChange = "rgb(113, 153, 40)";
  }
  console.log(comments)
const commentRef =useRef()
  const submitHandler =  async (e) => {
    e.preventDefault();
    const comment = commentRef.current.value
    setComments([...comments,{id:Math.random(),comment:comment}])
//    const bodyItems ={
//     executorName:executor,
//     statusName:status,
//     comments:comments
//    }
//    const res = await fetch(`http://intravision-task.test01.intravision.ru/api/${tenantguid}/Tasks`,{
//     method:'PUT',
//     headers:{
//         'Content-Type':'application/json',
//         accept: 'application/json'
//     },
//     body:bodyItems
// // })
// const data = await res.json()

  };
  moment.locale('ru')
  let date
if(data.resolutionDatePlan === null){
    date = ''
}else{
    date =moment(data.resolutionDatePlan).format('L')
}
let createAt
if(data.createAt === null){
    createAt = ''
}else{
    createAt = moment(data.createAt).format('LLL')
}


  if (isBrowser) {
    return ReactDOM.createPortal(
      <div className={classes.modal}>
        <div className={classes.newTask}>
          <div className={classes.user}>№ {userId} </div>
          <div className={classes.taskFlex}>
            <div className={classes.nameFlex}>{data.name}</div>
            <div className={classes.taskSvg}>
              <AiOutlineClose onClick={editHandler} />
            </div>
          </div>
        </div>
        <div className={classes.description}>
          <div className={classes.childDcp}>Описание</div>
          <div>{data.description}</div>
        </div>
        <form className={classes.comment} onSubmit={submitHandler}>
          <label htmlFor="comment">Добавление Комментариев</label>
          <textarea id="comment" type="text" rows="5" ref={commentRef}/>
          <div className={classes.btn}>
            <button type="submit" >Сохранить</button>
          </div>
        </form>
        <div>
          <div className={classes.flexBox}>
            <div className={classes.date}>
              <div>Иванов Александр</div>
              <div>{createAt} Прокомментировал</div>
              <div className={classes.mapComment}>
               {data.description}
              </div>
              {comments.map(comment=>{
                  return (
                  <div key={comment.id} className={classes.date}>
                  <div>Иванов Александр</div>
                  <div>{createAt} Прокомментировал</div>
                  <div className={classes.mapComment}>
               {comment.comment}
              </div>
                  </div>)
              })}
            </div>
          </div>
        </div>
        <div className={classes.marginScroll}></div>
        <div className={classes.sideBar}>
          <div className={classes.circleFlex}>
            <div
              className={classes.circleStatus}
              style={{ backgroundColor: status ? colorChange : data.statusRgb }}
            ></div>
            <select
              onChange={statusChangeHandler}
              className={classes.statusChange}
              name={data.statusName}
            >
              <option>{data.statusName}</option>
              {props.statuses.map((status) => {
                return <option key={status.id}>{status.name}</option>;
              })}
            </select>
          </div>
          <div className={classes.columnItems}>
            <div>Заявитель</div>
            <div>{data.executorGroupName}</div>
          </div>
          <div className={classes.columnItems}>
            <div>Создана</div>
            <div>{data.initiatorName}</div>
          </div>
          <div className={classes.columnItems}>
          <div>Исполнитель</div>
              <select onChange={changeExecutorHandler}>
                  <option>{data.executorName}</option>
                {props.users.map(user=>{
                    return <option key={user.id}>{user.name}</option>
                })}
              </select>
          </div>
          <div className={classes.columnItems}>
            <div>Приоритет</div>
            <div>{data.priorityName}</div>
          </div>
          <div className={classes.columnItems}>
            <div>Срок</div>
            <div><ImCalendar/> {date === '' ? 'Нет Срока' : `${date} г`}</div>
          </div>
          <div className={classes.columnItems}>
            <div>Теги</div>
            <TagMap tags={data.tags}/>
          </div>
        </div>
      </div>,
      document.getElementById("edit")
    );
  } else {
    return null;
  }
}

export default EditCard;
