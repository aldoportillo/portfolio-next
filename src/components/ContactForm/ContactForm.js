"use client";
import styled from "styled-components";
import React, { useState } from "react";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(formData);
        alert('Hey there! Thanks for reaching out! Unfortunately, this form is not connected to a backend yet, so your message has not been sent. Feel free to reach out to me at any of the links in the footer!');
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
            <ContactFormWrapper onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextArea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactFormWrapper>
    );
}

export default ContactForm;

const ContactFormWrapper = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px 20px;
  margin-bottom: 20px;
  background: #333;
  border: none;
  color: #f5f5f5;
  font-size: 1em;

  &::placeholder {
    color: #ccc;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 20px;
  height: 150px;
  background: #333;
  border: none;
  color: #f5f5f5;
  font-size: 1em;
  margin-bottom: 20px;

  &::placeholder {
    color: #ccc;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background: #5eddac;
  border: none;
  color: #242424;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #46b690;
  }
`;