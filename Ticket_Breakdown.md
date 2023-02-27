# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom id field to Agent table

**Description**: Add a new field "custom_id" to the Agent table in the database to store custom ids provided by Facilities.

**Acceptance Criteria**:

* A new "custom_id" field is added to the Agent table in the database
* The new field is visible in the agent creation/editing form in the application
* The new field is mandatory and cannot be empty
* The custom id is unique for each agent across all facilities

**Time/effort estimate**: 3 hours

**Implementation details**:

* Add a migration to create the new "custom_id" field in the Agent table
* Add the new field to the agent creation/editing form in the application
* Add validation to the new field to ensure it is unique for each agent across all facilities
* Update any relevant queries to include the new field

### Ticket 2: Update report generation to use custom id

**Description**: Modify the report generation function to use the custom id field instead of the internal database id when generating reports.

**Acceptance Criteria**:

* The report generation function uses the custom id field instead of the internal database id
* The custom id field is displayed on the generated reports
* The custom id is used consistently throughout the report for each agent
* The custom id is only displayed if a custom id has been set for the agent by the facility

**Time/effort estimate**: 2 hours

**Implementation details**:

* Modify the generateReport function to use the custom id field instead of the internal database id
* Update the report template to display the custom id field
* Add conditional logic to only display the custom id if it has been set for the agent

### Ticket 3: Add custom id input to Shift creation/editing form

**Description**: Modify the Shift creation/editing form to allow Facilities to enter the custom id for each Agent assigned to the Shift.

**Acceptance Criteria**:

* The Shift creation/editing form includes a field for the custom id
* The custom id field is mandatory and cannot be empty
* The custom id field is only displayed if the facility has set a custom id for the agent

**Time/effort estimate**: 2 hours

**Implementation details**:

* Modify the Shift creation/editing form to include a custom id field for each Agent assigned to the Shift
* Add validation to ensure the custom id field is mandatory and cannot be empty
* Add conditional logic to only display the custom id field if the facility has set a custom id for the agent


### Ticket 4: Update Shift query to include custom id

**Description**: Modify the getShiftsByFacility function to include the custom id field when querying for Shifts.

**Acceptance Criteria**:

* The getShiftsByFacility function includes the custom id field when querying for Shifts
* The custom id field is returned in the query results
* The custom id is only returned if a custom id has been set for the agent by the facility

**Time/effort estimate**: 1 hour

**Implementation details**:

* Modify the getShiftsByFacility function to include the custom id field in the query
* Update the query results to include the custom id field
* Add conditional logic to only return the custom id if it has been set for the agent


### Ticket 5: Update Shift editing to handle custom id changes

**Description**: Modify the Shift editing function to allow Facilities to change the custom id for each Agent assigned to the Shift.

**Acceptance Criteria**:

* The Shift editing form includes a field for the custom id
* The custom id field is pre-populated with the current custom id for the Agent, if set
* The custom id field can be modified and saved
* The custom id field is only displayed if the facility has set a custom id for the agent
* The custom id change is reflected in the Shift record and in any future reports generated for that Shift

**Time/effort estimate**: 2 hours

**Implementation details**:

* Modify the Shift editing form to include a custom id field for each Agent assigned to the Shift
* Pre-populate the custom id field with the current custom id for the Agent, if set
* Add validation to ensure the custom id field is only displayed if the facility has set a custom id for the Agent
* Update the Shift update function to save any changes to the custom id field
* Add logic to update the custom id field in the Shift record and any relevant database queries
* Update the report generation function to use the updated custom id field for any Shifts that have been edited since the last report was generated.