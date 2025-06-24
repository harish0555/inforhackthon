import React, { useState } from 'react';
import "./ValidationComponent.scss";
import { useTimer } from '../../context/TimerContext';
import { useNavigate, useParams } from 'react-router-dom';
import challenges from "../../data/challengesData.json";

const ValidationComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState(false);
  const { time, setTime, setTimeRunning, timerFunction } = useTimer();
  const challenge = challenges.find((data) => data.id === parseInt(id));

  // const timerFunction = (sec) => {
  //   const mins = Math.floor(sec / 60);
  //   const secs = sec % 60;
  //   return `${mins}:${secs.toString().padStart(2, '0')}`;
  // }

  const handleFileSelect = (e) => {

  }
  const validateSolution = () => {
    setIsValidated(true)
  }
  const backToTutorial = () =>{
    setTimeRunning(false);
    setTime(0);
    navigate(`/challenge/${id}`);
  }

  return (
    <div className="validation-container">
      <div className="validation-header">
        <h2 className="headline-02 submit-header" >Submit Your Solution</h2>
        <p className="body-text" style={{ color: "rgba(255,255,255,0.9)", marginBottom: "1rem" }}>Complete the validation to earn your badge</p>
        <div className="timer-display" id="validation-timer">{timerFunction(time)}</div>
      </div>

      <div className="validation-section">
        <h3 className="headline-02">Challenge Validation</h3>
        <div className="validation-tabs">
          {challenge.challengeValidationMethods.map((item, index) => (
            <button className='validation-tab active' key={index} >{item.validationMethod}</button>
          ))}
        </div>
        {challenge.challengeValidationMethods.map((item, index) => (
          <div key={index}>

            {/* <!-- Code Validation Method --> */}

            {item.type == "code" && (
              <div className="validation-method active" id="code-validation">
                <p className="body-text" style={{ marginBottom: "1.5rem" }} >{item.description}</p>
                <div className="validation-info">
                  <h4 className="subhead validation-info-header" >{item.header}</h4>
                  <p className="body-text validation-info-text" >{item.text}</p>
                </div>
                <label className="subhead" style={{ display: "block", marginBottom: "0.75rem" }}>{item.label}</label>
                <input type="text" className="validation-input" placeholder="Enter your completion code (e.g., INF-X7Y9)" id="completion-code" />
              </div>
            )}

            {/* <!-- File Upload Validation Method --> */}
            {item.type === "file" && (
              <div className="validation-method" id="file-validation">
                <p className="body-text" style={{ marginBottom: "1.5rem" }}>{item.description}</p>

                <div className="validation-info">
                  <h4 className="subhead validation-info-header">{item.header}</h4>
                  <p className="body-text validation-info-text">{item.text}</p>
                </div>

                <label className="subhead" style={{ display: "block", marginBottom: "0.75rem" }} >{item.label}</label>
                <div className="file-upload-area" id="file-drop-zone">
                  <div className="file-upload-content">
                    <div className="file-upload-icon">📁</div>
                    <div className="file-upload-text">
                      <p className="subhead file-upload-subhead" >Click to select or drag your .nupkg file here</p>
                      <p className="body-text file-upload-bodytxt">Maximum file size: 10MB</p>
                    </div>
                  </div>
                  <input type="file" id="file-input" accept=".nupkg,.xaml" style={{ display: "none" }} onChange={() => handleFileSelect(e)} />
                </div>
                <div id="file-selected" className="file-selected" style={{ display: "none" }}>
                  <div className="file-info">
                    <span className="file-icon">📄</span>
                    <div className="file-details">
                      <div className="file-name"></div>
                      <div className="file-size"></div>
                    </div>
                    <button className="file-remove" >×</button>
                  </div>
                </div>
              </div>
            )}



            {/* <!-- API Response Validation Method --> */}
            {item.type === "api" && (
            <div className="validation-method" id="api-validation">
              <p className="body-text" style={{ marginBottom: "1.5rem" }}>{item.description}</p>

              <div className="validation-info">
                <h4 className="subhead validation-info-header">{item.header}</h4>
                <p className="body-text validation-info-text" style={{ marginBottom: "1rem" }}>{item.text}</p>
                <div className="api-details">
                  {item.apiDetails.map((steps, index) => (
                    <div key={index} dangerouslySetInnerHTML={{ __html: steps.step }}></div>
                  ))}

                </div>
              </div>

              <label className="subhead" style={{ display: "block", marginBottom: "0.75rem" }}>{item.label}</label>
              <input type="text" className="validation-input" placeholder="Enter the validation token from API response" id="api-token" />

              <div className="api-help">
                <h4 className="subhead validation-info-header">📋 Expected Response</h4>
                <div className="code-block">
                  <pre>{`{
                            "status": "success",
                            "validationToken": "VLD-ABC123XYZ",
                            "message": "Challenge completed successfully"
                         }`}</pre>
                </div>
                <p className="body-text api-help-bodyText">
                  Copy the <code>validationToken</code> value from the response and paste it in the field above.
                </p>
              </div>
            </div>
            )}
          </div>

        ))}


        <button className="validate-btn" onClick={validateSolution}>Validate Solution</button>

        <div className="pro-tip">
          <h4 className="pro-tip-title">💡 Troubleshooting</h4>
          <div className="body-text" style={{ color: "#856404" }}>
            {challenge.troubleshootsteps.map((item, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: item.step }}></p>
            ))}
          </div>
        </div>
      </div>

      {isValidated && (
        //  <!-- Failure Modal -->
        <div className="modal" id="failure-modal">
          <div className='modal-content'>
              <div className="modal-content-1">
                <button className="modal-close" onClick={()=>setIsValidated(false)}>&times;</button>
                <div className="modal-icon failure-icon">🤔</div>
                <h2 className="modal-title">Almost There!</h2>
                <p className="modal-message">
                  Great effort on tackling the challenge! The submission didn't match our expected result, but challenges are meant to test your skills and adaptability.
                </p>

                <div className='modal-points'>
                  <h4 className='modal-points-header'>🔍 Common Issues</h4>
                  <div style={{color:"#856404", fontSize:"0.9rem"}}>
                    <p style={{marginBottom:"0.5rem"}}>• Verify all form fields were filled correctly</p>
                    <p style={{marginBottom:"0.5rem"}}>• Check that the bot processed all 5 test records</p>
                    <p style={{marginBottom:"0.5rem"}}>• Ensure the success message appeared before copying the code</p>
                    <p>• Double-check the code format (INF-XXXX)</p>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="secondary-btn" onClick={backToTutorial}>View Instructions</button>
                  <button className="primary-btn" onClick={()=> setIsValidated(false)}>Try Again</button>
                </div>

                <p className="body-text" style={{fontSize:"0.875rem", marginTop:"1.5rem",opacity:"0.8"}}>
                  💪 Remember: Each attempt helps you learn. You've got this!
                </p>
              </div>
          </div>
        </div>
      )

      }

    </div>
  )
}

export default ValidationComponent