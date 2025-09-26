import ContactInfo from "./components/ContactInfo";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ServiceList from "./components/ServiceList";

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bocah Teknik",
    "description": "Jasa las profesional untuk kanopi, pagar, teralis, dan instalasi baru di wilayah Yogyakarta.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kedongdowo Wetan RT 18/RW 04, Pampang, Paliyan",
      "addressLocality": "Gunungkidul",
      "addressRegion": "Daerah Istimewa Yogyakarta",
      "addressCountry": "ID"
    },
    "telephone": "+6289637606973"
    // Anda juga bisa menambahkan "openingHours", "image", dll.
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <main>
        <Navbar />
        <Hero />
        <ServiceList />
        {/* <Gallery /> */}
        <ContactInfo />
        <Footer />

        {/* Anda bisa menambahkan footer di sini jika perlu */}
      </main>
    </>
  );
}