import React from 'react'
import Page from '../../../component/commons/Page'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

export default function Account() {
    const dispatch= useDispatch();
    const { userProfile } = useSelector((state) => state.userState);
  return (
    <Page title="Account"></Page>

  )
}
