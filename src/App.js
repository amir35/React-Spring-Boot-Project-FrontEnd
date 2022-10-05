import './App.css';
import { Row, Col, Container } from 'reactstrap';
import Home from './components/Home';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Contact from './components/Contact';
import  About from './components/About';
import AddCourse from './components/AddCourse';
import ViewCourses from './components/ViewCourses';
import EditCourse from './components/EditCourse';

function App() {
  return (
    <div className="App">

      <Router>
        <Container >
          <Header />
          <Row >
            <Col md={4}>
              <Menu />
            </Col>
            <Col md={8}>
              
              <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/add-course" element={<AddCourse />} exact />
              <Route path="/view-courses" element={<ViewCourses />} exact />
              <Route path="/about" element={About} exact />
              <Route path="/contact" element={<Contact />} exact />
              <Route path="/edit-course/:courseId" element={<EditCourse />} />
              </Routes>
              
              


            </Col>
          </Row>
          <Footer />
        </Container>
      </Router>

    </div>
  );
}

export default App;
