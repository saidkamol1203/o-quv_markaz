import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaStar, FaAward, FaBookOpen } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const TeachersContainer = styled.div`
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

const TeachersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const TeacherCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const TeacherAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 3rem;
`;

const TeacherName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 10px;
`;

const TeacherSpecialization = styled.p`
  color: #667eea;
  font-weight: 500;
  margin-bottom: 15px;
`;

const TeacherExperience = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #64748b;
  margin-bottom: 15px;
  
  svg {
    color: #fbbf24;
  }
`;

const TeacherBio = styled.p`
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TeacherStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  .label {
    font-size: 0.9rem;
    color: #64748b;
  }
`;

const ContactButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('/api/teachers');
      setTeachers(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleContact = (teacherId) => {
    // Bu yerda o'qituvchi bilan bog'lanish logikasi bo'ladi
    alert('O\'qituvchi bilan bog\'lanish uchun admin bilan bog\'laning!');
  };

  if (loading) {
    return (
      <TeachersContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2>Yuklanmoqda...</h2>
          </div>
        </Container>
      </TeachersContainer>
    );
  }

  return (
    <TeachersContainer>
      <Container>
        <Header>
          <h1>Bizning O'qituvchilar</h1>
          <p>
            Tajribali va professional o'qituvchilarimiz bilan tanishing
          </p>
        </Header>

        <TeachersGrid>
          {teachers.map(teacher => (
            <TeacherCard key={teacher._id}>
              <TeacherAvatar>
                <FaGraduationCap />
              </TeacherAvatar>
              
              <TeacherName>
                {teacher.firstName} {teacher.lastName}
              </TeacherName>
              
              <TeacherSpecialization>
                {teacher.specialization}
              </TeacherSpecialization>
              
              <TeacherExperience>
                <FaAward />
                {teacher.experience} yil tajriba
              </TeacherExperience>
              
              <TeacherBio>
                {teacher.bio}
              </TeacherBio>
              
              <TeacherStats>
                <StatItem>
                  <div className="number">{teacher.courses.length}</div>
                  <div className="label">Kurslar</div>
                </StatItem>
                <StatItem>
                  <div className="number">{teacher.rating}</div>
                  <div className="label">Reyting</div>
                </StatItem>
              </TeacherStats>
              
              <ContactButton onClick={() => handleContact(teacher._id)}>
                Bog'lanish
              </ContactButton>
            </TeacherCard>
          ))}
        </TeachersGrid>

        {teachers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h3>O'qituvchilar topilmadi</h3>
            <p>Keyinroq qaytib keling.</p>
          </div>
        )}
      </Container>
    </TeachersContainer>
  );
};

export default Teachers;
