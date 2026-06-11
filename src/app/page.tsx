import HomeBanner from "@/widgets/HomeBanner";
import HomeStats from "@/widgets/HomeStats";
import HomeServices from "@/widgets/HomeServices";
import HomeProcess from "@/widgets/HomeProcess";
import HomeWhyChooseUs from "@/widgets/HomeWhyChooseUs";
import HomeFaq from "@/widgets/HomeFaq";
import HomeClients from "@/widgets/HomeClients";
import HomeProjects from "@/widgets/HomeProjects";
import HomeBlog from "@/widgets/HomeBlog";
import HomeCta from "@/widgets/HomeCta";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeStats />
      <HomeServices />
      <HomeProcess />
      <HomeWhyChooseUs />
      <HomeClients />
      <HomeProjects />
      <HomeFaq />
      <HomeBlog />
      <HomeCta />
    </>
  );
}
