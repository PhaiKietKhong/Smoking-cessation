import { Box, Container } from "@mui/material";
import Header from "./Header";
import Hero from "./Hero";
import Statistical from "./Statistical";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import StoryPage from "./StoryPage";
function LandingPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      <Header />
      <Hero />
      <Statistical />
      <FeaturesSection />
      <StoryPage />
      <Footer />
    </Box>
  );
}
export default LandingPage;
