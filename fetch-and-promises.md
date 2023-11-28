# What is Fetch
The ***fetch*** library is a built-in JavaScript library that is used to make API requests (GET, POST, and PUT).
The main usage of this in the **input application** project is to interact with our backend *Express.js* server and retrieve data from the local MongoDB server.

The way we use the *fetch* library is by importing a method called "*fetch*" from the library.
```javascript
import fetch from 'fetch'
```

The return type of the *fetch* method is of type ***Promise*** which is similar to making a *Task* in C#.  
This will essentially allow us to access data while also taking into account if it's been retrieved or loaded.  

In *JavaScript*, a ***Promise*** is an object that will produce a return value sometime in the future.
A *Promise* has two states, resolved and failed. If a *Promise* successfully resolves, it will return a value and if it fails, it will produce a reason why the *Promise* failed.

In the context of *fetch*, this will allow us to wait for the API request to finish then access the data if it resolves successfully as well as handle other cases such ongoing API requests and error handling if the *Promise* failed.

This is how the *fetch* library is used in most cases.
```javascript
// Import the fetch library to the script
import fetch from "fetch"

// This is the format of an async arrow function
const sampleApiRequest = async (apiURL) => {
	// This is how fetch is used to interact with our server endpoints
	const response = await fetch(apiURL);
	// We are retrieving the data from the response as a JSON
	const data = await response.json()
	//...Interact with the data here
}

// This is the format of an async function
async function sampleApiRequest (apiURL) {
	// This is how fetch is used to interact with our server endpoints
	const response = await fetch(apiURL);
	// We are retrieving the data from the response as a JSON
	const data = await response.json()
	//...Interact with the data here
}
```


In the input application, there is a custom hook specifically for making API requests located in the hooks folder called ***useFetch***.  
This custom hook has also already been implemented with other functionalities such as preventing race conditions wherein multiple API requests are made and the value might change depending on which API request finishes first.  

By default, the *useFetch* custom hook already adds the base URL of the backend server to make it easier to use and easier to read.  

The return values of the *useFetch* hook are the <u>retrieved data</u>, <u>a boolean if the data is still loading</u>, the <u>error if there's an issue</u>, and a <u>reload function that would allow us to redo the API request</u>.
This is typically used as shown below:
```jsx
import useFetch from "./hooks/useFetch"

const SampleComponent = ({children}) => {
	// We are deconstructing the return values of the useFetch hook
	const {data, isLoading, error, reload} = useFetch("[insert endpoint here]")

	return (
	<>
		{/* This can change depending on how you will render the data */}
		{isLoading ? "Data is loading" : data}
		
		{/* This button will call the reload function that would send another API request */}
		<button onClick={() => reload()}>Reload Data</button>
	</>
	)
}
```
Another syntax of the *useFetch* hook is as shown below:
```jsx
import useFetch from "./hooks/useFetch"

const SampleComponent = ({children}) => {
	// Here is another example of how to use the useFetch hook.
	const apiRequest = useFetch("[insert endpoint here]")
	
	return (
	<>
		{/* This can change depending on how you will render the data */}
		{apiRequest.isLoading ? "Data is loading" : apiRequest.data}
	
		{/* This button will call the reload function that would send another API request */}
		<button onClick={() => apiRequest.reload()}>Reload Data</button>
	</>
	)
}
```

In the context of the input application, the *useFetch* hook will mostly be used in a script created in the ***api*** folder located in the *services* folder.
Due to some difficulties of maintaining the code while keeping up with revisions, that folder is currently empty, however, the guidelines for creating API request will be discussed below.

For reference, here is what the GameID collection looks like in MongoDB
![image](https://github.com/seeeany/abcpublic-input-application/assets/32953723/d2440151-f019-4900-a85a-8bdd846ef219)

As an example of creating a new script for retrieving data, I will use an existing code for retrieving a GameID collection in the MongoDB server.
```javascript
/// fetchGameCollection.js
import useFetch from "./hooks/useFetch"

// An arrow function that takes in a parameter "gameID"
const gameCollection = (gameID) => {
	// Usage of fetch to retrieve the collection with the name of the value of gameID from the MongoDB server called "abc-public"
	const {data, isLoading, error, reload} = useFetch(`/abc-public/${gameID}`)

	// If there's an error, we can show it in the console and return the error as well as the reload function
	if(error) {
		console.error(error);
		return {data: [], error, reload}
	}

	// If the data is still loading, we can return the reload function and a blank array or other default values depending on our needs.
	if(isLoading) {
		return {data: [], reload}
	}

	// You can make changes to the data here before returning it such as sorting the data, splicing the data, or converting it to a different type (array or json).
	//...

	return {data, reload}
}

export default gameCollection
```
This API request function can now be used in a component as shown below:
```jsx
import gameCollection from "./services/api/fetchGameCollction"

const SampleComponent = ( => {
	// Similar to the useFetch hook, you can also deconstruct this to it's return values
	const gameCollectionData  = gameCollection("2021013466")

	// If there is an error with out gameCollectionData, we can show a text saying that it failed to retrieve the game collection data and show a button to reload the API request.
	if(gameCollectionData.error) {
		return (
			<>
				<p>Failed to retrieve game collection data.</p>
				<button onClick={() => reload()}>Reload GameCollection Data</button>
			</>
		)
	}

	// Else, we can just display the gameCollectionData as is and display the button again in the case that the user wants to update the data.
	return (
		<>
			{gameCollectionData.data}
			<button onClick={() => reload()}>Reload GameCollection Data</button>
		</>	
	)

}
```
