// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGears, faImages } from '@fortawesome/free-solid-svg-icons';
// import { Routes, Route } from "react-router-dom";

// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// function Studio() {
//     const [videoFile, setVideoFile] = useState()
//     const [soundFile, setsoundFile] = useState()
//     const [imageFile, setimageFile] = useState()
//     const [vidSrc, setvidSrc] = useState()
//     const ffmpeg = createFFmpeg({ log: true })


//     const handleVideo = (e) => {
//         setVideoFile(e.target.files[0])
//         console.log(videoFile)
//         setvidSrc(URL.createObjectURL(videoFile))
//     }




//     return (
//         <>    <div className='studio'>
//             <div className='row'>
//                 <div className='col-sm-8'>
//                     <div className='card bg-dark'>
//                         <div className='card-header'>

//                         </div>
//                         <div className='card-body'>
//                             <video src={vidSrc} controls style={{ width: '100%' }}>

//                             </video>
//                         </div>
//                         <div className='card-footer'>
//                             <button className='btn btn-secondary'>
//                                 <FontAwesomeIcon icon={faGears}></FontAwesomeIcon>
//                                 Build
//                             </button>
//                         </div>
//                     </div>

//                 </div>

//                 <div className='col-sm-4'>


//                     <div className='card bg-dark'>
//                         <div className='card-header'>
//                             Media Pane
//                         </div>
//                         <div className='card-body'>

//                         </div>
//                         <div className='card-footer'>

//                             <button className='btn '>

//                                 <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
//                                 <input className='btn btn-primary form-control ' accept='image/*' type='file' />
//                                 Add Image File</button>

//                             <button className='btn '>

//                                 <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
//                                 <input className='btn btn-primary form-control' type='file' onChange={(e) => {

//                                     setvidSrc(URL.createObjectURL(e.target.files[0]))
//                                 }} />
//                                 Add Video File</button>

//                             <button className='btn '>

//                                 <FontAwesomeIcon icon={faImages}></FontAwesomeIcon>
//                                 <input className='btn btn-primary form-control' type='file' />
//                                 Add Sound File</button>

//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div></>

//     )
// }


// export default Studio