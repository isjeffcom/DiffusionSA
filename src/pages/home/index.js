import React, { useState } from 'react';
import './index.css';
import Header from '../../sections/header';
import { req_txt2img } from '../../request';

export default function Home() {
  const [promptText, setPromptText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendAIRequest = async () => {
    setIsLoading(true);
    const generateResult = await req_txt2img(promptText);
    const resultImg = generateResult.images[0];
    setIsLoading(false);
    setResult(resultImg)
  }

  const receivePromptText = (e) => {
    // console.log(e.target.value)
    setPromptText(e.target.value);
  }

  const renderResultImg = () => {
    if(result === '' || result.length < 1) return null;
    return (
      <img src={`data:image/png;base64, ${result}`} alt="ai generated image" />
    )
  }

  const renderInput = () => {
    return(
      <div className="ai-input">
        <div className='ai-input-cont'>
          {isLoading ? (
            <div className='ai-input-loading'>
              <div className='ai-input-loading-icon'>
                <img src="./assets/icons/loading.svg" alt="loading" />
              </div>
            </div>
          ) : null}

          <div className='ai-input-textarea'>
            <div className='ai-input-textarea-input'>
              <textarea cols="30" rows="28" onChange={receivePromptText}></textarea>
            </div>
          </div>
  
          <div className='ai-input-res'>
            {result.length < 1 ? (
              <div className='ai-input-res-placeholder'></div>
            ) : (
              <div className='ai-input-res-image'>
                {renderResultImg()}
              </div>
            )}
          </div>
        </div>
        <div className='ai-input-textarea-act'>
          <div className='ai-input-textarea-act-button'>
            {isLoading ? null : (<button onClick={() => sendAIRequest()}>START</button>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="App-Home">
      <Header/>
      {renderInput()}
    </div>
  );
}

