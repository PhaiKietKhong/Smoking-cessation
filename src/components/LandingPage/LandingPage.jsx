import { Box, Container } from "@mui/material";
import Header from "./Header";
import Hero from "./Hero";
import Statistical from "./Statistical";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import StoryPage from "./StoryPage";
import { useRef } from "react";
function LandingPage() {
  const sectionRef = useRef(null);
  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      <Header />
      <Hero handleScroll={handleScroll} />
      <Statistical sectionRef={sectionRef} />
      <FeaturesSection />
      <StoryPage />
      <Footer />
    </Box>
  );
}
export default LandingPage;
