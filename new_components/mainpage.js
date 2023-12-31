import React, { useEffect, useState } from 'react'
import { Form, Radio } from 'semantic-ui-react'
import '../styles/mainpage.scss'

function mainpage() {
   
    const handleChange1 = (e) => {
        localStorage.setItem("genre1", e.target.value);
    }
    const handleChange2 = (e) => {
        localStorage.setItem("genre2", e.target.value);
    }
    const handleChange3 = (e) => {
        localStorage.setItem("genre3", e.target.value);
    }

  return (
    <div>
        <div className='tip'>Please enter the details below :</div>
        <div className='field'><div className='label'>Enter age</div>
        <input type='number' className='ageInput'/></div>
        <div className='field'>
        <div className='label'>Enter gender</div>
        <select className='genderInput'>
            <option value="">Gender</option>
            <option value="1">Male</option>
            <option value="0">Female</option>
        </select>
        </div>
        <div className='field'>
            <div className='tip'>Which genre would you like to watch</div>
            <div>
                <div className='label'>1st Choice</div>
                <select className='genreInput1' onChange={handleChange1}>
                    <option value="">Genre</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romance">Romance</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Animated">Animated</option>
                </select>
            </div>
            <div>
                <div className='label'>2nd Choice</div>
                <select className='genreInput2' onChange={handleChange2}>
                    <option value="">Genre</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romance">Romance</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Animated">Animated</option>
                </select>
            </div>
            <div>
                <div className='label'>3rd Choice</div>
                <select className='genreInput3' onChange={handleChange3}>
                    <option value="">Genre</option>
                    <option value="Horror">Horror</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romance">Romance</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Animated">Animated</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default mainpage