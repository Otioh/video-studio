import { Button, Input, Select, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { ANIMATION_EASINGS, FONT_OPTIONS } from "../../utils/constants";
import useSlidesStore from "../../store/useSlidesStore";
import toast from "react-hot-toast";
import mp3Files from "./musicLink";
import { HexColorPicker } from "react-colorful";

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
  const updateCurrentSlideIndex = useSlidesStore(
    (state) => state.updateCurrentSlideIndex
  );


const [activeSlide, sas ]= useState(0);

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
  const build=()=>{
     document.getElementById("build").click();
  }

  const handleVideoFile = (data) => {
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

  const textNode = {
    id: Date.now(),
    fontSize: fontSize ? parseInt(fontSize) : 19,
    size: fontSize ? parseInt(fontSize) : 19,
    colour: color,
    outAnimation: "EaseOut",
    duration: 2,
    //   fontFamily: fontFamily.value,
    x: 10,
    y: 475,
    inAnimation,
    fontStyle,
    text: AIResponse.scenes[activeSlide]?.text,
    align,
    textDecoration,
  };

  //  Update current Slide




        let slide = { ...currentSlide };


  const allTexts = [...slide.texts, textNode];

     slide.texts = allTexts;

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
          // const index = currentSlideIndex;
          // const newSlides =
          //   slides?.map((obj, idx) => (idx === index ? slide : obj)) ?? [];
          // updateSlides(newSlides);
        };
        if (isImage) {
          element.src = url;
        } else {
          element.getElementsByTagName("source")[0].src = url;
         
  element.muted = true;
  element.loop = true;
  element.play();
  

       

  landView();



  setTimeout(() => {
       if (activeSlide < AIResponse.scenes.length-1) {
        addNewSlide();
       }
       setTimeout(() => {
              setspinn(false);
         if (activeSlide < AIResponse.scenes.length) {
           updateAIResponse({ ...AIResponse, error: false });
       
       
         }
         setTimeout(() => {
              build();
         }, 400);
       }, 200);
  }, 10000);
  

  }

    updateCurrentSlide(slide);

  
      })
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
      y: 475,
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
        <Modal
          width={700}
          title="AI Video Script"
          footer={[
            <Button
              key="submit"
              type="primary"
              id="build"
              onClick={() => {
                updateAIResponse({ ...AIResponse, error: true });
                if (activeSlide < AIResponse.scenes.length) {
                  handleVideoFile(AIResponse.scenes[activeSlide]?.urlVideo);

                  sas(activeSlide + 1);
                } else {
                  setTimeout(() => {
                    landplay();
                  }, 100);
                }
              }}
            >
              Build
            </Button>,
          ]}
          open={!AIResponse.error}
          onCancel={() => {
            updateAIResponse({ ...AIResponse, error: true });
          }}
        >
          <p>Video script is ready</p>
        </Modal>
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
          style={{ height: "150px" }}
        />
      </div>
      <div className="stylebox">
        <div className="stylebox_title">Textstyles</div>
        <div className="stylebox_actions">
          <div className="dropdown-wrapper">
            <Select
              style={{
                width: "70px",
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
            <Select
              defaultValue="Linear"
              style={{
                width: "120px",
              }}
              onChange={(value) => setInAnimation(value)}
              options={ANIMATION_EASINGS}
            />
          </div>

          <div className="stylebox_actions_btngrp">
            <div className="btn-actions">
              <BoldOutlined
                onClick={() => setFontStyle("bold")}
                style={{
                  color: fontStyle === "bold" ? "black" : "grey",
                  width: "50px",
                }}
              />

              <ItalicOutlined
                onClick={() => setFontStyle("italic")}
                style={{
                  color: fontStyle === "italic" ? "black" : "grey",
                  width: "50px",
                }}
              />

              <UnderlineOutlined
                onClick={handleTextDecoration}
                style={{
                  color: textDecoration ? "black" : "grey",
                  width: "50px",
                }}
              />
            </div>
            <div className="btn-actions">
              
                <AlignLeftOutlined
                  onClick={() => setAlign("left")}
                  style={{
                    color: align === "left" ? "black" : "grey",
                  }}
                />
             
                <AlignCenterOutlined
                  onClick={() => setAlign("center")}
                  style={{
                    color: align === "center" ? "black" : "grey",
                  }}
                />
             
                <AlignRightOutlined
                  onClick={() => setAlign("right")}
                  style={{
                    color: align === "right" ? "black" : "grey",
                  }}
                />
           
            </div>
          </div>

          <div className="stylebox_actions_btngrp">
            <HexColorPicker
              color={color}
              onChange={setColor}
              style={{ marginLeft: "auto", marginRight: "auto", height:'70px' }}
            />
          </div>
          <div className="stylebox_actions_btngrp">
            <Button type="primary" id="addtxt" onClick={handleAddText}>
              Add Text
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextToolbox;
