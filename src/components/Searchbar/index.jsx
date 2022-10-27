import React, { Component, createRef } from "react";
import SearchIcon from "../../icons/search";
import BingIcon from "../../icons/bing";
import GoogleIcon from "../../icons/google";
import BaiduIcon from "../../icons/baidu";

export default class Search extends Component {
  BING_URL = "https://www.bing.com/search?q=";
  GOOGLE_URL = "https://www.google.com/search?q=";
  BAIDU_URL = "https://www.baidu.com/s?wd=";

  state = {
    searchEngine: this.BING_URL,
  };

  // Mount search engine
  componentDidMount = () => {
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    this.switchSearchEngine(localData.searchEngine);
  };

  // Switch search engine
  switchSearchEngine = (type) => {
    switch (type) {
      case "bing":
        this.setState({ searchEngine: this.BING_URL });
        break;
      case "google":
        this.setState({ searchEngine: this.GOOGLE_URL });
        break;
      case "baidu":
        this.setState({ searchEngine: this.BAIDU_URL });
        break;
      default:
        break;
    }
    // Modify search engine type of localstorage
    const localData = JSON.parse(localStorage.getItem("_setting_data"));
    localData.searchEngine = type;
    localStorage.setItem("_setting_data", JSON.stringify(localData));
  };

  // Search Event
  InputRef = createRef();
  search = (e) => {
    let inputValue = this.InputRef.current.value;
    if (e.keyCode === 13 && inputValue.trim()) {
      window.location = this.state.searchEngine + inputValue;
    }
  };

  render() {
    const { searchEngine } = this.state;

    return (
      <section className="w-full py-[200px] flex justify-center">
        {/* INPUT */}
        <label className="relative">
          <span className="absolute top-3 left-3.5">
            <SearchIcon />
          </span>

          <input
            type="text"
            className="w-[620px] h-12 pl-12 pr-32 text-dark-300 outline-none rounded-3xl ease-in-out duration-200 dark:text-main-400 border-[1px] border-black shadow-inner dark:border-main-500 dark:bg-main-800 placeholder:text-sm placeholder:leading-12 placeholder:text-dark-100 dark:placeholder:text-main-600 focus:rounded-md"
            placeholder="SEARCH YOU WANT"
            ref={this.InputRef}
            onKeyUp={this.search}
          />

          <div className="absolute top-3 right-3 flex items-center ease-in-out duration-300 transition-[fill,opacity]">
            <button
              className={`mr-2 ${
                searchEngine === this.BING_URL
                  ? "fill-sky-500 dark:fill-sky-700"
                  : "dark:fill-main-400"
              }`}
              onClick={() => this.switchSearchEngine("bing")}
            >
              <BingIcon />
            </button>
            <button
              className={`mr-2 ${
                searchEngine === this.GOOGLE_URL
                  ? "fill-sky-500 dark:fill-sky-700"
                  : "dark:fill-main-400"
              }`}
              onClick={() => this.switchSearchEngine("google")}
            >
              <GoogleIcon />
            </button>
            <button
              className={`mr-2 ${
                searchEngine === this.BAIDU_URL
                  ? "fill-sky-500 dark:fill-sky-700"
                  : "dark:fill-main-400"
              }`}
              onClick={() => this.switchSearchEngine("baidu")}
            >
              <BaiduIcon />
            </button>
          </div>
        </label>
      </section>
    );
  }
}
