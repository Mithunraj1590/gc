import dynamic from "next/dynamic";
import HomeLines from "@/widgets/HomeLines";
import HomeBuildCreateCommunicate from "@/widgets/HomeBuildCreateCommunicate";
import HomeService from "@/widgets/HomeService";
import HomeStackCards from "@/widgets/HomeStackCards";
import HomePixelPromo from "@/widgets/HomePixelPromo";
import HomeGallery from "@/widgets/HomeGallery";
import HomeBlog from "@/widgets/HomeBlog";
import ImpactWidget from "@/widgets/ImpactWidget";

const HomeBanner = dynamic(() => import("@/widgets/HomeBanner"), {
  loading: () => (
    <section
      className="font-home-banner relative flex h-screen flex-row items-end justify-start bg-black"
      aria-label="Hero"
      aria-busy="true"
    />
  ),
});

const HomeCreate = dynamic(() => import("@/widgets/HomeCreate"), {
  loading: () => (
    <section
      className="relative min-h-screen h-screen bg-[#080808]"
      aria-label="Create"
      aria-busy="true"
    />
  ),
});

export default function Home() {
  return (
    <>
      <HomeBanner />

      <HomeLines />

      <ImpactWidget />

      <HomeCreate />

      <HomeBuildCreateCommunicate />

      <HomeService />

      <HomeStackCards />

      <HomePixelPromo />

      <HomeGallery />

      <HomeBlog />
    </>
  );
}
