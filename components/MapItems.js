import classes from '../styles/MapItems.module.css'
import Item from './Item'


const MapItems =(props)=>{
    return(
      <div className={classes.mainMap}>
          <div className={classes.control}>
              <div className={classes.id}>ID</div>
              <div className={classes.name}>Название</div>
              <div className={classes.status}>Статус</div>
              <div className={classes.executor}>Исполнитель</div>
          </div>
          <div className={classes.line}></div>
          {props.items.map(item=>{
              return <Item key={item.id} ID={item.id} target={item.name} status={item.statusName} executor={item.executorName} statusColor={item.statusRgb}/>
          })}
      </div>
    )
}

export default MapItems