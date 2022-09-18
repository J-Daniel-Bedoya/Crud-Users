import React, { useState, useEffect } from 'react';
import UsersForm from './elements/UsersForm';
import CardListUsers from './elements/CardListUsers';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/css/UsersLIst.css'
import '../assets/css/CrudAppUsers.css'
import LoadingUsers from './elements/Loadings/LoadingUsers';
import LoadingDelete from './elements/Loadings/LoadingDelete';
import LoadingAdd from './elements/Loadings/LoadingAdd';

const CrudAppUsers = () => {
  const [userFormActive, setUserFormActive] = useState(false)
  const [showInfoCard, setShowInfoCard] = useState([])
  const [infoUser, setInfoUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)

  const userForm = () => {
    setUserFormActive(true)
  }
  const userList = () => {
    setUserFormActive(false)
    setInfoUser(null)
  }

  useEffect(() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then(res => {
      setShowInfoCard(res.data)
    })
    .finally(() => setLoading(true))
  }, [])

  const getUser = () =>{
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then(res => {
      setShowInfoCard(res.data)
    })
  }
  const addNewUser = (newUser) => {
    loadingAddUser()
    axios.post('https://users-crud1.herokuapp.com/users/', newUser)
    .then(() => {
      getUser()
      sucess()
    })
    .catch((error) => {
      console.log(error)
      errorUnexpected()
    })
  }
  const deleteUser = (id) => {
    loadingDelet()
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(() => getUser())
  }
  const deleteAllUsers = () => {
    loadingDelet()
    showInfoCard.map(e => {
      axios.delete(`https://users-crud1.herokuapp.com/users/${e.id}/`)
      .then(() => getUser())
    })
  }
  const sucess = () =>{
    Swal.fire({
      icon: "success",
      width: "15rem",
    })
  }
  const errorUnexpected = () =>{
    Swal.fire({
      title: "Error inesperado",
      icon: "error",
      width: "17rem",
    })

  }
  const selectUser = (userSelect) => {
    setUserFormActive(true)
    setInfoUser(userSelect)
  }
  const userFormEdit = (userEdit) =>{
    loadingAddUser()
    axios.put(`https://users-crud1.herokuapp.com/users/${userEdit.id}/`, userEdit)
    .then(() => {
      getUser()
      sucess()
    })
    .catch((error) => {
      console.log(error)
      errorUnexpected()
    })
  }
  const show = () => {
    if (userFormActive) {
      return (
        <UsersForm 
          userList={userList}
          addNewUser={addNewUser}
          userFormEdit={userFormEdit}
          infoUser={infoUser}/>
      )
    }
  }
  const loadingAddUser = () => {
    setLoadingAdd(true)
    setTimeout(() => {
      setLoadingAdd(false)
    }, 2500)
  }
  const loadingDelet = () => {
    setLoadingDelete(true)
    setTimeout(() => {
      setLoadingDelete(false)
    }, 3000)
  }

  return (
    <div className='CrudAppUsers'>
      {
        loading ? (
          <div className='UsersList'>
            <h1 className='tittle-list'>Users</h1>
            <button className='btn-add-list' onClick={userForm}><b className='add-user-mas'>+</b> Create new user</button>
            <div className='container__cards--users'>
              {
                showInfoCard.map(info => (
                  <CardListUsers 
                  info={info} 
                  key={info.id} 
                  deleteUser={deleteUser}
                  selectUser={selectUser}
                  />
                  ))
                }
            </div>
            <button className='btn-delete' onClick={deleteAllUsers}>Delete</button>
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
