import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

const JurisdictionInfo = ({ incidentData, onClose }) => {
  const [jurisdictionInfo, setJurisdictionInfo] = useState({
    primaryJurisdiction: '',
    alternativeJurisdictions: [],
    nearestPoliceStations: [],
    cyberCells: [],
    nodalContacts: []
  });

  const [selectedJurisdiction, setSelectedJurisdiction] = useState('');

  useEffect(() => {
    if (incidentData) {
      fetchJurisdictionInfo(incidentData);
    }
  }, [incidentData]);

  const fetchJurisdictionInfo = async (data) => {
    // Mock data - in real implementation, this would call location APIs
    const mockData = {
      primaryJurisdiction: 'Local Police Station (Victim\'s Residence)',
      alternativeJurisdictions: [
        'Police Station (Transaction Location)',
        'Cyber Cell (Platform Location)',
        'State Cyber Cell (State Level)'
      ],
      nearestPoliceStations: [
        {
          name: 'Cyber Crime Police Station',
          address: '123 Cyber Street, District',
          phone: '100',
          distance: '2.5 km',
          type: 'cyber',
          jurisdiction: 'Cyber crimes and online frauds'
        },
        {
          name: 'Local Police Station',
          address: '456 Main Street, District',
          phone: '100',
          distance: '3.2 km',
          type: 'general',
          jurisdiction: 'General crimes and FIR registration'
        },
        {
          name: 'Women Police Station',
          address: '789 Women Street, District',
          phone: '100',
          distance: '4.1 km',
          type: 'women',
          jurisdiction: 'Crimes against women'
        }
      ],
      cyberCells: [
        {
          name: 'State Cyber Cell',
          address: 'State Capital, Cyber Division',
          phone: '1930',
          distance: '25 km',
          jurisdiction: 'State-level cyber crimes'
        },
        {
          name: 'District Cyber Cell',
          address: 'District Headquarters',
          phone: '100',
          distance: '15 km',
          jurisdiction: 'District-level cyber crimes'
        }
      ],
      nodalContacts: [
        {
          name: 'Bank Nodal Officer',
          contact: 'Bank-specific helpline',
          responsibility: 'Fund freeze and transaction reversal'
        },
        {
          name: 'Platform Nodal Officer',
          contact: 'Platform-specific contact',
          responsibility: 'Account suspension and evidence preservation'
        }
      ]
    };

    setJurisdictionInfo(mockData);
  };

  const getJurisdictionExplanation = () => {
    return {
      flexible: 'Cybercrime has flexible jurisdiction. You can file a complaint where:',
      options: [
        'You live (victim\'s residence)',
        'The transaction occurred',
        'The platform/breach is linked',
        'The offender is located'
      ],
      benefit: 'This helps avoid runaround across states and ensures faster processing.'
    };
  };

  const getEscalationSteps = () => {
    return [
      {
        step: 1,
        title: 'Immediate Action',
        description: 'Call 1930 for financial fraud or file NCRP complaint',
        timeframe: 'Within 1 hour',
        priority: 'high'
      },
      {
        step: 2,
        title: 'FIR Registration',
        description: 'Visit nearest police station with evidence packet',
        timeframe: 'Within 24 hours',
        priority: 'high'
      },
      {
        step: 3,
        title: 'Follow-up',
        description: 'Regular follow-up on case status',
        timeframe: 'Weekly',
        priority: 'medium'
      },
      {
        step: 4,
        title: 'Escalation',
        description: 'Escalate to higher authorities if no progress',
        timeframe: 'After 30 days',
        priority: 'low'
      }
    ];
  };

  const handleStationSelect = (station) => {
    setSelectedJurisdiction(station);
  };

  const explanation = getJurisdictionExplanation();
  const escalationSteps = getEscalationSteps();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              🗺️ Jurisdiction & Escalation Guide
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Incident Location */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              📍 Incident Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Location:</strong> {incidentData?.location || 'Not specified'}</p>
                <p><strong>Pincode:</strong> {incidentData?.pincode || 'Not specified'}</p>
              </div>
              <div>
                <p><strong>Incident Type:</strong> {incidentData?.scammerDetails?.scamType || 'General'}</p>
                <p><strong>Severity:</strong> {incidentData?.severity || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Flexible Jurisdiction Explanation */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-yellow-600 mr-2 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Flexible Jurisdiction Rules
                </h4>
                <p className="text-yellow-700 text-sm mb-2">{explanation.flexible}</p>
                <ul className="text-yellow-700 text-sm space-y-1">
                  {explanation.options.map((option, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-yellow-600 mr-2" />
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="text-yellow-700 text-sm mt-2 font-medium">
                  {explanation.benefit}
                </p>
              </div>
            </div>
          </div>

          {/* Nearest Police Stations */}
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🚔 Nearest Police Stations
            </h3>
            
            <div className="space-y-4">
              {jurisdictionInfo.nearestPoliceStations.map((station, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedJurisdiction === station.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleStationSelect(station.name)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-medium text-gray-900 mr-2">{station.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          station.type === 'cyber' ? 'bg-blue-100 text-blue-800' :
                          station.type === 'women' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {station.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{station.address}</p>
                      <p className="text-sm text-gray-500 mb-2">{station.jurisdiction}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-600">{station.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-600">{station.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cyber Cells */}
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              💻 Cyber Cells
            </h3>
            
            <div className="space-y-4">
              {jurisdictionInfo.cyberCells.map((cell, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{cell.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">{cell.address}</p>
                      <p className="text-sm text-gray-500 mb-2">{cell.jurisdiction}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-600">{cell.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                          <span className="text-gray-600">{cell.distance}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escalation Timeline */}
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ⏰ Escalation Timeline
            </h3>
            
            <div className="space-y-4">
              {escalationSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.priority === 'high' ? 'bg-red-100 text-red-800' :
                    step.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <span className="text-sm text-gray-500">{step.timeframe}</span>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nodal Contacts */}
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📞 Nodal Contacts
            </h3>
            
            <div className="space-y-3">
              {jurisdictionInfo.nodalContacts.map((contact, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <p className="text-sm text-gray-600">{contact.contact}</p>
                      <p className="text-sm text-gray-500">{contact.responsibility}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Reminders */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-1" />
              <div>
                <h4 className="font-semibold text-red-900 mb-2">
                  Important Reminders
                </h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• If local units hesitate, remind them of FIR duties for cognizable offenses</li>
                  <li>• An FIR number helps with bank, platform, and court processes later</li>
                  <li>• For cross-state fund freezes, 1930/NCRP coordinates with bank nodal officers</li>
                  <li>• Keep copies of all documents and complaint IDs</li>
                  <li>• Follow up regularly on case status</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => {
                if (selectedJurisdiction) {
                  // In real implementation, this would open maps or provide directions
                  alert(`Selected: ${selectedJurisdiction}`);
                } else {
                  alert('Please select a police station first');
                }
              }}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Directions
            </button>
            
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JurisdictionInfo;
