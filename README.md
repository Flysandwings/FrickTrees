# FrickTrees

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
	
		"Andrew@mail.com" : {
		
			name: "Andrew",
			
			scores : {
			
				ninigret : {
				
					0 : { 
					
						{ 1, 3 },
						
						{ 2, 4 },
						
						{ 3, 5 }
						
					}
					
				}
				
			}
			
		},
		
		"Drew" : {
		
		},
		"Will" : {
		
		},
		"Keegan" : {
		
		}
		
	}
	
}
```
