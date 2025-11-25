import AboutUs from "./About-Us/page";
import Footer from "./Footer/page";
import HeroSection from "./Home-Page/page";
import LatestMens from "./LatestMens/page";
import LatestToteBags from "./LatestToteBags/page";
import TheLegacy from "./TheLegacy/page";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TheLegacy />
      <LatestMens />
      <LatestToteBags />
      <AboutUs />
      <Footer />
    </>
  );
}
