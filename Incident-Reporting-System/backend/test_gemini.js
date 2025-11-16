const axios = require('axios');

const BASE_URL = 'https://prathmesh00007-prabhodyanyaya-incident.onrender.com/api';

async function testGeminiAPI() {
  console.log('🧪 Testing Gemini API Integration...\n');

  try {
    // Test 1: Test Gemini connection
    console.log('1️⃣ Testing Gemini API connection...');
    try {
      const connectionResponse = await axios.get(`${BASE_URL}/gemini/test`);
      console.log('✅ Gemini connection test:', connectionResponse.data.message);
    } catch (error) {
      console.log('❌ Gemini connection test failed:', error.response?.data?.message || error.message);
    }

    // Test 2: Test Gemini ML Insights (requires auth)
    console.log('\n2️⃣ Testing Gemini ML Insights...');
    try {
      const insightsResponse = await axios.get(`${BASE_URL}/gemini/insights`, {
        headers: {
          'Authorization': 'Bearer test-token' // This will fail but shows the endpoint structure
        }
      });
      console.log('✅ Gemini insights test:', insightsResponse.data);
    } catch (error) {
      console.log('⚠️ Gemini insights test (auth required):', error.response?.data?.message || error.message);
    }

    // Test 3: Test Gemini Trending Patterns (requires auth)
    console.log('\n3️⃣ Testing Gemini Trending Patterns...');
    try {
      const patternsResponse = await axios.get(`${BASE_URL}/gemini/trending?limit=5`, {
        headers: {
          'Authorization': 'Bearer test-token' // This will fail but shows the endpoint structure
        }
      });
      console.log('✅ Gemini patterns test:', patternsResponse.data);
    } catch (error) {
      console.log('⚠️ Gemini patterns test (auth required):', error.response?.data?.message || error.message);
    }

    // Test 4: Test Gemini Analysis (requires auth)
    console.log('\n4️⃣ Testing Gemini Analysis...');
    try {
      const analysisResponse = await axios.get(`${BASE_URL}/gemini/analysis`, {
        headers: {
          'Authorization': 'Bearer test-token' // This will fail but shows the endpoint structure
        }
      });
      console.log('✅ Gemini analysis test:', analysisResponse.data);
    } catch (error) {
      console.log('⚠️ Gemini analysis test (auth required):', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 Gemini API integration test completed!');
    console.log('\n📋 Available Gemini API Endpoints:');
    console.log('   GET  /api/gemini/test - Test connection (no auth)');
    console.log('   GET  /api/gemini/insights - Get ML insights (auth required)');
    console.log('   GET  /api/gemini/trending - Get trending patterns (auth required)');
    console.log('   GET  /api/gemini/analysis - Get comprehensive analysis (auth required)');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testGeminiAPI();
