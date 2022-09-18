import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/css/UsersForm.css'

const UsersForm = ({userList, addNewUser, infoUser, userFormEdit}) => {
  const {register, handleSubmit, reset} = useForm()

  useEffect(() => {
    if (infoUser) {
      reset(infoUser)
    }
  }, [infoUser])
  const submit = (form) => {
    if (infoUser) {
      userFormEdit(form)
      userList()
    }else{
      addNewUser(form)
      userList()
    }
  }

  return (
    <div className='form__container'>
      <div className='form'>
        <h2>Add new user</h2>
        <form onSubmit={handleSubmit(submit)}  className='form-inputs'>
          <label htmlFor="first_name" className='label'>First Name</label>
          <input 
            type="text" 
            id='first_name'
            className='input'
            {...register("first_name")}/>

          <label htmlFor="last_name" className='label'>Last Name</label>
          <input 
            type="text" 
            id='last_name'
            className='input'
            {...register("last_name")}/>

          <label htmlFor="email" className='label'>Email</label>
          <input 
            type="email" 
            id='email'
            className='input'
            {...register("email")}/>

          <label htmlFor="password" className='label'>Password</label>
          <input 
            type="password" 
            id='password'
            className='input'
            {...register("password")}/>

          <label htmlFor="birthday" className='label'>Birthday</label>
          <input 
            type="date" 
            id='birthday'
            className='input'
            {...register("birthday")}/>

          <div className='btn__form--cotainer'>
            <button className='btn__save btn-form'>Save</button>
            <i onClick={() => userList()} class="fa-solid fa-circle-xmark btn__cancel btn-form"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersForm;