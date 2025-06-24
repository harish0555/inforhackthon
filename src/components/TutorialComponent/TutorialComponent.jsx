import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import challenges from "../../data/challengesData.json";
import "./TutorialComponent.scss";
import { useTimer } from '../../context/TimerContext';

const TutorialComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { time, setTime, setTimeRunning, timerFunction } = useTimer();
    const [cancelModal, setCancelModal] = useState(false)
    const modalRef = useRef(null);

    const challenge = challenges.find((data) => data.id === parseInt(id));

    const showCancelModal = () => {
        setCancelModal(true);
        window.parent.postMessage({ type: 'scrollToTop' }, '*');

        // setTimeout(() => {
        //     window.scrollTo({ top:0 ,behavior: 'smooth' })
        // //     if (modalRef.current) {
        // //         modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // //         console.log(modalRef,"reffff")
        // //     }
        // }, 100);
        // console.log(cancelModal, "cancelModallll")
    }

    const handleCancelModal = () => {
        setCancelModal(false);
        setTime(0);
        navigate(`/challenge/${id}`);
    }
    const continueChallenge = () => {
        setCancelModal(false);
    }

    const continueValidation = () => {
        navigate(`/challenge/${id}/validation`)
    }

    //  const timerFunction = (sec)=>{
    //     const mins = Math.floor(sec/60);
    //     const secs = sec % 60;
    //     return `${mins}:${secs.toString().padStart(2, '0')}`;
    // }


    return (

        <div className="tutorial-container">
            <div className="tutorial-header">
                <div className="tutorial-title">{challenge.badge}: {challenge.title}</div>
                <div className="timer-display" id="timer">{timerFunction(time)}</div>
            </div>

            <div className="tutorial-content">
                <div className="step-section">
                    {challenge.tutorialSteps.map((data, index) => {
                        const ListTag = (data.type) == "bullet" ? 'ul' : 'ol';
                        const subListTag = data.subListType == "bullet" ? 'ul' : 'ol'
                        return (
                            <div key={index}>
                                <div className="step-header">
                                    <div className="step-number">{index + 1}</div>
                                    <div>
                                        <h3 className="headline-02">{data.stepHeader}</h3>
                                        <p className="body-text">{data.stepDescription}</p>
                                    </div>
                                </div>

                                <div className="step-actions" style={{ borderLeft: `4px solid ${challenge.color}` }}>
                                    <h4>{data.stepActionHeader}:</h4>
                                    <ListTag>
                                        {data.stepActions.map((steps, index) => (
                                            <>
                                                <li className={`${challenge.colorName} ${data.type == 'bullet' ? "bullet-list" : "numeric-list"} `} key={index} dangerouslySetInnerHTML={{ __html: steps.step }}></li>
                                                {steps.list.map((item, index) => (
                                                    <subListTag>
                                                        <li className={`sub-list ${challenge.colorName} ${data.subListType == 'bullet' ? "bullet-list" : "numeric-list"} `} key={index} dangerouslySetInnerHTML={{ __html: item.li }}></li>
                                                    </subListTag>
                                                ))}
                                            </>
                                        ))
                                        }
                                    </ListTag>
                                </div>

                                <div className="screenshot-placeholder">
                                    {data.stepScreenshots.map((item, index) => (
                                        <div key={index}>
                                            <div className="screenshot-icon">{item.icon}</div>
                                            <div className="screenshot-label">{item.screenshotLabel}</div>
                                            <div className="body-text" style={{ textAlign: "center", fontSize: "0.875rem" }}>{item.image}</div>
                                        </div>
                                    ))

                                    }

                                </div>
                            </div>
                        )
                    })
                    }

                </div>


                <div className="pro-tip">
                    <div className="pro-tip-title">💡 Pro Tips for Success</div>
                    {challenge.protipSuccess.map((item, index) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: item.tip }}></p>
                    ))}
                </div>

                <div className="tutorial-actions">
                    <button className="secondary-btn" onClick={showCancelModal}>Cancel Challenge</button>
                    <button className="primary-btn" onClick={continueValidation}>Continue to Validation</button>
                </div>
            </div>

            {/* <!-- Cancel Confirmation Modal --> */}
            {cancelModal && (
                <div className="modal" id="cancel-modal">
                    <div className="cancel-modal-content">
                        <div className="modal-icon warning-icon">⚠️</div>
                        <h2 className="modal-title" style={{ color: " #856404" }}>Cancel Challenge?</h2>
                        <p className="modal-message" style={{ color: " #856404" }}>
                            Are you sure you want to cancel this challenge? Your progress will be lost and you'll need to start over.
                        </p>
                        <div className="modal-actions">
                            <button className="secondary-btn" onClick={continueChallenge}>Continue Challenge</button>
                            <button className="primary-btn" onClick={handleCancelModal}>Yes, Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default TutorialComponent