import React from 'react'
import Link from 'next/link'
import PageHeader from '@/page_components/page_header'
import Mainpage from '../new_components/mainpage'
import MovieList from '../page_components/movie_list'
import GenrePage from '@/page_components/genrePage'

import dynamic from 'next/dynamic'
import "../styles/home.scss"

function home() {
  return (
    <div>
        <PageHeader/>
        <div className='instructions_main'>We recommend based on your preferences!</div>
        <Mainpage />
        <div className='button_container'>
           <Link href={`/ratingpage`}> <button>Submit Preferences</button></Link>
        </div>
    </div>
  )
}

export default home