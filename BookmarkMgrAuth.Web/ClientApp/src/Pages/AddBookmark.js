import React from "react";
import axios from "axios";
import { useBookmarkContext } from "../BookmarkContext";
import useForm from "../Hooks/UseForm";
import { useHistory } from "react-router-dom";


const AddBookmark=()=>{

    const [formData, setFormData]= useForm({title:'', url:'', userId:''});

    const {user}= useBookmarkContext();
    const history= useHistory()

    const onSubmit= async e =>{
        e.preventDefault();

        formData.userId= user.id;
        await axios.post('/api/bookmark/addbookmark',formData);
    
        
        
            history.push('/')
        }

    return(


        <div className="row">
        <div className="col-md-6 offset-md-3 card card-body bg-light">
            <h3>Add Bookmark:</h3>
           
            <form onSubmit={onSubmit}>
                <input onChange={setFormData} value={formData.title} type="text" name="title" placeholder="Title" className="form-control" />
                <br />
                <input onChange={setFormData} value={formData.url} type="text" name="url" placeholder="Url" className="form-control" />
                <br />
                
            <button className="btn btn-success">ADD:</button>
            </form>
        </div>
    </div>
    )

}
export default AddBookmark;