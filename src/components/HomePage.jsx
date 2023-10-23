import React, { useState, useEffect } from "react";
import zevilogo from "../assets/zevilogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

export default function HomePage() {
  const [isClicked, setIsClicked] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [isHoveredSearch, setIsHoveredSearch] = useState(false);
  const [isTrends, setIsTrends] = useState([]);
  const [isTrendsVisible, setTrendsVisible] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://fakestoreapi.com/products?limit=5")
      .then((response) => {
        console.log(response);
        setIsTrends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  const handleToggleTrends = () => {
    setTrendsVisible(!isTrendsVisible);
  };

  const handleMouseEnter = () => {
    setIsHoveredSearch(true);
  };

  const handleMouseLeave = () => {
    setIsHoveredSearch(false);
  };

  const toggleCartItem = (itemId) => {
    if (cart[itemId]) {
      const updatedCart = { ...cart };
      delete updatedCart[itemId];
      setCart(updatedCart);
    } else {
      setCart({ ...cart, [itemId]: true });
    }
  };

  const renderHeartIcon = (itemId) => {
    return cart[itemId] ? (
      <FontAwesomeIcon
        icon={faHeart}
        color="red"
        style={{ opacity: 1 }}
        onClick={() => toggleCartItem(itemId)}
      />
    ) : (
      <FontAwesomeIcon
        icon={faHeart}
        color="lightgray"
        onClick={() => toggleCartItem(itemId)}
      />
    );
  };

  const handleInputClick = () => {
    setIsClicked(true);
  };
  const totalLines = 5;

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const togglePriceRange = (range) => {
    if (selectedPriceRanges.includes(range)) {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== range));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  function getPriceRange(price) {
    price = price * 10;
    if (price < 100) {
      return "Under Rs.100";
    } else if (price >= 100 && price <= 500) {
      return "Rs.100 - Rs.500";
    } else if (price > 500 && price <= 1000) {
      return "Rs.500 - Rs.1000";
    } else {
      return "Over Rs.1000";
    }
  }

  

  return (
    <div className={`Home ${isClicked ? "clicked" : ""}`}>
      <div className={"search-bar-container"}>
        <nav>
          <a href="/">
            <img src={zevilogo} alt="" className={`logo ${isClicked ? "logosrc" : "logonsrc"}`}/>  
          </a>
        </nav>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            className={`search-input ${isHoveredSearch} ? input-hovered : ""`}
            onClick={handleInputClick}
            value={search}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          {isClicked && isTrendsVisible && (
          <div className="trends" id="trends" >
            {/* style={{ backgroundColor: '#f2f2f2' }} */}
               <button className="cancel-button" onClick={handleToggleTrends}>
                X
               </button>
              <h3 className="h3">Latest Trends</h3>
              <div className="trends-container">
                {isTrends &&
                  isTrends.map((row, i) => (
                    <div className="trend-item" key={i}>
                      <div className="trend-image">
                        <img src={row.image} alt={row.image} />
                      </div>
                      <h2 className="tittle">{row.title.substring(0, 10)}</h2>
                    </div>
                  ))}
              </div>
              <div className="trend-footer">
                <h3>Popular Suggestions</h3>
                <p>Striped shirt dress</p>
                <p>Denim jumpsiut</p>
                <p>Solid tsshirt</p>
              </div>
            </div>
          )}
          <div>
            <FontAwesomeIcon icon="search" className="searchicon" />
          </div>
        </div>

        {isClicked && (
          <div className="container">
            <header>Search Result</header>
            <main className="main">
              <aside className="aside">
                <div className="nav">
                  <div className="categories">
                    <h3>CATEGORIES</h3>
                    {categories.map((category) => (
                      <label key={category}>
                        <input
                          type="checkbox"
                          value={category}
                          name="category"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                  <div className="pricenav">
                    <h3>PRICE RANGE</h3>
                    {[
                      "Under Rs.100",
                      "Rs.100 - Rs.500",
                      "Rs.500 - Rs.1000",
                      "Over Rs.1000",
                    ].map((range) => (
                      <label key={range}>
                        <input
                          type="checkbox"
                          value={range}
                          checked={selectedPriceRanges.includes(range)}
                          onChange={() => togglePriceRange(range)}
                        />
                        {range}
                      </label>
                    ))}
                  </div>
                  <div className="rating">
                    <h3>RATINGS</h3>
                    {Array(totalLines)
                      .fill(0)
                      .map((_, lineIndex) => (
                        <div key={lineIndex} className="rating-line">
                          <label>
                            <input
                              type="checkbox"
                              name={`rating-line-${lineIndex}`}
                            />
                          </label>

                          {Array(5 - lineIndex)
                            .fill(0)
                            .map((_, starIndex) => (
                              <FontAwesomeIcon
                                key={starIndex}
                                icon={faStar}
                                size="1x"
                                color="#ffcc00"
                              />
                            ))}
                          {Array(lineIndex)
                            .fill(0)
                            .map((_, starIndex) => (
                              <FontAwesomeIcon
                                key={starIndex}
                                icon={faStar}
                                size="1x"
                              />
                            ))}
                        </div>
                      ))}
                  </div>
                </div>
              </aside>
              <article className="article">
                <div className="content">
                  <div className="grid-container ">
                    {data &&
                      data
                        .filter((row) => {
                          if (selectedCategories.length === 0) {
                            return true;
                          } else if (
                            selectedCategories.includes(row.category)
                          ) {
                            return true;
                          }
                          return false;
                        })
                        .filter((row) => {
                          if (selectedPriceRanges.length === 0) {
                            return true;
                          } else if (
                            selectedPriceRanges.includes(
                              getPriceRange(row.price)
                            )
                          ) {
                            return true;
                          }
                          return false;
                        })
                        .filter((row) => {
                          if (search === "") {
                            return true;
                          } else if (
                            row.title
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return true;
                          }
                          return false;
                        })
                        .map((row, i) => (
                          <div className="products">
                            <div className="card" key={i}>
                              {renderHeartIcon(row.id)}
                              <div className="layout">
                                <div className="image">
                                  <img src={row.image} alt={row.image} />
                                  <button className="button">
                                    View Product
                                  </button>
                                </div>
                                <div className="title">
                                  <h2>{row.title.substring(0, 10)}</h2>
                                  <p className="price">
                                    {" "}
                                    <del className="strike">
                                      Rs.{Math.round(row.price * 10 + 300)}
                                    </del>{" "}
                                    Rs.{Math.round(row.price * 10)}
                                  </p>
                                  <div className="star">
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      color="#ffcc00"
                                      size="x"
                                    />
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      color="#ffcc00"
                                      size="x"
                                    />
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      color="#ffcc00"
                                      size="x"
                                    />
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      color="#ffcc00"
                                      size="x"
                                    />
                                    <FontAwesomeIcon
                                      icon={faStar}
                                      color="#ffcc00"
                                      size="x"
                                    />
                                    (210)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </article>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
