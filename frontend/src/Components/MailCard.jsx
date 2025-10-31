import React from 'react'
import style from './MailCard.module.css'
import Icon from './Icon'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function formatDateForInput(date) {
  const d = new Date(date)
  const formattedDate = d.toISOString().slice(0, 10)
  let hours = d.getHours()
  let minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
  return [formattedDate, formattedTime]
}

function MailCard({ data }) {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate('/editremainder', { state: { data: data } })
  }

  const handelDelete = async () => {
    await api
      .delete(`/deleteremainder/${data._id}`)
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  const name = data.isSent ? 'check_circle' : 'schedule'
  const color = data.isSent ? 'limegreen' : '#007bff'

  return (
    <div className={style.mailCard}>
      <div className={style.iconBox}>
        <Icon name={name} color={color} size="26px" />
      </div>
      <div className={style.bodyContainer}>
        <h3 className={style.title}>{data.title}</h3>
        <p className={style.mailBody}>
          To: <b>{data.to}</b> — {formatDateForInput(data.time)[0]} at {formatDateForInput(data.time)[1]}
        </p>
      </div>
      {!data.isSent && (
        <div className={style.buttons}>
          <button onClick={handleEdit} className={style.iconButton}>
            <Icon name="edit" color="grey" />
          </button>
          <button onClick={handelDelete} className={style.iconButton}>
            <Icon name="delete" color="#e63946" />
          </button>
        </div>
      )}
    </div>
  )
}

export default MailCard
