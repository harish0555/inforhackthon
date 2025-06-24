import React from 'react'
import "./ChallengeDetailsComponent.scss";
import { useNavigate, useParams } from 'react-router-dom';
import challenges from '../../data/challengesData.json';
import { useTimer } from '../../context/TimerContext';

const ChallengeDetailsComponent = () => {
  const navigate = useNavigate();
  const {id}= useParams();
  const {time, setTime, setTimeRunning}= useTimer();

   const challenge = challenges.find((data) => data.id === parseInt(id));


    const handleStartChallenge = () => {
        setTimeRunning(true);
         setTime(0);
        navigate(`/challenge/${id}/tutorial`)
    } 

  return (
      <div className="detail-container">
          <div className="detail-header">
              <button className="back-btn" onClick={()=> navigate('/')}>← Back to Challenges</button>
              <button className="start-btn" onClick={handleStartChallenge}>Start Challenge</button>
          </div>

          <div className="detail-content">
              <div className="main-content">
                  <div className="eyebrow">{challenge.badge} CHALLENGE</div>
                  <h1 className="headline-01">{challenge.title}</h1>
                  
                  <div className="badge-row">
                      <span className="component-badge" style={{backgroundColor:challenge.color}}>{challenge.badge} </span>
                      <span className="difficulty-level">{challenge.level}</span>
                      <span className="time-badge">⏱️ {challenge.duration}</span>
                  </div>
                  {challenge.subHeader.map((item, index) => (
                    <div key={index}>
                          <h3 className="headline-02">{item.subTitle}</h3>
                          <p className="body-text" style={{marginBottom:"1.5rem"}}>{item.description}</p>
                    </div>
                ))}
                  
              </div>
              
              <div className="sidebar">
                  <h3 className="subhead">Requirements</h3>
                  <ul className="requirements-list">
                    {challenge.requirements.map((item, index) => (
                            <li key={index}>✅ {item.requirement}</li>

                    ))}
                  </ul>
                  
                  <div className="completion-stats">
                      <h4 className="subhead">Challenge Progress</h4>
                      <div className="completion-number">{challenge.progress}%</div>
                      <div className="body-text" style={{fontSize:'0.875rem'}}>Community completion rate</div>
                  </div>
                  
                  <div className="pro-tip">
                      <h4 className="pro-tip-title">💡 Pro Tip</h4>
                      <p>{challenge.proTip}</p>
                  </div>
              </div>
          </div>
      </div>
  
  )
}

export default ChallengeDetailsComponent