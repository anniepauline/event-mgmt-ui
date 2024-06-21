import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import userService from '../service/event.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import axios from "axios";


function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
  });

  // userService
  // .saveUser(data)
  // .then(() => {
  //   sessionStorage.setItem('user', JSON.stringify(data));
  //   toast.success('Account created successfully!');
  //   reset();
  // })

  // const checkEmail =  (email) => {
  //   userService.checkEmail(email).then((res)=>{
  //     console.log(res.data.present)
  //     // if(res.data.present) 
  //     //   console.log("Email ID is already in use") 
  //     // else console.log("Email available");
  //     return res.data.present ? '*Email ID is already in use' : "";
  //   })}

  const onSubmit = (data) => {
    userService
      .saveUser(data)
      .then(() => {
        sessionStorage.setItem('user', JSON.stringify(data));   
        toast.success('Account created successfully!');
        reset();
      })
      .catch((error) => {
        toast.error('Error creating account');
      });
  };

  return (
    <div className="min-h-screen bg-purple-400 flex justify-center items-center">
      <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
      <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
      <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <ToastContainer />
        <div className="justify-center text-center">
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Create An Account</h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            Create an account to enjoy all the services without any ads for free!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Controller
                name="name"
                rules={{
                  required: '*Username is required',
                  minLength: {
                    value: 3,
                    message: '*Minimum 3 characters required',
                  },
                }}
                control={control}
                render={({ field }) => (
                  <input
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 form-control"
                    type="text"
                    placeholder="Name"
                    size="lg"
                    {...field}
                  />
                )}
              />
              {errors?.name?.message && (
                <span className="text-sm text-red-600">{errors?.name?.message}</span>
              )}
            </div>
            <div>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: '*Email ID is required',
                  validate: {
                    checkEmail:  (email)=>{
                     return userService.checkEmail(email).then((res)=>{ 
                        return res.data.present ? "*Email already exists!" : "";
                     });                 
                    }
                  },
                  pattern: {
                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                    message: '*Email ID is invalid',
                  },
                }}
                render={({ field }) => (
                  <input
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 form-control"
                    placeholder="Email Address"
                    type="email"
                    size="lg"
                    {...field}
                  />
                )}
              />
              {errors?.email?.message && (
                <span className="text-sm text-red-600">{errors?.email?.message}</span>
              )}
            </div>
            <div>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: '*Password is required',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                    message: '*Password not strong enough',
                  },
                }}
                render={({ field }) => (
                  <input
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 form-control"
                    type="password"
                    {...field}
                    size="lg"
                    placeholder="Password"
                  />
                )}
              />
              {errors?.password?.message && (
                <span className="text-sm font-normal text-red-600">{errors?.password?.message}</span>
              )}
            </div>
            <div>
              <Controller
                name="confirmpassword"
                control={control}
                rules={{
                  required: '*Confirm Password is required',
                  validate: (value) => getValues('password') === value || 'Passwords do not match',
                }}
                render={({ field }) => (
                  <input
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 form-control"
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                    size="lg"
                  />
                )}
              />
              {errors?.confirmpassword?.message && (
                <span className="text-sm text-red-600">
                  {errors?.confirmpassword?.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-center mt-6">
            <button className="w-full py-2 text-white bg-purple-400 rounded-lg hover:bg-purple-500 transition-all">
              Create Account
            </button>
            <p className="mt-4 text-sm xl:text-w">
              Already Have An Account?
              <span className="underline cursor-pointer">
                {' '}
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
      <div className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
    </div>
  );
}

export default Signup;
