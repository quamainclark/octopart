import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import styles from '../styles.module.css'

const Index = () => {
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [elapsedTime, setElapsedTime] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    document.getElementById('startTime')?.focus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > 5) {
      return
    }
    if (e.target.name === 'startTime') {
      setStartTime(e.target.value)
    }
    if (e.target.name === 'endTime') {
      setEndTime(e.target.value)
    }
  }

  const validate = (str: string): boolean => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(str)

  const calculate = (): void => {
    if (!startTime && !endTime) {
      setError('Both Start and End Time are empty')
      return
    }
    if (!startTime) {
      setError('Start Time is empty')
      return
    }
    if (!endTime) {
      setError('End Time is empty')
      return
    }
    if (!validate(startTime) && !validate(endTime)) {
      setError('Both Start and End Time are invalid format')
      return
    }
    if (!validate(startTime)) {
      setError('Start Time is invalid format')
      return
    }
    if (!validate(endTime)) {
      setError('End Time is invalid format')
      return
    }

    setError('')
    
    const numStartTime = strToMins(startTime)
    const numEndTime = strToMins(endTime)
    const numElapsedTime = numEndTime - numStartTime ? numEndTime - numStartTime : numEndTime - numStartTime + 24 * 60
    setElapsedTime(minsToHours(numElapsedTime))
  }

  const strToMins = (time: string): number => {
    const nums = time.split(':')
    return Number(nums[0]) * 60 + Number(nums[1])
  }

  const minsToHours = (mins: number): string => {
    return (mins / 60).toFixed(2).toString()
  }

  const reset = (): void => {
    setStartTime('')
    setEndTime('')
    setElapsedTime('')
    setError('')
  }

  return (
    <>
      <Head>
        <title>
          Frontend Exercise - Octopart
        </title>
      </Head>
      <div className={styles.container}>
        <div className={styles.form}>
          <input type="text" id="startTime" value={startTime} name="startTime" onChange={handleChange} />
          <input type="text" value={endTime} name="endTime" onChange={handleChange} />
          <button onClick={calculate}>Calculate</button>
          <button onClick={reset}>Reset</button>
          <div>{error || !elapsedTime ? error : elapsedTime + 'hours'}</div>
        </div>
      </div>
    </> 
  )  
}

export default Index
