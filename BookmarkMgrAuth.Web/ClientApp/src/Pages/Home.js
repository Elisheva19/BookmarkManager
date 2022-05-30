import React,  { useState, useEffect } from "react";
import axios from 'axios';

  const Home=()=>{
const [links, setLinks]= useState([]);
 

useEffect(() => {

    const getTopBookmarks = async()=>{
    const {data}= await axios.get('/api/bookmark/topbookmarks')
    setLinks(data)
  }
getTopBookmarks()

}, [])

    return (
      <div>
        <h1>
        Welcome to the Bookmark Manager!!
        </h1>
        <h2>Top 5 Most Common Links:)</h2>
        <table className="table table-hover table-striped table-bordered">
        <thead>
            <tr>
            <th>Title:</th>
            <th>Url:</th>
           
            </tr>

        </thead>
        <tbody>
          {links.map(l=> {
           return <tr  key={l.id}>
            <td>
            <a href= {l.url} target="_blank"> {l.url}</a></td>
            <td>{l.count}</td>
          </tr>})}


        </tbody>

      </table>
      </div>
    )
  }
export default Home;
