import React from "react";
import ContactForm from "@/components/ContactForm";
import styles from "./Contact.module.css";

export const metadata = {
  title: "Contact Me | Aldo Portillo",
  description: "Contact me",
  icons: {
    icon: "/search-icon.png",
  },
};

function Contact() {

    return (
        <div className={styles.contactPageWrapper}>
            <h1 className={styles.title}>Contact Me</h1>
            <ContactForm />
        </div>
    );
}

export default Contact;