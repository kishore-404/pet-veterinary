import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Left_Arrow from "../assets/images/about/left_arrow.png";
import Right_Arrow from "../assets/images/about/right_arrow.png";
import Cat_button from "../assets/images/petcare/cat_button.png";
import Dog_button from "../assets/images/petcare/dog_button.png";
import Parrot_button from "../assets/images/petcare/parrot_button.png";
import Hamster_button from "../assets/images/petcare/hamster_button.png";
import Fish_button from "../assets/images/petcare/fish_button.png";
import Others_button from "../assets/images/petcare/others_button.png";
import Paw3 from "../assets/images/service/pawss3.png";
import Selected_pet from "../assets/images/petcare/selected_pet.png";
import Search_icon from "../assets/images/Search_fill.png";
import Filter_icon from "../assets/images/Filter.png";
import Products_banner from "../assets/images/products/products_banner.png";
import { products_details } from "../Data/Products";
import { auth, db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

type Button = {
  label: string;
  key: keyof typeof products_details;
  img: string;
};

type Card = {
  sub_title: string;
  brands: string;
  sub_category: string;
  price: string;
  img: string;
  id?: string; // Add unique identifier
};

type SubCategory = {
  [key: string]: Card;
};

type PetCategory = {
  [category: string]: SubCategory;
};

type CartItem = Card & {
  quantity: number;
  addedAt: Date;
};

const buttons: Button[] = [
  { label: "Cats", key: "cat", img: Cat_button },
  { label: "Dogs", key: "dog", img: Dog_button },
  { label: "Parrots", key: "parrot", img: Parrot_button },
  { label: "Hamsters", key: "hamster", img: Hamster_button },
  { label: "Fishes", key: "fish", img: Fish_button },
  { label: "Other Pets", key: "other", img: Others_button },
];

const categories = [
  "All",
  "food",
  "clothes",
  "toys",
  "vitamins",
  "shampoo",
  "collars",
  "bowls",
  "beds",
  "treats",
  "containers",
];

function Products() {
  const [selectedPet, setSelectedPet] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Card | null>(null);
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterSubCategory, setFilterSubCategory] = useState<string>("");
  const [filterBrand, setFilterBrand] = useState<string>("");
  const [filterPriceMin, setFilterPriceMin] = useState<string>("");
  const [filterPriceMax, setFilterPriceMax] = useState<string>("");

  const [showOptions, setShowOptions] = useState(false);

 
  const [currentSlide, setCurrentSlide] = useState(1);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const selectedKey = buttons[selectedPet]?.key;

  let cardsData: Card[] = [];

  if (selectedKey && products_details[selectedKey]) {
    const petCategory = products_details[selectedKey] as PetCategory;

    if (selectedCategory === "All") {
      cardsData = Object.values(petCategory).flatMap((subcatObj) =>
        Object.values(subcatObj).map((card, index) => ({
          ...card,
          id: `${selectedKey}_${selectedCategory}_${index}`
        }))
      );
    } else {
      const subCategoryKey = selectedCategory.toLowerCase();
      cardsData = petCategory[subCategoryKey]
        ? Object.values(petCategory[subCategoryKey]).map((card, index) => ({
            ...card,
            id: `${selectedKey}_${subCategoryKey}_${index}`
          }))
        : [];
    }
  }

  const filteredCards = cardsData.filter((card) => {
    const matchesSearch =
      searchQuery === "" ||
      card.sub_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.brands.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.sub_category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubCat =
      filterSubCategory === "" ||
      card.sub_category.toLowerCase().includes(filterSubCategory.toLowerCase());

    const matchesBrand =
      filterBrand === "" ||
      card.brands.toLowerCase().includes(filterBrand.toLowerCase());

    const priceNum = parseFloat(card.price.replace(/[^0-9.]/g, ""));
    const minPriceNum = filterPriceMin ? parseFloat(filterPriceMin) : null;
    const maxPriceNum = filterPriceMax ? parseFloat(filterPriceMax) : null;

    const matchesPrice =
      (!minPriceNum || (priceNum && priceNum >= minPriceNum)) &&
      (!maxPriceNum || (priceNum && priceNum <= maxPriceNum));

    return matchesSearch && matchesSubCat && matchesBrand && matchesPrice;
  });

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const slides = chunkArray(filteredCards, 6);

  const clearFilters = () => {
    setSearchQuery("");
    setFilterSubCategory("");
    setFilterBrand("");
    setFilterPriceMin("");
    setFilterPriceMax("");
    setSelectedCategory("All");
    setFilterVisible(false);
    setSearchVisible(false);
    toast.success("Filters cleared successfully!");
  };

  const handleProductClick = (product: Card) => {
    setSelectedProduct(product);
    setShowProductModal(true);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (!selectedProduct || !auth.currentUser) {
      toast.error("Please login to add items to cart");
      return;
    }

    setIsAddingToCart(true);
    try {
      const uid = auth.currentUser.uid;
      const cartItem: CartItem = {
        ...selectedProduct,
        quantity,
        addedAt: new Date(),
      };

      await updateDoc(doc(db, "users", uid), {
        cart: arrayUnion(cartItem)
      });

      toast.success("Product added to cart successfully!");
      setShowProductModal(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    if (!selectedProduct || !auth.currentUser) {
      toast.error("Please login to purchase");
      return;
    }
    
    // Add to cart first
    handleAddToCart();
    // Then redirect to checkout or payment page
    // You can implement checkout logic here
    toast.success("Proceeding to checkout...");
  };

  const closeModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />

      <section className="my_conatiner  w-full relative">
        <div className="lg:grid grid-cols-12 hidden my_container mx-auto  -mb-9 xl:-mb-12">
          <div className="col-span-4 flex flex-col justify-end">
            <div className="mb-20">
              <p className="xl:text-5xl text-2xl xl:pt-15 xl:pb-10">Category</p>
            </div>
          </div>
          <div className="col-span-8">
            <div className="flex w-full items-center justify-end gap-5">
              <p className="xl:text-[40px] text-2xl text-right xl:leading-13 m-0 -me-20">
                Find What Your Pet Needs <br className="hidden 2xl:block" />{" "}
                Here To Make Your
                <br className="hidden 2xl:block" />
                Pet Happy{" "}
              </p>
              <img src={Products_banner} className="z-10 w-80" alt="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-col ">
          {/* PET TYPE BUTTONS */}
          <div className="w-full flex flex-col items-center">
            {/* ------------ Mobile & Tablet ONLY ------------ */}
            <div className="lg:hidden w-full px-4 mt-6">
              <div className="flex justify-center items-center md:flex-col w-full gap-10">
                {/* Selected Card */}
                <div
                  className="relative flex flex-col mt-10 items-center space-y-1 px-6 py-3 transition-transform duration-300 ease-out bg-custom-pink rounded-2xl shadow-xl"
                  style={{
                    transformOrigin: "center",
                    transform: "scale(1.1)",
                  }}
                >
                  <img
                    src={buttons[selectedPet].img}
                    alt={buttons[selectedPet].label}
                    className="h-50  object-contain"
                  />
                  <p className="text-sm text-black font-semibold">
                    {buttons[selectedPet].label}
                  </p>
                  <img
                    className="absolute top-2 right-3 w-5"
                    src={Paw3}
                    alt=""
                  />
                  <img
                    src={Selected_pet}
                    className="absolute bottom-1 h-4 right-3"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* ------------ Desktop/Laptop ONLY ------------ */}
            <div className="hidden lg:flex my_container justify-evenly bg-custom-orange rounded-4xl w-full pt-4 flex-wrap xl:gap-10 mb-20">
              {buttons.map(({ img, label }, idx) => {
                const isSelected = selectedPet === idx;
                return (
                  <button
                    key={label}
                    onClick={() => {
                      setSelectedPet(idx);
                      
                    }}
                    className={`relative flex flex-col items-center space-y-1 px-10 transition-transform duration-300 ease-out ${
                      isSelected
                        ? "2xl:scale-120 xl:scale-120 lg:scale-115 shadow-2xl z-30 bg-custom-pink pt-5 rounded-2xl"
                        : ""
                    }`}
                    style={{
                      transformOrigin: "center",
                      transform: isSelected
                        ? "scale(1.25) translateY(-10px)"
                        : "scale(1)",
                    }}
                  >
                    <img
                      src={img}
                      alt={label}
                      className="2xl:h-30  xl:h-15 lg:h-10 "
                    />
                    <p
                      className={`text-sm ${
                        isSelected ? "text-black font-semibold" : "text-white"
                      }`}
                    >
                      {label}
                    </p>
                    {isSelected && (
                      <>
                        <img
                          className="absolute top-2 right-5 w-6"
                          src={Paw3}
                          alt=""
                        />
                        <img
                          src={Selected_pet}
                          className="absolute bottom-1 h-5 right-5"
                          alt=""
                        />
                      </>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ------------ Filter Modal for Mobile ------------ */}
            {showOptions && (
              <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="relative bg-white p-6 rounded-2xl shadow-xl w-11/12 max-w-sm">
                  {/* Close Button */}
                  <button
                    onClick={() => setShowOptions(false)}
                    className="absolute top-3 right-4 text-gray-600 text-xl font-bold"
                  >
                    ✕
                  </button>

                  <h3 className="text-lg font-semibold text-center mb-4">
                    Select Pet
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {buttons.map(({ img, label }, idx) => {
                      if (idx === selectedPet) return null;
                      return (
                        <button
                          key={label}
                          onClick={() => {
                            setSelectedPet(idx);
                            setShowOptions(false);
                          }}
                          className="flex flex-col items-center bg-custom-orange p-3 rounded-xl"
                        >
                          <img src={img} alt={label} className="h-10" />
                          <span className="text-white text-sm mt-1">
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            {" "}
            {/* Search Input */}
            {searchVisible && (
              <div className="flex justify-center my-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-custom-pink"
                />
              </div>
            )}
            {/* Category Buttons */}
            <div className="flex flex-wrap justify-evenly items-center mx-10 mt-6 gap-5">
              {/* Search and Filter Buttons (Always Visible) */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setSearchVisible((v) => !v)}
                  aria-label="Toggle Search"
                >
                  <img src={Search_icon} alt="Search" className="h-10 w-10" />
                </button>
               

                {/* Filter Button */}
                <button
                  className="bg-custom-orange px-4 py-2 rounded-xl lg:hidden   text-white font-semibold shadow"
                  onClick={() => setShowOptions(true)}
                >
                  Filter
                </button>
              </div>

              {/* Desktop/Tablet View: Category Buttons */}
              <div className="hidden lg:flex flex-wrap gap-10 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      
                      setSelectedCategory(cat);
                    }}
                    className={`px-4 py-2 rounded-full text-xs xl:text-sm transition duration-200 ${
                      selectedCategory === cat
                        ? "bg-custom-pink text-black"
                        : "bg-white text-gray-700 hover:bg-orange-100"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Mobile View: Dropdown */}
              <div className="block lg:hidden md:w-80 ">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    
                    setSelectedCategory(e.target.value);
                  }}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-pink"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setFilterVisible((v) => !v)}
                aria-label="Toggle Filters"
              >
                <img src={Filter_icon} alt="Filter" className="h-10 w-10" />
              </button>
            </div>
            {/* Filter Inputs */}
            {filterVisible && (
              <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg space-y-4">
                <div>
                  <label
                    className="block font-semibold mb-1"
                    htmlFor="filterSubCategory"
                  >
                    Sub-category
                  </label>
                  <input
                    id="filterSubCategory"
                    type="text"
                    placeholder="Filter by sub-category"
                    value={filterSubCategory}
                    onChange={(e) => setFilterSubCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-pink"
                  />
                </div>
                <div>
                  <label
                    className="block font-semibold mb-1"
                    htmlFor="filterBrand"
                  >
                    Brand
                  </label>
                  <input
                    id="filterBrand"
                    type="text"
                    placeholder="Filter by brand"
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-pink"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      htmlFor="filterPriceMin"
                    >
                      Min Price
                    </label>
                    <input
                      id="filterPriceMin"
                      type="number"
                      min="0"
                      placeholder="Min price"
                      value={filterPriceMin}
                      onChange={(e) => setFilterPriceMin(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-pink"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className="block font-semibold mb-1"
                      htmlFor="filterPriceMax"
                    >
                      Max Price
                    </label>
                    <input
                      id="filterPriceMax"
                      type="number"
                      min="0"
                      placeholder="Max price"
                      value={filterPriceMax}
                      onChange={(e) => setFilterPriceMax(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-pink"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={clearFilters}
                    className="bg-custom-pink text-black px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SWIPER SLIDES */}
        <div className="mt-16">
          {filteredCards.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation]}
                
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onSlideChange={(swiper) =>
                  setCurrentSlide(swiper.realIndex + 1)
                }
                onBeforeInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevRef.current;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextRef.current;
                }}
                className="w-full px-4"
              >
                {slides.map((group, index) => (
                  <SwiperSlide key={index}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 mx-auto px-5 xl:w-7xl">
                      {group.map((card, i) => (
                        <div key={i} className="flex justify-center">
                          <div 
                            className="card flex flex-col items-center rounded-4xl pt-10 bg-[#EEEEEE] w-full max-w-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleProductClick(card)}
                          >
                            <div>
                              <img src={card.img} alt={card.sub_title} />
                            </div>
                            <div className="flex flex-col items-center bg-custom-pink w-full pb-10 rounded-b-4xl px-4">
                              <p className="font-semibold pt-5">{card.price}</p>
                              <p className="w-55 text-center font-medium mt-2">
                                {card.sub_title}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination + Navigation */}
              <div className="flex gap-10 justify-center mt-4">
                <button ref={prevRef} aria-label="Previous">
                  <img src={Left_Arrow} alt="Previous" />
                </button>
                <span className="text-[24px] font-bold bg-[#F19A56] flex justify-center items-center text-2xl w-12 h-12 rounded-full">
                  {currentSlide}
                </span>
                <button ref={nextRef} aria-label="Next">
                  <img src={Right_Arrow} alt="Next" />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center mt-10 text-lg font-semibold">
              No products found.
            </p>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product Image */}
            <div className="bg-gray-100 p-8 rounded-t-2xl">
              <img 
                src={selectedProduct.img} 
                alt={selectedProduct.sub_title}
                className="w-full h-48 object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedProduct.sub_title}
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Price:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {selectedProduct.price}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Brand:</span>
                  <span className="text-gray-800 capitalize">
                    {selectedProduct.brands}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Category:</span>
                  <span className="text-gray-800 capitalize">
                    {selectedProduct.sub_category}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Pet Type:</span>
                  <span className="text-gray-800 capitalize">
                    {buttons[selectedPet]?.label}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-semibold text-gray-600">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Products;