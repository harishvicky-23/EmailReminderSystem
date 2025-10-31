import React, { useState } from 'react'
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
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleEdit = () => navigate('/editremainder', { state: { data } })
  const handleDeleteClick = () => setShowConfirm(true)
  const cancelDelete = () => setShowConfirm(false)

  const confirmDelete = async () => {
    setLoading(true)
    try {
      await api.delete(`/deleteremainder/${data._id}`)
      console.log('Mail deleted successfully')
      setDeleted(true)
      setLoading(false)

      // Show "Deleted!" for 1s before closing modal + refreshing
      setTimeout(() => {
        setShowConfirm(false)
        window.location.reload()
      }, 0)
    } catch (err) {
      console.error('Error deleting mail:', err)
      setLoading(false)
    }
  }

  const name = data.isSent ? 'check_circle' : 'schedule'
  const color = data.isSent ? 'limegreen' : '#007bff'

  return (
    <>
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
            <button onClick={handleDeleteClick} className={style.iconButton}>
              <Icon name="delete" color="#e63946" />
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className={style.confirmOverlay}>
          <div className={style.confirmBox}>
            {!deleted ? (
              <>
                <h3>Delete this reminder?</h3>
                <p>This action cannot be undone.</p>
                <div className={style.confirmButtons}>
                  <button
                    className={style.cancelBtn}
                    onClick={cancelDelete}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    className={style.deleteBtn}
                    onClick={confirmDelete}
                    disabled={loading}
                  >
                    {loading ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </>
            ) : (
              <h3 className={style.deletedText}>✅ Deleted!</h3>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MailCard
