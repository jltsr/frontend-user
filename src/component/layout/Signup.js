import React from 'react'
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { doSignupRequest } from '../../redux-saga/actions/User'
import * as Yup from 'yup';
import swal from 'sweetalert'
import { Link } from "react-router-dom"

export default function Signup() {
  let navigate = useNavigate();
  const dispatch= useDispatch();
  const { isSuccess } = useSelector((state) => state.userState);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      user_email: "",
      pass: "",
      cpass:""
    },
    validationSchema: Yup.object({
      firstname: Yup.string().max(255).required('firstname is required'),
      lastname: Yup.string().max(255),
      user_email: Yup.string().email('Invalid email address').required('Email is required'),
      cpass:Yup
      .string()
      .min(8)
      .max(255).oneOf([Yup.ref('pass'), null], 'Passwords must match'),
      pass: Yup
      .string()
      .min(8)
      .max(255)
      .required("password is required"),
      
    }),
    onSubmit: async (values) => {

      let payload = {
        firstname: values.firstname,
        lastname: values.lastname,
        user_email: values.user_email,
        pass: values.pass
      };

      dispatch(doSignupRequest(payload));
      

      if(isSuccess){
        swal({
          title: "Conratulations !",
          text: "Registration is Successful",
          button: {
            text: "Login",
            className: "swal-button"
          }
        }).then(
          function (isConfirm){
            if(isConfirm){
              navigate("/signin");
            }
          },
          function() {
            navigate("/signin/success");
          }
        );
      }else{
        
      }
      
     //navigate("/signup/success");
      
      

    }
  })

  return (
    <>
    <form className="mt-8 space-y-6"  method="POST">
    <div class="flex items-center justify-center h-screen" >
      <div class="min-w-min flex-col border bg-white px-6 py-6 shadow-md rounded-[4px] ">
        <div class="mb-5 flex justify-center">
          <p class="block text-stone-600 font-roboto text-base font-bold">Form Register</p>
        </div>
        <div class="flex flex-col text-sm rounded-md">
            <label class="block text-stone-600 font-roboto text-xs  mb-1"
             for="firstname">
                First name
            </label>
            <input class="rounded-[4px] border w-full p-3 h-9 hover:outline-none focus:outline-none hover:border-yellow-500 " 
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="firstname" 
                  placeholder="First Name"
                  required />
                  {formik.touched.firstname && formik.errors.firstname ? (
                  <span className="mt-2 text-sm text-red-600">{formik.errors.firstname}</span>
                ) : null}
            <label class="mt-1 block text-stone-600 font-roboto text-xs  mb-1" 
                for="lastname">
                Last name
            </label>
            <input class="rounded-[4px] border w-full p-3 h-9 hover:outline-none focus:outline-none hover:border-yellow-500 " 
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="lastname" 
                  placeholder="Last Name"
                  required />
                  {formik.touched.lastname && formik.errors.lastname ? (
                  <span className="mt-2 text-sm text-red-600">{formik.errors.lastname}</span>
                ) : null}
            <label class="mt-1 block text-stone-600 font-roboto text-xs  mb-1" 
            for="username">
                Email
            </label>
            <input class="rounded-[4px] border w-full p-3 h-9 hover:outline-none focus:outline-none hover:border-yellow-500 " 
                  id="user_email"
                  name="user_email"
                  type="email"
                  value={formik.values.user_email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="user_email" 
                  placeholder="Email"
                  required />
                  {formik.touched.user_email && formik.errors.user_email ? (
                  <span className="mt-2 text-sm text-red-600">{formik.errors.user_email}</span>
                ) : null}
            <label class="mt-1 block text-stone-600 font-roboto text-xs  mb-1" 
                  for="pass">
              Password
            </label>
            <input class=" rounded-[4px] border w-full p-3 h-9 hover:outline-none focus:outline-none hover:border-yellow-500" 
                  id="pass"
                  name="pass"
                  type="password"
                  value={formik.values.pass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="pass" 
                  placeholder="********" />
                  {formik.touched.pass && formik.errors.pass ? (
                  <span className=" mt-2 text-sm text-red-600">{formik.errors.pass}</span>
                ) : null}
            <label class="mt-1 block text-stone-600 font-roboto text-xs  mb-1" for="cpass">
              Confirm Password
            </label>
            <input class="border rounded-[4px] p-3 w-72 h-9 hover:outline-none focus:outline-none hover:border-yellow-500" 
                  id="cpass"
                  name="cpass"
                  type="password"
                  value={formik.values.cpass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="cpass" 
                  placeholder="********" />
                  {formik.touched.cpass && formik.errors.cpass ? (
                  <span className=" mt-2 text-sm text-red-600">{formik.errors.cpass}</span>
                ) : null}
          
        </div>
        <button class="mb-5 mt-5 w-full border p-2 bg-sky-500 font-roboto font-medium text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" 
        type="button" onClick={formik.handleSubmit}>
          Register</button>
        <button class="mb-5 mt-0 w-full border p-2 bg-gray-300 font-roboto font-medium text-gray-900 rounded-[4px] hover:bg-slate-400 scale-105 duration-300" 
        type="button"
        onClick={()=> navigate("/signin")}>
          Cancel</button>
        
      </div>
    </div>
    </form>
    </>
  )
}
