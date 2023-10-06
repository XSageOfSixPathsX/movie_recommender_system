import React from 'react'
import Link from 'next/link'
import "../styles/routingButtonStyles.scss"

function routingButton() {
  return (
    <div className='button_container'>
           <Link href={`/recommendation`}> <button>Submit Preferences</button></Link>
    </div>
  )
}

export default routingButton