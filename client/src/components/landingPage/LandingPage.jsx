import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'
import img from '../../images/fotoLanding.jpg'

export default function LandingPage() {

    
    return (
      <div>
        <img id={style.img} src={img} alt="" />
        <div id={style.gradient}/>
        <div className={style.container}>
          <h1 className={style.h1}>KNOW YOUR WORLD</h1>
          <Link id={style.navLink} to={'/home'}><button id={style.button}>click here to discover more</button></Link>
        </div>
      </div>
    )}