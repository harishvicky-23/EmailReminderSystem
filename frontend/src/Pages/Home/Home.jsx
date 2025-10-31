import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import Mails from '../../Components/Mails'
import { Link } from 'react-router-dom'

function Home() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [showConfirm, setShowConfirm] = useState(false)
  const [mailToDelete, setMailToDelete] = useState(null)

  // Auto-refresh every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleDeleteRequest = (mailId) => {
    setMailToDelete(mailId)
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    // TODO: call delete API for mailToDelete
    console.log('Deleting mail:', mailToDelete)
    setShowConfirm(false)
  }

  const handleCancelDelete = () => {
    setMailToDelete(null)
    setShowConfirm(false)
  }

  return (
    <main className={style.main}>
      <header className={style.header}>
        <h1 className={style.title}>📧 Mail Reminder System</h1>
        <p className={style.subtitle}>Stay organized — schedule emails that send themselves.</p>
        <Link className={style.btn} to='/createremainder'>+ Create Reminder</Link>
      </header>

      <section className={style.mailSection}>
        <Mails key={refreshKey} onDelete={handleDeleteRequest} />
      </section>

      {showConfirm && (
        <div className={style.overlay}>
          <div className={style.modal}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this mail?</p>
            <div className={style.modalButtons}>
              <button className={style.cancelBtn} onClick={handleCancelDelete}>Cancel</button>
              <button className={style.deleteBtn} onClick={handleConfirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Home
