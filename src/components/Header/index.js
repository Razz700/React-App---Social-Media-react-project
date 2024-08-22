import React, { useEffect, useState } from 'react'
import './style.css'
import home from './item/home1.jpg'
import notification from './item/Layer_28.jpg'
import profile from './item/Group(1).jpg'
import saved from './item/Group.jpg'
import homeimg from './item/newhome.jpg'
import savedimg from './item/Layer_49.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { navigateHomePage, navigateOtherPage } from '../../state/DataSlice'

function Header() {
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const currentPageHome=useSelector((state)=>state.postsData.currentPageHome);
    const [homeActive,setHomeactive]=useState(true);
    const handleSave=()=>{setHomeactive(false);
        if (currentPageHome) {
            navigate('/item/1');
            dispatch(navigateOtherPage());
        }
    }
    const handleHome=()=>{setHomeactive(true);
        if (!currentPageHome) {
            navigate('/');
            dispatch(navigateHomePage());
        }
    }  
    ///////////////////////////////////////////
    useEffect(()=>{ 
        if (location.pathname!='/') {
           setHomeactive(false); 
           dispatch(navigateOtherPage());
        }
    },[]);
  return (
    <nav>
        <div>TravelMedia.in</div>
        <div className='nav'>
           <div onClick={handleHome}><img src={homeActive?homeimg:home} alt='home-icon'/>
          {homeActive && <p className='nav-active-dot'></p>}</div>

           <div><img src={notification} alt='notification-icon'/></div>

           <div onClick={handleSave}><img src={homeActive?saved:savedimg} alt='save-icon'/>
           {!homeActive && <p className='nav-active-dot'></p>}</div>

           <div><img src={profile} alt='profile-icon'/></div>
        </div>
    </nav>
  )
}

export default Header