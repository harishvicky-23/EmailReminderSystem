import React, { useEffect, useState, useMemo } from 'react';
import style from './Mails.module.css';
import MailCard from './MailCard';
import Icon from './Icon';
import api from '../api/axios';

function Mails() {
  const [isSent, setIsSent] = useState(false);
  const [sentMails, setSentMails] = useState([]);
  const [upcomingMails, setUpcomingMails] = useState([]);

  const handelUpcomingClick = () => setIsSent(false);
  const handleSentButton = () => setIsSent(true);

  useEffect(() => {
    const getSentMails = async () => {
      await api
        .post('/mails', {
          from: 'aidsboyssm@gmail.com',
          isSent: true,
        })
        .then((res) => setSentMails(res.data))
        .catch((e) => console.log('Error fetching sent mails:', e));
    };

    const getUpcomingMails = async () => {
      await api
        .post('/mails', {
          from: 'aidsboyssm@gmail.com',
          isSent: false,
        })
        .then((res) => setUpcomingMails(res.data))
        .catch((e) => console.log('Error fetching upcoming mails:', e));
    };

    getSentMails();
    getUpcomingMails();

    // Refresh every 20 seconds
    const interval = setInterval(() => {
      getSentMails();
      getUpcomingMails();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const filteredMails = useMemo(() => {
    const mails = isSent ? sentMails : upcomingMails;
    return mails;
  }, [isSent, sentMails, upcomingMails]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Mail Reminders</h2>

        {/* Modern toggle switch */}
        <div className={style.toggleContainer}>
          <button
            className={`${style.toggleButton} ${!isSent ? style.active : ''}`}
            onClick={handelUpcomingClick}
          >
            Upcoming
          </button>
          <button
            className={`${style.toggleButton} ${isSent ? style.active : ''}`}
            onClick={handleSentButton}
          >
            Sent
          </button>
          <div
            className={`${style.toggleIndicator} ${
              isSent ? style.right : style.left
            }`}
          />
        </div>
      </div>

      <div className={style.statusBar}>
        {isSent ? (
          <>
            <Icon name="check_circle" color="limegreen" />
            <h3>{filteredMails.length} Sent</h3>
          </>
        ) : (
          <>
            <Icon name="notifications" color="blue" />
            <h3>{filteredMails.length} Upcoming</h3>
          </>
        )}
      </div>

      <ul className={style.listContainer}>
        {filteredMails.length > 0 ? (
          filteredMails.map((item, index) => (
            <li key={index}>
              <MailCard data={item} />
            </li>
          ))
        ) : (
          <p className={style.emptyText}>
            No {isSent ? 'sent' : 'upcoming'} mails found.
          </p>
        )}
      </ul>
    </div>
  );
}

export default Mails;
