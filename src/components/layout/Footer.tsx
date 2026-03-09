export default function Footer() {
  return (
    <footer className="bg-dark border-t border-dark3 py-10 mt-auto">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div>
          <p className="font-display text-gold text-lg">PHOTO HOUSE EL ERAKI</p>
          <p className="font-ui text-text3 text-sm mt-1">
            Photo House El Eraki 2014 Photography Supplies
          </p>
        </div>
        <p className="font-ui text-text3 text-xs">
          &copy; {new Date().getFullYear()} Photo House El Eraki
        </p>
      </div>
    </footer>
  );
}
