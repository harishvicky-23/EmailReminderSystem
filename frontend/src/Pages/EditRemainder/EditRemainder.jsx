import React, { useState } from 'react'
import style from './EditRemainder.module.css'
import Icon from '../../Components/Icon'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../../api/axios'

function formatDateForInput(date) {
  const d = new Date(date)
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 16)
}

function EditRemainder() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state.data

  const [formData, setFormData] = useState({
    ...data,
    time: formatDateForInput(data.time)
  })

  const handleOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = e => {
    e.preventDefault()

    const editData = async () => {
      await api
        .post('/editremainder', {
          ...formData,
          time: new Date(formData.time)
        })
        .then(res => console.log(res))
        .catch(e => console.log(`Error: ${e}`))
    }

    navigate('/', { state: { isSend: true, message: 'Edited' } })
    editData()
  }

  return (
    <main className={style.mainContainer}>
      <h2 className={style.title}>
        <Icon name="edit_calendar" color="#007bff" size="28px" /> Edit Reminder
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
          <Icon name="save" color="white" /> Update Reminder
        </button>
      </form>
    </main>
  )
}

export default EditRemainder
