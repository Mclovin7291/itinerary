import React, { useState } from 'react'
import './Styles/Survey.css'
import './Components/Button.css'
import {useNavigate} from 'react-router-dom'

const timeOptions = [
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
    '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM'
];

// Add custom hooks for form handling
const useFormValidation = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch(name) {
      case 'zip':
        return /^\d{5}(-\d{4})?$/.test(value) ? '' : 'Invalid ZIP code';
      case 'state':
        return /^[A-Z]{2}$/.test(value.toUpperCase()) ? '' : 'Use 2-letter state code';
      // Add more validations
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  return { values, errors, handleChange };
};

// Add state codes array
const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    // ... add all states
];

export default function Survey() {
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        zip: '',
        radius: '8047',  // Default to 5 miles
        priceRange: '',
        startTime: '09:00',
        endTime: '22:00',
        cuisine: '',
        transportation: 'driving',
        activityPreference: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const encodedData = {
            ...formData,
            address: encodeURIComponent(formData.address.trim()),
            city: encodeURIComponent(formData.city.trim()),
            state: formData.state.trim().toUpperCase(),
            zip: formData.zip.trim()
        };
        console.log('Submitting form with data:', encodedData);
        navigate('/itinerary', { state: encodedData });
    };

    return (
        <div className="survey-container">
            <h2 className="survey-title">Plan Your Perfect Day!</h2>
            <form onSubmit={handleSubmit} className="survey-form">
                {/* Location Section */}
                <div className="form-section">
                    <h3>Where are you starting from?</h3>
                    <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                    />
                    <div className="form-row">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="form-select"
                        >
                            <option value="">State</option>
                            <option value="GA">Georgia</option>
                            <option value="FL">Florida</option>
                            <option value="NC">North Carolina</option>
                            {/* Add more states as needed */}
                        </select>
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>
                </div>

                {/* Preferences Section */}
                <div className="form-section">
                    <h3>What are your preferences?</h3>
                    <div className="form-row">
                        <select
                            name="priceRange"
                            value={formData.priceRange}
                            onChange={handleInputChange}
                            required
                            className="form-select"
                        >
                            <option value="">Price Range</option>
                            <option value="1">$ (Under $15)</option>
                            <option value="2">$$ ($15-$30)</option>
                            <option value="3">$$$ ($31-$60)</option>
                            <option value="4">$$$$ (Above $60)</option>
                        </select>

                        <select
                            name="radius"
                            value={formData.radius}
                            onChange={handleInputChange}
                            required
                            className="form-select"
                        >
                            <option value="1609">Within 1 mile</option>
                            <option value="8047">Within 5 miles</option>
                            <option value="16093">Within 10 miles</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <select
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Preferred Cuisine</option>
                            <option value="american">American</option>
                            <option value="italian">Italian</option>
                            <option value="chinese">Chinese</option>
                            <option value="mexican">Mexican</option>
                            <option value="japanese">Japanese</option>
                            <option value="indian">Indian</option>
                            <option value="thai">Thai</option>
                        </select>

                        <select
                            name="activityPreference"
                            value={formData.activityPreference}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Preferred Activity</option>
                            <option value="shopping">Shopping</option>
                            <option value="outdoor">Outdoor Activities</option>
                            <option value="museums">Museums</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="sports">Sports</option>
                            <option value="spa">Spa & Wellness</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <select
                            name="transportation"
                            value={formData.transportation}
                            onChange={handleInputChange}
                            required
                            className="form-select"
                        >
                            <option value="driving">Driving</option>
                            <option value="walking">Walking</option>
                            <option value="bicycling">Bicycling</option>
                            <option value="transit">Public Transit</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="time-input">
                            <label>Start Time:</label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="time-input">
                            <label>End Time:</label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                required
                                className="form-input"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="submit-button">
                    Generate Itinerary
                </button>
            </form>
        </div>
    );
}