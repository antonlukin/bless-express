'use client'

import { useState } from 'react'

import Header from '../components/Header'
import Button from './Button'
import styles from './Confession.module.scss'

const Confession = ({setScreen, setResults}) => {
  const [fields, setFields] = useState({message: '', email: '', name: ''})
  const [errors, setErrors] = useState({})
  const [anonym, setAnonym] = useState(false)
  const [loader, setLoader] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault()

    try {
      if (!fields.message) {
        return setErrors({...errors, message: true})
      }

      if (fields.email && !fields.email.match(/.+@.+\..+/u)) {
        return setErrors({...errors, email: true})
      }

      setLoader(true)

      // Create request data from fields
      const data = {...fields, anonym: Number(anonym)}

      const response = await fetch('/share/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.status === 200) {
        const json = await response.json();

        if (json.data) {
          setResults(json.data)
          return setScreen('loader')
        }
      }
    } catch(error) {
      console.error(error)
    }

    setLoader(false)
    setErrors({...errors, message: true})
  }

  const classes = [styles.wrapper]

  if (loader) {
    classes.push(styles.loader)
  }

  return (
    <section className={classes.join(' ')}>
      <Header />

      <h3 className={styles.caption}>What&apos;s bothering you, my child</h3>

      <form action="/" className={styles.form} method='POST' onSubmit={submitForm}>
        <p>
          <textarea
            value={fields.message}
            placeholder='My sin...'
            onChange={(e) => {
              setFields({...fields, message: e.target.value})
              setErrors({})
            }}
            maxLength={300}
            className={errors.message ? styles.error : null}
          />
        </p>

        <p>
          <input
            value={fields.email}
            type='text'
            placeholder='Send it by email'
            onChange={(e) => {
              setFields({...fields, email: e.target.value})
              setErrors({})
            }}
            className={errors.email ? styles.error : null}
          />
        </p>

        <p>
          <input
            value={fields.name}
            type='text'
            placeholder='Name'
            onChange={(e) => {
              setFields({...fields, name: e.target.value})
            }}
            className={anonym ? styles.hidden : null}
          />
        </p>

        <label className={styles.switcher}>
          <strong>Anonymous</strong>

          <input type="checkbox" onChange={(e) => {
            setAnonym(e.target.checked)
          }} />
          <span>Toggle</span>
        </label>

        <p>
          <Button type='submit'>Receive indulgence</Button>
        </p>
      </form>
    </section>
  )
}

export default Confession;