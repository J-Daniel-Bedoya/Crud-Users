import React, { useState, useEffect } from 'react';
import UsersForm from './elements/UsersForm';
import CardListUsers from './elements/CardListUsers';
import '../assets/css/UsersLIst.css'
import '../assets/css/CrudAppUsers.css'
import LoadingUsers from './elements/Loadings/LoadingUsers';
import LoadingDelete from './elements/Loadings/LoadingDelete';
import LoadingAdd from './elements/Loadings/LoadingAdd';
import useHookForm from './Hooks/useHookForm';

const CrudAppUsers = () => {
  const [ 
    userForm, loading, showInfoCard, 
    confirmDeleteOne, confirmDeleteAll, selectUser, 
    loadingAdd, loadingDelete, show,
  ] = useHookForm()

  return (
    <div className='CrudAppUsers'>
      {
        loading ? (
          <div className='UsersList'>
            <h1 className='tittle-list'><i className="fa-solid fa-circle-user"></i>  Users</h1>
            <button className='btn-add-list' onClick={userForm}><i className="fa-solid fa-user-plus"></i> Create new user</button>
            <div className='container__cards--users'>
              {
                showInfoCard.map(info => (
                  <CardListUsers 
                  info={info} 
                  key={info.id} 
                  deleteUser={confirmDeleteOne}
                  selectUser={selectUser}
                  />
                  ))
                }
            </div>
            <button className='btn-delete' onClick={confirmDeleteAll}><i className="fa-solid fa-users-slash"></i>   Delete All</button>
          </div>

        ) : (
            <LoadingUsers />
          )
      }
      {
        loadingDelete && <LoadingDelete />
      }
      {
        loadingAdd && <LoadingAdd />
      }
      {show()}
    </div>
  );
};

export default CrudAppUsers;
