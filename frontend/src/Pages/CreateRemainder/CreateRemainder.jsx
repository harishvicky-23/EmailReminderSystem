import React, { useState } from 'react'
import style from './CreateRemainder.module.css'
import Icon from '../../Components/Icon'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

function CreateRemainder() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    from: 'aidsboyssm@gmail.com',
    title: '',
    to: '',
    subject: '',
    message: '',
    time: ''
  })

  const handleOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    const addData = async () => {
      await api
        .post('/createremainder', {
          ...formData,
          time: new Date(formData.time)
        })
        .then(res => console.log(res))
        .catch(e => console.log(`Error: ${e}`))
    }

    navigate('/', { state: { isSend: true } })
    addData()
  }

  return (
    <main className={style.mainContainer}>
      <h2 className={style.title}>
        <Icon name="schedule" color="#007bff" size="28px" /> Schedule a Reminder
      </h2>

      <form onSubmit={handleOnSubmit} className={style.formContainer}>
        <div className={style.inputGroup}>
          <Icon name="title" color="#007bff" />
          <input
            onChange={handleOnChange}
            value={formData.title}
            type="text"
            id="title"
            name="title"
            placeholder="Enter reminder title"
            required
          />
        </div>

        <div className={style.inputGroup}>
          <Icon name="mail" color="#007bff" />
          <input
            onChange={handleOnChange}
            value={formData.to}
            type="email"
            id="to"
            name="to"
            placeholder="Recipient email"
            required
          />
        </div>

        <div className={style.inputGroup}>
          <Icon name="subject" color="#007bff" />
          <input
            onChange={handleOnChange}
            value={formData.subject}
            type="text"
            id="subject"
            name="subject"
            placeholder="Email subject"
          />
        </div>

        <div className={style.textAreaGroup}>
          <Icon name="chat" color="#007bff" />
          <textarea
            onChange={handleOnChange}
            value={formData.message}
            id="message"
            name="message"
            placeholder="Write your reminder message..."
          ></textarea>
        </div>

        <div className={style.inputGroup}>
          <Icon name="calendar_month" color="#007bff" />
          <input
            name="time"
            id="time"
            onChange={handleOnChange}
            type="datetime-local"
            value={formData.time}
            required
          />
        </div>

        <button type="submit" className={style.submitButton}>
          <Icon name="send" color="white" /> Schedule Reminder
        </button>
      </form>
    </main>
  )
}

export default CreateRemainder
