import React from 'react'
import { Link } from "react-router-dom";
import { useForm,Controller  } from "react-hook-form";
import userService from "../service/event.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    userService
      .getUserById(data)
      .then(() => {
        //console.log(data)
        sessionStorage.setItem('user',JSON.stringify(data))
        toast.success("Account created Successfully!");
        reset();
      })
      .catch((error) => {
        toast.error("Error creating Account");
      });
    };

  return (
    <div class="min-h-screen bg-purple-400 flex justify-center items-center">
    <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"></div>
    <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"></div>
    <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
      <div>
        <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Login</h1>
      </div>
      <div class="space-y-4">
        <input type="text" placeholder="Email Addres" class="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500" />
        <input type="text" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500" />
      </div>
      <div class="text-center mt-6">
        <button class="w-full py-2 text-xl text-white bg-purple-400 rounded-lg hover:bg-purple-500 transition-all">Login</button>
        <p class="mt-4 text-sm">Already Have An Account? <span class="underline  cursor-pointer"><Link to="/signup"> Sign Up</Link></span></p>
      </div>
    </div>
    <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
    <div class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"></div>
  </div>
  
  )
}
