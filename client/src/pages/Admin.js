import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaUsers, FaBookOpen, FaGraduationCap, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const AdminContainer = styled.div`
  padding: 120px 0 80px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    color: #64748b;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  .icon {
    font-size: 2.5rem;
    color: #667eea;
    margin-bottom: 15px;
  }
  
  .number {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 10px;
  }
  
  .label {
    color: #64748b;
    font-size: 1.1rem;
  }
`;

const TabsContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TabsHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TabButton = styled.button`
  flex: 1;
  padding: 20px;
  border: none;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#64748b'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    background: ${props => props.active ? '#667eea' : '#f8fafc'};
  }
`;

const TabContent = styled.div`
  padding: 30px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }
  
  th {
    background: #f8fafc;
    font-weight: 600;
    color: #374151;
  }
  
  tr:hover {
    background: #f8fafc;
  }
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &.edit {
    background: #3b82f6;
    color: white;
    
    &:hover {
      background: #2563eb;
    }
  }
  
  &.delete {
    background: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
    }
  }
  
  &.view {
    background: #10b981;
    color: white;
    
    &:hover {
      background: #059669;
    }
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

const Admin = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalContacts: 0
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [coursesRes, studentsRes, teachersRes, contactsRes] = await Promise.all([
        axios.get('/api/courses'),
        axios.get('/api/students'),
        axios.get('/api/teachers'),
        axios.get('/api/contacts')
      ]);

      setCourses(coursesRes.data);
      setStudents(studentsRes.data);
      setTeachers(teachersRes.data);
      setContacts(contactsRes.data);

      setStats({
        totalCourses: coursesRes.data.length,
        totalStudents: studentsRes.data.length,
        totalTeachers: teachersRes.data.length,
        totalContacts: contactsRes.data.length
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('O\'chirishni tasdiqlaysizmi?')) {
      try {
        await axios.delete(`/api/${type}/${id}`);
        fetchAllData();
        alert('Muvaffaqiyatli o\'chirildi');
      } catch (error) {
        console.log(error);
        alert('O\'chirishda xatolik yuz berdi');
      }
    }
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <Table>
            <thead>
              <tr>
                <th>Nomi</th>
                <th>Kategoriya</th>
                <th>Narx</th>
                <th>Talabalar</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.category}</td>
                  <td>{course.price.toLocaleString()} so'm</td>
                  <td>{course.currentStudents}/{course.maxStudents}</td>
                  <td>
                    <ActionButton className="view" title="Ko'rish">
                      <FaEye />
                    </ActionButton>
                    <ActionButton className="edit" title="Tahrirlash">
                      <FaEdit />
                    </ActionButton>
                    <ActionButton className="delete" title="O'chirish" onClick={() => handleDelete('courses', course._id)}>
                      <FaTrash />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );

      case 'students':
        return (
          <Table>
            <thead>
              <tr>
                <th>Ism</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Kurslar</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id}>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.courses.length}</td>
                  <td>
                    <ActionButton className="view" title="Ko'rish">
                      <FaEye />
                    </ActionButton>
                    <ActionButton className="edit" title="Tahrirlash">
                      <FaEdit />
                    </ActionButton>
                    <ActionButton className="delete" title="O'chirish" onClick={() => handleDelete('students', student._id)}>
                      <FaTrash />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );

      case 'teachers':
        return (
          <Table>
            <thead>
              <tr>
                <th>Ism</th>
                <th>Mutaxassislik</th>
                <th>Tajriba</th>
                <th>Kurslar</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher._id}>
                  <td>{teacher.firstName} {teacher.lastName}</td>
                  <td>{teacher.specialization}</td>
                  <td>{teacher.experience} yil</td>
                  <td>{teacher.courses.length}</td>
                  <td>
                    <ActionButton className="view" title="Ko'rish">
                      <FaEye />
                    </ActionButton>
                    <ActionButton className="edit" title="Tahrirlash">
                      <FaEdit />
                    </ActionButton>
                    <ActionButton className="delete" title="O'chirish" onClick={() => handleDelete('teachers', teacher._id)}>
                      <FaTrash />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );

      case 'contacts':
        return (
          <Table>
            <thead>
              <tr>
                <th>Ism</th>
                <th>Email</th>
                <th>Mavzu</th>
                <th>Sana</th>
                <th>Holat</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.subject}</td>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: contact.status === 'New' ? '#fef3c7' : contact.status === 'In Progress' ? '#dbeafe' : '#d1fae5',
                      color: contact.status === 'New' ? '#92400e' : contact.status === 'In Progress' ? '#1e40af' : '#065f46'
                    }}>
                      {contact.status}
                    </span>
                  </td>
                  <td>
                    <ActionButton className="view" title="Ko'rish">
                      <FaEye />
                    </ActionButton>
                    <ActionButton className="edit" title="Tahrirlash">
                      <FaEdit />
                    </ActionButton>
                    <ActionButton className="delete" title="O'chirish" onClick={() => handleDelete('contacts', contact._id)}>
                      <FaTrash />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        );

      default:
        return null;
    }
  };

  return (
    <AdminContainer>
      <Container>
        <Header>
          <h1>Admin Panel</h1>
          <p>O'quv markaz boshqaruvi</p>
        </Header>

        <StatsGrid>
          <StatCard>
            <FaBookOpen className="icon" />
            <div className="number">{stats.totalCourses}</div>
            <div className="label">Kurslar</div>
          </StatCard>
          <StatCard>
            <FaUsers className="icon" />
            <div className="number">{stats.totalStudents}</div>
            <div className="label">Talabalar</div>
          </StatCard>
          <StatCard>
            <FaGraduationCap className="icon" />
            <div className="number">{stats.totalTeachers}</div>
            <div className="label">O'qituvchilar</div>
          </StatCard>
          <StatCard>
            <FaEnvelope className="icon" />
            <div className="number">{stats.totalContacts}</div>
            <div className="label">Xabarlar</div>
          </StatCard>
        </StatsGrid>

        <TabsContainer>
          <TabsHeader>
            <TabButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')}>
              <FaBookOpen />
              Kurslar
            </TabButton>
            <TabButton active={activeTab === 'students'} onClick={() => setActiveTab('students')}>
              <FaUsers />
              Talabalar
            </TabButton>
            <TabButton active={activeTab === 'teachers'} onClick={() => setActiveTab('teachers')}>
              <FaGraduationCap />
              O'qituvchilar
            </TabButton>
            <TabButton active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')}>
              <FaEnvelope />
              Xabarlar
            </TabButton>
          </TabsHeader>

          <TabContent>
            <AddButton>
              <FaPlus />
              Yangi {activeTab === 'courses' ? 'Kurs' : activeTab === 'students' ? 'Talaba' : activeTab === 'teachers' ? 'O\'qituvchi' : 'Xabar'} Qo'shish
            </AddButton>
            {renderTable()}
          </TabContent>
        </TabsContainer>
      </Container>
    </AdminContainer>
  );
};

export default Admin;
