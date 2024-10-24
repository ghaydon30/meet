Feature: Show/Hide Event Details

  Scenario: An event element is collapsed by default
    Given the user is on the application
    When the app displays a list of events
    Then the user should see that the event element is collapsed by default.

  Scenario: User can expand an event to see details
    Given the app is open and the event details are hidden
    When the user clicks the "show event" button
    Then the user should see the hidden event expand to display its details.

  Scenario: User can collapse an event to hide details
    Given the event is expanded and visible
    When the user clicks the "hide event" button
    Then the user should see the event collapse and become hidden.