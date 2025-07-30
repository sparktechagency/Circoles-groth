"use client";
import { useState, useRef, useEffect } from "react";
import { Input, Button, Dropdown } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import SearchResults from "./SearchResults";
import FilterMenu from "./FilterMenu";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [category_id, setCategoryId] = useState(1);
  const [type, setType] = useState("course");
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [filters, setFilters] = useState({});

  // Use the filters to fetch data
  useEffect(() => {
    if (filters.type) {
      if (filters.type === "tutor" && filters.subject_id) {
        // Fetch tutors by subject_id
      } else if (filters.type === "course" && filters.category_id) {
        // Fetch courses by category_id
      }
    }
  }, [filters]);

  console.log("filters", filters);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle results when input is clicked
  const handleInputClick = () => {
    if (!showResults) {
      setShowResults(true);
    }
  };

  // Handle filter dropdown visibility
  const handleFilterVisibleChange = (visible) => {
    setIsFilterOpen(visible);
    if (visible) {
      setShowResults(true); // Keep results open when filters are open
    }
  };

  return (
    <div className="relative w-[90%] mx-auto" ref={searchRef}>
      <div className="flex items-center space-x-2">
        <Input
          ref={inputRef}
          placeholder="Search tutors, courses..."
          className="w-full text-gray-700  h-[48px]  bg-white"
          prefix={<SearchOutlined className="text-gray-400" />}
          suffix={
            <Dropdown
              overlayClassName=""
              overlay={<FilterMenu setFilters={setFilters} />}
              trigger={["hover"]}
              placement="bottomRight"
              onVisibleChange={handleFilterVisibleChange}
              visible={isFilterOpen}
            >
              <Button
                className="flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsFilterOpen(!isFilterOpen);
                }}
              >
                <span className="hidden sm:inline">Filters</span>
                <DownOutlined className="text-xs" />
              </Button>
            </Dropdown>
          }
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(true);
          }}
          onClick={handleInputClick}
          onFocus={() => setShowResults(true)}
        />
      </div>

      <SearchResults
        filters={filters}
        visible={showResults}
        searchQuery={searchQuery}
        onClose={() => setShowResults(false)}
      />
    </div>
  );
};

export default SearchBar;
