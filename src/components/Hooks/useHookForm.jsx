import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import UsersForm from '../elements/UsersForm';

const useHookForm = () => {
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
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then(res => {
      setShowInfoCard(res.data)
    })
    .finally(() => setLoading(true))
  }, [])
  // Ayuda a actualizar la pagina sin necesidad de recargar
  const getUser = () =>{
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then(res => {
      setShowInfoCard(res.data)
    })
  }
  // Función para agregar un nuevo usuario
  const addNewUser = (newUser) => {
    loadingAddUser()
    axios.post('https://users-crud1.herokuapp.com/users/', newUser)
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
      title: "El registro fue exitoso",
      timer: 4000
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
    axios.put(`https://users-crud1.herokuapp.com/users/${userEdit.id}/`, userEdit)
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
      title: "La información fue actualizada correctamente",
      timer: 4000
    })
  }

  // Función para elimina una card con información de un usuario
  const deleteUser = (id) => {
    loadingDelet()
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(() => {
      getUser()
    })
  }
  // Alerta de de pregunta para cuando un usuario desea elimar información
  const confirmDeleteOne = (id) => {
    Swal.fire({
      title: '¿Quieres elimimar este usuario?',
      text: 'El usuaio se eliminará definitivamente',
      icon: 'question',
      footer: '<span>El usuario se eliminara en unos segundos</span>',
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
    }).then(res => {
      if (res.isConfirmed) {
        deleteUser(id)
        Swal.fire({
          icon: "success",
          title: "Fue eliminado correctamente"          
        })
      }
    })
  }
  // Función para eliminar todas las card con información
  const deleteAllUsers = () => {
    loadingDelet()
    showInfoCard.map(e => {
      axios.delete(`https://users-crud1.herokuapp.com/users/${e.id}/`)
      .then(() => getUser())
    })
  }
  // Alerta de de pregunta para cuando un usuario desea elimar toda información
  const confirmDeleteAll = () => {
  Swal.fire({
    title: '¿Quieres elimimar este usuario?',
    text: 'Los usuaios se eliminarán definitivamente',
    icon: 'question',
    footer: '<span>Los usuarios se eliminaran en unos segundos</span>',
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
    showCancelButton: true,
    cancelButtonText: `Cancel`,
  }).then(res => {
    if (res.isConfirmed) {
      deleteAllUsers()
      Swal.fire({
        icon: "success",
        title: "Todos los usuarios fueron eliminados correctamente"          
      })
    }
  })
}
  // Alerta para errores que cometa el usuario o errores inesperados
  const errorUnexpected = (newUser) =>{
    Swal.fire({
      title: "¡Vuelve a intentarlo!",
      icon: "error",
      text: "La información no ha sido agregada correctamente",
      footer: "Hay posibilidades de que la API no responda correctamente",
      showConfirmButton: true,
      confirmButtonText: 'Intentar de nuevo',
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