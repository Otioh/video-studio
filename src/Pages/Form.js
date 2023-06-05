import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSlidesStore from "../store/useSlidesStore";

import axios from "axios";
import { Spin, notification } from "antd";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGears, faPhone, faEnvelope, faAngleDown} from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.css';

  // import "./css/carousel.css";
 
      import "./style.css";

 

function Form() {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [color, setcolor] = useState("black");
  const [spinning, setspinning] = useState(false);
  const [spintext, setspintext] = useState("Please Wait");
  const [description, setdescription] = useState("");
  const [logRe, setlogRe] = useState(false);



  
  const updateAIResponse = useSlidesStore((state) => state.updateAIResponse);
  const processForm = () => {
    if(description==="") {
      notification.error({message:'Video Description is required'})
      return
    }
setspinning(true)
    axios.post('https://app.googptai.com/api/vsl', {description, title:'Title Text'}).then((res)=>{
      setspintext("Please wait while we gather resources")
     
      if(!res.data.error){
        function replaceString(inputString, searchValue, replaceValue) {
          return inputString.split(searchValue).join(replaceValue);
        }

        // Example usage:
      
        
       
let newArr=res.data.scenes.map((scene)=>{ 
  const replacedString = replaceString(scene.urlVideo, "https://app.", "https://video.app.");  
  return { ...scene, urlVideo: replacedString }
})
    
       


        notification.success({ message: res.data.message })
     
        updateAIResponse({ ...res.data, scenes: newArr })
        // updateAIResponse(res.data)
        navigate('/editor')
       
        setspinning(false)
      }else{
        notification.error({ message: res.data.message })
     
      }
   

    })   

  }
  return (
    <>
    <header className="header1">
            <div className="topbar clearfix">
             
                  
                    <div className="row-fluid">
          
                        <div className="col-md-12 col-sm-12 text-left">
                          
                            <p style={{display:'flex', width:'96vw',marginLeft:'10px' , justifyContent:'space-between', color:'gray', fontSize:'small'}}>

                <img
                    src="https://app.googptai.com/img/logo.png"
                    alt="logo"
                    width="200"
                    
                  />
                
                <strong><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:info@googptai.com">info@googptai.com</a></strong> 
                            </p>
                        </div>
                        
                    </div>
            
            </div>

          
        </header>

        <section id="home" className="video-section js-height-full">
        <video  autoPlay={true}  muted={true} loop={true}>
          <source src={'https://video.app.googptai.com/vsl/static/media/preview.d610680eb366baccfbde.mp4'} type="video/mp4" />
          </video>
            <div className="cover">
          <div className="  container">
           <center >
              <h2 style={{ color: 'white' }}>Text to Video</h2>
              <i style={{ color: 'lightgray' }}>
                Create videos in few minutes with our AI enhanced software by providing a perfect description below
              </i>
            </center>
         
          </div>
          <div className="slider-bottom">
            <span>Scroll down <FontAwesomeIcon icon={faAngleDown} /></span>
          </div>
            </div>
           
        </section>

        

        <footer className="section footer noover">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="widget clearfix">
                            <h3 className="widget-title">Describe your video</h3>
                            <div className="newsletter-widget">
                                
                               
                                    <div className="form-1">
                                      

        <Spin spinning={spinning} size="large" tip={spintext}></Spin>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <input
                        className="form-control"
            placeholder="Video Title"
            onChange={(e) => {
              setText(e.target.value);
            }}

            style={{fontWeight:'bold', fontSize:'large'}}
          />
          <textarea
                        className="form-control"
            placeholder="Video Description"
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            style={{minHeight:'200px'}}
          ></textarea>

                      <button className="btn btn-primary" type="submit" onClick={processForm}>
         <FontAwesomeIcon icon={faGears}></FontAwesomeIcon>   Build
          </button>
        </div>
                                        </div>
                            
                                
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>
        </footer>

        <div className="copyrights">
            <div className="container">
                <div className="clearfix">
                    <div className="pull-left">
                        <div className="cop-logo">
                         
                        </div>
                    </div>

                    <div className="pull-right">
                        <div className="footer-links">
                            <ul className="list-inline">
                                </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
   </>
  );
}

export default Form;
