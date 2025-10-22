import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const ContactContainer = styled.div`
  padding: 120px 0 80px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 30px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  
  .icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    margin-right: 20px;
    flex-shrink: 0;
  }
  
  .content {
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 5px;
    }
    
    p {
      color: #64748b;
      margin: 0;
    }
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 30px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  
  label {
    display: block;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }
  
  input, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #d1fae5;
  color: #065f46;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await axios.post('/api/contacts', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.log(error);
      alert('Xabar yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContainer>
      <Container>
        <Header>
          <h1>Biz Bilan Bog'laning</h1>
          <p>
            Savollaringiz bormi? Biz bilan bog'laning va professional 
            maslahat oling!
          </p>
        </Header>

        <ContactContent>
          <ContactInfo>
            <h2>Aloqa Ma'lumotlari</h2>
            
            <InfoItem>
              <div className="icon">
                <FaMapMarkerAlt />
              </div>
              <div className="content">
                <h3>Manzil</h3>
                <p>Toshkent shahar, Chilonzor tumani<br />O'quv Markaz binosi</p>
              </div>
            </InfoItem>

            <InfoItem>
              <div className="icon">
                <FaPhone />
              </div>
              <div className="content">
                <h3>Telefon</h3>
                <p>+998 90 123 45 67<br />+998 71 234 56 78</p>
              </div>
            </InfoItem>

            <InfoItem>
              <div className="icon">
                <FaEnvelope />
              </div>
              <div className="content">
                <h3>Email</h3>
                <p>info@oquvmarkaz.uz<br />admin@oquvmarkaz.uz</p>
              </div>
            </InfoItem>

            <InfoItem>
              <div className="icon">
                <FaClock />
              </div>
              <div className="content">
                <h3>Ish Vaqti</h3>
                <p>Dushanba - Juma: 08:00 - 18:00<br />Shanba: 09:00 - 15:00</p>
              </div>
            </InfoItem>
          </ContactInfo>

          <ContactForm onSubmit={handleSubmit}>
            <h2>Xabar Yuborish</h2>
            
            {success && (
              <SuccessMessage>
                Xabaringiz muvaffaqiyatli yuborildi! Tez orada sizga javob beramiz.
              </SuccessMessage>
            )}

            <FormGroup>
              <label htmlFor="name">Ism *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="phone">Telefon *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="subject">Mavzu *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="message">Xabar *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Yuborilmoqda...' : 'Xabar Yuborish'}
              <FaPaperPlane />
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactContainer>
  );
};

export default Contact;
