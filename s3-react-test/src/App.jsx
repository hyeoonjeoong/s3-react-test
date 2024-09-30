import {useEffect, useState} from 'react'
import './App.css'
import useS3 from "./hooks/useS3.js";

function App() {
    const [imageList, setImageList] = useState([])
    const { s3, getImages, uploadImage, removeImage } = useS3('jeong-test')

    const fetchImages = () => {
        getImages((data) => setImageList(data))
    }

    const handleFileChange = (e)=>{
        uploadImage(e.target.files[0], fetchImages)
        e.target.value = ''
    }

    const deleteImage = (id) => {
        removeImage(id, fetchImages)
    }

    useEffect(() => {
        if(s3 !== null)
        getImages(fetchImages)
    }, [s3]);

  return (
      <>
          <div className="card">
              <input type="file" multiple accept="image/*" onChange={handleFileChange}/>
              {/*<button onClick={uploadImage}>aws 업로드하기</button>*/}
          </div>
          <div>
              <h3>🖼️</h3>
              {imageList.map((item, k) => {
                  return (
                      <div key={k}>
                          <img style={{width:'150px'}} src={`https://jeong-test.s3.ap-southeast-2.amazonaws.com/${item.Key}`} alt={item.Key}/>
                          <div key={item.Key}>파일명 {item.Key}</div>
                          <button onClick={()=>deleteImage(item.Key)}>지우기</button>
                      </div>
                  )
              })}

          </div>
      </>
  )
}

export default App
