import { IoPlayCircleOutline } from "react-icons/io5";
import '../css/home.css'
import { Link } from "wouter";


export default function WelCome(){
    return(
        <div className="home__container">
            <Link className="home__container__Link" to="/story"><IoPlayCircleOutline className="home__container__Link__icon"/></Link>
        </div>
    )
}