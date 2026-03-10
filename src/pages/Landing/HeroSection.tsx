import { Link } from "react-router-dom";
// import Button from "../../components/ui/Button";
import "./style.css";

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
