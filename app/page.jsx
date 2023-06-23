'use client'

import { useState, useEffect } from 'react'

import Welcome from '../components/Welcome'
import Confession from '../components/Confession'
import Loader from '../components/Loader'
import Final from '../components/Final'

export default function Home() {
  const [screen, setScreen] = useState('final')
  const [results, setResults] = useState({})

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
          <Welcome setScreen={setScreen} />
        </>
      }

      {screen === 'confession' &&
        <>
          <Confession setScreen={setScreen} setResults={setResults} />
        </>
      }

      {screen === 'loader' &&
        <>
          <Loader setScreen={setScreen} />
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
