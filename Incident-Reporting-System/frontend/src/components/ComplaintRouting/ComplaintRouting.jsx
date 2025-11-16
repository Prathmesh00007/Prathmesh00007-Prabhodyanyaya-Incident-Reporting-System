import React, { useState, useEffect } from 'react';
import { Phone, AlertTriangle, Shield, FileText, MapPin, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ComplaintRouting = ({ incidentData, onClose }) => {
  const [routingType, setRoutingType] = useState('');
  const [showNCRPForm, setShowNCRPForm] = useState(false);
  const [showPoliceForm, setShowPoliceForm] = useState(false);
  const [ncrpData, setNcrpData] = useState({});
  const [policeData, setPoliceData] = useState({});
  const [evidencePacket, setEvidencePacket] = useState(null);
  const [nearestPoliceStations, setNearestPoliceStations] = useState([]);

  useEffect(() => {
    // Auto-triage based on incident data
    if (incidentData) {
      const isFinancialFraud = checkIfFinancialFraud(incidentData);
      if (isFinancialFraud) {
        setRoutingType('financial');
        setShowNCRPForm(true);
        toast.success('🚨 Financial fraud detected! Call 1930 immediately for fund freeze!');
      } else {
        setRoutingType('cyber');
        setShowNCRPForm(true);
      }
    }
  }, [incidentData]);

  const checkIfFinancialFraud = (data) => {
    const financialKeywords = ['upi', 'card', 'wallet', 'payment', 'transaction', 'bank', 'money', 'fund'];
    const description = (data.description || '').toLowerCase();
    const scammerDetails = data.scammerDetails || {};
    
    return financialKeywords.some(keyword => 
      description.includes(keyword) || 
      scammerDetails.upiId || 
      scammerDetails.scamType === 'upi-fraud' ||
      scammerDetails.scamType === 'banking'
    );
  };

  const handleNCRPSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate NCRP complaint ID
      const complaintId = `NCRP-${Date.now()}`;
      
      // Create evidence packet
      const packet = generateEvidencePacket(incidentData, complaintId);
      setEvidencePacket(packet);
      
      toast.success(`NCRP complaint filed! ID: ${complaintId}`);
      
      // Show police form for FIR
      setShowPoliceForm(true);
    } catch (error) {
      toast.error('Failed to submit NCRP complaint');
    }
  };

  const handlePoliceSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate FIR checklist
      const firChecklist = generateFIRChecklist(incidentData, evidencePacket);
      
      toast.success('FIR checklist generated! Take this to the nearest police station.');
      
      // Show success message with next steps
      setShowPoliceForm(false);
    } catch (error) {
      toast.error('Failed to generate FIR checklist');
    }
  };

  const generateEvidencePacket = (incidentData, complaintId) => {
    return {
      complaintId,
      incidentTitle: incidentData.title,
      incidentDescription: incidentData.description,
      location: incidentData.location,
      pincode: incidentData.pincode,
      timestamp: new Date().toISOString(),
      evidence: {
        screenshots: incidentData.image ? [incidentData.image] : [],
        scammerDetails: incidentData.scammerDetails || {},
        chatLogs: [],
        bankStatements: [],
        utrNumbers: []
      },
      documents: [
        'Government ID (Aadhaar/PAN)',
        'Bank statements',
        'Transaction screenshots',
        'Chat logs/screenshots',
        'Any other relevant documents'
      ]
    };
  };

  const generateFIRChecklist = (incidentData, evidencePacket) => {
    return {
      firNumber: `FIR-${Date.now()}`,
      incidentDetails: incidentData,
      evidencePacket,
      requiredDocuments: [
        'NCRP Complaint ID',
        'Government ID (Aadhaar/PAN)',
        'Bank statements',
        'Transaction screenshots',
        'Chat logs/screenshots',
        'Any other relevant documents'
      ],
      policeStationInfo: nearestPoliceStations[0] || {
        name: 'Nearest Police Station',
        address: 'Contact local police station',
        phone: '100'
      }
    };
  };

  const fetchNearestPoliceStations = async (pincode) => {
    // Mock data - in real implementation, this would call a location API
    setNearestPoliceStations([
      {
        name: 'Cyber Crime Police Station',
        address: '123 Cyber Street, District',
        phone: '100',
        distance: '2.5 km'
      },
      {
        name: 'Local Police Station',
        address: '456 Main Street, District',
        phone: '100',
        distance: '3.2 km'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              🚨 Complaint Routing & Legal Action
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Auto-triage Alert */}
          {routingType === 'financial' && (
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

          {/* Routing Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* NCRP/1930 Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-blue-900">
                  National Cybercrime Reporting Portal (NCRP)
                </h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-blue-800">Quick complaint filing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-blue-800">National workflow (CFCFRMS)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-blue-800">Bank and law enforcement alerts</span>
                </div>
              </div>

              {routingType === 'financial' && (
                <div className="bg-red-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-red-600 mr-2" />
                    <div>
                      <h4 className="font-semibold text-red-900">Call 1930 Immediately!</h4>
                      <p className="text-red-700 text-sm">
                        For financial fraud, call 1930 first to attempt fund freeze, then file on NCRP.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowNCRPForm(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                File NCRP Complaint
              </button>
            </div>

            {/* Police/Cyber Cell Section */}
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-xl font-semibold text-green-900">
                  Police Station / Cyber Cell
                </h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">Register FIR for investigation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">Formal legal process</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">Court proceedings support</span>
                </div>
              </div>

              <div className="bg-yellow-100 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-yellow-600 mr-2" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">Flexible Jurisdiction</h4>
                    <p className="text-yellow-700 text-sm">
                      File FIR where you live, where transaction occurred, or where platform is linked.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  fetchNearestPoliceStations(incidentData?.pincode);
                  setShowPoliceForm(true);
                }}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Get FIR Checklist
              </button>
            </div>
          </div>

          {/* NCRP Form */}
          {showNCRPForm && (
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                NCRP Complaint Form
              </h3>
              
              <form onSubmit={handleNCRPSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complainant Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+91-9999888877"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Description
                  </label>
                  <textarea
                    rows="4"
                    required
                    defaultValue={incidentData?.description || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed description of the incident"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit NCRP Complaint
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNCRPForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Police FIR Form */}
          {showPoliceForm && (
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                FIR Checklist & Police Station Info
              </h3>
              
              <form onSubmit={handlePoliceSubmit} className="space-y-4">
                {/* Nearest Police Stations */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nearest Police Stations
                  </label>
                  <div className="space-y-2">
                    {nearestPoliceStations.map((station, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{station.name}</h4>
                            <p className="text-sm text-gray-600">{station.address}</p>
                            <p className="text-sm text-gray-500">Distance: {station.distance}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{station.phone}</p>
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <ExternalLink className="w-4 h-4 inline mr-1" />
                              Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documents to Take
                  </label>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        NCRP Complaint ID (if filed)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Government ID (Aadhaar/PAN)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Bank statements
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Transaction screenshots
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Chat logs/screenshots
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Any other relevant documents
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Generate FIR Checklist
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPoliceForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Evidence Packet Display */}
          {evidencePacket && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📋 Evidence Packet Generated
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>Complaint ID:</strong> {evidencePacket.complaintId}</p>
                <p><strong>Incident:</strong> {evidencePacket.incidentTitle}</p>
                <p><strong>Location:</strong> {evidencePacket.location}</p>
                <p><strong>Generated:</strong> {new Date(evidencePacket.timestamp).toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  // In real implementation, this would download the evidence packet
                  toast.success('Evidence packet downloaded!');
                }}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Evidence Packet
              </button>
            </div>
          )}

          {/* Best Practice Reminder */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <div>
                <h4 className="font-semibold text-blue-900">Best Practice: Dual Routing</h4>
                <p className="text-blue-700 text-sm">
                  For maximum effectiveness, file on both NCRP/1930 for quick freezes and national routing, 
                  AND file an FIR at the nearest police station for investigation and legal follow-through.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintRouting;
