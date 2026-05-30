import Link from "next/link";

export default function NotFound() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-32 text-center">
            <p className="font-mono text-sm mb-4 text-cyan-400">
                &gt; cat /dev/null
            </p>

            <h1 className="font-bold text-8xl mb-4 text-gray-900 dark:text-white">
                404
            </h1>

            <p className="font-mono text-sm mb-8 text-gray-500 dark:text-gray-400">
                bash: cd: this-page: No such file or directory
            </p>

            <Link
                href="/"
                className="font-mono text-sm px-4 py-2 rounded border border-cyan-400 text-cyan-400 transition hover:opacity-70"
            >
                cd ~/home
            </Link>
        </div>
    );
}