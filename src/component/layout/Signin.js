import React,{useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { doSigninRequest } from '../../redux-saga/actions/User'

export default function Signin() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/app";

  const dispatch = useDispatch();
  const { message, isLoggedIn } = useSelector((state) => state.userState);


  useEffect(() => {
    if (isLoggedIn){
      navigate(from, { replace: true })
    }

  }, [isLoggedIn])
  

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup
      .string()
      .min(5)
      .max(255)
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      let payload = {
        username: values.username,
        password: values.password
      };

      dispatch(doSigninRequest(payload));
      

    }
  });


  return (
    <>
    <form className="mt-8 space-y-6"  method="POST">
    <div class="flex items-center justify-center h-screen" >
      <div class="min-w-min flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
        <div class="mb-8 flex justify-center">
          <img class="w-30" src="./assets/images/LogoApps.png" alt="" />
        </div>
        <div class="flex flex-col text-sm rounded-md">
            <label class="block text-stone-600 font-roboto text-xs  mb-2"
                   
                   for="username">
                Email
            </label>
            <input class=" rounded-[4px] border w-full p-3  hover:outline-none focus:outline-none hover:border-yellow-500 "
                id="username"
                name="username"
                type="email"
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder="Email Address"
                autoComplete="email"
                required />
                {formik.touched.username && formik.errors.username ? (
                  <span className="mt-2 text-sm text-red-600">{formik.errors.username}</span>
                ): null}
            <label class="block text-stone-600 font-roboto text-xs  mb-2" for="password">
              Password
            </label>
            <input class="border rounded-[4px] p-3 w-72 hover:outline-none focus:outline-none hover:border-yellow-500"
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                  required
                  placeholder="Password" />
                  {formik.touched.password && formik.errors.password ? (
                  <span className="mt-2 text-sm text-red-600">{formik.errors.password}</span>
                ) : null}
                {message ? (
                  <span className="mt-2 text-sm text-red-600">{message}</span>
                ) : null}
          
        </div>
        <div class="mt-5 flex justify-between">
          <a href="/forgotpassword" class="text-sm text-sky-500 font-roboto font-bold">Forgot password?</a>
          <button class="mt-0 w-20 border p-2 bg-sky-500 font-roboto font-medium text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" 
          type="button" onClick={formik.handleSubmit}>Log in</button>

        </div>
        <div class="flex justify-center mt-12 text-xs">
          <p class="text-stone-600 font-roboto">Dont't have am account?</p>
        </div>
        <div class="flex justify-center text-xs">
          <a href="/signup" class="text-sky-500 font-roboto">Register</a>
        </div>
      
        <div class="mt-5 flex text-center text-xs text-gray-400">
          
        </div>
        
      </div>
    </div>
    </form>
    </>
  )
}
