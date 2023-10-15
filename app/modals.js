import { Button } from "@nextui-org/react"
import styles from "./modals.module.css"

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
    return (
        <Modal
            modalHeader={"Impart a Message"}
            modalFooter={(
                <>
                    <Button onClick={() => addMessageCallback("TestMessage")}>Submit</Button>
                    <Button onClick={closeModal}>Close</Button>
                </>
            )}
            {...props}
        >
            {"Hello :)"}
        </Modal>
    )
}