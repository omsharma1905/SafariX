function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col items-center gap-2 text-center">
        <h2 className="text-sm text-gray-500">
          © {new Date().getFullYear()} SafariX
        </h2>

        <p className="text-sm text-gray-500">
          Built with ❤️ by Om Sharma · AI Trip Planner
        </p>

        <span className="text-xs text-gray-400">
          Powered by AI · Designed for travelers
        </span>
      </div>
    </footer>
  )
}

export default Footer;