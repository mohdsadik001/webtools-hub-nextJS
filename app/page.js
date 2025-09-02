import HeroSection from "../components/HeroSection";

export default async function HomePage() {
  // Extract unique categories dynamically
  // const categories = Array.from(
  //   new Set(allTools.map((tool) => tool.category))
  // );

  return (
    <main>
      <HeroSection/>
    </main>
  );
}
