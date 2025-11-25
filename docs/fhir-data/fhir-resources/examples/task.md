# Task

Records tasks and activities to be performed in healthcare workflows.

## Resource Overview

The Task resource represents a task or activity that needs to be performed. Tasks are used to track work items, assignments, and activities within healthcare workflows. They can represent clinical tasks (review lab results, call patient), administrative tasks (schedule appointment, verify insurance), or technical tasks (process data, send notification).

## Key Fields

### Required Fields

- **resourceType**: Must be `"Task"`
- **status**: Current status of the task
- **intent**: Purpose of the task

### Important Optional Fields

- **identifier**: Business identifier for the task
- **basedOn**: Request or order fulfilled by this task
- **groupIdentifier**: Group this task is part of
- **partOf**: Parent task
- **statusReason**: Reason for current status
- **businessStatus**: Business-specific status
- **code**: Type of task
- **description**: Human-readable description
- **focus**: What the task is acting on
- **for**: Beneficiary of the task (typically Patient)
- **encounter**: Encounter during which task was created
- **executionPeriod**: Time task should occur
- **authoredOn**: When task was created
- **lastModified**: Last modification time
- **requester**: Who is asking for task to be done
- **owner**: Who is responsible for task
- **performerType**: Type of person who can perform
- **location**: Where task should be performed
- **reasonCode**: Why task is needed
- **reasonReference**: Why task is needed (reference)
- **insurance**: Insurance for task
- **note**: Comments about the task
- **relevantHistory**: Key events in task history
- **restriction**: Constraints on task
- **input**: Input parameters
- **output**: Task output

## Field Descriptions

### status

The current status of the task:

- **draft**: Task is in draft form
- **requested**: Task has been requested
- **received**: Task has been received
- **accepted**: Task has been accepted
- **rejected**: Task has been rejected
- **ready**: Task is ready to be performed
- **cancelled**: Task was cancelled
- **in-progress**: Task is being worked on
- **on-hold**: Task has been paused
- **failed**: Task failed to complete
- **completed**: Task has been completed
- **entered-in-error**: Task was entered in error

### intent

Purpose/category of the task:

- **unknown**: Intent is unknown
- **proposal**: Task is a proposal
- **plan**: Task is a plan
- **order**: Task is an order
- **original-order**: Original order
- **reflex-order**: Reflex order
- **filler-order**: Filler order
- **instance-order**: Instance order
- **option**: Option

### businessStatus

The domain-specific status of the task. This provides more granular status than the standard `status` field:

```json
{
  "businessStatus": {
    "text": "Waiting for patient callback"
  }
}
```

### code

The type of task being performed:

- **fulfill**: Fulfill a request
- **approve**: Approve a request
- **abort**: Abort a task
- **replace**: Replace a task
- **change**: Change a task
- **suspend**: Suspend a task
- **resume**: Resume a task

Can use custom codes specific to your workflow.

### description

Human-readable description of what needs to be done. This should be clear enough for the assigned person to understand the task.

### for

Reference to the beneficiary of the task, typically:

- Patient (most common)
- Group
- Organization
- Other resource types

### executionPeriod

When the task should be performed:

- **start**: Earliest start time
- **end**: Deadline/due date

### authoredOn

When the task was first created.

### lastModified

When the task was last updated. This is automatically updated when any field changes.

### requester

Reference to who is asking for the task to be done:

- Practitioner
- PractitionerRole
- Organization
- Patient
- RelatedPerson
- Device

### owner

Reference to who is responsible for performing the task:

- Practitioner
- PractitionerRole
- Organization
- CareTeam
- Patient

### performerType

The type of person who can perform the task:

```json
{
  "performerType": [{
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "158965000",
      "display": "Medical practitioner"
    }]
  }]
}
```

### restriction

Constraints on when and where the task can be performed:

- **repetitions**: Number of times to repeat
- **period**: Time period when task can be performed
- **recipient**: Who task can be performed for

```json
{
  "restriction": {
    "period": {
      "end": "2022-08-01T04:00:00+00:00"
    }
  }
}
```

### input

Information used to perform the task:

- **type**: Type of input
- **value[x]**: The actual input value

```json
{
  "input": [
    {
      "type": {
        "text": "label"
      },
      "valueString": "Urgent"
    }
  ]
}
```

### output

Information produced by performing the task:

- **type**: Type of output
- **value[x]**: The actual output value

### note

Comments, instructions, or additional information about the task:

```json
{
  "note": [
    {
      "authorReference": {
        "reference": "Practitioner/{{practitioner_id}}"
      },
      "time": "2021-12-16T17:10:42.628451+00:00",
      "text": "Let us create a new comment with more fields!"
    }
  ]
}
```

## Complete Example

```json
{
  "resourceType": "Task",
  "extension": [
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/task-group",
      "valueReference": {
        "reference": "Group/{{group_id}}"
      }
    }
  ],
  "status": "requested",
  "intent": "unknown",
  "description": "Test title for task from Postman FHIR request",
  "for": {
    "reference": "Patient/{{patient_id}}"
  },
  "authoredOn": "2021-12-16T17:10:42.625873+00:00",
  "requester": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "owner": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "note": [
    {
      "authorReference": {
        "reference": "Practitioner/{{practitioner_a_id}}"
      },
      "time": "2021-12-16T17:10:42.628451+00:00",
      "text": "Let us create a new comment with more fields!"
    }
  ],
  "input": [
    {
      "type": {
        "text": "label"
      },
      "valueString": "Urgent"
    }
  ],
  "restriction": {
    "period": {
      "end": "2022-08-01T04:00:00+00:00"
    }
  }
}
```

## Usage Notes

1. **Status Workflow**: Tasks typically flow through statuses like: requested → accepted → in-progress → completed.

2. **Assignment**: Use `owner` to assign the task to a specific practitioner or team. Use `performerType` to indicate what type of person should do it.

3. **Deadlines**: Set `restriction.period.end` or `executionPeriod.end` to specify task deadlines.

4. **Priority**: Use `input` with type "priority" or a priority extension to mark urgent tasks.

5. **Patient Context**: Always include `for` to associate the task with a patient for proper context.

6. **Comments**: Use `note` to add comments, updates, and instructions as the task progresses.

7. **Workflow Integration**: Tasks can be based on other resources (orders, requests) using `basedOn`.

8. **Task Hierarchies**: Create parent-child task relationships using `partOf` for complex workflows.

## Common Use Cases

### Clinical Review Task

```json
{
  "status": "requested",
  "intent": "order",
  "code": {
    "text": "Review Lab Results"
  },
  "description": "Review abnormal CBC results",
  "for": {
    "reference": "Patient/{{patient_id}}"
  },
  "focus": {
    "reference": "DiagnosticReport/{{report_id}}"
  },
  "owner": {
    "reference": "Practitioner/{{physician_id}}"
  },
  "restriction": {
    "period": {
      "end": "2024-11-26T17:00:00Z"
    }
  }
}
```

### Patient Callback Task

```json
{
  "status": "requested",
  "intent": "order",
  "description": "Call patient to schedule follow-up appointment",
  "for": {
    "reference": "Patient/{{patient_id}}"
  },
  "businessStatus": {
    "text": "Awaiting callback"
  },
  "owner": {
    "reference": "PractitionerRole/{{scheduler_role}}"
  }
}
```

### Prior Authorization Task

```json
{
  "status": "in-progress",
  "intent": "order",
  "code": {
    "text": "Prior Authorization"
  },
  "description": "Obtain prior authorization for MRI",
  "for": {
    "reference": "Patient/{{patient_id}}"
  },
  "basedOn": [{
    "reference": "ServiceRequest/{{mri_order}}"
  }],
  "owner": {
    "reference": "Organization/{{auth_team}}"
  }
}
```

### Medication Reconciliation

```json
{
  "status": "requested",
  "intent": "order",
  "code": {
    "text": "Medication Reconciliation"
  },
  "description": "Complete medication reconciliation for new patient",
  "for": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "performerType": [{
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "46255001",
      "display": "Pharmacist"
    }]
  }]
}
```

## Task Status Transitions

Common status transitions:

- draft → requested
- requested → accepted → in-progress → completed
- requested → rejected
- in-progress → on-hold → in-progress
- requested → cancelled
- in-progress → failed

## Priority Handling

Use input to specify priority:

```json
{
  "input": [
    {
      "type": {
        "coding": [{
          "system": "http://hl7.org/fhir/task-input-type",
          "code": "priority"
        }]
      },
      "valueCode": "stat"
    }
  ]
}
```

## FHIR Specification References

- [Task Resource](https://hl7.org/fhir/task.html)
- [Task Status Codes](http://hl7.org/fhir/valueset-task-status.html)
- [Task Intent Codes](http://hl7.org/fhir/valueset-task-intent.html)
- [Request Priority Codes](http://hl7.org/fhir/valueset-request-priority.html)
