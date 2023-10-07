import React from 'react'
import PageHeader from '@/page_components/page_header'
import MovieList from '../page_components/movie_list'
import RoutingBsutton from '@/page_components/routing_button'
import dynamic from 'next/dynamic'
import "../styles/home.scss"

function home() {
  return (
    <div>
        <PageHeader/>
        <div className='instructions_main'>Rate the movies below, based on your choices we will recommend a new movie for you to enjoy!</div>
        <MovieList/>
        <RoutingBsutton />
        
    </div>
  )
}

export default home