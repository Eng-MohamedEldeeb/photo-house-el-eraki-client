import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import "./style.css";

export function HeroSection2() {
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
      <div className="hero-bg">
        <div className="hbg-mesh"></div>
        <div className="hbg-grid"></div>
        <div className="hbg-vig"></div>
      </div>
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

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hbg-mesh"></div>
        <div className="hbg-grid"></div>
        <div className="hbg-vig"></div>
      </div>

      <div className="hero-left">
        <div className="h-eyebrow">
          <div className="h-ey-line"></div>
          <span className="h-ey-txt">
            Photography Products &amp; Custom Prints
          </span>
        </div>
        <div className="h-heading">
          <h1 className="h-h1">
            Photo
            <br />
            <span>House</span>
          </h1>
          <p className="h-h1-ar">بيت التصوير العراقي — El Eraki</p>
        </div>
        <div className="h-desc">
          <p>
            Premium photography products, custom portrait prints and
            professional photography merchandise. Crafted with passion,
            delivered with excellence.
          </p>
          <p className="ar">منتجات تصوير فاخرة وطباعة مخصصة بجودة لا تُضاهى</p>
        </div>
        <div className="h-acts">
          <Link to="/store">
            <p className="btn-gold">Browse Store — تصفح المتجر →</p>
          </Link>
          <button className="btn-ghost">View Catalogue</button>
        </div>
        <div className="h-stats">
          <div>
            <div className="hs-num">200+</div>
            <div className="hs-lbl">Products</div>
            <div className="hs-ar">منتج</div>
          </div>
          <div>
            <div className="hs-num">15+</div>
            <div className="hs-lbl">Categories</div>
            <div className="hs-ar">فئة</div>
          </div>
          <div>
            <div className="hs-num">5★</div>
            <div className="hs-lbl">Quality</div>
            <div className="hs-ar">جودة</div>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hfw">
          <div className="hf-deco"></div>
          <div className="hf-main">
            <div className="hf-inner">
              <div className="hf-icon">📷</div>
            </div>
            <div className="hf-grad"></div>
            <div className="hf-info">
              <div className="hf-tag">Featured Product</div>
              <div className="hf-title">Premium Portrait Print A3</div>
              <div className="hf-price">
                <span>EGP</span>350
              </div>
            </div>
          </div>
          <div className="hf-float">
            <div className="hff-l">In Stock</div>
            <div className="hff-v">✓ 48</div>
            <div className="hff-ar">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
}
