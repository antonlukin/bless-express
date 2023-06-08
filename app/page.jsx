'use client'

import { useState } from 'react'

import Welcome from '../components/Welcome'
import Confession from '../components/Confession'
import Loader from '../components/Loader'
import Final from '../components/Final'

export default function Home() {
  const [screen, setScreen] = useState('welcome')

  const results = [
    {
      "message": "I blew up my work project",
      "name": "Noah",
      "image": "/others/1.jpg"
    },

    {
      "message": "I’ve been watching Tiktoks instead of living life",
      "name": "Iren",
      "image": "/others/2.jpg"
    },

    {
      "message": "I’ve been watching Tiktoks instead of living life",
      "name": "Anonymous",
      "image": "/others/3.jpg"
    },

    {
      "message": "I’ve been watching Tiktoks instead of living life",
      "name": "Anonymous",
      "image": "/others/4.jpg"
    },

    {
      "message": "I’ve been watching Tiktoks instead of living life",
      "name": "Anonymous",
      "image": "/others/5.jpg"
    },
  ]

  return (
    <>
      {screen === 'welcome' &&
        <>
          <Welcome setScreen={setScreen} />
        </>
      }

      {screen === 'confession' &&
        <>
          <Confession setScreen={setScreen} />
        </>
      }

      {screen === 'loader' &&
        <>
          <Loader setScreen={setScreen} />
        </>
      }

      {screen === 'final' &&
        <>
          <Final results={results} />
        </>
      }
    </>
  )
}
