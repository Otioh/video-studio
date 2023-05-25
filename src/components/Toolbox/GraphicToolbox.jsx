import React from "react";
import { useState, useEffect } from "react";
import "./searchBar.css";
import useSlidesStore from "../../store/useSlidesStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import useVideoStore from "../../store/useVideoStore";

const ASPECT_RATIO = 16 / 9;
const DEFAULT_HEIGHT = 400;
const API_KEY = "JERuP3DyRWnvRki7QMAEoWwXveDZw4RWsSwrT5IyMXRHcOiGRGvsK6gC";
const API_URL = "https://api.pexels.com/videos/search";
const GraphicToolbox = ({ setspinn }) => {
  const [curatedVideos, setCuratedVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  console.log(searchResults);
  let navigate = useNavigate();
  // Use current slide to display here
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const updateSlides = useSlidesStore((state) => state.updateSlides);

  // Load curated photos on component mount
  React.useEffect(() => {
    axios
      .get("https://api.pexels.com/videos/popular?per_page=10&quality=low", {
        headers: { Authorization: API_KEY },
      })
      .then((response) => setCuratedVideos(response.data.videos))
      .catch((error) => console.error(error));
  }, []);

  //This function is to get photos from pexels api starts here
  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchResults([]);
      setPage(1);
      if (searchTerm) {
        setLoading(true);
        try {
          const response = await fetch(
            `${API_URL}?query=${searchTerm}&page=1&per_page=10&quality=low`,
            {
              headers: {
                Authorization: API_KEY,
              },
            }
          );
          const data = await response.json();
          setSearchResults(data.videos);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const landView = () => {
    document.getElementById("viewBtn").click();
  };

  const landplay = () => {
    document.getElementById("playBtn").click();
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
    try {
      const response = await fetch(
        `${API_URL}?query=${searchTerm}&page=${
          page + 1
        }&per_page=10&quality=low`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page > 1) {
      handleLoadMore();
    }
  }, [page]);

  const handleVideoFile = (data) => {
    setspinn(true);
    const locate = data;
    console.log(locate);
    fetch(locate)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "filename.mp4", {
          type: "video/mp4",
        });
        let isImage = file?.type?.startsWith("image/");
        const url = window.URL.createObjectURL(file);
        const element = document.createElement("video");
        const newImage = {
          id: Date.now(),
          image: element,
          previewImage: file,
          x: 0,
          y: 0,
          height: DEFAULT_HEIGHT,
          width: DEFAULT_HEIGHT * ASPECT_RATIO,
        };
        let slide = { ...currentSlide };
        slide = {
          ...slide,
          images: [...slide.images, newImage],
          previewImages: [...slide.previewImages, newImage],
        };
        if (!isImage) {
          let source = document.createElement("source");
          source.type = "video/mp4";
          source.url = url;
          element.appendChild(source);
        }
        element.onload = () => {
          window.URL.revokeObjectURL(url);
          // Update the slides array
          const index = currentSlideIndex;
          const newSlides =
            slides?.map((obj, idx) => (idx === index ? slide : obj)) ?? [];
          updateSlides(newSlides);
        };
        if (isImage) {
          element.src = url;
        } else {
          element.getElementsByTagName("source")[0].src = url;
          element.loop = true;
          element.play();
          setspinn(false);
          landView();
          // landplay();
        }
        updateCurrentSlide(slide);
      });
  };

  return (
    <>
      <div className="toolbox_title">Search Videos</div>
      <div className="image_toolbox_container">
        <input
          className="input-select"
          onKeyPress={handleSearch}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search Videos Here"
        />
        {loading ? (
          <h5>Loading Videos</h5>
        ) : searchResults.length > 0 ? (
          <div className="card">
            {searchResults.map((item) => {
              return (
                <div onClick={() => console.log("Hello World")}>
                  <video
                    className="video"
                    key={item.video_files[0].id}
                    draggable
                    controls
                    width={130}
                    height={130}
                    id="my-video"
                  >
                    <source
                      src={item.video_files[0].link}
                      draggable
                      onDragEndCapture={() =>
                        handleVideoFile(item.video_files[0].link)
                      }
                      type={item.video_files.file_type}
                    />
                  </video>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card">
            {curatedVideos.map((item) => (
              <div
                onDragEndCapture={() =>
                  handleVideoFile(item.video_files[0].link)
                }
              >
                <video
                  className="video"
                  key={item.video_files[0].id}
                  width={130}
                  draggable
                  controls
                  height={130}
                >
                  <source
                    draggable
                    src={item.video_files[0].link}
                    onDragEndCapture={() =>
                      handleVideoFile(item.video_files[0].link)
                    }
                    type={item.video_files.file_type}
                  />
                </video>
              </div>
            ))}
          </div>
        )}
        {searchResults.length > 0 && (
          <button onClick={handleLoadMore} className="ant-btn ant-btn-primary">
            Load More
          </button>
        )}
      </div>
    </>
  );
};
export default GraphicToolbox;
