import React from 'react'
import classes from '../styles/TagItem.module.css'


export default function TagItem(props) {
  return (
    <div className={classes.tag}>
      {props.tag}
    </div>
  )
}
