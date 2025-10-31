import React, { useState, useEffect } from 'react'
import style from './Mails.module.css'
import MailCard from './MailCard'
import api from '../api/axios'

function Mails() {
  const [mailData, setMailData] = useState([])
  const [view, setView] = useState('upcoming')

  const fetchMails = async () => {
    try {
      const res = await api.get('/getremainders')
      setMailData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMails()
  }, [])

  const filteredMails =
    view === 'upcoming'
      ? mailData.filter(m => !m.isSent)
      : mailData.filter(m => m.isSent)

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Mail Reminders</h2>
        <div className={style.toggleContainer}>
          <div
            className={`${style.toggleBackground} ${
              view === 'sent' ? style.right : ''
            }`}
          >
            <div className={style.toggleCircle}></div>
          </div>
          <div className={style.toggleLabels}>
            <span
              className={`${style.label} ${
                view === 'upcoming' ? style.active : ''
              }`}
              onClick={() => setView('upcoming')}
            >
              Upcoming
            </span>
            <span
              className={`${style.label} ${
                view === 'sent' ? style.active : ''
              }`}
              onClick={() => setView('sent')}
            >
              Sent
            </span>
          </div>
        </div>
      </div>

      <ul className={style.listContainer}>
        {filteredMails.length > 0 ? (
          filteredMails.map((mail, i) => <MailCard key={i} data={mail} />)
        ) : (
          <p className={style.emptyText}>
            No {view === 'upcoming' ? 'upcoming' : 'sent'} mails found.
          </p>
        )}
      </ul>
    </div>
  )
}

export default Mails
