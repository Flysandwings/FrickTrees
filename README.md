# FrickTrees

# Plan for tomorrow
Make the graph better. XY axis labels, figure out dot sizes, graph title. QOL graph things.

# Long term plans
Make it so a user can create a new round

Display a list of rounds to view data about, graph, scoreTracker, scoreCard

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
