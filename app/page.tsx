import Navbar from "@/components/Navbar";
import ScrollIntro from "@/components/ScrollIntro";
import About from "@/components/About";
import Products from "@/components/Products";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full overflow-x-clip">
      <Navbar />
      <ScrollIntro />
      <About />
      <Products />
      <Features />
      <ContactForm />
      <Footer />
    </main>
  );
}
