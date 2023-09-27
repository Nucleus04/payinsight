// FeedbackList.js

import React, { useEffect, useState } from 'react';// Import your CSS file
import FeedbackWatcher from '../../api/classes/client/Feedback/FeedbackWatcher';

function FeedbackList() {
    const [feedbacks, setFeedBack] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await FeedbackWatcher.retrieveFeedbacks();
                setFeedBack(result);
            } catch (error) {
                // Handle errors here
                console.error(error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="feedback-list-container">
            <h1>All Feedback Entries</h1>
            <div className="feedback-entries">
                {
                    feedbacks.map((element) => {
                        return (
                            <div className="feedback-entry" key={element._id}>
                                {/* <h2>Feedback #Number</h2> */}
                                <p><strong>Date:</strong>{new Date(element.created_at).toDateString()}</p>
                                <p><strong>Rating:</strong>{element.rating}</p>
                                <p><strong>Favorite Feature:</strong>{element.favoriteFeature}</p>
                                <p><strong>Improvement Suggestions:</strong>{element.improvements}</p>
                                {/* <p><strong>Feedback:</strong> askn flkah sfk</p> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default FeedbackList;
