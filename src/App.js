import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import LaunchIcon from "@mui/icons-material/Launch";

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allsearchName, setAllSearchName] = useState([]);
  const [feedHead, setFeedHead] = useState("");
  const [search, setSearch] = useState("");
  const [feeds, setFeeds] = useState([]);
  const [feedName, setFeedName] = useState("");
  const [feedurl, setFeedurl] = useState("");
  const [allFeeds, setAllFeeds] = useState([]);

  async function getFeed() {
    let data = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${feedurl}&api_key=cmzdmzk7ov9ivx6uk1bvtglrfsundrcrieljdrty`
    ).then((res) => res.json());
    console.log(data.feed["url"], "UUUURRRLL");
    let copyItem = [[feedName, data.items, data.feed["url"]], ...allFeeds];

    setAllFeeds(copyItem);
    setFeeds([feedName, data.items]);
    setFeedHead(feedName);
  }

  function serName(evt) {
    setSearch(evt.target.value);
  }

  async function searchFun() {
    for (let i = 0; i < allFeeds.length; i++) {
      if (allFeeds[i][0] === search) {
        console.log(allFeeds[i][2]);
        let url = allFeeds[i][2];

        let data = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${url}&api_key=cmzdmzk7ov9ivx6uk1bvtglrfsundrcrieljdrty`
        ).then((res) => res.json());

        let copyItem = [[search, data.items, data.feed["url"]], ...allFeeds];

        setAllFeeds(copyItem);

        setFeedHead(search);

        setFeeds(allFeeds[i]);
        setFeedName(search);
        break;
      }
    }
  }

  function feedNameFun(evt) {
    setFeedName(evt.target.value);
  }

  function feedurlFun(evt) {
    setFeedurl(evt.target.value);
  }

  return (
    <div className="App">
      <div className="main">
        <h1 className="head">Content Generator</h1>
        <input
          onChange={(evt) => {
            serName(evt);
          }}
          className="input"
          placeholder="Filter your feeds..."
        />
        <IconButton
          onClick={searchFun}
          aria-label="search"
          className="searchText"
        >
          <SearchIcon fontSize="large" />
        </IconButton>

        {allsearchName
          ? allsearchName.map((item, index) => {
              return (
                <div className="searchcon" key={index}>
                  <div className="searchItem">
                    <PanoramaFishEyeIcon className="ring" />
                    <span className="itemspan">{item}</span>
                  </div>
                  <CancelSharpIcon className="cancel" color="secondary" />
                </div>
              );
            })
          : null}
        <hr />
        <div className="footer">
          <p>Add a new feed</p>
          <input
            onChange={(evt) => {
              feedNameFun(evt);
            }}
            value={feedName}
            className="finput"
            placeholder="Type your feed name..."
          />
          <input
            onChange={(evt) => {
              feedurlFun(evt);
            }}
            value={feedurl}
            className="finput"
            placeholder="Copy your RSS url.."
          />
          <button onClick={getFeed} className="fbutton">
            Add feed
          </button>
        </div>
      </div>
      {feeds.length
        ? feeds[1].map((item, index) => {
            return (
              <div>
                <div className="feedsHead">
                  <a href={item.link} target="_blank">
                    <LaunchIcon className="date" /> {feedHead}
                  </a>
                  <span className="date">{item.pubDate}</span>
                </div>
                {item.thumbnail ? <img src={item.thumbnail} /> : null}
                <div className="feeds">
                  <p className="itemTitle">{item.title}</p>
                  <p className="itemDes">{item.description}</p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
