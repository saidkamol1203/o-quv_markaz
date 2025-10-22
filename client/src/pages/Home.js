import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaAward, FaBookOpen, FaArrowRight, FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 20px;
    line-height: 1.2;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    margin-bottom: 30px;
    opacity: 0.9;
  }
`;

const StatsSection = styled.section`
  padding: 80px 0;
  background: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatCard = styled.div`
  text-align: center;
  
  .icon {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 20px;
  }
  
  .number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 10px;
  }
  
  .label {
    color: #64748b;
    font-size: 1.1rem;
  }
`;

const CoursesSection = styled.section`
  padding: 80px 0;
  background: #f8fafc;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1e293b;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 60px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #1e293b;
  }
  
  p {
    color: #64748b;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 20px;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    }
  }
`;

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    teachers: 0,
    years: 5
  });

  useEffect(() => {
    // Kurslarni olish
    axios.get('/api/courses')
      .then(res => {
        setCourses(res.data.slice(0, 3)); // Faqat 3 ta kurs ko'rsatish
      })
      .catch(err => console.log(err));

    // Statistikalarni olish
    Promise.all([
      axios.get('/api/students'),
      axios.get('/api/courses'),
      axios.get('/api/teachers')
    ]).then(([studentsRes, coursesRes, teachersRes]) => {
      setStats({
        students: studentsRes.data.length,
        courses: coursesRes.data.length,
        teachers: teachersRes.data.length,
        years: 5
      });
    }).catch(err => console.log(err));
  }, []);

  return (
    <>
      <HeroSection>
        <HeroContent>
          <h1>Professional Ta'lim Markazi</h1>
          <p>
            Kelajagingizni bugun boshlang! Bizning professional o'qituvchilar 
            va zamonaviy dasturlar bilan eng yaxshi ta'lim oling.
          </p>
          <Link to="/courses" className="btn">
            Kurslarni ko'rish
            <FaArrowRight />
          </Link>
        </HeroContent>
      </HeroSection>

      <StatsSection>
        <StatsGrid>
          <StatCard>
            <FaUsers className="icon" />
            <div className="number">{stats.students}+</div>
            <div className="label">Talabalar</div>
          </StatCard>
          <StatCard>
            <FaBookOpen className="icon" />
            <div className="number">{stats.courses}+</div>
            <div className="label">Kurslar</div>
          </StatCard>
          <StatCard>
            <FaAward className="icon" />
            <div className="number">{stats.teachers}+</div>
            <div className="label">O'qituvchilar</div>
          </StatCard>
          <StatCard>
            <FaStar className="icon" />
            <div className="number">{stats.years}+</div>
            <div className="label">Yil tajriba</div>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <CoursesSection>
        <SectionTitle>Mashhur Kurslar</SectionTitle>
        <SectionSubtitle>
          Bizning eng mashhur va talabgir kurslarimizni tanlang
        </SectionSubtitle>
        <CoursesGrid>
          {courses.map(course => (
            <CourseCard key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="price">{course.price} so'm</div>
              <Link to="/courses" className="btn">
                Batafsil
                <FaArrowRight />
              </Link>
            </CourseCard>
          ))}
        </CoursesGrid>
      </CoursesSection>
    </>
  );
};

export default Home;
