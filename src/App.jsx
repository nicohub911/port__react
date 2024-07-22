import { Route, Link} from 'wouter'
import { useEffect, useState } from 'react'
import './App.css'
import WelCome from './components/home.jsx'
import Story from './components/story.jsx'

export default function App() {


  return (
    <div className='conteiner'>
      <Route path='/' component={WelCome}/>
      <Route path='/story' component={Story}/>
    </div>
  )
}