import React, { useState } from "react";
import { useBookmarkContext } from "../BookmarkContext";



const BookmarkRow=({bookmark, onUpdateClick,  onDeleteClick})=>{
 
const[edit, setEdit]=useState(false);
const [formData, setFormData]= useState({title:'',id:''});



const onCancelClick=()=>{
    setEdit(false)
    setFormData({ title: '', id: '' })

}
const onEditClick=()=>{
    setEdit(true)
    setFormData(bookmark)
}
const updateClick=async ()=>{
 onUpdateClick(formData.id, formData.title)
setEdit(false)
setFormData({title: '', id: ''})
}

const onTextChange = e => {
    const copy = { ...formData };
    copy[e.target.name] = e.target.value;
    setFormData(copy);
}
    return(

        <tr>
            
                {edit?
                <td>        
                <input  value={formData.title}  onChange={onTextChange} type="text" name="title" placeholder="Title" className="form-control" />
                </td> :
                <td> {bookmark.title} </td>
                }
           
            <td> 
          
                <a href= {bookmark.url} target="_blank"> {bookmark.url}</a>
                </td>

            <td>
            {edit ? <div>
        <button  onClick={updateClick} className='btn btn-warning btn-block'>Update</button>
        <button onClick={onCancelClick}  className='btn btn-info btn-block'>Cancel:</button> 
        </div>
       : <div> <button  onClick={onEditClick}  className='btn btn-primary btn-block'>EditTitle:</button></div>
            }
       <button  onClick={onDeleteClick} style={{marginTop: 10}} className='btn btn-danger btn-block'>Delete:</button>
       

            </td>
        </tr>
    )

}



export default BookmarkRow;