# NotesApp

This is a simple app I created with React Native for storing a note safely.

## Installation

Clone the repository

```bash
git clone https://github.com/JKobrynski/NotesApp.git
```

Install dependencies

```bash
yarn
```

## Technologies used

- [React Native](https://facebook.github.io/react-native/)
- [Async Storage](https://github.com/react-native-community/async-storage)
- [vector icons](https://github.com/oblador/react-native-vector-icons)
- [bcrypt](https://www.npmjs.com/package/react-native-bcrypt)
- [react-native-aes-crypto](https://www.npmjs.com/package/react-native-aes-crypto)
- [react-native-secure-storage](https://www.npmjs.com/package/react-native-secure-storage)
- [react-navigation](https://reactnavigation.org)

## Branches

- ### [password](https://github.com/JKobrynski/NotesApp/tree/password)

An app secured by password provided by the user. Password is hashed using [bcrypt](https://www.npmjs.com/package/react-native-bcrypt). Note is encrypted using [react-native-aes-crypto](https://www.npmjs.com/package/react-native-aes-crypto). Change of password functionality is provided.

- ### [touchid](https://github.com/JKobrynski/NotesApp/tree/touchid)

An app secured by users fingerprint. Authentication mechanism is handled by [react-native-secure-storage](https://www.npmjs.com/package/react-native-secure-storage).

- ### [combo](https://github.com/JKobrynski/NotesApp/tree/combo)

An app very similar to the one on [touchid](https://github.com/JKobrynski/NotesApp/tree/touchid) branch. This app lets user pick whether he prefers to use his fingerprint or provide some custom password for the app (handled by [react-native-secure-storage](https://www.npmjs.com/package/react-native-secure-storage))
