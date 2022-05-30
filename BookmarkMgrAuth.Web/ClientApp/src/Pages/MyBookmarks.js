import React, {useState, useEffect} from "react";
import axios from "axios";
import { useBookmarkContext } from "../BookmarkContext";
import BookmarkRow from "../Components/BookmarkRow";
import { Link } from "react-router-dom";



const MyBookmarks=()=>{

const{user}= useBookmarkContext();
const [bookmarks, setBookmarks]= useState([]);

useEffect(() => {
  getBookmarks();
}, [bookmarks]);


const getBookmarks = async()=>{
const {data}= await axios.get('/api/bookmark/getmybookmarks')
setBookmarks(data)


}
const onDeleteClick= async (bookmark)=>{
     await axios.post('/api/bookmark/deletebookmark', bookmark)
     getBookmarks();
     
}

const onUpdateClick=async (id, title)=>{
  await axios.post('/api/bookmark/update', {id, title})
  getBookmarks();
}


return(
    <div>
            <h1>Welcome Back {user.firstName} {user.lastName} </h1>
            <div className="col-md-12" style={{ marginBottom: 10 }}>
    <Link to={`/addbookmark`}>
            <button className="btn btn-primary col-md-12">Add</button>
        </Link>
        </div>
    <br />

    <table className="table table-hover table-striped table-bordered">
        <thead>
            <tr>
            <th>Title:</th>
            <th>Url:</th>
            <th>Edit/Delete:</th>
         
            </tr>

        </thead>
        <tbody>

            {bookmarks.map(b => <BookmarkRow bookmark={b} key={b.id} 
            onDeleteClick={() => onDeleteClick(b)}
            onUpdateClick={onUpdateClick}
            /> ) }  

            
   
 
        </tbody>
        </table>
</div>
)

}

export default MyBookmarks;