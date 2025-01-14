import React, { useEffect, useState } from 'react'
import './Styles/Itinerary.css'
import { useLocation } from 'react-router-dom'
import config from '../config'

export default function Itinerary() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const location = useLocation()
    const formData = location.state

    const generateTimeSlots = (startTime, endTime) => {
        const slots = [];
        const start = new Date(`2024/01/01 ${startTime}`);
        const end = new Date(`2024/01/01 ${endTime}`);
        
        let current = new Date(start);
        while (current <= end) {
            slots.push(current.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }));
            current.setMinutes(current.getMinutes() + 30);
        }
        return slots;
    };

    const timeSlots = formData ? generateTimeSlots(formData.startTime, formData.endTime) : [];

    useEffect(() => {
        const fetchItinerary = async () => {
            if (!formData) return;
            
            try {
                console.log('Fetching with data:', formData);
                const url = `${config.apiUrl}/parameters/${formData.address}/${formData.city}/${formData.state}/${formData.zip}/${formData.radius}/${formData.priceRange}`;
                console.log('Fetching from URL:', url);
                
                const response = await fetch(url);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Server responded with ${response.status}: ${errorText}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItinerary();
    }, [formData]);

    if (loading) return <div className="loading">Loading your itinerary...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!formData) return <div className="error">No survey data found. Please complete the survey first.</div>;

    const TimeSlot = React.memo(({ time, event }) => (
        <div className="time-slot">
            <div className="time">{time}</div>
            <div className="event">{event || 'Free Time'}</div>
        </div>
    ));

    return (
        <div className="itinerary-container">
            <h1 className="itinerary-header">Your Daily Itinerary</h1>
            <div className="timeline">
                {timeSlots.map(time => (
                    <TimeSlot key={time} time={time} event={data[time] || 'Free Time'} />
                ))}
            </div>
        </div>
    );
}