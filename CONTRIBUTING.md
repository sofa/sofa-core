# Contributing Guide

Contributing to this repository is fairly easy. This document shows you how to
get the project, run all provided tests and generate a production ready build.

It also covers provided grunt tasks, that help you developing on this repository.

## Dependencies

To make sure, that the following instructions work, please install the following dependecies
on you machine:

- Node.js
- npm
- Git
- Bower

If you install node through the binary installation file, **npm** will be already there.
When **npm** is installed, use it to install the needed npm packages:

- bower <code>npm install -g bower</code>
- grunt-cli <code>npm install -g grunt-cli</code>
- karma <code>npm install -g karma</code>

## Installation

To get the source of this project clone the git repository via:

````
$ git clone https://github.com/sofa/<component-name>
````

This will clone the complete source to your local machine. Navigate to the project folder
and install all needed dendencies via **npm** and **bower**:

````
$ npm install
$ bower install
````

The project is now installed and ready to be built.

## Building

This repo comes with a few **grunt tasks** which help you to automate
the development process. The following grunt tasks are provided:

#### Grunt tasks

All sofa components have the provide the same grunt tasks. These are the following:

#### `grunt test`

`grunt test` executes (as you might thought) the unit tests, which are located
in `test/`. The task uses **karma** the spectacular test runner to execute
the tests with the **jasmine testing framework**.

#### `grunt build`

You only have to use this task, if you want to generate a production ready build of
this project. This task will also **lint**, **test** and **minify** the
source. After running this task, you'll find the following files in a generated
`dist` folder:

````
dist/sofa.XXX.js
dist/sofa.XXX.min.js
````

#### `grunt watch`

This task will watch all relevant files. When it notice a change, it'll run the
**lint** and **test** task. Use this task while developing on the source
to make sure, every time you make a change you get notified if your code is incosistent
or doesn't pass the tests.

## Contributing/Submitting changes

- Checkout a new branch based on <code>master</code> and name it to what you intend to do:
  - Example:
    ```sh
    $ git checkout -b BRANCH_NAME
    ```
  - Use one branch per fix/feature
- Make your changes
  - Make sure to provide a spec for unit tests
  - Run your tests with `grunt test`
  - When all tests pass, everything's fine
- Commit your changes
  - Please provide a git message which explains what you've done
  - This repo uses [Brian's conventional-changelog task](https://github.com/btford/grunt-conventional-changelog) so please make sure your commits follow the [conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)
  - Commit to the forked repository
- Make a pull request
  - Before sending a PR it's always helpful to rebase your changes against latest `master` first
  - Once your commits are rebased, simply send a pull request against the current `master` branch
  - Travis CI is watching you!

If you follow these instructions, your PR will land pretty safety in the main repo!
