import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-studio-bg">
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
