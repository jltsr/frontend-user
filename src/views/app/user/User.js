import React, { useState, useEffect } from 'react'
import Page from '../../../component/commons/Page';
import { useNavigate, NavLink, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doGetUserRequest } from '../../../redux-saga/actions/User';
import {
  CalendarIcon,
  ChevronLeftIcon,
  UserGroupIcon,
  XIcon
} from '@heroicons/react/solid'
import { ChevronRightIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function User() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.userState);
  const [pageNumbers, setPageNumbers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageRange, setPageRange] = useState(0)
  const [refresh, setRefresh] = useState(false)

  useEffect(()=>{
    dispatch(doGetUserRequest())
  }, [refresh])
  
  useEffect(()=>{
    setPageNumbers(Array.from({length: Math.ceil(users.length/5)}, (v, i) => (i+1 === 1 ? {number: i+1, active: true} : {number: i+1, active: false})))
  },[users])  
  console.log(pageNumbers);
  console.log(pageRange);
  return (
    <Page title='List User'>
      <div class="rounded-xl border p-5 shadow-md w-5/5 bg-gray-100">
          
              {
                users && users.slice((currentPage-1)*5,currentPage*5).map((u)=>(
                  <div class=" mb-2  min-h-fit gap-y-2 min-w-fit border-2 border-b-4 p-3  bg-white border-gray-300 rounded-xl hover:bg-gray-50">
                    <div class="col-span-4 md:col-span-3 ">
                      <p class="text-gray-600 font-bold text-xs">{u.firstname+' '+u.lastname} </p>
                      <p class="text-gray-600  text-xs"> {u.email} </p>
                    </div>
                  </div>
                ))
              }
          </div>
          <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-300 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                      
                  </div>
                  <div>
                      <nav className="relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination">
                          <button
                              type="button"
                              onClick={()=>{
                                  const min = 0
                                  if (pageRange>min) {
                                      setPageRange(pageRange-1)
                                  }
                              }}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                              <span className="sr-only">Previous</span>
                                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                         

                          {pageNumbers.slice(pageRange*4, pageRange*4+4).map(el=>(
                              <button
                                  type="button"
                                  onClick={()=>{
                                      setCurrentPage(el.number)
                                      setPageNumbers([...pageNumbers].map(val=>(val.number === el.number ? {...val,active:true} : {...val,active:false})))
                                  }}
                                  aria-current="page"
                                  className={classNames(el.active ? "z-20 bg-orange-100 border-orange-600 text-orange-900" : "z-10 bg-white border-gray-300 text-gray-600",
                                  "relative inline-flex items-center px-4 py-2 border text-sm font-medium")}
                                  >
                                  {el.number}
                              </button>
                          ))}
                          <button
                              type="button"
                              onClick={()=>{
                                  const max = Math.ceil(pageNumbers.length/4)-1
                                  if (pageRange<max) {
                                      setPageRange(pageRange+1)
                                  }
                              }}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                              >
                              <span className="sr-only">Next</span>
                              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                      </nav>
                  </div>
              </div>
          </div>
      
    </Page>
  )
}