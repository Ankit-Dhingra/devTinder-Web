import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <p className="mb-4">
        We're here to help! If you have any questions, concerns, or need assistance, feel free to reach out to us.
      </p>

      <h2 className="text-lg font-semibold mb-2">1. Email Support</h2>
      <p className="mb-4">
        You can email us at <strong>aankit.ddhingra@gmail.com</strong> and we’ll respond within 24-48 business hours.
      </p>

      <h2 className="text-lg font-semibold mb-2">2. Business Hours</h2>
      <p className="mb-4">
        Our support team is available:
        <ul className="list-disc list-inside mt-1">
          <li>Monday to Friday: 10:00 AM – 6:00 PM IST</li>
          <li>Closed on weekends and public holidays</li>
        </ul>
      </p>

      <h2 className="text-lg font-semibold mb-2">3. Social Media</h2>
      <p className="mb-4">
        You can also connect with us on our social media handles linked in the footer.
      </p>

      <h2 className="text-lg font-semibold mb-2">4. Feedback</h2>
      <p>
        We welcome your feedback to improve our services. Let us know how we can serve you better.
      </p>
    </div>
  );
};

export default ContactUs;
