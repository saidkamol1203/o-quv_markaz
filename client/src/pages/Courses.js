import React, { useState, useEffect } from 'react';
import { FaClock, FaUsers, FaLevelUpAlt, FaBookOpen } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const CoursesContainer = styled.div`
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

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e2e8f0'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#475569'};
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: #667eea;
    color: white;
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const CourseImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const CourseContent = styled.div`
  padding: 30px;
`;

const CourseTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 15px;
`;

const CourseDescription = styled.p`
  color: #64748b;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #64748b;
  font-size: 0.9rem;
  
  svg {
    color: #667eea;
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 20px;
`;

const EnrollButton = styled.button`
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

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, activeFilter]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses');
      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filterCourses = () => {
    if (activeFilter === 'all') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.category === activeFilter));
    }
  };

  const categories = ['all', 'Dasturlash', 'Dizayn', 'Marketing', 'Til', 'Biznes'];

  const handleEnroll = (courseId) => {
    // Bu yerda talabani kursga yozish logikasi bo'ladi
    alert('Kursga yozilish uchun admin bilan bog\'laning!');
  };

  if (loading) {
    return (
      <CoursesContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2>Yuklanmoqda...</h2>
          </div>
        </Container>
      </CoursesContainer>
    );
  }

  return (
    <CoursesContainer>
      <Container>
        <Header>
          <h1>Bizning Kurslar</h1>
          <p>
            Zamonaviy texnologiyalar va professional o'qituvchilar bilan 
            eng yaxshi ta'lim oling
          </p>
        </Header>

        <FilterSection>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? 'Barchasi' : category}
            </FilterButton>
          ))}
        </FilterSection>

        <CoursesGrid>
          {filteredCourses.map(course => (
            <CourseCard key={course._id}>
              <CourseImage>
                <FaBookOpen />
              </CourseImage>
              <CourseContent>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseDescription>{course.description}</CourseDescription>
                
                <CourseMeta>
                  <MetaItem>
                    <FaClock />
                    {course.duration}
                  </MetaItem>
                  <MetaItem>
                    <FaUsers />
                    {course.currentStudents}/{course.maxStudents}
                  </MetaItem>
                  <MetaItem>
                    <FaLevelUpAlt />
                    {course.level}
                  </MetaItem>
                </CourseMeta>

                <Price>{course.price.toLocaleString()} so'm</Price>
                
                <EnrollButton onClick={() => handleEnroll(course._id)}>
                  Kursga yozilish
                </EnrollButton>
              </CourseContent>
            </CourseCard>
          ))}
        </CoursesGrid>

        {filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h3>Kurslar topilmadi</h3>
            <p>Boshqa kategoriyani tanlang yoki keyinroq qaytib keling.</p>
          </div>
        )}
      </Container>
    </CoursesContainer>
  );
};

export default Courses;
