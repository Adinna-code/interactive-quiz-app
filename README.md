# Interactive Quiz App

An interactive quiz project built with **Next.js** and **React**. Users can answer questions and add new questions directly through the app. Since the project lacks a real backend, questions are saved and updated using `localStorage` to simulate writing data to a file.

## Project Description

This application allows users to:
- Answer questions organized by categories.
- Add new questions through an in-app form.
- Save and manage questions directly in `localStorage`.

The project includes four main pages:
1. **Home** - Introduction and navigation to quiz categories.
2. **Categories** - Page for selecting a quiz category.
3. **Quiz** - Page to go through questions within the selected category.
4. **Question** - Page for one question at the time within the selected quiz.

### Technologies Used
- **Next.js** for routing and page management.
- **React** for component interaction logic.
- **api** for iterate the json file
- **localStorage** to simulate a database.

## Installation and Running the Project

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/InteractiveQuizApp.git

2. **Navigate to folder**
   ```bash
   cd InteractiveQuizApp

3. **Install dependencies**
   ```bash
   npm install
   
4. **Run the application**
   ```bash
   npm run dev

The application will be available at http://localhost:3000.

**Branch Structure**
**main**: The primary branch containing the stable version of the application.
**module-3**: The branch containing a form for users to add a new question on the quiz.
**improvements**: Separate branch for storage the new questions in local storage.

**Branch Workflow**
1. Create a new branch for a feature:
   ```bash
   git checkout -b feature/{feature-name}
  
2. Commit and Push Changes:
  - Stage changes: git add .
  - Commit changes: git commit -m "Description of change"
  - Push to remote: git push origin feature/{feature-name}

3. Pull Request (PR):
  - Once the feature is complete, open a Pull Request to merge changes into the dev branch.
  - After approval, the feature will be included in improvements and eventually merged into main after testing.

**Contributions**

Contributions are welcome! Follow these steps to contribute:
  - Fork the repository and create a branch for your modifications.
  - Once you've made your changes, submit a Pull Request.
  - Clearly describe the functionality or improvements you've added in the PR.

If you encounter any issues or have suggestions, please open an issue on GitHub!


