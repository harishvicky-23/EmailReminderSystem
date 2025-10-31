import React, { useState, useEffect } from "react";
import style from "./Mails.module.css";
import MailCard from "./MailCard";
import api from "../api/axios";

function Mails() {
  const [view, setView] = useState("upcoming");
  const [mails, setMails] = useState([]);

  const fetchMails = async () => {
    try {
      const res = await api.get("/getremainders");
      setMails(res.data || []);
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  useEffect(() => {
    fetchMails();
    const interval = setInterval(fetchMails, 10000); // Refresh every 10 sec
    return () => clearInterval(interval);
  }, []);

  const filteredMails = mails.filter((mail) =>
    view === "sent" ? mail.isSent : !mail.isSent
  );

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>Mail Reminders</h2>
        <div className={style.tabs}>
          <button
            className={`${style.tabBtn} ${view === "upcoming" ? style.active : ""}`}
            onClick={() => setView("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`${style.tabBtn} ${view === "sent" ? style.active : ""}`}
            onClick={() => setView("sent")}
          >
            Sent
          </button>
        </div>
      </div>

      <ul className={style.mailList}>
        {filteredMails.length > 0 ? (
          filteredMails.map((mail, idx) => (
            <MailCard key={idx} data={mail} />
          ))
        ) : (
          <p className={style.emptyMsg}>
            No {view === "sent" ? "sent" : "upcoming"} mails found.
          </p>
        )}
      </ul>
    </div>
  );
}

export default Mails;
