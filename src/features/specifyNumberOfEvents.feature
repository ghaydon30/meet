Feature: Specify Number of Events

  Scenario: Display default number of events when user hasn’t set a specific number
    Given the event app is open
    And the user has not selected how many events to display
    When the user views the event list
    Then the default number of events displayed should be "32"

  Scenario: User can modify the number of events displayed
    Given the event app is open
    And the user has set the number of events to display as "10"
    When the user changes the number of events to "10"
    Then the event list should update to show "10" events