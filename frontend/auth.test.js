const fetchMock = require('jest-fetch-mock');

// Enable fetch mocking
fetchMock.enableMocks();

// Mock global variables
global.localStorage = {
  store: {},
  getItem: function(key) {
    return this.store[key] || null;
  },
  setItem: function(key, value) {
    this.store[key] = value.toString();
  },
  removeItem: function(key) {
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  }
};

// Mock alert function
global.alert = jest.fn();

beforeEach(() => {
  fetchMock.resetMocks();
  global.localStorage.clear();
  global.alert.mockClear();
});

test('should register a new user successfully', async () => {
  document.body.innerHTML = `
    <form id="registerForm">
      <input id="name" value="John Doe">
      <input id="email" value="john@example.com">
      <input id="password" value="password123">
    </form>
  `;

  const mockResponse = {
    message: 'User created successfully'
  };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

  // Import your function using require
  const { registerUser } = require('./script'); // Adjust the path as needed

  const event = { preventDefault: jest.fn() };
  await registerUser(event);

  expect(fetchMock).toHaveBeenCalledWith('/api/v1/users/register', expect.any(Object));
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][1].method).toBe('POST');
  expect(fetchMock.mock.calls[0][1].headers['Content-Type']).toBe('application/json');
  expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  }));
  expect(global.alert).toHaveBeenCalledWith('User created successfully');
});

test('should login an existing user successfully', async () => {
  document.body.innerHTML = `
    <form id="loginForm">
      <input id="email" value="john@example.com">
      <input id="password" value="password123">
    </form>
  `;

  const mockResponse = {
    message: 'Login successful',
    data: { token: 'fake-token' }
  };
  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

  // Import your function using require
  const { loginUser } = require('./script'); // Adjust the path as needed

  const event = { preventDefault: jest.fn() };
  await loginUser(event);

  expect(fetchMock).toHaveBeenCalledWith('/api/v1/users/login', expect.any(Object));
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock.mock.calls[0][1].method).toBe('POST');
  expect(fetchMock.mock.calls[0][1].headers['Content-Type']).toBe('application/json');
  expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  }));
  expect(global.localStorage.getItem('token')).toBe('fake-token');
  expect(global.alert).toHaveBeenCalledWith('Login successful');
});
