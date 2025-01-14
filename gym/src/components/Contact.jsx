import React, { useState } from 'react'
import { ClipLoader } from "react-spinners"
import axios from "axios"
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const sendmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post("https://healthmail.onrender.com/send/mail",
        {
          name,
          email,
          message 
        }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
      );
      if(data.success === false){
        
        toast.error(data.message)
      }else{
        toast.success(data.message)
      }
      setName("")
      setEmail("")
      setMessage("")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      
      
    }
  }



  return (
    <section className='contact'>
      <form onSubmit={sendmail}>
        <h1>CONTACT US </h1>
        <div>
          <label> Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Message</label>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button type='submit' disabled={loading} style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          gap: "20px"
        }}>
          {loading && <ClipLoader size={20} color='white' />}
          send message
        </button>
      </form>

    </section>
  )
}

export default Contact