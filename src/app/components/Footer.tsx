export default function Footer() {
    return (
        <footer className="w-full py-4 px-6 mt-auto bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-500 dark:from-slate-900 dark:via-indigo-900 dark:to-purple-900 text-center text-white dark:text-indigo-200 shadow-inner transition-all duration-300">
            <span className="text-sm font-medium">
                &copy; {new Date().getFullYear()} Built with Next.js, Tailwind CSS, and the Spotify API.<br />
                <a
                    href="https://www.scottsy.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-100 dark:text-indigo-300 hover:text-white hover:underline font-semibold mx-2 transition-colors"
                >
                    scottsy.me
                </a>
                | View this project on
                <a
                    href="https://github.com/sbsyme/spotify_stats"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-100 dark:text-indigo-300 hover:text-white hover:underline font-semibold mx-2 transition-colors"
                >
                    GitHub
                </a>
            </span>
        </footer>
    );
}
