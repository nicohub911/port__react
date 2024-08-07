import { Route, Link} from 'wouter'
import './css/App.css'
import WelCome from './components/home.jsx'
import Story from './components/story.jsx'
import Game from './components/game.jsx'
import GameMenu from './components/gamemenu.jsx';
import ControlsInfo from './components/controls.jsx';

export default function App() {


  return (
    <div className='conteiner'>
      <Route path='/' component={WelCome}/>
      <Route path='/story' component={Story}/>
      <Route path='/game_menu' component={GameMenu}/>
      <Route path='/game' component={Game}/>
      <Route path='/controls' component={ControlsInfo}/>
    </div>
  )
}