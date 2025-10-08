export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
     '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    // 1. Maneja CSS Modules (si usas 'import styles from...')
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
    
    // 2. Maneja solo archivos estáticos (que causaban el error inicial)
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js', 
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
};


