import HeroSection from "@/components/layout/HeroSection";

// app/tools/page.js
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

export default async function ToolsPage() {
  // const session = await getServerSession(authOptions);

  // console.log("🔍 Server-side session check:", {
  //   hasSession: !!session,
  //   userEmail: session?.user?.email,
  // });

  // if (!session) {
  //   console.log("❌ No session found, redirecting to signin");
  //   redirect("/auth/signin?callbackUrl=/tools");
  // }

  return (
    <main>
      <HeroSection />
    </main>
  );
}
