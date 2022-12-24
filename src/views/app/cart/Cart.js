import React from 'react'
import Page from '../../../component/commons/Page'
import { useDispatch, useSelector } from 'react-redux';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Cart() {
    const dispatch= useDispatch();
    const { userProfile } = useSelector((state) => state.userState);
  return (
    <Page title="Cart"></Page>

  )
}
