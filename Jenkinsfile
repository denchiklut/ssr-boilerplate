pipeline {
	agent any
	parameters {
		choice(name: 'API_MODE', choices: ['Prod', 'Stage', 'Dev'], description: 'Pick something')
	}
	stages {
		stage('Build') {
			steps {
				echo "Building ${params.API_MODE}"
			}
		}
		stage('Test') {
			steps {
				echo 'Testing app'
			}
		}

		stage('Deploy') {
			input {
				message "Where to deploy?"
				parameters {
					choice(name: 'Environment', choices: ['prod', 'stage', 'qa1', 'qa2', 'qa3'], description: 'Pick something')
				}
			}
			steps {
				echo "Deploying to ${params.Environment}."
			}
		}
	}
}
