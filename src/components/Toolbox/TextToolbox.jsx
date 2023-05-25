import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined
} from '@ant-design/icons';
import { ANIMATION_EASINGS, FONT_OPTIONS } from '../../utils/constants';
import useSlidesStore from '../../store/useSlidesStore';
import toast from "react-hot-toast";
import mp3Files from "./musicLink";

const { TextArea } = Input;

function TextToolbox({ setspinn }) {
  const [fontFamily, setFontFamily] = useState("Ariel");
  const [fontSize, setFontSize] = useState("19");
  const [fontStyle, setFontStyle] = useState("bold");
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");
  const [align, setAlign] = useState("left");
  const [textDecoration, setTextDecoration] = useState("");
  const [inAnimation, setInAnimation] = useState("Linear");

  // Use current slide to display here

  const ASPECT_RATIO = 16 / 9;
  const DEFAULT_HEIGHT = 500;
  const slides = useSlidesStore((state) => state.slides);
  const currentSlide = useSlidesStore((state) => state.currentSlide);
  const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
  const updateCurrentSlide = useSlidesStore(
    (state) => state.updateCurrentSlide
  );

    const AIResponse = useSlidesStore((state) => state.AIResponse);
    const updateAIResponse = useSlidesStore((state) => state.updateAIResponse);
    const addNewSlide = useSlidesStore((state) => state.addNewSlide);
    
  const updateSlides = useSlidesStore((state) => state.updateSlides);
   const updateAudio = useSlidesStore((state) => state.updateAudio);
   let count = AIResponse?.scenes?.length;
  const handleFontSize = (value) => {
    setFontSize(value);
  };

  const resetText = () => {
    setFontSize("32");
    setFontStyle("bold");
    setColor("#000000");
    setAlign("left");
    setTextDecoration("");
    setText("");
    setInAnimation("Linear");
  };

  const landView = () => {
    document.getElementById("viewBtn").click();
  };

  const landplay = () => {
    document.getElementById("playBtn").click();
  };




  const handleVideoFile = (data, text) => {
    setspinn(true);
    const locate = data;
    
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
          setText(text);
          setTimeout(() => {
            document.getElementById("addtxt").click();
          }, 1000);
      

          element.play();
        
     
        }
        updateCurrentSlide(slide);
         setspinn(false);
         landView();

      });
  };




    function getAudioBlobFromURL(url) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => resolve(blob))
          .catch((error) => reject(error));
      });
    }
    
      
    useEffect(()=>{
      if (!AIResponse.error){

        getAudioBlobFromURL(mp3Files[Math.floor(Math.random() * 26)].url)
          .then((blob) => {
            // Do something with the audio blob
            updateAudio(blob);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }, [])
    

 


  const handleAddText = () => {
    if (!text) return;
    const textNode = {
      id: Date.now(),
      fontSize: fontSize ? parseInt(fontSize) : 19,
      size: fontSize ? parseInt(fontSize) : 19,
      colour: color,
      outAnimation: "EaseOut",
      duration: 2,
      //   fontFamily: fontFamily.value,
      x: 10,
      y: 500,
      inAnimation,
      fontStyle,
      text,
      align,
      textDecoration,
    };

    //  Update current Slide
    let slide = { ...currentSlide };
    const allTexts = [...slide.texts, textNode];
    slide.texts = allTexts;

    updateCurrentSlide(slide);

    // Update the slides array
    const index = currentSlideIndex;
    const newSlides = slides.map((obj, idx) =>
      idx === index ? { ...obj, texts: [...obj.texts, textNode] } : obj
    );

    updateSlides(newSlides);
    setTimeout(() => {
      resetText();
    }, 100);
  };







  const handleTextChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const handleTextDecoration = () => {
    if (textDecoration === "underline") {
      setTextDecoration("");
    } else {
      setTextDecoration("underline");
    }
  };

  return (
    <>
      <div className="toolbox_title">Text Properties</div>
      {!AIResponse.error && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 200,
            backgroundColor: "rgba(0,0,0,0.5)",
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            className="play_save_slides"
            style={{alignSelf:'flex-start', border:'solid 1px red', borderRadius:'7px', padding:'10px', color:'red'}}
            id="playBtn"
            onClick={() => {
              updateAIResponse({ ...AIResponse, error: true });
            }}
          >
            Cancel
          </button>
          <Button
            className="play_save_slides"
            id="playBtn"
            type="primary"
            onClick={() => {


 handleVideoFile(AIResponse.scenes[0]?.urlVideo, AIResponse.scenes[0]?.text);

        


              updateAIResponse({ ...AIResponse, error: true });
             
            }}
          >
            Build AI Generated Video
          </Button>
        </div>
      )}

      <div>
        <TextArea
          size="24"
          className="textbox"
          rows={4}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter Text"
          maxLength={60}
        />
      </div>
      <div className="stylebox">
        <div className="stylebox_title">Textstyles</div>
        <div className="stylebox_actions">
          <div className="dropdown-wrapper">
            <Select
              style={{
                width: "200px",
              }}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue="19"
              value={fontSize}
              onChange={handleFontSize}
              options={FONT_OPTIONS}
            />
          </div>
          <div className="dropdown-wrapper">
            <Select
              defaultValue="Linear"
              style={{
                width: "200px",
              }}
              onChange={(value) => setInAnimation(value)}
              options={ANIMATION_EASINGS}
            />
          </div>
          <div className="stylebox_actions_btngrp">
            <div className="btn-actions">
              <span className="btn">
                <BoldOutlined
                  onClick={() => setFontStyle("bold")}
                  style={{
                    color: fontStyle === "bold" ? "black" : "grey",
                  }}
                />
              </span>
              <span className="btn">
                <ItalicOutlined
                  onClick={() => setFontStyle("italic")}
                  style={{
                    color: fontStyle === "italic" ? "black" : "grey",
                  }}
                />
              </span>
              <span className="btn">
                <UnderlineOutlined
                  onClick={handleTextDecoration}
                  style={{
                    color: textDecoration ? "black" : "grey",
                  }}
                />
              </span>
            </div>
            <div className="btn-actions">
              <span className="btn">
                <AlignLeftOutlined
                  onClick={() => setAlign("left")}
                  style={{
                    color: align === "left" ? "black" : "grey",
                  }}
                />
              </span>
              <span className="btn">
                <AlignCenterOutlined
                  onClick={() => setAlign("center")}
                  style={{
                    color: align === "center" ? "black" : "grey",
                  }}
                />
              </span>
              <span className="btn">
                <AlignRightOutlined
                  onClick={() => setAlign("right")}
                  style={{
                    color: align === "right" ? "black" : "grey",
                  }}
                />
              </span>
            </div>
          </div>

          <div className="stylebox_actions_btngrp">
            <input
              type="color"
              onChange={(e) => setColor(e.target.value)}
              name="color"
            />
          </div>
          <div className="stylebox_actions_btngrp">
            <Button type="primary" id='addtxt' onClick={handleAddText}>
              Add Text
            </Button>
        
          </div>
        </div>
      </div>
    </>
  );
}

export default TextToolbox;
