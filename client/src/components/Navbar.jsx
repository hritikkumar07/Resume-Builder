import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/features/authSlice'

const Navbar = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()
{/* here we use navigate so that the user will logout*/ }

    const logoutUser = ()=>{
        navigate('/')
        dispatch(logout())

    }

  return (
    <div className='shadow bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 print:hidden'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 dark:text-slate-200 transition-all'>
            <Link to='/'>
            <img src={logo} alt="logo" className='h-11 w-auto dark:brightness-125' />
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'>Hi, {user?.name}</p>
                <button onClick={logoutUser} className='bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 border border-gray-300 dark:border-slate-800 text-slate-850 dark:text-slate-200 px-7 py-1.5 rounded-full active:scale-95 transition-all cursor-pointer'>Logout</button>
            </div>
        </nav>

    </div>
  )
}

export default Navbar