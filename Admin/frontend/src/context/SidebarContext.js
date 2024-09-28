import Cookies from "js-cookie";
import { createContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// create context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const resultsPerPage = 20;
  const searchRef = useRef("");
  const invoiceRef = useRef("");

  const [limitData, setLimitData] = useState(20);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [lang, setLang] = useState("en");
  const [time, setTime] = useState("");
  const [sortedField, setSortedField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [navBar, setNavBar] = useState(true);
  const { i18n } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const closeBulkDrawer = () => setIsBulkDrawerOpen(false);
  const toggleBulkDrawer = () => setIsBulkDrawerOpen(!isBulkDrawerOpen);

  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLanguageChange = (lang) => {
    Cookies.set("i18next", lang);
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  const handleSubmitForAll = (e) => {
    e.preventDefault();
    if (!searchRef?.current?.value) return setSearchText(null);
    setSearchText(searchRef?.current?.value);
    setCategory(null);
  };

  useEffect(() => {
    const language = Cookies.get("i18next");
    // console.log("lang", language);
    const enLang = [
      "en-US",
      "en-GB",
      "en-TT",
      "en-ZA",
      "en-NZ",
      "en-JM",
      "en-IE",
      "en-CA",
      "en-BZ",
      "en-au",
    ];
    if (enLang.includes(language)) {
      setLang("en");
      // console.log("lang", lang, "included");
    } else {
      setLang(Cookies.get("i18next"));
    }
  }, [lang, windowDimension]);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,
        setIsDrawerOpen,
        closeBulkDrawer,
        isBulkDrawerOpen,
        toggleBulkDrawer,
        isModalOpen,
        toggleModal,
        closeModal,
        isUpdate,
        setIsUpdate,
        lang,
        setLang,
        handleLanguageChange,
        currentPage,
        setCurrentPage,
        handleChangePage,
        searchText,
        setSearchText,
        category,
        setCategory,
        searchRef,
        handleSubmitForAll,
        status,
        setStatus,
        zone,
        setZone,
        time,
        setTime,
        sortedField,
        setSortedField,
        resultsPerPage,
        limitData,
        setLimitData,
        windowDimension,
        modalOpen,
        setModalOpen,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        loading,
        setLoading,
        invoice,
        setInvoice,
        invoiceRef,
        setNavBar,
        navBar,
        tabIndex,
        setTabIndex,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
