import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
    const [submissionError, setSubmissionError] = useState(null); // To store any submission errors
    const [isSubmitted, setIsSubmitted] = useState(false); // To show success message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionError(null); // Clear any previous errors

        try {
            // Replace '/api/contact' with your actual backend endpoint
            const response = await fetch('/api/email/send-emails.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                let errorMessage = `Failed to send message. Server responded with ${response.status}.`;
                try {
                    // Attempt to get a more specific error message from the backend response
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (jsonError) {
                    // If the error response is not JSON or can't be parsed
                    console.warn("Could not parse error response as JSON:", jsonError);
                }
                throw new Error(errorMessage);
            }

            // If your backend sends a meaningful response, you can process it here:
            // const result = await response.json();
            // console.log('Submission successful:', result);

            setIsSubmitted(true); // Show the "Thank You" message
            setFormData({ name: '', email: '', message: '' }); // Reset form fields
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionError(error.message || "An unexpected error occurred. Please try again.");
            setIsSubmitted(false); // Ensure success message is not shown on error
        } finally {
            setIsSubmitting(false); // Re-enable the form/button
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center p-8">
                <h3 className="text-2xl font-semibold text-columbia-blue mb-4">Thank You!</h3>
                <p>Your message has been sent successfully. I&apos;ll get back to you soon.</p>
                {/* Optional: Add a button to allow submitting another message */}
                {/*
                <button
                    onClick={() => setIsSubmitted(false)} // This would re-render the form
                    className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Send Another Message
                </button>
                */}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-8 shadow-lg rounded-lg border-2 border-columbia-blue">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-columbia-blue focus:border-columbia-blue sm:text-sm" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-columbia-blue focus:border-columbia-blue sm:text-sm" />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea name="message" id="message" rows="4" required value={formData.message} onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-columbia-blue focus:border-columbia-blue sm:text-sm"
                ></textarea>
            </div>
            {submissionError && (
                <div className="p-3 my-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                    <p>{submissionError}</p>
                </div>
            )}
            <div>
                <button type="submit" disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-columbia-blue hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-columbia-blue disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;