// Feedback.js

import React, { useState } from 'react';
import FeedbackWatcher from '../../api/classes/client/Feedback/FeedbackWatcher';
import { useNavigate } from 'react-router-dom';

function Feedback() {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [favoriteFeature, setFavoriteFeature] = useState('');
    const [improvementSuggestions, setImprovementSuggestions] = useState('');
    const [wouldRecommend, setWouldRecommend] = useState(false);
    const navigate = useNavigate();
    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleFavoriteFeatureChange = (e) => {
        setFavoriteFeature(e.target.value);
    };

    const handleImprovementSuggestionsChange = (e) => {
        setImprovementSuggestions(e.target.value);
    };

    const handleWouldRecommendChange = (e) => {
        setWouldRecommend(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement your feedback submission logic here
        console.log('Feedback submitted:', feedback);
        console.log('Rating:', rating);
        console.log('Favorite Feature:', favoriteFeature);
        console.log('Improvement Suggestions:', improvementSuggestions);
        console.log('Would Recommend:', wouldRecommend);
        let data = {
            rating: rating,
            favoriteFeature: favoriteFeature,
            improvements: improvementSuggestions,
            created_at: new Date()
        }

        await FeedbackWatcher.submitFeedback(data);
        navigate("/home");
        // You can send this data to your server or perform any other actions here
    };

    return (
        <div className="feedback-container">
            <h1>Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div className="rating-container">
                    <label htmlFor="rating">Rate your experience:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={rating}
                        onChange={handleRatingChange}
                        required
                    >
                        <option value="0">Select rating</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>
                <div className="favorite-feature-container">
                    <label htmlFor="favoriteFeature">Favorite Feature:</label>
                    <input
                        type="text"
                        id="favoriteFeature"
                        name="favoriteFeature"
                        value={favoriteFeature}
                        onChange={handleFavoriteFeatureChange}
                        placeholder="Your favorite feature"
                        required
                    />
                </div>
                <div className="improvement-suggestions-container">
                    <label htmlFor="improvementSuggestions">Improvement Suggestions:</label>
                    <textarea
                        id="improvementSuggestions"
                        name="improvementSuggestions"
                        placeholder="Enter your improvement suggestions..."
                        value={improvementSuggestions}
                        onChange={handleImprovementSuggestionsChange}
                        required
                    />
                </div>
                {/* <div className="recommend-container">
                    <label htmlFor="wouldRecommend">Would you recommend us?</label>
                    <input
                        type="checkbox"
                        id="wouldRecommend"
                        name="wouldRecommend"
                        checked={wouldRecommend}
                        onChange={handleWouldRecommendChange}
                    />
                </div> */}
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Feedback;
