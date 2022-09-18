import React from 'react';
import '../../../assets/css/LoadingUsers.css'

const LoadingUsers = () => {
  return (
      <div className='loading'>
        <div className="lds-ellipsis"> 
          <div></div> 
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

export default LoadingUsers;