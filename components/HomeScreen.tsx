import Header from "@/components/Header";
import QuickActions from "@/components/QuickActions";
import Banner from "@/components/Banner";
import VipPlans from "@/components/VipPlans";
import Stats from "@/components/Stats";

export default function HomeScreen() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <Header />

      <div className="px-6 mt-8 space-y-8">
        <QuickActions />
        <Banner />
        <VipPlans />
        <Stats />
      </div>
    </main>
  );
}


