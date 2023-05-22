import React from "react";
import { useState, useEffect } from "react";
import "./searchBar.css";
import useSlidesStore from "../../store/useSlidesStore";

const ASPECT_RATIO = 16 / 9;
const DEFAULT_HEIGHT = 250;

const MusicToolbox = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("Artificial Intelligence");
  const [pageUrl, setPageUrl] = useState("");

  // Use current slide to display here
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );
  const updateSlides = useSlidesStore((state) => state.updateSlides);
  console.log(data);

  //This function is to get photos from pexels api starts here
  const getVideos = async () => {
    setLoading(true);
    await fetch(
      pageUrl
        ? pageUrl
        : `https://api.pexels.com/videos/search?per_page=12&query=${query}`,
      {
        headers: {
          Authorization:
            "JERuP3DyRWnvRki7QMAEoWwXveDZw4RWsSwrT5IyMXRHcOiGRGvsK6gC",
        },
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        setLoading(false);
        setData(res.videos);
        setPageUrl(res.next_page);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      getVideos();
    }
  };
  //This function is to get photos from pexels api ends here

  // This function is to handle image file selection
  const handleImageFileSelect = (event) => {
    const file = event.target.files[0];
    const url = window.URL.createObjectURL(file);
    const img = document.createElement("video");
    const newImage = {
      id: Date.now(),
      image: img,
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
    img.onload = () => {
      window.URL.revokeObjectURL(url);
      // Update the slides array
      const index = currentSlideIndex;
      const newSlides =
        slides?.map((obj, idx) => (idx === index ? slide : obj)) ?? [];
      updateSlides(newSlides);
    };
    img.src = url;
    updateCurrentSlide(slide);
    updateSlides();
  };

  return (
    <>
      <div className="toolbox_title">Search Music</div>
      <div className="image_toolbox_container">
        <input
          className="input-select"
          onKeyDown={onKeyDownHandler}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search Here"
        />
        {loading && <h5>Fetching Music...</h5>}
        <div className="card">
          {data?.map((item, index) => {
            return (
              <a href={item.link}>
                <video
                  onClick={handleImageFileSelect}
                  key={item.id}
                  controls
                  poster={item.image}
                  width={130}
                  height={130}
                >
                  <source src={item.video_files.link} type={item.file_type} />
                </video>
              </a>
            );
          })}
        </div>
        <button onClick={getVideos} className="ant-btn ant-btn-primary">
          Load More
        </button>
      </div>
    </>
  );
};
export default MusicToolbox;
