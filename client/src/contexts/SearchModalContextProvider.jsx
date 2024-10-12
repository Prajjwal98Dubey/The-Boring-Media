/* eslint-disable react/prop-types */
import { useState } from "react";
import SearchModalContext from "./searchModalContext";

function SearchContextModalProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <SearchModalContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
      {children}
    </SearchModalContext.Provider>
  );
}

export default SearchContextModalProvider;
