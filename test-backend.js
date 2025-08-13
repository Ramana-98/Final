const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testBackend() {
  console.log('🧪 Testing Dashboard Backend...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Test registration
    console.log('\n2. Testing user registration...');
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'Developer',
      level: 'Middle',
      location: 'Test City',
      timezone: 'UTC',
      phone: '+1234567890',
      skills: ['JavaScript', 'React'],
      hourlyRate: 25,
      currency: 'USD'
    });
    console.log('✅ Registration successful:', registerResponse.data.message);

    // Test login
    console.log('\n3. Testing user login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Login successful:', loginResponse.data.message);

    const token = loginResponse.data.token;

    // Test authenticated endpoints
    console.log('\n4. Testing authenticated endpoints...');
    
    // Test getting user profile
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.user.name);

    // Test getting users
    const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Users retrieved:', usersResponse.data.data.length, 'users');

    // Test getting wallet
    const walletResponse = await axios.get(`${API_BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Wallet retrieved:', walletResponse.data.data.balance.currency);

    // Test getting notifications
    const notificationsResponse = await axios.get(`${API_BASE_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Notifications retrieved:', notificationsResponse.data.data.length, 'notifications');

    console.log('\n🎉 All backend tests passed successfully!');
    console.log('\n📊 Backend is fully functional and ready to use.');
    console.log('🔗 API Base URL:', API_BASE_URL);
    console.log('🔑 Test Token:', token.substring(0, 20) + '...');

  } catch (error) {
    console.error('\n❌ Backend test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data.error || error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    console.log('\n💡 Make sure the backend is running on port 5000');
    console.log('💡 Check if MongoDB is connected');
    console.log('💡 Verify all environment variables are set');
  }
}

// Run the test
testBackend();

