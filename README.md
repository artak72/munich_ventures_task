# Contact Management Interface

## Task Overview

This project involves creating a Contact Management Interface with a mini-dashboard that allows users to view, search, create, edit, and delete contacts dynamically. The interface consists of a left sidebar for managing the contact list and a main content area for displaying and editing contact details.

## Features

### Searchable Contact List (Left Sidebar)
- Displays a list of contact names.
- A search bar allows filtering of contacts in real-time.
- The selected contact is highlighted in the list.

### Contact Details View (Main Content Area)
- Displays details of the selected contact:
  - Profile picture of the contact.
  - Name and username in a prominent layout.
  - Additional information or metadata about the contact.
- Action buttons:
  - **Edit**: Opens a form to modify the contact's details.
  - **Delete**: Removes the contact from the list.

### Contact Creation
- A form to create a new contact in the main content area.
- Form fields are validated using **Zod** schemas.
- After submission, the newly created contact is added to the list and automatically selected.

### Contact Editing
- Open a form pre-filled with the selected contact's details for editing.
- Form fields are validated using **Zod** schemas.
- After editing, the contact is updated in the list and automatically selected.

### Contact Deletion
- Displays a confirmation dialog for deletion with "Yes" and "No" buttons.
- Once confirmed, the contact is deleted from the list.

### UI Design
- Clean, minimalistic layout for a user-friendly interface.
- Styling is done using **TailwindCSS** for responsiveness and modern design.

## Requirements

### Project Setup
- Use **Vite** to set up a React + TypeScript project.
- Implement **TanStack ReactRouter** for routing and page navigation.
- Use **TanStack ReactQuery** for data fetching and caching.
- Handle form state and validation with **TanStack ReactForm**.

### API Integration
- Integrate a mock data API using **json-server** or a similar local server.
- Use **ReactQuery** to:
  - Fetch and cache a list of users (GET `/users`).
  - Create new users (POST `/users`).

### Routing and Components
- Set up pages using **TanStack ReactRouter**.
- Create layouts with **TanStack ReactRouter** to structure the app.

### Form Handling Using TanStack ReactForm
- Dynamically handle form field validations with schema-driven approaches.
- Reset the form after a successful submission.
- Display server-side error messages if any occur.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/artak72/munich_ventures_task.git