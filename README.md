# Literate Pancake - Social Media Frontend for MongoDB

![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description

A command line frontend for managing a social media site's MongoDB data store. A video demonstration of this application can be found on [YouTube](https://youtu.be/sSqVHmACGvs).

Functionality includes:
* Listing all users
* Listing a user's details
* Creating and deleting a user
* Creating and removing friendships between users
* Listing all thoughts
* Creating and deleting a thought
* Creating and deleting a reaction to a thought

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Known Issues](#known-issues)
- [Shout Outs](#shout-outs)
- [License](#license)

## Installation

This application requires Node.js and npm to run. To run this application, download the code to your computer via a git clone or a zip download.  

## Usage

This application can be used to create, manage, and interface with an social media's MongoDB data store.

Example API requests can be found in `docs/Insomnia API Requests.json`. This file can be imported into Insomnia and used to send requests.

## Contributing

Although this application is no longer under active development, I welcome any and all pull requests from those who would like to contribute to and improve this software.

## Tests

This software currently does not have any tests.

## Questions

* What packages does this project use?
  * [Express](https://expressjs.com/) for handling the routes
  * [Mongoose](https://mongoosejs.com/) for handling the MongoDB connection

## Known Issues

* A thought's ID isn't removed from a User's thoughts array when a thought is deleted. The thought it deleted and this ID is deleted with the rest of the thought IDs whenever the user is deleted.

## Shout Outs

The creator of [this](https://regexr.com/3e48o) regex, which I use to validate email addresses.

## License

MIT License

Copyright (c) 2022 kurtbixby

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
