import React from 'react'
import MovieList from '@/page_components/movie_list'
import Link from 'next/link'
import PageHeader from '@/page_components/page_header'
import '../styles/ratingPage.scss'

function ratingpage() {
  return (
    <div>
        <PageHeader />
        <MovieList />

        
        <div className='button_container'>
           <Link href={`/recommendation`}> <button>Submit Preferences</button></Link>
        </div>
    </div>
  )
}

export default ratingpage;