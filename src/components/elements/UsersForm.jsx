import React,  { useEffect } from 'react';
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
        <form onSubmit={handleSubmit(submit)}  className='form-inputs' autoComplete='Off'>

          <div className='form-container-input'>
            <input 
              type="text" 
              id='first_name'
              className='input'
              placeholder=' '
              {...register("first_name")}/>
            <label htmlFor="first_name" className='label'>First Name</label>
            <span className='input-line'></span>
          </div>

          <div className='form-container-input'>
            <input 
              type="text" 
              id='last_name'
              className='input'
              placeholder=' '
              {...register("last_name")}/>
            <label htmlFor="last_name" className='label'>Last Name</label>
            <span className='input-line'></span>
          </div>

          <div className='form-container-input'>
          <input 
            type="email" 
            id='email'
            className='input'
            placeholder=' '
            {...register("email")}/>
          <label htmlFor="email" className='label'>Email</label>
          <span className='input-line'></span>
          </div>

          <div className='form-container-input'>
            <input 
              type="password" 
              id='password'
              className='input'
              placeholder=' '
              {...register("password")}/>
            <label htmlFor="password" className='label'>Password</label>
            <span className='input-line'></span>
          </div> 

          <div className='form-container-input'>
            <input 
              type="date" 
              id='birthday'
              placeholder=' '
              className='input input-birthday'
              {...register("birthday")}/>
          </div>

          <div className='btn__form--cotainer'>
            <button className='btn__save btn-form'>Save</button>
            <i onClick={() => userList()} className="fa-solid fa-circle-xmark btn__cancel btn-form"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersForm;