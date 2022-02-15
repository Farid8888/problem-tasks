import React from 'react'
import TagItem from './TagItem'


export default function TagMap(props) {
    console.log(props.tags)
  return (
    <>
      {!props.tags ? <div></div> : props.tags.map(tag=>{
          return <TagItem key={tag.id} tag={tag.name}/>
      })}
    </>
  )
}
