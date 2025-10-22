import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTelegram } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #1e293b;
  color: white;
  padding: 60px 0 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #667eea;
  }
  
  p, li {
    color: #cbd5e1;
    line-height: 1.8;
    margin-bottom: 10px;
  }
  
  a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #334155;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: #667eea;
      transform: translateY(-2px);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  
  svg {
    margin-right: 10px;
    color: #667eea;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #334155;
  padding-top: 20px;
  text-align: center;
  color: #94a3b8;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <h3>
              <FaGraduationCap style={{ marginRight: '10px' }} />
              O'quv Markaz
            </h3>
            <p>
              Professional ta'lim va malaka oshirish markazi. 
              Bizning maqsadimiz - sizning kelajagingizni yaratish.
            </p>
            <SocialLinks>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTelegram /></a>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Tezkor havolalar</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/">Bosh sahifa</Link></li>
              <li><Link to="/courses">Kurslar</Link></li>
              <li><Link to="/teachers">O'qituvchilar</Link></li>
              <li><Link to="/about">Biz haqimizda</Link></li>
              <li><Link to="/contact">Aloqa</Link></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Aloqa ma'lumotlari</h3>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>Toshkent shahar, Chilonzor tumani</span>
            </ContactInfo>
            <ContactInfo>
              <FaPhone />
              <span>+998 90 123 45 67</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>info@oquvmarkaz.uz</span>
            </ContactInfo>
          </FooterSection>
          
          <FooterSection>
            <h3>Ish vaqti</h3>
            <p>Dushanba - Juma: 08:00 - 18:00</p>
            <p>Shanba: 09:00 - 15:00</p>
            <p>Yakshanba: Dam olish</p>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; 2024 O'quv Markaz. Barcha huquqlar himoyalangan.</p>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
