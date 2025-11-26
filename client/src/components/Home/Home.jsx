import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import mainLogo from '../../assets/main-logo.png';
import bannerLogo from '../../assets/img-5.jpg';
import introImage from '../../assets/img-3.jpg';
import introImage2 from '../../assets/img-1.jpg';
import introImage3 from '../../assets/img-6.jpg';
import introImage4 from '../../assets/img-7.jpg';
import './Home.css';
import { Link } from "react-router-dom";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
      AOS.init();
    };
  }, []);

  return(
    <>
      <div className="App">
        <div className="App-body home">
          <div className="banner img-container">
            <img src={bannerLogo} alt="BurnByte Logo"/>

            <div className='container' data-aos="zoom-in-up">
              <img src={mainLogo} alt="BurnByte Logo" />
              <h1>Welcome to BurnByte</h1>
              <p>The ultimate body calculator and food intake tracker.</p>
              <p>Create an account to get started.</p>

              {isLoggedIn ? (
                  <Link className="frontend-button" to="/body-calculator">Body Calculator</Link>
                ) : (
                  <div className="flex justify-center gap-20">
                    <Link className="frontend-button" to="/login">Login</Link>
                    <Link className="frontend-button" to="/registration">Get Started</Link>
                  </div>
                )}
            </div>
          </div>

          <div className="intro">
            <div className="container flex gap-40">
              <div className="col col-img" data-aos="fade-right">
                <div className="img-container">
                  <img src={introImage} alt="BurnByte Logo" />
                </div>
              </div>

              <div className="col col-content" data-aos="fade-left">
                <h2>What is BurnByte?</h2>
                <p>BurnByte is your all-in-one solution for managing your nutrition and fitness goals. Whether you want to cut weight, maintain your current physique, or bulk up, our intelligent body calculator provides personalized calorie recommendations based on your unique body metrics.</p>
                <p>Using proven formulas that factor in your weight, height, age, gender, and activity level, BurnByte calculates your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to determine the exact calories you need to achieve your goals.</p>
                <p>Track your daily food intake, save your favorite foods, and monitor your progress over time—all in one convenient platform designed to help you reach your fitness aspirations.</p>

                {isLoggedIn ? (
                  <Link className="frontend-button" to="/body-calculator">Body Calculator</Link>
                ) : (
                  <div className="flex gap-20">
                    <Link className="frontend-button" to="/login">Login</Link>
                    <Link className="frontend-button" to="/registration">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="intro">
            <div className="container flex gap-40">
              <div className="col col-content" data-aos="fade-down">
                <h2>Why Choose BurnByte?</h2>
                <p><strong>Personalized Calorie Goals:</strong> Get tailored recommendations for cutting, maintaining, or bulking based on your body composition and lifestyle.</p>
                <p><strong>Simple Food Tracking:</strong> Easily log your meals with our intuitive food intake tracker. Save your favorite foods for quick access and accurate calorie counting.</p>
                <p><strong>Progress Monitoring:</strong> View your nutrition history and see how your daily intake compares to your goals over time. Watch your progress unfold with our comprehensive tracking system.</p>
                <p><strong>Smart Daily Resets:</strong> Your daily calorie count automatically resets at midnight, keeping you on track without manual intervention.</p>
                <p>Join BurnByte today and take control of your nutrition journey with precision and ease.</p>

                {isLoggedIn ? (
                  <Link className="frontend-button" to="/body-calculator">Body Calculator</Link>
                ) : (
                  <div className="flex gap-20">
                    <Link className="frontend-button" to="/login">Login</Link>
                    <Link className="frontend-button" to="/registration">Get Started</Link>
                  </div>
                )}
              </div>

              <div className="col col-img" data-aos="fade-up">
                <div className="img-container">
                  <img src={introImage2} alt="BurnByte Logo" />
                </div>
              </div>
            </div>
          </div>

          <div className="intro">
            <div className="container flex gap-40">
              <div className="col col-img" data-aos="fade-right">
                <div className="img-container">
                  <img src={introImage3} alt="BurnByte Logo" />
                </div>
              </div>

              <div className="col col-content" data-aos="fade-left">
                <h2>How It Works</h2>
                <p>Getting started with BurnByte is simple and straightforward. Follow these easy steps to begin your personalized nutrition journey:</p>
                <p><strong>1. Create Your Profile:</strong> Sign up for a free account in just seconds. All you need is an email address and password to get started.</p>
                <p><strong>2. Enter Your Body Metrics:</strong> Input your weight, height, age, gender, and activity level into our intuitive calculator. Our system uses these details to create your personalized profile.</p>
                <p><strong>3. Get Your Calorie Goals:</strong> Instantly receive your customized calorie recommendations for cutting, maintaining, or bulking. These goals are calculated specifically for your body and lifestyle.</p>
                <p><strong>4. Track Your Progress:</strong> Log your daily meals, save your favorite foods, and watch as you progress toward your fitness goals. Our automatic daily reset ensures you're always tracking accurately.</p>
                <p>Ready to transform your nutrition? Join thousands of users who are already achieving their fitness goals with BurnByte.</p>

                {isLoggedIn ? (
                  <Link className="frontend-button" to="/body-calculator">Body Calculator</Link>
                ) : (
                  <div className="flex gap-20">
                    <Link className="frontend-button" to="/login">Login</Link>
                    <Link className="frontend-button" to="/registration">Get Started</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="intro">
            <div className="container flex gap-40">
              <div className="col col-content" data-aos="fade-right">
                <h2>History & Tracking</h2>
                <p>Track your progress over time with our comprehensive history and tracking features. View your daily calorie intake, favorite foods, and see how your daily intake compares to your goals.</p>

                {isLoggedIn ? (
                  <Link className="frontend-button" to="/history">History</Link>
                ) : (
                  <div className="flex gap-20">
                    <Link className="frontend-button" to="/login">Login</Link>
                    <Link className="frontend-button" to="/registration">Get Started</Link>
                  </div>
                )}
              </div>

              <div className="col col-img" data-aos="fade-left">
                <div className="img-container">
                  <img src={introImage4} alt="BurnByte Logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}