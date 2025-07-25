import React, { useState } from "react";
import "./join.css";

const Join = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    companySize: "",
    industry: "",
    eventTypes: "",
    eventFrequency: "",
    budget: "",
    currentChallenges: "",
    additionalInfo: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare form data for submission
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append('timestamp', new Date().toLocaleString());

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxajrU3Q5IdsaHVvJh1MYUCr-5RJ2MbXBt-cJkZs5XePHs3S5_bU41_eJ279f5gY5Wlkw/exec', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('✅ Thank you! Your submission has been saved to our records.');
        // Reset form after successful submission
        setFormData({
          companyName: "",
          email: "",
          companySize: "",
          industry: "",
          eventTypes: "",
          eventFrequency: "",
          budget: "",
          currentChallenges: "",
          additionalInfo: ""
        });
      } else {
        alert('❌ Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ Error submitting form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="join-form">
      <h2>Join Plannix Early Access</h2>
      <p>Be among the first to experience stress-free event planning with AI. Help us tailor Plannix to your needs.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Your company name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@company.com"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Company Size *</label>
            <select name="companySize" value={formData.companySize} onChange={handleChange} required>
              <option value="">Select company size</option>
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="51-200 employees">51-200 employees</option>
              <option value="201-1000 employees">201-1000 employees</option>
              <option value="1000+ employees">1000+ employees</option>
            </select>
          </div>

          <div className="form-group">
            <label>Industry *</label>
            <select name="industry" value={formData.industry} onChange={handleChange} required>
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Consulting">Consulting</option>
              <option value="Non-profit">Non-profit</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Types of Events You Plan *</label>
            <select name="eventTypes" value={formData.eventTypes} onChange={handleChange} required>
              <option value="">Select primary event type</option>
              <option value="Corporate Meetings">Corporate Meetings</option>
              <option value="Conferences & Seminars">Conferences & Seminars</option>
              <option value="Team Building Events">Team Building Events</option>
              <option value="Product Launches">Product Launches</option>
              <option value="Holiday Parties">Holiday Parties</option>
              <option value="Training Sessions">Training Sessions</option>
              <option value="Client Events">Client Events</option>
              <option value="Mixed Events">Mixed Events</option>
            </select>
          </div>

          <div className="form-group">
            <label>Event Planning Frequency *</label>
            <select name="eventFrequency" value={formData.eventFrequency} onChange={handleChange} required>
              <option value="">How often do you plan events?</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
              <option value="As needed">As needed</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Typical Event Budget Range *</label>
            <select name="budget" value={formData.budget} onChange={handleChange} required>
              <option value="">Select budget range</option>
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000 - $5,000">$1,000 - $5,000</option>
              <option value="$5,000 - $15,000">$5,000 - $15,000</option>
              <option value="$15,000 - $50,000">$15,000 - $50,000</option>
              <option value="$50,000+">$50,000+</option>
            </select>
          </div>

          <div className="form-group">
            <label>Current Event Planning Challenges</label>
            <select name="currentChallenges" value={formData.currentChallenges} onChange={handleChange}>
              <option value="">Select your biggest challenge</option>
              <option value="Finding suitable venues">Finding suitable venues</option>
              <option value="Managing vendors">Managing vendors</option>
              <option value="Budget tracking">Budget tracking</option>
              <option value="Guest coordination">Guest coordination</option>
              <option value="Timeline management">Timeline management</option>
              <option value="Handling last-minute changes">Handling last-minute changes</option>
              <option value="Coordinating multiple events">Coordinating multiple events</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Additional Information</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Tell us more about your event planning needs, specific requirements, or any questions you have about Plannix..."
            rows="4"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving the response...' : 'GET EARLY ACCESS'}
        </button>
      </form>
    </section>
  );
};

export default Join;