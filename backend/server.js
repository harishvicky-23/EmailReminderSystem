const express = require('express')
const mongoose  = require('mongoose')
const sendgridTransport = require("nodemailer-sendgrid");
const schedule = require('node-schedule')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const scheduledMails={}

const transporter = nodemailer.createTransport(
    sendgridTransport({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const Mails = require('./models/mails')

const loadPendingMails = async () => {
  const pendingMails = await Mails.find({ isSent: false });
  pendingMails.forEach(mail => {
    ScheduleMail(
      mail._id,
      mail.from,
      mail.to,
      mail.subject,
      mail.message,
      mail.time
    );
  });
};

// mongoose.connection.once('open', () => {
//   console.log('MongoDB connected');
//   loadPendingMails();
// });


app.post('/mails', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Missing request body' })
        }

        const { from, isSent } = req.body

        const data = await Mails.find({ from: from, isSent: isSent })

        return res.json(data)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
})


const ScheduleMail = (id, from, to, subject, message, time) => {

  const job = schedule.scheduleJob(time, async () => {
     (async () => {
    try {
       const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: to, 
      subject: subject,
      text: message,
    });
      console.log('✅ Email sent:', info.response);

      await Mails.findByIdAndUpdate(id, { isSent: true }, { new: true });
      delete scheduledMails[id];
    } catch (err) {
        console.error("❌ SendGrid error:", err.response?.body || err);
    }
    })();
  });

  scheduledMails[id] = job;
};


app.post('/createremainder' , async (req , res) =>{

    console.log(JSON.stringify(scheduledMails))

    try {

        const {from , to , subject , message , time ,title} = req.body

        console.log(req.body)

        const newRemainder = new Mails ({from, to,title,subject,message, time,
            isSent:false
        })

        await newRemainder.save()

        const id = newRemainder._id

        ScheduleMail(id,from,to,subject,message , time)

        return res.json('ok')

        
    } catch (error) {
        
    }
})

app.post('/editremainder' ,async (req , res)=>{

    const {_id , ...newData} = req.body

    const id = _id

    if (!scheduledMails[id]) {
        return res.status(400).json({ message: 'Remainder already sent or not found' })
    }

    scheduledMails[id].cancel()
    delete scheduledMails[id]

    const updatedRemainder = await Mails.findByIdAndUpdate(id , newData)

    ScheduleMail(id , newData.from , newData.to , newData.subject , newData.message , newData.time)

    return res.json('ok')

})

app.delete('/deleteremainder/:id' , async(req , res) =>{


    const {id} = req.params

    console.log(id)

    if (!scheduledMails[id]) {
        return res.status(400).json({ message: 'Remainder already sent or not found' })
    }
    
    scheduledMails[id].cancel()
    delete scheduledMails[id]

    const DeletedRemainder = await Mails.findByIdAndDelete(id)

    return res.json({message : "Remainder deleted successfully "})
})

app.listen(5000, () => console.log('Server running on port 5000'));





