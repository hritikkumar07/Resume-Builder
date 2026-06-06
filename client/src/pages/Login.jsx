import React, { useState, useEffect } from 'react'
import { X, Sparkles, ArrowRight } from "lucide-react";
import api from '../confix/api';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = ({ isOpen, onClose, initialMode = "login" }) => {
  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = useState(urlState || initialMode)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  // Listen to escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message || `Successfully logged in!`)
      if (onClose) onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const cardContent = (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xl p-8 relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Visual Delighters */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>

      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="size-5" />
        </button>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-4">
          <Sparkles className="size-6" />
        </div>
        <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
          {state === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          {state === "login" ? "Enter your credentials to access your workspace" : "Build stunning SaaS-grade resumes in seconds"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {state !== "login" && (
          <input 
            type="text" 
            name="name" 
            placeholder="Your Full Name" 
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none text-sm"
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        )}

        <input 
          type="email" 
          name="email" 
          placeholder="me@company.com" 
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none text-sm"
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none text-sm"
          value={formData.password} 
          onChange={handleChange} 
          required 
        />

        {state === "login" && (
          <div className="text-right">
            <button 
              type="button" 
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline"
              onClick={() => toast.success("Password reset simulated!")}
            >
              Forgot password?
            </button>
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>{state === "login" ? "Sign In" : "Sign Up"}</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {state === "login" ? "New to the platform?" : "Already have an account?"}{" "}
          <button 
            type="button"
            onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            {state === "login" ? "Create an account" : "Sign in here"}
          </button>
        </p>
      </div>
    </motion.div>
  )

  if (isOpen) {
    return (
      <div 
        className="fixed inset-0 z-[999] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={onClose}
      >
        {cardContent}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      {cardContent}
    </div>
  )
}

export default Login