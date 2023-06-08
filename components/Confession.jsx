'use client'

import { useState } from 'react'

import Header from '../components/Header'
import Button from './Button'
import styles from './Confession.module.scss'

const Confession = ({setScreen, setResults}) => {
  const [fields, setFields] = useState({message: '', email: '', name: ''})
  const [errors, setErrors] = useState({})

  const submitForm = async (e) => {
    e.preventDefault()

    try {
      if (!fields.message) {
        return setErrors({...errors, message: true})
      }

      if (fields.email && !fields.email.match(/.+@.+\..+/u)) {
        return setErrors({...errors, email: true})
      }

      const response = await fetch('/share/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      })

      if (response.status === 200) {
        return setScreen('loader')
      }

      setErrors({...errors, message: true})
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <section className={styles.wrapper}>
      <Header />

      <h3 className={styles.caption}>What&apos;s bothering you, my child</h3>

      <form action="/" className={styles.form} method='POST' onSubmit={submitForm}>
        <p>
          <textarea
            value={fields.message}
            placeholder='My sin...'
            onChange={(e) => {
              setFields({...fields, message: e.target.value})
            }}
            data-error={errors.message ? '' : null}
          />
        </p>

        <p>
          <input
            value={fields.email}
            type='text'
            placeholder='Send it by email'
            onChange={(e) => {
              setFields({...fields, email: e.target.value})
            }}
            data-error={errors.email ? '' : null}
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
          />
        </p>

        <label className={styles.switcher}>
          <strong>Anonymous</strong>

          <input type="checkbox" />
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