import { Container, Grid, Paper } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SeeNotice from '../../components/SeeNotice.tsx';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle.js';
import { getAllStudents } from '../../redux/studentRelated/studentHandle.js';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle.js';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        fade: true,
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false
                }
            }
        ]
    };

    return (
        <PageContainer>
            <HeroSlider>
                <StyledSlider {...sliderSettings}>
                    <Slide>
                        <SlideImage src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                        <SlideContent>
                            <h2>Smart School Management</h2>
                            <p>Comprehensive administration dashboard for modern education</p>
                        </SlideContent>
                    </Slide>
                    <Slide>
                        <SlideImage src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                        <SlideContent>
                            <h2>Student Analytics</h2>
                            <p>Track academic progress and attendance records</p>
                        </SlideContent>
                    </Slide>
                    <Slide>
                        <SlideImage src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
                        <SlideContent>
                            <h2>Class Management</h2>
                            <p>Organize schedules and course materials efficiently</p>
                        </SlideContent>
                    </Slide>
                </StyledSlider>
            </HeroSlider>

            <DashboardWrapper>
                <Container maxWidth="lg">
                    <StatsGrid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard $color1="#3B82F6" $color2="#1D4ED8">
                                <StatIcon src={Students} />
                                <StatTitle>Total Students</StatTitle>
                                <StatValue 
                                    end={numberOfStudents} 
                                    duration={2.5} 
                                    separator=","
                                />
                            </StatCard>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard $color1="#F59E0B" $color2="#D97706">
                                <StatIcon src={Classes} />
                                <StatTitle>Total Classes</StatTitle>
                                <StatValue 
                                    end={numberOfClasses} 
                                    duration={3} 
                                    separator=","
                                />
                            </StatCard>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard $color1="#10B981" $color2="#059669">
                                <StatIcon src={Teachers} />
                                <StatTitle>Total Teachers</StatTitle>
                                <StatValue 
                                    end={numberOfTeachers} 
                                    duration={2.5} 
                                    separator=","
                                />
                            </StatCard>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <StatCard $color1="#8B5CF6" $color2="#7C3AED">
                                <StatIcon src={Fees} />
                                <StatTitle>Total Fees</StatTitle>
                                <StatValue 
                                    end={230000} 
                                    duration={4} 
                                    prefix="₹" 
                                    separator=","
                                />
                            </StatCard>
                        </Grid>

                        <Grid item xs={12}>
                            <NoticeSection elevation={3}>
                                <SeeNotice />
                            </NoticeSection>
                        </Grid>
                    </StatsGrid>
                </Container>
            </DashboardWrapper>
        </PageContainer>
    );
};

// Styled Components
const PageContainer = styled.div`
  background: #f8fafc;
  min-height: 100vh;
`;

const HeroSlider = styled.div`
  height: 55vh;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 25px 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 40vh;
    border-radius: 0 0 15px 15px;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-list, .slick-track {
    height: 100%;
  }

  .slick-dots {
    bottom: 20px;
    
    li button:before {
      color: #fff;
      opacity: 0.5;
      font-size: 10px;
      transition: all 0.3s ease;
    }
    
    li.slick-active button:before {
      color: #fff;
      opacity: 1;
      transform: scale(1.4);
    }
  }
`;

const Slide = styled.div`
  position: relative;
  height: 55vh;

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const SlideImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.85);
  transform: scale(1);
  transition: transform 10s linear;

  ${Slide}:hover & {
    transform: scale(1.05);
  }
`;

const SlideContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);

  h2 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.4rem;
    opacity: 0.9;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const DashboardWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-top: -80px;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    margin-top: -40px;
  }
`;

const StatsGrid = styled(Grid)`
  padding: 0 15px;
`;

const StatCard = styled(Paper)`
  padding: 1.5rem;
  text-align: center;
  border-radius: 12px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, 
    ${props => props.$color1}, 
    ${props => props.$color2});
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, 
      transparent 25%,
      rgba(255,255,255,0.1) 50%,
      transparent 75%);
    transform: rotate(45deg);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }
`;

const StatIcon = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 1rem;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
`;

const StatTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const StatValue = styled(CountUp)`
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const NoticeSection = styled(Paper)`
  padding: 2rem;
  border-radius: 12px;
  background: white;
  min-height: 300px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
  border: 1px solid #e2e8f0;
`;

export default AdminHomePage;