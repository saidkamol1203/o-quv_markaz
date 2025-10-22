import React from 'react';
import { FaGraduationCap, FaUsers, FaAward, FaBookOpen, FaTarget, FaLightbulb, FaHandshake } from 'react-icons/fa';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 120px 0 80px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 80px;
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 20px;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #64748b;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
`;

const StatsSection = styled.section`
  background: white;
  padding: 60px 0;
  border-radius: 12px;
  margin-bottom: 80px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;
`;

const StatCard = styled.div`
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

const MissionSection = styled.section`
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 60px;
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const MissionCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    font-size: 3rem;
    color: #667eea;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 15px;
  }
  
  p {
    color: #64748b;
    line-height: 1.6;
  }
`;

const ValuesSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  border-radius: 12px;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto 60px;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const ValueCard = styled.div`
  .icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
    opacity: 0.9;
  }
  
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 15px;
  }
  
  p {
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <Container>
        <HeroSection>
          <h1>Biz Haqimizda</h1>
          <p>
            O'quv Markaz - bu professional ta'lim va malaka oshirish markazi. 
            Biz 5 yildan beri eng yaxshi ta'lim berish maqsadida ishlab kelmoqdamiz. 
            Bizning maqsadimiz - har bir talabamizning potentsialini to'liq ochib berish 
            va ularni professional hayotga tayyorlash.
          </p>
        </HeroSection>

        <StatsSection>
          <StatsGrid>
            <StatCard>
              <FaUsers className="icon" />
              <div className="number">500+</div>
              <div className="label">Muvaffaqiyatli Talabalar</div>
            </StatCard>
            <StatCard>
              <FaBookOpen className="icon" />
              <div className="number">25+</div>
              <div className="label">Professional Kurslar</div>
            </StatCard>
            <StatCard>
              <FaAward className="icon" />
              <div className="number">15+</div>
              <div className="label">Tajribali O'qituvchilar</div>
            </StatCard>
            <StatCard>
              <FaGraduationCap className="icon" />
              <div className="number">5+</div>
              <div className="label">Yil Tajriba</div>
            </StatCard>
          </StatsGrid>
        </StatsSection>

        <MissionSection>
          <SectionTitle>Bizning Maqsadlarimiz</SectionTitle>
          <MissionGrid>
            <MissionCard>
              <FaTarget className="icon" />
              <h3>Maqsadli Ta'lim</h3>
              <p>
                Har bir kursni real hayotda qo'llash mumkin bo'lgan 
                amaliy bilimlar asosida tashkil etamiz.
              </p>
            </MissionCard>
            <MissionCard>
              <FaLightbulb className="icon" />
              <h3>Innovatsion Yondashuv</h3>
              <p>
                Zamonaviy texnologiyalar va metodlardan foydalanib, 
                eng samarali ta'lim jarayonini yaratamiz.
              </p>
            </MissionCard>
            <MissionCard>
              <FaHandshake className="icon" />
              <h3>Individual Yondashuv</h3>
              <p>
                Har bir talabaning ehtiyojlariga mos ravishda 
                individual dasturlar tayyorlaymiz.
              </p>
            </MissionCard>
          </MissionGrid>
        </MissionSection>

        <ValuesSection>
          <h2>Bizning Qadriyatlarimiz</h2>
          <p>
            Bizning ishimizning asosini quyidagi qadriyatlar tashkil etadi
          </p>
          <ValuesGrid>
            <ValueCard>
              <FaGraduationCap className="icon" />
              <h3>Professionalizm</h3>
              <p>
                Har bir o'qituvchimiz o'z sohasida professional 
                va tajribali mutaxassislardir.
              </p>
            </ValueCard>
            <ValueCard>
              <FaUsers className="icon" />
              <h3>Talaba Markaziy Yondashuv</h3>
              <p>
                Talabalarimizning muvaffaqiyati bizning asosiy 
                maqsadimizdir.
              </p>
            </ValueCard>
            <ValueCard>
              <FaAward className="icon" />
              <h3>Sifatli Ta'lim</h3>
              <p>
                Biz faqat eng yuqori sifatli ta'lim berishni 
                maqsad qilib qo'yganmiz.
              </p>
            </ValueCard>
            <ValueCard>
              <FaBookOpen className="icon" />
              <h3>Uzluksiz Rivojlanish</h3>
              <p>
                Biz doim yangi texnologiyalar va metodlarni 
                o'rganib, o'z dasturlarimizni yangilaymiz.
              </p>
            </ValueCard>
          </ValuesGrid>
        </ValuesSection>
      </Container>
    </AboutContainer>
  );
};

export default About;
