"use client";
import styled from "styled-components";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        honey: ''
    });
    const router = useRouter();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        const response = await fetch('/api/sendContactEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        router.push('/')

        alert(`Thank you ${result.name} for your message! I will get back to you as soon as possible.`);
    
        setFormData({
          name: '',
          email: '',
          message: '',
          honey: ''
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to send message. Please try again later.');
      }
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
                <HoneyInput
                    type="text"
                    name="honey"
                    placeholder="Leave this field empty"
                    value={formData.honey}
                    onChange={handleChange}
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

const HoneyInput = styled.input`
  height: 0;
  width: 0;
  border: none;
`;