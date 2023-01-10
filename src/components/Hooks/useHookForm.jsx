import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import UsersForm from '../elements/UsersForm';
import '../../assets/css/AlertClass.css'

const useHookForm = () => {
  //API Rest
  const apiUsers = "https://api-crud-users-production.up.railway.app/api/v1";
  // Estados
  const [userFormActive, setUserFormActive] = useState(false)
  const [showInfoCard, setShowInfoCard] = useState([])
  const [infoUser, setInfoUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)
  // Activar y desctivar el formulario
  const userForm = () => {
    setUserFormActive(true)
  }
  const userList = () => {
    setUserFormActive(false)
    setInfoUser(null)
  }
  // respuesta de la api al inicio
  useEffect(() => {
    axios.get(`${apiUsers}/users`)
    .then(res => {
      setShowInfoCard(res.data)
    })
    .finally(() => setLoading(true))
  }, [])
  // Ayuda a actualizar la pagina sin necesidad de recargar
  const getUser = () =>{
    axios.get(`${apiUsers}/users`)
    .then(res => {
      setShowInfoCard(res.data)
    })
  }
  // Función para agregar un nuevo usuario
  const addNewUser = (newUser) => {
    loadingAddUser()
    axios.post(`${apiUsers}/users`, newUser)
    .then(() => {
      getUser()
      sucess()
    })
    .catch((error) => {
      console.log(error)
      errorUnexpected(newUser)
    })
  }
  // Alerta de exitosa para cuando se agrega la información de un usuario
  const sucess = () =>{
    Swal.fire({
      icon: "success",
      title: "Registration was successful",
      timer: 3000,
      toast: true,
      backdrop: true
    })
  }
  // Función para seleccinar una card con información 
  const selectUser = (userSelect) => {
    setUserFormActive(true)
    setInfoUser(userSelect)
  }
  // Función para editar la información de un usuario
  const userFormEdit = (userEdit) =>{
    loadingAddUser()
    axios.patch(`${apiUsers}/users/${userEdit.id}/`, userEdit)
    .then(() => {
      getUser()
      sucessUpdate()
    })
    .catch((error) => {
      console.log(error)
      errorUnexpected()
    })
  }
  // Alerta de exitosa para cuando se edita la información de un usuario
  const sucessUpdate = () =>{
    Swal.fire({
      icon: "success",
      title: "The information was updated correctly",
      timer: 4000,
      toast: true,
      backdrop: true
    })
  }

  // Función para elimina una card con información de un usuario
  const deleteUser = (id) => {
    loadingDelet()
    axios.delete(`${apiUsers}/users/${id}/`)
    .then(() => {
      getUser()
    })
  }
  // Alerta de de pregunta para cuando un usuario desea elimar información
  const confirmDeleteOne = (id) => {
    Swal.fire({
      title: 'Do you want to delete this user?',
      text: 'The user will be permanently deleted',
      icon: 'question',
      footer: '<span>He user will be deleted in a few seconds</span>',
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
    }).then(res => {
      if (res.isConfirmed) {
        deleteUser(id)
        Swal.fire({
          icon: "success",
          title: "Was removed successfully"          
        })
      }
    })
  }
  // Función para eliminar todas las card con información
  const deleteAllUsers = () => {
    loadingDelet()
    showInfoCard.map(e => {
      axios.delete(`${apiUsers}/users/${e.id}/`)
      .then(() => getUser())
    })
  }
  // Alerta de de pregunta para cuando un usuario desea elimar toda información
  const confirmDeleteAll = () => {
  Swal.fire({
    title: 'Do you want to remove all users?',
    text: 'Users will be permanently deleted',
    icon: 'question',
    footer: '<span>Users will be deleted in a few seconds</span>',
    showConfirmButton: true,
    showCancelButton: true,
    cancelButtonText: `Cancel`,
  }).then(res => {
    if (res.isConfirmed) {
      deleteAllUsers()
      Swal.fire({
        icon: "success",
        title: "All users were successfully removed"          
      })
    }
  })
}
  // Alerta para errores que cometa el usuario o errores inesperados
  const errorUnexpected = (newUser) =>{
    Swal.fire({
      title: "Try it again!",
      icon: "error",
      text: "The information has not been added correctly",
      footer: "There are chances that the API is not responding correctly",
      showConfirmButton: true,
      confirmButtonText: 'Try again',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    }).then((res) =>{
      if (res.isConfirmed){
        setUserFormActive(true)
      }
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
    }, 3000)
  }
  const loadingDelet = () => {
    setLoadingDelete(true)
    setTimeout(() => {
      setLoadingDelete(false)
    }, 3000)
  }


  return [
    userForm, 
    loading, 
    showInfoCard, 
    confirmDeleteOne, 
    confirmDeleteAll,
    selectUser, 
    loadingAdd, 
    loadingDelete,
    show,
  ]
};

export default useHookForm;