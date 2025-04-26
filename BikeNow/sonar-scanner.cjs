const scanner = require('sonarqube-scanner');

scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: '', // If you're not using a token, leave this as an empty string
        options: {
            'sonar.projectKey': 'my-react-vite-app',
            'sonar.projectName': 'My React Vite App',
            'sonar.projectVersion': '1.0',
            'sonar.sources': 'src',
            'sonar.exclusions': '**/node_modules/**,**/*.test.*,vite.config.*,**/__tests__/**',
            'sonar.typescript.tsconfigPath': 'tsconfig.json',
        },
    },
    () => {
        console.log('SonarQube scan complete.');
        process.exit();
    }
);
