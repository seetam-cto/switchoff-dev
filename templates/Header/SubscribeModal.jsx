import { Button, Input, Modal, message } from "antd"
import { useAtom } from "jotai"
import { subsModal } from "."
import PhoneInput from 'react-phone-input-2'
import {MdAlternateEmail} from 'react-icons/md'
import axios from "axios"
import moment from "moment"
import { useState } from "react"

const SubscribeModal = () => {
    const [data, setData] = useAtom(subsModal)
    const [submitState, setSubmitState] = useState(false)

    const onSubmit = async () => {
        try{
            let res = await axios.post("https://sheetdb.io/api/v1/kgmeiefzpa1ra", {date: moment(new Date()).format('DD-MM-YYYY hh:mm A'), email: data.email, phone: data.phone}, {
                headers: {
                    Authorization: 'Bearer kf259pwvznpu2t31rm6vf869062awkj6qvk3tofd'
                }
            })
            if(res.data.created == 1){
                setSubmitState(true)
            }
        }catch(err){
            console.log(err)
            message.error("Failed to Subscribe!")
        }finally{
            setTimeout(() => {
                setData({open: false, email: '', phone: ''})
                setSubmitState(false)
            }, 2000)
        }
    }

    return (
        <Modal
        key={'subscribe-modal'}
        open={data.open}
        onCancel={() => setData({...data, open: false})}
        centered
        footer={null}
        >
            {submitState ? (
                <div className="subscribe-modal centered">
                    <h2>🎉Hurray!🎉</h2>
                    <p>We'll Keep In Touch!</p>
                </div>
            ):(
                <div className="subscribe-modal">
                    <h2>🎉 Never miss out!</h2>
                    <p>Stay in the loop with the latest updates from SwitchOff.</p>
                    <div className="subscribe-modal-form">
                        <div className="subscribe-modal-form-item">
                            <label>Your Go-To Contact Number 📱</label>
                            <PhoneInput
                            country={'in'}
                            inputClass="phone-input-inp"
                            containerClass="phone-input"
                            buttonClass="phone-input-btn"
                            value={data.phone}
                            onChange={phone => setData({...data, phone })}
                            />
                        </div>
                        <div className="subscribe-modal-form-item">
                            <label>Your Preferred Email Address 💌</label>
                            <input
                            type="email"
                            className="email-input"
                            value={data.email}
                            required
                            placeholder="john.doe@domain.com"
                            onChange={(e) => setData({...data, email: e.target.value})}
                            />
                        </div>
                        <div className="subscribe-modal-form-button">
                            <button onClick={() => onSubmit()}>Subscribe for updates</button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default SubscribeModal