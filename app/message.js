import styles from "./message.module.css"

export default function Message({ message, visible, ...props }) {
    return (
        <div className={[styles.message, visible ? styles.visible : styles.hidden].join(' ')} {...props}>
            { message }
        </div>
    )
}