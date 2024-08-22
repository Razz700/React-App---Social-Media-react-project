import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, navigateOtherPage } from '../state/DataSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css'

function HomePage() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [search,setSearch]=useState('');
    const allData=useSelector((state)=>state.postsData.postArray);
    const error=useSelector((state)=>state.postsData.error);
    const loading=useSelector((state)=>state.postsData.loading);

    const searchAllData=allData.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase().trim()) || item.body.toLowerCase().includes(search.toLowerCase().trim()));
    ///////////////////////////////////////////////////
    useEffect(()=>{      
  dispatch(fetchData('https://jsonplaceholder.typicode.com/posts'));
    },[]);
//console.log(allData,error,loading);
const handleinputChange=(e)=>setSearch(e.target.value);
//////////////////////////////////////////////////////
const handleReadMore=(id)=>{
navigate(`/item/${id}`);
dispatch(navigateOtherPage());
}
//////////////////////////////////////
  return (
    <div>
        <Header />
        {loading && <div className='loader-div'>
        <div className='loader'></div>
        <p>Loading...</p>
       {error && <p className='result'>{error}</p>}
    </div>}
        <div className='home-page'>
            <p className='homeinfo'>Social Media For Travellers</p>
            <input onChange={handleinputChange} className='homepage-input' type='text' value={search} placeholder='Search here...'  />
            <div className='all-post'>
                {searchAllData.length>0 && searchAllData.map((post,i)=>
            <div key={'post'+i} className='post'>
                <img src={`https://picsum.photos/200?random=${post.id}`} alt='post-img'/>
                <p className='title'>{post.title.slice(0,30)}...
                </p>
                <div className='body'><p>{post.body.slice(0,50)} <span onClick={()=>handleReadMore(post.id)}>{'Read More...'}</span>
                </p><button onClick={()=>handleReadMore(post.id)}>{'>'}</button></div>
            </div>)}
            {searchAllData.length==0 && !loading && <p className='result'>No Result Found!!</p>}
            </div>
        </div>
    </div>
  )
}

export default HomePage