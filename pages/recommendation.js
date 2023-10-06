import React from 'react'
import PageHeader from '@/page_components/page_header'
import MovieRecommendation from '@/page_components/movie_recommendation'
import "../styles/recommendation.scss"

function recommendation() {
  return (
    <div>
        <PageHeader/>
        <MovieRecommendation movie_name="Tarzan" />
    </div>
  )
}

export default recommendation