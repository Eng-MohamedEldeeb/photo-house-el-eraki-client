import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center
      justify-center overflow-hidden"
    >
      {/* Dark gradient background */}
      <div
        className="absolute inset-0 bg-linear-to-br
        from-black via-dark to-dark2"
      />
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/30" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="font-ui text-gold text-base tracking-widest mb-4">
          Photo House El Eraki
        </p>
        <h1
          className="font-display text-5xl md:text-7xl text-ivory
          leading-tight mb-2"
        >
          PHOTO HOUSE
        </h1>
        <h2
          className="font-display text-3xl md:text-5xl text-gold
          mb-8"
        >
          EL ERAKI
        </h2>
        <div className="w-24 h-px bg-gold mx-auto mb-8" />
        <p className="font-ui text-text2 text-lg mb-10 max-w-xl mx-auto">
          Premium photography supplies
        </p>
        <Link to="/store">
          <Button size="lg">Shop Now</Button>
        </Link>
      </div>
    </section>
  );
}
