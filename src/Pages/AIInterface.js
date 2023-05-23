import React, { useEffect, useState } from 'react';
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import useSlidesStore from '../store/useSlidesStore';
import { funSeque } from 'flame-tools';
import { useNavigate } from 'react-router-dom';



function AIInterface() {
    const [fontSize, setFontSize] = useState("32");
    let navigate=useNavigate()

    const ASPECT_RATIO = 16 / 9;
    const DEFAULT_HEIGHT = 400;
    // Use current slide to display here
    const slides = useSlidesStore((state) => state.slides);
    const currentSlide = useSlidesStore((state) => state.currentSlide);
    const currentSlideIndex = useSlidesStore((state) => state.currentSlideIndex);
    const updateCurrentSlide = useSlidesStore(
        (state) => state.updateCurrentSlide
    );
    const updateSlides = useSlidesStore((state) => state.updateSlides);
    const updateAudio = useSlidesStore((state) => state.updateAudio);
 
    const landView = () => {
        document.getElementById("viewBtn").click();
    };


    const handleVideoFile = (data) => {
   
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
              
                    funSeque({ delaySeconds: 2 }, () => {
                        navigate('/')
                    },
                        () => {
                            element.play()
                        },
                        () => {
                            landView();
                        })

                    // landplay();
                }
                updateCurrentSlide(slide);
            });
    };







    useEffect(() => {
        handleVideoFile(
            "https://player.vimeo.com/external/189545487.sd.mp4?s=8cd2af1ec08f7ce121a5a6a09c78c05237943524&profile_id=164&oauth2_token_id=57447761"
        );

        // handleAudioFileSelect(
        //   "https://cdn.trendybeatz.com/audio/Psinach-I-Know-[TrendyBeatz.com].mp3"
        // );

    }, []);





  return (

            <>
                <Header
                   
                />
                <div className="editor">
                 <center>
                    <br/>
                  <br />
                  <br />
                  <br />
    
                    <h1>
                        Wait while we build your Video
                    </h1>
              </center>
                    {/* <Hints
          enabled={true}
          hints={[]}
          // hints={hints}
        /> */}
                    <div className="editor__top">
                      
                        <div className="viewport-wrapper">
                          
                        </div>
                    </div>
         </div>

    </>
  )
}

export default AIInterface