# Source Folder

It contains the entire source code for the App.

## `main.jsx`

This is the **structural entry point** and it is responsible for instrumenting the React app with all the relevant Providers.

In this codebase, we provide providers with as [HOC](https://dev.to/nibble/higher-order-components-in-react-4c7h) so to avoid the [Provider Hell](https://marcopeg.com/context-provider-hell/). 

👉 This might actually be a [better solution](https://dev.to/alfredosalzillo/the-react-context-hell-7p4)!

## `App.jsx`

This is the **functional entry point** of the App and in our case it is responsible for splitting our codebase by the User's role.

We are practically building a _monolythic codebase_ to erogate the functionalities of three different Apps:

- **Engineer:** [[ to be completed ]]
- **Manager:** [[ to be completed ]]
- **Backoffice:** [[ to be completed ]]

## `App{XXX}.jsx`

This is the **functiona entry point** of each specialized App. The main responsibility would be the routing of the main views, and the composition of the menu.