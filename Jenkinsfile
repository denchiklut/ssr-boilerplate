pipeline {
	agent any
	parameters {
		choice(name: 'Environment', choices: ['Prod', 'Stage', 'Dev'], description: 'Pick something')
	}
	stages {
		stage('build') {
			steps {
				echo "Building ${params.Environment}"
			}
		}
		stage('test') {
			steps {
				echo 'Testing app'
			}
		}

		stage('deploy') {
			steps {
				echo 'Deploying app'
			}
		}
	}
}
