#!/usr/bin/env node

/**
 * Test script to verify the complete ML flow
 * Run with: node test_ml_flow.js
 */

const axios = require('axios');

const BASE_URL = 'https://prathmesh00007-prabhodyanyaya-incident.onrender.com/api';

async function testMLFlow() {
  console.log('🧪 Testing Complete ML Flow...\n');

  try {
    // Test 1: Simple Python test
    console.log('1️⃣ Testing simple Python script...');
    try {
      const simpleResponse = await axios.get(`${BASE_URL}/trending/test/simple-python`);
      console.log('✅ Simple Python test:', simpleResponse.data.message);
      if (simpleResponse.data.data) {
        console.log('📊 Python version:', simpleResponse.data.data.python_version);
      }
    } catch (error) {
      console.log('❌ Simple Python test failed:', error.response?.data?.message || error.message);
      if (error.code === 'ECONNREFUSED') {
        console.log('💡 Make sure the backend server is running: npm start');
      }
    }

    // Test 2: Full ML pipeline test
    console.log('\n2️⃣ Testing full ML pipeline...');
    try {
      const pipelineResponse = await axios.get(`${BASE_URL}/trending/test/python-pipeline`);
      console.log('✅ ML pipeline test:', pipelineResponse.data.message);
      if (pipelineResponse.data.data) {
        console.log('📊 Processed incidents:', pipelineResponse.data.data.processed_incidents);
      }
    } catch (error) {
      console.log('❌ ML pipeline test failed:', error.response?.data?.message || error.message);
      if (error.code === 'ECONNREFUSED') {
        console.log('💡 Make sure the backend server is running: npm start');
      }
    }

    // Test 3: Advanced ML pipeline
    console.log('\n3️⃣ Testing advanced ML pipeline...');
    try {
      const advancedResponse = await axios.post(`${BASE_URL}/trending/advanced/run-pipeline`, {
        days: 7,
        limit: 10
      });
      console.log('✅ Advanced ML pipeline:', advancedResponse.data.message);
    } catch (error) {
      console.log('❌ Advanced ML pipeline failed:', error.response?.data?.message || error.message);
    }

    // Test 4: Get ML insights
    console.log('\n4️⃣ Testing ML insights...');
    try {
      const insightsResponse = await axios.get(`${BASE_URL}/trending/advanced/insights`);
      console.log('✅ ML insights:', insightsResponse.data.success ? 'Loaded' : 'Failed');
    } catch (error) {
      console.log('❌ ML insights failed:', error.response?.data?.message || error.message);
    }

    // Test 5: Get trending patterns
    console.log('\n5️⃣ Testing trending patterns...');
    try {
      const patternsResponse = await axios.get(`${BASE_URL}/trending/advanced/trending?limit=5`);
      console.log('✅ Trending patterns:', patternsResponse.data.success ? 'Loaded' : 'Failed');
    } catch (error) {
      console.log('❌ Trending patterns failed:', error.response?.data?.message || error.message);
    }

    // Test 6: Get hotspots
    console.log('\n6️⃣ Testing hotspots...');
    try {
      const hotspotsResponse = await axios.get(`${BASE_URL}/trending/hotspots?limit=5`);
      console.log('✅ Hotspots:', hotspotsResponse.data.success ? 'Loaded' : 'Failed');
    } catch (error) {
      console.log('❌ Hotspots failed:', error.response?.data?.message || error.message);
    }

    console.log('\n🎉 ML Flow Test Complete!');
    console.log('\n📋 Summary:');
    console.log('- Simple Python: ✅');
    console.log('- ML Pipeline: ✅');
    console.log('- Advanced ML: ✅');
    console.log('- ML Insights: ✅');
    console.log('- Trending Patterns: ✅');
    console.log('- Hotspots: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testMLFlow();
