import React, { useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import ComplaintRouting from "../../components/ComplaintRouting/ComplaintRouting";
import EvidencePacket from "../../components/EvidencePacket/EvidencePacket";
import JurisdictionInfo from "../../components/JurisdictionInfo/JurisdictionInfo";
import { AlertTriangle, Phone, Shield, FileText, MapPin } from "lucide-react";

const IncidentForm = () => {
  const { reportIncident, isReportingIncident } = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    pincode: "",
    severity: "low",
    image: null,
    // Scammer details
    includeScammerDetails: false,
    scammerName: "",
    scammerPhone: "",
    scammerUpiId: "",
    scammerEmail: "",
    scammerWebsite: "",
    scammerType: "",
    scammerDescription: "",
    socialMediaHandles: [],
    evidence: []
  });

  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");
  const [showComplaintRouting, setShowComplaintRouting] = useState(false);
  const [showEvidencePacket, setShowEvidencePacket] = useState(false);
  const [showJurisdictionInfo, setShowJurisdictionInfo] = useState(false);
  const [isFinancialFraud, setIsFinancialFraud] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(true);


  // Check if incident involves financial fraud
  const checkFinancialFraud = () => {
    const financialKeywords = ['upi', 'card', 'wallet', 'payment', 'transaction', 'bank', 'money', 'fund'];
    const description = (formData.description || '').toLowerCase();
    const scammerDetails = formData.scammerDetails || {};
    
    const isFinancial = financialKeywords.some(keyword => 
      description.includes(keyword) || 
      scammerDetails.upiId || 
      scammerDetails.scamType === 'upi-fraud' ||
      scammerDetails.scamType === 'banking'
    );
    
    setIsFinancialFraud(isFinancial);
    return isFinancial;
  };

  // Handle text/select inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    
    // Check for financial fraud when relevant fields change
    if (['description', 'scammerType', 'scammerUpiId'].includes(id)) {
      setTimeout(() => checkFinancialFraud(), 100);
    }
  };

  // Handle image file selection
  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type/size if needed
    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Basic client-side validation
  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = "Title is required";
    if (!formData.description.trim()) errs.description = "Description is required";
    if (!formData.location.trim()) errs.location = "Location is required";
    if (!formData.pincode.trim()) errs.pincode = "Pincode is required";
    if (!formData.image) errs.image = "Please upload an image";
    
    // Scammer details validation
    if (formData.includeScammerDetails) {
      if (!formData.scammerName.trim()) errs.scammerName = "Scammer name is required";
      if (!formData.scammerPhone.trim()) errs.scammerPhone = "Scammer phone number is required";
      if (!formData.scammerType) errs.scammerType = "Scam type is required";
    }
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("location", formData.location);
    payload.append("pincode", formData.pincode);
    payload.append("severity", formData.severity);
    payload.append("image", formData.image);

    // Add scammer details if provided
    if (formData.includeScammerDetails) {
      const scammerDetails = {
        name: formData.scammerName,
        phoneNumber: formData.scammerPhone,
        upiId: formData.scammerUpiId,
        email: formData.scammerEmail,
        website: formData.scammerWebsite,
        scamType: formData.scammerType,
        description: formData.scammerDescription,
        socialMediaHandles: formData.socialMediaHandles,
        evidence: formData.evidence
      };
      payload.append("scammerDetails", JSON.stringify(scammerDetails));
    }

    try {
      await reportIncident(payload);
      // Optionally clear form / give feedback
      setFormData({ 
        title: "", 
        description: "", 
        location: "", 
        pincode: "", 
        severity: "low", 
        image: null,
        includeScammerDetails: false,
        scammerName: "",
        scammerPhone: "",
        scammerUpiId: "",
        scammerEmail: "",
        scammerWebsite: "",
        scammerType: "",
        scammerDescription: "",
        socialMediaHandles: [],
        evidence: []
      });
      setPreviewUrl("");
      setErrors({});
    } catch (err) {
      console.error("Submit failed:", err);
      // Handle/report server errors here
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Report an Incident
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title for the incident"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Provide a detailed description of the incident"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location of the incident"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.location ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Pincode */}
        <div className="mb-4">
          <label htmlFor="pincode" className="block text-gray-700 font-medium mb-2">
            Pincode
          </label>
          <input
            id="pincode"
            type="text"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter your pincode (6 digits)"
            maxLength="6"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.pincode ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
        </div>

        {/* Severity */}
        <div className="mb-4">
          <label htmlFor="severity" className="block text-gray-700 font-medium mb-2">
            Severity
          </label>
          <select
            id="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

               {/* Image Upload */}
               <div className="mb-6">
                 <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                   Upload Image
                 </label>
                 <input
                   id="image"
                   type="file"
                   accept="image/*"
                   onChange={handlePhotoFile}
                   className={`w-full text-gray-700 ${
                     errors.image ? "border-red-500" : ""
                   }`}
                 />
                 {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                 {previewUrl && (
                   <img
                     src={previewUrl}
                     alt="preview"
                     className="mt-2 max-h-48 rounded-md border"
                   />
                 )}
               </div>

               {/* Scammer Details Section */}
               <div className="mb-6 p-4 border border-gray-300 rounded-lg">
                 <div className="flex items-center mb-4">
                   <input
                     type="checkbox"
                     id="includeScammerDetails"
                     checked={formData.includeScammerDetails}
                     onChange={(e) => setFormData(prev => ({ ...prev, includeScammerDetails: e.target.checked }))}
                     className="mr-2"
                   />
                   <label htmlFor="includeScammerDetails" className="text-gray-700 font-medium">
                     Include Scammer Details (Optional)
                   </label>
                 </div>

                {/* Forward to Cyber Cell Checkbox */}
<div className="mb-6 p-4 border border-gray-300 rounded-lg">
  <div className="flex items-center">
    <input
      type="checkbox"
      id="forwardToCyberCell"
      checked={formData.forwardToCyberCell || false}
      onChange={(e) => setFormData(prev => ({ 
        ...prev, 
        forwardToCyberCell: e.target.checked 
      }))}
      className="mr-2"
    />
    <label htmlFor="forwardToCyberCell" className="text-gray-700 font-medium">
      Forward to Cyber Cell?
    </label>
  </div>
  {formData.forwardToCyberCell && (
    <p className="text-sm text-gray-600 mt-2">
      ✓ This report will be automatically forwarded to NCRP and local cyber cell for official action.
    </p>
  )}
</div>

                 {formData.includeScammerDetails && (
                   <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {/* Scammer Name */}
                       <div>
                         <label htmlFor="scammerName" className="block text-gray-700 font-medium mb-2">
                           Scammer Name *
                         </label>
                         <input
                           id="scammerName"
                           type="text"
                           value={formData.scammerName}
                           onChange={handleChange}
                           placeholder="Enter scammer's name"
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                             errors.scammerName ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
                           }`}
                         />
                         {errors.scammerName && <p className="text-red-500 text-sm mt-1">{errors.scammerName}</p>}
                       </div>

                       {/* Scammer Phone */}
                       <div>
                         <label htmlFor="scammerPhone" className="block text-gray-700 font-medium mb-2">
                           Phone Number *
                         </label>
                         <input
                           id="scammerPhone"
                           type="tel"
                           value={formData.scammerPhone}
                           onChange={handleChange}
                           placeholder="Enter phone number"
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                             errors.scammerPhone ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
                           }`}
                         />
                         {errors.scammerPhone && <p className="text-red-500 text-sm mt-1">{errors.scammerPhone}</p>}
                       </div>

                       {/* UPI ID */}
                       <div>
                         <label htmlFor="scammerUpiId" className="block text-gray-700 font-medium mb-2">
                           UPI ID
                         </label>
                         <input
                           id="scammerUpiId"
                           type="text"
                           value={formData.scammerUpiId}
                           onChange={handleChange}
                           placeholder="Enter UPI ID (if known)"
                           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                       </div>

                       {/* Email */}
                       <div>
                         <label htmlFor="scammerEmail" className="block text-gray-700 font-medium mb-2">
                           Email
                         </label>
                         <input
                           id="scammerEmail"
                           type="email"
                           value={formData.scammerEmail}
                           onChange={handleChange}
                           placeholder="Enter email (if known)"
                           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                       </div>

                       {/* Website */}
                       <div>
                         <label htmlFor="scammerWebsite" className="block text-gray-700 font-medium mb-2">
                           Website
                         </label>
                         <input
                           id="scammerWebsite"
                           type="url"
                           value={formData.scammerWebsite}
                           onChange={handleChange}
                           placeholder="Enter website (if known)"
                           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                       </div>

                       {/* Scam Type */}
                       <div>
                         <label htmlFor="scammerType" className="block text-gray-700 font-medium mb-2">
                           Scam Type *
                         </label>
                         <select
                           id="scammerType"
                           value={formData.scammerType}
                           onChange={handleChange}
                           className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                             errors.scammerType ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
                           }`}
                         >
                           <option value="">Select scam type</option>
                           <option value="phishing">Phishing</option>
                           <option value="investment">Investment Scam</option>
                           <option value="romance">Romance Scam</option>
                           <option value="tech-support">Tech Support Scam</option>
                           <option value="fake-calls">Fake Calls</option>
                           <option value="social-media">Social Media Scam</option>
                           <option value="upi-fraud">UPI Fraud</option>
                           <option value="banking">Banking Scam</option>
                           <option value="other">Other</option>
                         </select>
                         {errors.scammerType && <p className="text-red-500 text-sm mt-1">{errors.scammerType}</p>}
                       </div>
                     </div>

                     {/* Scammer Description */}
                     <div>
                       <label htmlFor="scammerDescription" className="block text-gray-700 font-medium mb-2">
                         Additional Details
                       </label>
                       <textarea
                         id="scammerDescription"
                         value={formData.scammerDescription}
                         onChange={handleChange}
                         rows="3"
                         placeholder="Provide additional details about the scammer"
                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                     </div>
                   </div>
                 )}
               </div>

        {/* Financial Fraud Alert */}
        {isFinancialFraud && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <div>
                <h3 className="text-lg font-semibold text-red-900">
                  🚨 FINANCIAL FRAUD DETECTED
                </h3>
                <p className="text-red-700">
                  <strong>IMMEDIATE ACTION REQUIRED:</strong> Call 1930 now to attempt fund freeze!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center mb-6">
          <button
            type="submit"
            disabled={isReportingIncident}
            className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isReportingIncident ? "Submitting..." : "Submit Incident"}
          </button>
        </div>

        {/* Legal Action Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🚨 Legal Action & Complaint Routing
          </h3>
          <p className="text-gray-600 mb-4">
            After submitting your incident report, take immediate legal action to maximize your chances of recovery and justice.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* NCRP/1930 Button */}
            <button
              onClick={() => setShowComplaintRouting(true)}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">NCRP/1930</div>
                <div className="text-sm opacity-90">File National Complaint</div>
              </div>
            </button>

            {/* Evidence Packet Button */}
            <button
              onClick={() => setShowEvidencePacket(true)}
              className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <div className="text-center">
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Evidence Packet</div>
                <div className="text-sm opacity-90">Generate Documents</div>
              </div>
            </button>

            {/* Jurisdiction Info Button */}
            <button
              onClick={() => setShowJurisdictionInfo(true)}
              className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Jurisdiction</div>
                <div className="text-sm opacity-90">Find Police Stations</div>
              </div>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Quick Actions:</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => window.open('tel:1930')}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors flex items-center"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call 1930
              </button>
              <button
                onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Visit NCRP
              </button>
              <button
                onClick={() => window.open('tel:100')}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors flex items-center"
              >
                <Phone className="w-4 h-4 mr-1" />
                Call Police
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modal Components */}
      {showComplaintRouting && (
        <ComplaintRouting
          incidentData={formData}
          onClose={() => setShowComplaintRouting(false)}
        />
      )}

      {showEvidencePacket && (
        <EvidencePacket
          incidentData={formData}
          onClose={() => setShowEvidencePacket(false)}
        />
      )}

      {showJurisdictionInfo && (
        <JurisdictionInfo
          incidentData={formData}
          onClose={() => setShowJurisdictionInfo(false)}
        />
      )}

      {/* Privacy Policy Modal */}
{showPrivacyModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy Policy & Data Protection</h2>
      
      <div className="space-y-4 text-gray-700">
        <p className="text-sm">
          <strong>We take your privacy seriously.</strong> Before you proceed, please review how we handle your data:
        </p>
        
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li><strong>Data Collection:</strong> We collect only necessary information to process your scam report (incident details, location, optional evidence).</li>
          <li><strong>Anonymous by Default:</strong> Your identity is protected unless you choose to forward your report to authorities.</li>
          <li><strong>Consent Required:</strong> We'll ask your permission before sharing any personal data with NCRP, police, or other agencies.</li>
          <li><strong>Secure Storage:</strong> All data is encrypted in transit and at rest, stored securely in India.</li>
          <li><strong>Your Rights:</strong> You can view, download, correct, or delete your data anytime from your account settings.</li>
          <li><strong>Data Retention:</strong> Reports are kept for 12 months, evidence for 90-180 days, unless required by law.</li>
          <li><strong>Legal Compliance:</strong> We follow India's DPDP Act 2023 and CERT-In cybersecurity guidelines.</li>
        </ul>
        
        <p className="text-sm font-medium">
          By continuing, you agree to our data practices and confirm you've read this privacy notice.
        </p>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setShowPrivacyModal(false)}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          I Accept - Continue to Form
        </button>
        <button
          onClick={() => window.history.back()}
          className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium"
        >
          Decline
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default IncidentForm;
