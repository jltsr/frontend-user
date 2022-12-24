import React from 'react'
import Page from '../../../component/commons/Page'
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
    const dispatch= useDispatch();
    const { userProfile } = useSelector((state) => state.userState);
  return (
    <Page title="Dashboard"></Page>

  )
}
