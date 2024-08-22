import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import backimg from './detailPageItems/Vector 13.png'
import { fetchData, navigateHomePage, navigateOtherPage } from '../state/DataSlice';
import likeIcon from './detailPageItems/Group 2933.png';
import shareIcon from './detailPageItems/Iconography - Caesarzkn.png'

function DetailPage() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {id}=useParams();
  const allData=useSelector((state=>state.postsData.postArray));
  const selectedPost=allData.filter((item)=>item.id==id);
  const [activeBtns,setActiveBtns]=useState(true);
  const moreArray=allData.filter((item)=>item.userId==selectedPost[0].userId && item.id!=id);

useEffect(()=>{     
    dispatch(fetchData('https://jsonplaceholder.typicode.com/posts'));   
},[]);
////////////////////////////////////////////////////
const handlebtn=(value)=>{
  if (value=='detail') {
    setActiveBtns(true);
  }else if(value=='info'){
    setActiveBtns(false);
  }
}
////////////////////////////////////////////////////
const handlebacktn=()=>{
  navigate('/');
  dispatch(navigateHomePage());
}
////////////////////////////////////////////////////
const handleReadMore=(id)=>{
  navigate(`/item/${id}`);
  dispatch(navigateOtherPage());
  }
////////////////////////////////////////////////////
  return (
    <div>
      <Header/>
      <div className='detail-section'>
      <div className='nav-section'>
       <p onClick={handlebacktn} className='back'><img src={backimg} alt='back-icon' /></p>
        <p className='title-detail'>Post Number {id}</p>
      </div>
      
      {selectedPost.length>0 && selectedPost.map((post,i)=>  <div key={'postDetail'+i} className='post-detail'>
                <div className='img'>
                <img src={`https://picsum.photos/200?random=${id}`} alt='post-img'/>
                  <p id='span'>
                    <img src={shareIcon} alt='share-icon' />
                    <img src={likeIcon} alt='like-icon' />
                  </p>
                  <span>{post.title.slice(0,40)}</span>
                </div>
                <div className='btns-div'>
                  <div className='btns'>
                    <button onClick={()=>handlebtn('detail')} className={activeBtns?'active':''}>Detail</button>
                    <button onClick={()=>handlebtn('info')} className={!activeBtns?'active':''}>User Info</button>
                  </div>
                  {activeBtns &&  <p className='body'>{post.body}</p>}

                  {!activeBtns && <><p className='body'>Post Was Posted By {post.userId}.</p></> } 
                </div>
            </div>)
      }
      </div>

      <p className='more-section title1'>More Posts</p>
      <div className='more-section'>
      {moreArray.length>0 && moreArray.map((post,i)=><div key={'more'+i} className='post'>
                <img src={`https://picsum.photos/200?random=${post.id}`} alt='post-img'/>
                <p className='title'>{post.title.slice(0,30)}...</p>
                <div className='body'><p>{post.body.slice(0,50)} <span onClick={()=>handleReadMore(post.id)}>{'Read More...'}</span>
                </p><button onClick={()=>handleReadMore(post.id)}>{'>'}</button></div>
            </div>)}
      </div>
      </div>
  )
}

export default DetailPage