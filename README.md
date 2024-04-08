# Meet App
## Basic Description
To build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application uses the Google
Calendar API to fetch upcoming events. (From original CareerFoundry project brief)
## Features
### Filter Events by City
As a user,
I should be able to filter events by city
so that I can choose events based on my location.  
- **Scenario:** User can filter events by city
- **Given:** The list of events has been loaded and the city / radius is input
- **When:** The user clicks "filter" button
- **Then:** The events list will be filtered by city
### Show/Hide Event Details
As a user,
I should be able to show/hide event details
so that I can tailor how much info I get at a time.  
- **Scenario:** User can show/hide event details
- **Given:** The event is loaded
- **When:** The user clicks "Show"/"Hide" "Details"
- **Then:** Event element will be expanded to show event details (or contracted if already showing)
### Specify Number of Events
As a user,
I should be able to specify the number of events
so that I can see the scope of each event from a commitment standpoint.  
- **Scenario:** User can specify the number of events
- **Given:** The user inputs a specific number of events to display
- **When:** The user clicks "limit events"
- **Then:** The event list is limited to the scope the user entered
### Use the App When Offline
As a user,
I should be able to use the app when offline
so that I can plan social events when traveling.  
- **Scenario:** User can use the app when offline
- **Given:** A basic amount of data is pre-loaded
- **When:** A signal is not present
- **Then:** The user can still view the pre-loaded saved data
### Add an App Shortcut to the Home Screen
As a user,
I should be able to click a shortcut to the home screen
so that I can get to the home page easily.  
- **Scenario:** User can click a shortcut to the home screen
- **Given:** The user is on a different screen than home
- **When:** The user clicks the "Home" or app decal
- **Then:** The user will be taken to the home page
### Display Charts Visualizing Event Details
As a user,
I should be able to display charts visualizing event details
so that I can succinctly see the important points of an event.  
- **Scenario:** User can display charts visualizing event details
- **Given:** The user has an event loaded
- **When:** The user clicks "event details"
- **Then:** Charts and event details view will be displayed