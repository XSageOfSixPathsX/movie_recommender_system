import React from 'react'
import "../styles/pageHeaderStyles.scss"

function pageHeader() {
  return (
    <div className='header'>
                <div className='main_text'>
                    Movie_bud
                </div>
                <div className='secondary_text'>
                    Movie recommendations just for you!
                </div>
        </div>
  )
}

export default pageHeader