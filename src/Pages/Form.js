import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSlidesStore from "../store/useSlidesStore";
import "./form.css";
import axios from 'axios';
import {Spin, notification} from 'antd';

function Form() {
  let navigate = useNavigate();
  const [text, setText]=useState('')
  const [color, setcolor] = useState('black')
  const [spinning, setspinning] = useState(false)
  const [spintext, setspintext] = useState("Please Wait")
  const [description, setdescription] = useState("")
  const [logRe, setlogRe] = useState(false)

  const updateAIResponse = useSlidesStore((state) => state.updateAIResponse);
  const processForm = () => {
setspinning(true)
    axios.post('https://app.googptai.com/api/vsl', {description:'some text', title:'Title Text'}).then((res)=>{
      setspintext("Please wait while we gather resources")
      console.log(res.data)
      if(!res.data.error){
// let newArr=res.data.scenes.map((scene)=>{
//   return { ...scene, urlVideo:'http://localhost:3000/static/media/eating-healthy.ab23f3c14fd222ad2c36.mp4'}
// })


        notification.success({ message: res.data.message })
        // updateAIResponse({ ...res.data, scenes: newArr })
        updateAIResponse(res.data)
        navigate('/editor')
       
        setspinning(false)
      }else{
        notification.error({ message: res.data.message })
     
      }
   

    })   


    // updateAIResponse({
    //     text,
    //   status: true,
    //   urlVideo:
    //     "https://player.vimeo.com/external/189545487.sd.mp4?s=8cd2af1ec08f7ce121a5a6a09c78c05237943524&profile_id=164&oauth2_token_id=57447761",
    //   urlAudio:
    //     "https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3",
    // });
    // navigate("/editor");
  };
  return (
    <div
      className="card-container"
      style={{
        height: "100vh",
      }}
    >
   
      <div className="form-group">
{ logRe &&       <a href="https://app.googptai.com/login" className="button" >
          Login First
        </a>}
        <Spin spinning={spinning} size="large" tip={spintext} >
      
        </Spin>
        <div
   
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <input placeholder="Video Title" onChange={(e)=>{
            setText(e.target.value)
          }} />
          <textarea placeholder="Video Description" onChange={(e)=>{
            setdescription(e.target.value)
          }}></textarea>
               
          <button className="button" type="submit" onClick={processForm}>
            Build
          </button>
       
        </div>
      </div>
    </div>
  );
}

export default Form;
