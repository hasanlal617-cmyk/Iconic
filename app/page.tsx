import Navbar from "@/components/Navbar";
import ScrollIntro from "@/components/ScrollIntro";
import About from "@/components/About";
import TasteProfile from "@/components/TasteProfile";
import Products from "@/components/Products";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-navy text-slate-100 overflow-x-clip selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <ScrollIntro />
      <About />
      <TasteProfile />
      <Products />
      <Features />
      <ContactForm />
      <Footer />
    </main>
  );
}
