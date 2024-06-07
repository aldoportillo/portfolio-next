"use client";
import styled from "styled-components";
import React from "react";
import ContactForm from "@/components/ContactForm";

const metadata = {
  title: "Contact Me | Aldo Portillo",
  description: "Contact me",
  image: "../../public/save-icon.png",
  favicon: "../../public/save-icon.png",
  
};

function Contact() {

    return (
        <Wrapper>
            <ContactTitle>Contact Me</ContactTitle>
            <ContactForm />
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #242424;
  color: #f5f5f5;
  width: 100%;

    @media (min-width: 768px) {
    width: 75%;
    }
`;

const ContactTitle = styled.h1`
  font-size: 2.5em;
  color: #f5f5f5;
  margin-bottom: 40px;
`;

export default Contact;