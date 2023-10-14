import { Button } from "@nextui-org/react";
import styles from "./button.module.css";

export default function AddStar(props) {
    const { name, born, death, description, media } = props;
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name && born && death && description && media) {
            try {
                let response = await fetch("http://localhost:3000/api/addStar", {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        born,
                        death,
                        description,
                        media,
                    }),
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                });
                response = await response.json();
                console.log(response)
            } catch (e) {
                console.error(e)
            }
        } else {
            console.error("Missing a field")
        }
    }
    return (
        <>
            <Button
                className={styles.testButton}
                onClick={(e) => handleSubmit(e)}
            >
                Click!
            </Button>
        </>
    )
}