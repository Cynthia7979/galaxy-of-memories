import { Button } from "@nextui-org/react"
import styles from "./modals.module.css"
import { useRef, useState } from "react"

export function Modal({ children, visible, modalHeader, modalFooter, ...props}) {
    return (
        <div className={[styles.modal, visible ? styles.visible : styles.hidden].join(" ")} {...props}>
            <div className={styles.modalHeader}>
                {modalHeader}
            </div>

            <div className={styles.modalBody}>
                {children}
            </div>

            <div className={styles.modalFooter}>
                {modalFooter}
            </div>
        </div>
    )
}

export function AddMessageModal ({ addMessageCallback, closeModal, ...props }) {
    const [message, setMessage] = useState("");
    const messageRef = useRef()

    const resetValues = () => {
        setMessage("")
        messageRef.current.value = ''
    }

    const exitModal = () => {
        resetValues()
        closeModal()
    }

    return (
        <Modal
            modalHeader={"Impart a Message"}
            modalFooter={(
                <>
                    <Button type={'submit'} onClick={() => (addMessageCallback(message, resetValues), closeModal())}>Submit</Button>
                    <Button onClick={exitModal}>Close</Button>
                </>
            )}
            {...props}
        >
            <span className={styles.inputLabel}>I want to say:</span>
            <input
                placeholder="Thank you..."
                type="text"
                onChange={e => setMessage(e.currentTarget.value)}
                ref={messageRef}
            />
        </Modal>
    )
}

export function AddStarModal({ addStarCallback, closeModal, ...props }) {
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');
    const [death, setDeath] = useState('')
    const [description, setDescription] = useState('')
    const nameRef = useRef()
    const bornRef = useRef()
    const deathRef = useRef()
    const descriptionRef = useRef()

    const resetValues = () => {
        setName('')
        setBorn('')
        setDeath('')
        setDescription('')
        nameRef.current.value = ''
        bornRef.current.value = null
        deathRef.current.value = null
        descriptionRef.current.value = ''
    }

    const exitModal = () => {
        resetValues()
        closeModal()
    }

    return (
        <Modal
            modalHeader={"Add a New Star"}
            modalFooter={(
                <>
                    <Button type={'submit'} onClick={() => (addStarCallback(name, born, death, description, resetValues), closeModal())}>Submit</Button>
                    <Button onClick={exitModal}>Close</Button>
                </>
            )}
            {...props}
        >
            <span className={styles.inlineInputLabel}>This star memorates</span>
            <input
                placeholder="A. Legend..."
                type="text"
                onChange={e => setName(e.currentTarget.value)}
                ref={nameRef}
            />
            <span className={styles.inlineInputLabel}>(
                <input
                    placeholder="from"
                    type="number"
                    onChange={e => setBorn(e.currentTarget.value.toString())}
                    ref={bornRef}
                />
                -
                <input
                    placeholder="to"
                    type="number"
                    onChange={e => setDeath(e.currentTarget.value.toString())}
                    ref={deathRef}
                />
            )</span>
            <br/>
            <textarea
                placeholder="Their life..."
                rows="4"
                onChange={e => setDescription(e.currentTarget.value)}
                ref={descriptionRef}
            />
        </Modal>
    )
}