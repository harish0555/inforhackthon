import React from 'react';
import cardList from '../../data/challengesData.json';
import './LandingPageComponent.scss';
import '../../utilities/variables.scss';
import { useNavigate } from 'react-router-dom';

const LandingPageComponent = () => {
     const navigate = useNavigate();
    const borderColors = ['#ED0C0C', '#460DAF', '#FFAC00', '#00BD58']

    const handlecard =(id) =>{
        navigate(`/challenge/${id}`);
    }

    return (
        <div className="landing-container">
            {/* Pill-shaped header card */}
            <div className="hero-section">
                <div className="eyebrow">INFOR OS PLATFORM</div>
                <h1 className="headline-01">Technical Challenges</h1>
                <p className="hero-subtitle body-text">Master the platform through hands-on technical challenges and earn badges that validate your expertise</p>

                <div className="hero-banner">
                    <div className="body-text sm-text" >
                        🎯 Complete challenges to earn badges and level up your skills across  {cardList.map((item) => item.badge).join(", ")}
                    </div>
                </div>
            </div>
            {/* Task cards */}
            <div className="challenge-grid">
                {cardList.map((card, index) => {

                    const color = borderColors[index % borderColors.length];
                    return (
                        <div className="challenge-card" style={{ borderLeftColor: color }} key={card.id} onClick={() => handlecard(card.id) }>
                            <div className="challenge-header">
                                <span className="component-badge " style={{ backgroundColor: color }}>{card.badge}</span>
                                <span className="difficulty-level">{card.level}</span>
                            </div>
                            <h3 className="headline-02">{card.title}</h3>
                            <p className="body-text">
                                {card.cardDescription}
                            </p>
                            <div className="challenge-stats">
                                <span className="body-text">⏱️ {card.duration}</span>
                                <div className="completion-rate">
                                    <span className="body-text">{card.progress}% completed</span>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${card.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    );
}

export default LandingPageComponent