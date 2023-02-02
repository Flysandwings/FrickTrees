# FrickTrees

# Plan for tomorrow
figure out dot sizes, graph title. Classes for mobile / web graphs

# Long term plans
Make it so a user can create a new round

Display a list of rounds to view data about, graph, scoreTracker, scoreCard

Course and Player service will need updating to new db schema

# Setup for git cloning
git clone https://github.com/Flysandwings/FrickTrees.git

# Once cloned to machine
npm start

# Setup for local dev environment
npm i -g create-react-app firebase

npm install -g npm@9.2.0

create-react-app fricktrees

# Database structure
```json

"firebaseurl" : {
	"courses" : {
		"ninigret" : {
			"location" : "Park Ln, Charlestown, RI 02813, United States",
			"name" : "Ninigret Park",
			"par" : {
				"0" : "3",
				"1" : "4",
				"2" : "3"
			}
		}
	}
	"users" : {
		"bcostanzo" : {
			"name" : "Andrew"
			"courses" : {
				"ninigret" : {
					"0" : {
						"0" : "3",
						"1" : "4",
						"2" : "5"
					},
					"1" : {
						"0" : "6",
						"1" : "7",
						"2" : "8"
					}
				},
				"willow valley" : {
					"0" : {
						"0" : "8",
						"1" : "7",
						"2" : "6"
					},
					"1" : {
						"0" : "5",
						"1" : "4",
						"2" : "3"
					}
				}
			}
		}
	}
}
```
