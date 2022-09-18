import React from 'react';
import '../../assets/css/UsersLIst.css'

const CardListUsers = ({info, deleteUser, selectUser}) => {
  return (
    <>
      <div className='user-card' >
        <h2 className='card__name--tittle'>{info.first_name} {info.last_name}</h2>
        <hr className='barra'/>
        <p className='card__email'>{info.email}</p>
        <p className='card__birthday'><i className="fa-solid fa-cake-candles birthday-icon"></i> {info.birthday}</p>
        <hr className='barra'/>
        <i className="fa-solid fa-trash btn-icon btn-trash" onClick={() => deleteUser(info.id)}></i>
        <i className="fa-solid fa-pen-to-square btn-icon btn-edit" onClick={() => selectUser(info)}></i>
      </div>
    </>
  );
};

export default CardListUsers;