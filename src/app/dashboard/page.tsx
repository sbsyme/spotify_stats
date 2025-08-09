
import DashboardTabs from "./DashboardTabs";

export default function Dashboard() {
    return (
        <section className="w-full max-w-3xl mx-auto py-10 px-4 bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-2xl border border-green-200 dark:border-green-800 backdrop-blur-md">
            <DashboardTabs />
        </section>
    );
}
