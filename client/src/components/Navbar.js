import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';
import styled from 'styled-components';

const Nav = styled.nav`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  
  svg {
    margin-right: 10px;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 100%;
    height: calc(100vh - 70px);
    background: white;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 50px;
    transition: left 0.3s ease;
  }
`;

const NavItem = styled.li`
  a {
    color: #475569;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #667eea;
    }
  }
`;

const MobileMenuBtn = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    cursor: pointer;
    color: #475569;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <FaGraduationCap />
          O'quv Markaz
        </Logo>
        
        <NavMenu isOpen={isOpen}>
          <NavItem>
            <Link to="/" onClick={() => setIsOpen(false)}>Bosh sahifa</Link>
          </NavItem>
          <NavItem>
            <Link to="/courses" onClick={() => setIsOpen(false)}>Kurslar</Link>
          </NavItem>
          <NavItem>
            <Link to="/teachers" onClick={() => setIsOpen(false)}>O'qituvchilar</Link>
          </NavItem>
          <NavItem>
            <Link to="/about" onClick={() => setIsOpen(false)}>Biz haqimizda</Link>
          </NavItem>
          <NavItem>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Aloqa</Link>
          </NavItem>
          <NavItem>
            <Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link>
          </NavItem>
        </NavMenu>
        
        <MobileMenuBtn onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuBtn>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
