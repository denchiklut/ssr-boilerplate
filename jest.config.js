module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/config/spec/setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
        '^config/(.*)$': '<rootDir>/config/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^client/(.*)$': '<rootDir>/src/client/$1',
        '^server/(.*)$': '<rootDir>/src/server/$1',
        '^errors/(.*)$': '<rootDir>/src/client/errors/$1',
        '^api/(.*)$': '<rootDir>/src/client/resources/api/$1',
        '^schemas/(.*)$': '<rootDir>/src/client/resources/schemas/$1',
        '^components/(.*)': '<rootDir>/src/client/components/$1',
        '^@shared/(.*)': '<rootDir>/src/client/components/@shared/$1',
        '^resources/(.*)': '<rootDir>/src/client/resources/$1',
        '^entities/(.*)': '<rootDir>/src/client/entities/$1',
        '^pages/(.*)$': '<rootDir>/src/client/pages/$1',
        '^utils/(.*)$': '<rootDir>/src/client/utils/$1',
        '^assets/(.*)$': '<rootDir>/src/client/assets/$1',
        '\\.(icon|image).(svg)$': '<rootDir>/config/spec/svgr.ts',
        '\\.(css|scss)$': 'identity-obj-proxy'
    }
}
