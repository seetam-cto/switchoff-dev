import { Modal } from 'antd'
import { useAtom } from 'jotai'
import React from 'react'

export const enquireForm = atom({
    open: false,
    name: '',
    phone: '',
    email: '',
    propertyId: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 1
})

export const getEnquireForm = atom((get) => get(enquireForm))

const Enquire = () => {
    const [enquire, setEnquire] = useAtom(enquireForm)
    return (
        <Modal
        open={enquire.open}
        onCancel={() => setEnquire({...enquire, opne: false})}
        footer={null}
        title={null}
        >
            Signup Form
        </Modal>
    )
}

export default Enquire