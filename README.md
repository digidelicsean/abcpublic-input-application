# Input Applicatio
  
### Description
---
A GitHub repository of the Input Application. 

  
### How to setup the project with VisualStudio Code 
---
1. Download the Visual Studio Code installer using this [link](https://code.visualstudio.com/download) 
2. Open Visual Studio Code and select the "Source Control" icon on the left.

	![01-visual-code-install](https://github.com/digidelicsean/information-screen-app/assets/105761816/66b11309-1c42-4949-9224-ac6ebf47fef7)

3. If the "Open Folder" or "Clone Repository" button is grayed out, press the "Install git" that's hyperlinked in the left menu window or use this [link](https://git-scm.com/download/win).

	![02-visual-code-install](https://github.com/digidelicsean/information-screen-app/assets/105761816/a3665392-d035-49f7-92dd-8dba78abc1ff)

4. After installing git, press the "Clone Repository" button in the "Source Control" tab in the left menu window.
   
	![03-visual-code-install](https://github.com/digidelicsean/information-screen-app/assets/105761816/65869714-f144-4f90-ba62-506f745f1814)

5. Select the "Clone from GitHub" and find the repository named "digidelicsean/information-screen-app"
	
 	![04-visual-code-install](https://github.com/digidelicsean/information-screen-app/assets/105761816/f3be3990-6f50-4398-badc-acb97394f889)

6. Set the path where the project files will be saved to and wait for the files to be downloaded.
7. There might be a prompt that will ask if you would like to open the repository, press the "Open" button
	
 	![05-visual-code-install](https://github.com/digidelicsean/information-screen-app/assets/105761816/6d09fa29-6624-4a5d-a7a8-8d3c26d744b1)

8. If there is another prompt asking if you trust the authors of the files in the folder, press the "Yes, I trust the authors" button.






### How to setup GitHub account in VisualStudio Code
---
1. Select the "Accounts" icon in the bottom part of the left menu bar.

 	![01-setup-github](https://github.com/digidelicsean/information-screen-app/assets/105761816/4c45267a-72c7-4120-a030-f42382ef8023)

2. Select the "Sign in with GitHub" option.

 	![02-setup-github](https://github.com/digidelicsean/information-screen-app/assets/105761816/846fc655-67ab-4139-a22a-77bbc34023d9)

3. A link will be opened in your browser and will ask you to login to GitHub and ask for authorization. Press the "Authorize" button.

 	![03-setup-github](https://github.com/digidelicsean/information-screen-app/assets/105761816/95eec258-d670-4fa9-af8e-179f7f592cdd)
 
4. After that, you will be redirected back to VisualStudio Code and you will now be logged in with your GitHub account.


### Basic explanation between Pages, Components, and Features
---
#### Pages
- ***Definition***: Pages represent high-level views or screens of the application and is typically associated with a unique URL or route.
- ***Responsibility***: Pages are responsible for laying out the structure of the user interface which includes the arrangement and composition of different components.
- ***Examples***: Home Page (TOP page), About Page, Contact Us Page

#### Components
- ***Definition***: Components are reuseable, self-contained elements of the application which encapsulates a piece of user interface and its behaviour
- ***Responsibility***: Components handle specific functionalities or user interface elements that can be reused in different parts of the application which also helps with modularity and maintainability.
- ***Examples***: Button Component, Header Component, Card Component, Text Field Component

#### Features
- ***Definition***: Features are a set of related functionality or a collection of components and pages that work together to achieve a specific part of the application
- ***Responsibility***: Features encapsulate a specific aspect of the application which often spans multiple components and pages. It can also include state management, data fetching, and user interface logic.
- ***Examples***: User Authentication feature, Product Catalogue feature, Messaging Feature


### How to start the app (アプリの起動方法)
---
1. Open a command prompt terminal or use the terminal in VisualStudio Code.
2. Go to the "information-screen" directory by using this command.
   - If you're using the terminal in VisualStudio Code
   ```
   cd information-screen
   ```
   - If you're using a comand prompt terminal
   ```
   cd [path to information-screen folder]
   ```
3. Run this command to start the app in development mode.
   ```
   npm run dev
   ```
4. Run this command to build the app
   ```
   npm run build
   ```
   
### How to run the application after running the build command
---
1. Open a command prompt terminal and go to the "dist" folder using this command
   ```
   cd [path to dist folder]
   ```
2. Run this command
   ```
   http-server -p [PORT]
   Example: http-server -p 8080
   ```
3. An alternative to this is to run the command above with these parameters
   ```
   http-server [path to dist folder] -p [PORT]
   Example: http-server "C:/dist" -p 8080
   ```

### Folder Structure
---
Here is the basic folder structure of the project.
```
├── dist
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── ui
│   ├── hooks
│   ├── pages
│   ├── services
│   │   ├── api
│   │   ├── context
│   ├── utils
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
```

- dist : Contains the compiled code when running the build command
- public : Contains the public files such as the main HTML file.
- src : Contains the source code of the project
  - assets : Contains general assets like images and logos.
  - components : Contains reusable components that can be used across different pages
    - ui : Contains basic user interface components such buttons and text fields
  - hooks : Contains custom hooks for abstraction to make code easier to read
  - pages : Contains page components that make up the application
  - services : Contains scripts handling external services, APIs, or data fetching
    - api : Contains scripts for handling API calls
    - context : Contains scripts for handling contexts and providers
  - utils : Contains utility or helper scripts that perform specific tasks
  - App.css : The stylesheet of the App component (App.jsx)
  - App.jsx : The App component that handles routing, global state management, initialization logic, and organizing the different components of the application.
  - index.css : This is the global stylesheet that is applied to the whole application.
  - main.jsx : This is the entry point for the JavaScript code where the root React component (App.jsx) is rendered into the HTML document. 


### The Javascript library used for the user interface
---
The library used for handling and creating some of the user interface is a library called "***antd***" which stands for Ant Design.  
This library allows the developer to import modular components such as buttons and text fields.  
It also has other components related to layouts, design, and other interactive user interfaces.  

Here is the [link](https://ant.design/components/overview) to the the *antd* documentation.
If there is any questions that you have regarding the usage of this library, feel free to let me know through Zoom.  

There are some customization options to the default look of the user interface components provided by *antd* which are called ***Design Tokens*** and ***Global Tokens***.
These tokens are used with a component provided by *antd* called ***ConfigProvider***.
Here is a sample code that shows the usage of the **ConfigProvider** in a typical React component.
```javascript
// Import the components from the "antd" library
import { ConfigProvider, Button } from 'antd'

// This is how a typical React component would look like.
const SampleComponent = () => {

    // This is an object that contains both the design tokens and the global tokens.
    const sampleTheme = {
        // The "components" property is used for design tokens which are component-specific tokens.
        components: {
            // In this case, this design token is just for the Button.
            Button: {
                primaryColor: "#ffffff"
            }
        }, 
        // The "token" property is used for global tokens which will affect all the components inside the "ConfigProvider" component.
        token: {
            // This will change the fontSize of all text that is inside the "ConfigProvider" component
            fontSize: "16px"
        }
    }

    // The return value is called a JSX component which is converted to HTML and Javascript code and added to the main HTML file.
    return (
        <ConfigProvider theme={sampleTheme}>
            <Button/>
        </ConfigProvider>
    )
}

// This is the export keyword which would allow us to import and use this component anywhere in the React project.
export default SampleComponent
```

### Quick explanation of JSX
---
***JSX*** or ***Javascript XML*** is a syntax extension of Javascript that resembles XML or HTML and is commonly used with React.  
This allows developers to write HTML elements and components in a syntax that looks similar to HTML or XML.
Here is an example of what React looks like with and without JSX.  
```javascript
/// React with JSX
const name =  <p>FirstName, LastName</p>

/// React without JSX
const name = React.createElement('p', null, 'FirstName, LastName');
```
Some things to note with JSX is that it is used to create other components as well.
Here is an example blank React component.
```javascript
// In React, this is called a "functional component" and can contain properties that can be used in the component.
const BlankComponent = () => {
    return (
        <div>
            BlankComponent
        </div>
    )
}
export default BlankComponent
```

Here is an example of a React component with a property and how its used.
```javascript
/// ComponentWithProperty.jsx
// This is an example of a functional component that contains a property, which in this case, a property called "name"
const ComponentWithProperty = ({name}) => {
    return (
        <p>
            {name}
        </p>
    )
}

export default ComponentWithProperty

```

```javascript
/// MainScreen.jsx
import ComponentWithProperty from './ComponentWithProperty'
const MainScreen = () => {
    return (
        <div>
            <ComponentWithProperty name="FirstName, LastName" />
            // Similar to HTML can also be written like this if the component will render child components as well.
            <ComponentWithProperty name="FirstName, LastName">
            </ComponentWithProperty>
        </div>
    )
}

export default MainScreen
```

Here is an example of a component that can render children components using the built-in "children" property.
```javascript
/// ComponentWithChildren.jsx
const ComponentWithChildren = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default ComponentWithChildren
```

```javascript
/// ComponentWithChildren.jsx
import ComponentWithChildren from "./ComponentWithChildren"
import { Button } from "antd"

const MainScreen = () => {
    return (
        <ComponentWithChildren>
            <Button>Sample Button 1</Button>
            <Button>Sample Button 2</Button>
        </ComponentWithChildren>
    )
}

export default MainScreen
```

For adding an external stylesheet to a React component, you will need to create a separate CSS file that will contain the CSS classes that can be applied to different components in JSX.  
Here is an example of what a CSS stylesheet looks like and how to use it in a React component.
```CSS
/// SampleComponent.css


```
