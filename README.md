![alt text](image.png)

Repository: Airtable Timeline Assignment

This repository contains a solution for the task of creating a timeline visualization component, inspired by the Airtable interface. The main goal was to design and implement an interactive timeline that organizes and displays events in a compact and visually pleasing way.

Key Features

Lanes Layout: Events are automatically organized into horizontal lanes in an efficient manner. If one event ends before the next one starts, they can share the same lane to save vertical space.

Dynamic Visualization: The timeline is built with React to manage the interface and D3.js to handle time scales and the rendering of SVG elements, ensuring smooth performance.

Full Interactivity:

Zoom: Use the + and - buttons to zoom in or out of the timeline and view events at different levels of detail.

Drag and Drop: Change an event's start and end dates simply by dragging it to a new position.

Inline Editing: Click on an event's name to edit it directly on the timeline.

Polished Elements: The component includes a time axis at the bottom, subtle grid lines to improve readability, and a responsive design that adjusts the height based on the number of lanes.


Timeline Assignment

🚀 How to Run

Clone the repository

Install dependencies:

npm install

Run the project:

npm start

The app will open in the browser with the timeline rendered.

✅ What I Liked

The simplicity of the packing algorithm (assignLanes.js).

The use of SVG + d3-scale for fluid positioning.

The modular and easy-to-extend structure.

🔧 What I Would Change

Use a temporal scale library (d3-scaleTime) to better handle months/days.

Add zoom and pan with a mouse wheel or drag.

Allow for inline editing of item names.

Implement drag & resize to adjust dates.

🎨 Design Decisions

Inspired by Gantt charts and the Google Calendar timeline.

Kept the visual clean and minimalist (blue boxes, white text).

Simplicity to facilitate future testing and extensions.

🧪 How I Would Test with More Time

Unit tests: For the lanes algorithm (assignLanes).

Snapshot tests: For the SVG rendering.

E2E tests: For the zoom, edit, and drag & drop workflows (with Cypress).

A11y tests: To check for contrast and keyboard support.

🖤 Credits

Made with ❤️ by Mariana Aguiar – FrontEnd Developer 