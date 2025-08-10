
import DashboardTabs from "./DashboardTabs";

export default function Dashboard() {
    return (
        <section className="w-full max-w-3xl mx-auto py-10 px-4 mt-8 mb-12 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-900 rounded-2xl shadow-2xl border border-indigo-800 dark:border-indigo-900 backdrop-blur-md">
            <DashboardTabs />
        </section>
    );
}
