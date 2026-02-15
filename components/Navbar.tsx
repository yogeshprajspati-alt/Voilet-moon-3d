export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-violet-950/20 backdrop-blur-sm border-b border-white/5">
            <h1 className="text-2xl font-light tracking-wide bg-gradient-to-r from-violet-200 to-indigo-300 bg-clip-text text-transparent opacity-90">
                Prachi's Moon
            </h1>
            <div className="hidden md:block text-sm text-violet-200/60 font-light tracking-widest uppercase">
                Outshined by 🫵            </div>
        </nav>
    );
}
