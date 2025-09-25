import ContactInfo from "./components/ContactInfo";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServiceList from "./components/ServiceList";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServiceList />
      {/* <Gallery /> */}
      <ContactInfo />
      <Footer/>

      {/* Anda bisa menambahkan footer di sini jika perlu */}
    </main>
  );
}