import HomeBanner from "@/widgets/HomeBanner";
// import HeroLines from "@/components/HeroLines";
import HomeLines from "@/widgets/HomeLines";
import HomeService from "@/widgets/HomeService";
import HomeGallery from "@/widgets/HomeGallery";
import HomeBlog from "@/widgets/HomeBlog";

export default function Home() {
  return (
    <>
      <HomeBanner />

      <HomeLines />

      <HomeService />

      <HomeGallery />

      <HomeBlog />
    </>
  );
}
