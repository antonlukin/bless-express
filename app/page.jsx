'use client'

import { useState, useEffect } from 'react'

import Welcome from '../components/Welcome'
import Confession from '../components/Confession'
import Loader from '../components/Loader'
import Final from '../components/Final'

export default function Home() {
  const [screen, setScreen] = useState('welcome')
  const [results, setResults] = useState({})
  const [sounds, setSounds] = useState({})

  useEffect(() => {
    const aaa = document.createElement('audio')
    aaa.src = '/sounds/aaa.mp3'

    const knock = document.createElement('audio')
    knock.src = '/sounds/knock.mp3'

    setSounds({aaa, knock})
  }, [])

  useEffect(() => {
    if (document.location.hash === '#receive') {
      window.history.replaceState('', document.title, window.location.pathname)
      setScreen('confession')
    }
  }, [])

  return (
    <>
      {screen === 'welcome' &&
        <>
          <Welcome setScreen={setScreen} sounds={sounds} />
        </>
      }

      {screen === 'confession' &&
        <>
          <Confession setScreen={setScreen} setResults={setResults} />
        </>
      }

      {screen === 'loader' &&
        <>
          <Loader setScreen={setScreen} sounds={sounds} />
        </>
      }

      {screen === 'final' &&
        <>
          <Final results={results} setScreen={setScreen} />
        </>
      }
    </>
  )
}
