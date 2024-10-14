import React, { useState } from "react";
import "./Filter.css";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import Slider from "@mui/material/Slider";

const Filter = ({ onPriceChange }) => {
  const [value, setValue] = useState([50, 200]); // Price range state
  const [searchTerm, setSearchTerm] = useState("");
  const [brandsData] = useState([
    { name: "Hatil", count: 2 },           // Bangladesh
    { name: "Otobi", count: 7 },           // Bangladesh
    { name: "RFL Furniture", count: 10 },  // Bangladesh
    { name: "IKEA", count: 39 },           // Europe
    { name: "Maison du Monde", count: 95 }, // Europe
    { name: "BoConcept", count: 1092 },    // Europe
    { name: "Ligne Roset", count: 48 }     // Europe
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onPriceChange(newValue); // Pass the selected price range to the parent
  };


   

  const filteredBrands = brandsData.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filterCategories = [
    "Furniture",
    "Lighting",
    "Rugs",
    "Wall Art",
    "Curtains",
    "Bedding",
    "Cushions & Throws",
    "Mirrors",
    "Storage Solutions",
    "Kitchenware",
  ];
  
  
  return (
    <div>
      <div className="filterSection">
        <div className="filterCategories">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Product Categories</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {filterCategories.map((category, index) => (
                <p key={index}>{category}</p>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>

        <div className="filterPrice">
      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary
          expandIcon={<IoIosArrowDown size={20} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ padding: 0, marginBottom: 2 }}
        >
          <h5 className="filterHeading">Price</h5>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            min={0} // Minimum value
            max={500} // Maximum value
          />

          <div className="filterSliderPrice">
            <div className="priceRange">
              <p>
                Min Price: <span>${value[0]}</span>
              </p>
              <p>
                Max Price: <span>${value[1]}</span>
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>


        <div className="filterBrands">
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<IoIosArrowDown size={20} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ padding: 0, marginBottom: 2 }}
            >
              <h5 className="filterHeading">Brands</h5>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {/* Search bar */}
              <div className="searchBar">
                <BiSearch className="searchIcon" size={20} color={"#767676"} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Brand list */}
              <div className="brandList">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand, index) => (
                    <div className="brandItem" key={index}>
                      {/* Radio button */}
                      <input
                        type="checkbox"
                        name="brand"
                        id={`brand-${index}`}
                        className="brandRadio"
                      />
                      {/* Brand name */}
                      <label htmlFor={`brand-${index}`} className="brandLabel">
                        {brand.name}
                      </label>
                      {/* Brand count */}
                      <span className="brandCount">{brand.count}</span>
                    </div>
                  ))
                ) : (
                  <div className="notFoundMessage">Not found</div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>

      </div>
    </div>
  );
};

export default Filter;
