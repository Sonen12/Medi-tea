// src/pages/client/Shop.jsx
import "./shop.css";

const products = [
  {
    id: 1,
    name: "An Xi Mao Xie",
    price: "$3.00",
    desc: "Duis et aliquam orci. Vivamus augue quam, sollicitudin quis bibendum quis, ...",
    img: "/images/anh1.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Bai Hao Oolong",
    price: "$1.99",
    desc: "Duis et aliquam orci. Vivamus augue quam, sollicitudin quis bibendum quis, ...",
    img: "/images/anh1.png",
    rating: 4,
  },
  {
    id: 3,
    name: "Organic Green Tea",
    price: "$2.50",
    desc: "Duis et aliquam orci. Vivamus augue quam, sollicitudin quis bibendum quis, ...",
    img: "/images/anh1.png",
    rating: 5,
  },
  {
    id: 4,
    name: "Black Tea Premium",
    price: "$4.10",
    desc: "Duis et aliquam orci. Vivamus augue quam, sollicitudin quis bibendum quis, ...",
    img: "/images/anh1.png",
    rating: 4,
  },
];

function Stars({ value = 0 }) {
  const full = Math.max(0, Math.min(5, value));
  return (
    <div className="stars" aria-label={`${full} stars`}>
      {"★★★★★".split("").map((s, i) => (
        <span key={i} className={i < full ? "star on" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Shop() {
  return (
    <div className="shop-page">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-hero__overlay" />
        <div className="shop-hero__content">
          <h1>Organic Tea</h1>
          <div className="breadcrumb">
            <span>Home</span> <span className="sep">›</span>{" "}
            <span>Products</span> <span className="sep">›</span>{" "}
            <span className="active">Organic Tea</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="shop-body">
        <div className="shop-wrap">
          {/* SIDEBAR */}
          <aside className="shop-sidebar">
            <div className="widget">
              <div className="search">
                <input placeholder="Search..." />
                <button aria-label="search">🔍</button>
              </div>
            </div>

            <div className="widget">
              <h3 className="widget-title">
                <span className="leaf">🍃</span> Cart <span className="line" />
              </h3>
              <p className="muted">No products in the cart.</p>
            </div>

            <div className="widget">
              <h3 className="widget-title">
                <span className="leaf">🍃</span> Categories{" "}
                <span className="line" />
              </h3>
              <ul className="cats">
                <li>Black Tea</li>
                <li>Green Tea</li>
                <li>Organic Tea</li>
                <li>Uncategorized</li>
              </ul>
            </div>

            <div className="widget">
              <h3 className="widget-title">
                <span className="leaf">🍃</span> Filter{" "}
                <span className="line" />
              </h3>

              <div className="range">
                <div className="range-bar" />
                <div className="range-dots">
                  <span className="dot left" />
                  <span className="dot right" />
                </div>
              </div>

              <div className="price-row">
                <div className="price-label">
                  Price: <b>$0</b> — <b>$10</b>
                </div>
                <button className="btn-filter">Filter</button>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main className="shop-main">
            <div className="shop-topbar">
              <div className="pill">Showing all {products.length} results</div>

              <div className="sort">
                <select defaultValue="default">
                  <option value="default">Default sorting</option>
                  <option value="price-asc">Sort by price: low to high</option>
                  <option value="price-desc">Sort by price: high to low</option>
                  <option value="rating">Sort by rating</option>
                </select>
              </div>
            </div>

            <div className="grid">
              {products.map((p) => (
                <div key={p.id} className="card">
                  <div className="img-wrap">
                    <img src={p.img} alt={p.name} />
                  </div>

                  <Stars value={p.rating} />

                  <h4 className="name">{p.name}</h4>
                  <p className="desc">{p.desc}</p>
                  <div className="price">{p.price}</div>
                  <div className="cart">Add to cart</div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
