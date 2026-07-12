import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [userAge, setUserAge] = useState(null);

    useEffect(() => {
        const age = localStorage.getItem("userAge");
        if (age) {
            setUserAge(parseInt(age));
            // Backend API ကို ခေါ်မယ်
            axios.get(`http://localhost:4000/api/questions?age=${age}`)
                .then(res => {
                    setQuestions(res.data);
                })
                .catch(err => {
                    console.error("Error fetching questions:", err);
                });
        }
    }, []);

    const renderQuestions = () => {
        if (!userAge) return <p>ကျေးဇူးပြု၍ အရင် Login (သို့) Register လုပ်ပေးပါ။</p>;
        
        return (
            <div>
                <h2>Test စတင်ပါပြီ</h2>
                {questions.map((q, index) => (
                    <div key={q._id || index} style={{ margin: '20px 0' }}>
                        <p>{index + 1}. {q.question}</p>
                        {q.options.map((opt) => (
                            <button key={opt} style={{ margin: '5px' }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {!isStarted ? (
                <button onClick={() => setIsStarted(true)}>Start Test</button>
            ) : (
                renderQuestions()
            )}
        </div>
    );
};

export default Question;