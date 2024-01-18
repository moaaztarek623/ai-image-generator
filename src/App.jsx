import { useState } from "react";
import "./App.css";
import { OpenAI } from 'openai'
import { v4 as uuidv4 } from 'uuid';
import FileSaver, { saveAs, FileSaverOptions } from 'file-saver'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [prompt, setPrompt] = useState("image");
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(true);
  const [press, setPress] = useState(false);

  const fetchData = async () => {
    try {
      setPress(true)
      setLoading(true);
      const response = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: "512x512",
        style: 'vivid',
        quality: "hd",
      })
      setLoading(false);
      console.log(response.data);
      setImage(response.data[0].url);
    } catch (e) {
      setLoading(false);
      console.error('Error', e)
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Ai Image Generator</h1>
        <div className="generateContainer" style={{
          display: 'flex',
        }}>
          <input onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your image description" type="text"  />
          <button onClick={() => fetchData()} style={{
            borderRadius: '0px',
          }}>Generate</button>
        </div>
      </div>
      {
        press ? loading ? 
          <div>
            <p>Loading ...</p>
            <p>Please wait until your image ready! </p>
          </div> 
        : 
            <div className="imageCover" style={{marginTop: '1.5rem', border: '2px solid rgba(255, 255, 255)', display: 'flex'}}>
              <img style={{maxWidth: '100%', maxHeight: '100%',}} alt={prompt} src={image}></img>
            </div>

        : null
          
      }
      <footer style={{
        position: 'absolute',
        bottom: '3rem',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        left: '50%'
      }}>
      © {new Date().getFullYear()} Copyright: 
        <a style={{paddingLeft: '0.3rem'}} target="_blank" href='https://www.linkedin.com/in/moaaz-tarek-93304a263/'>
           Moaaz Tarek
        </a>
      </footer>
    </div>
  );
}

export default App;
