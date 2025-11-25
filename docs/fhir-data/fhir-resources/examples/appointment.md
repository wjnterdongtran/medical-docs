# Appointment

Schedules healthcare visits and meetings between patients and practitioners.

## Resource Overview

The Appointment resource represents a scheduled event where a patient meets with one or more healthcare providers. It can represent in-person visits, telemedicine consultations, or other types of healthcare encounters.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Appointment"`
- **status**: The current status of the appointment
- **participant**: Array of people/resources participating in the appointment

### Important Optional Fields

- **identifier**: Business identifiers for the appointment
- **appointmentType**: The type of appointment
- **description**: Brief description or reason for the appointment
- **start**: When the appointment begins
- **end**: When the appointment ends
- **supportingInformation**: Additional resources like location or virtual meeting links
- **contained**: Resources embedded within the appointment (e.g., Endpoint for video calls)

## Field Descriptions

### status

The current state of the appointment:

- **proposed**: None of the participants have confirmed the appointment
- **pending**: Some participants have confirmed, waiting for others
- **booked**: All participants have confirmed
- **arrived**: Patient has arrived for the appointment
- **fulfilled**: Appointment completed normally
- **cancelled**: Appointment was cancelled before it started
- **noshow**: Patient did not show up
- **entered-in-error**: Appointment was entered by mistake

See [AppointmentStatus codes](https://hl7.org/fhir/valueset-appointmentstatus.html) for details.

### appointmentType

Describes the type of appointment using coded values. Common systems:

- **SNOMED CT**: [http://snomed.info/sct](http://snomed.info/sct) - Clinical procedure types
  - `448337001` - Telemedicine consultation with patient
  - `185349003` - Encounter for check up
  - `50849002` - Emergency room admission

### participant

Array of participants in the appointment. Each participant has:

- **actor**: Reference to Patient, Practitioner, Location, or other resource
- **required**: Whether the participant is required (required, optional, information-only)
- **status**: Participation status (accepted, declined, tentative, needs-action)

### supportingInformation

References to additional resources relevant to the appointment:

- Location where the appointment occurs
- Endpoint for virtual visits (video call links)
- Related conditions or observations

### contained

Embedded resources that are only relevant within this appointment. Commonly used for:

- **Endpoint**: Virtual meeting link for telemedicine appointments
- Must have an `id` field for internal referencing
- Referenced using `#id` format

## Complete Example

```json
{
  "resourceType": "Appointment",
  "contained": [
    {
      "resourceType": "Endpoint",
      "id": "appointment-meeting-endpoint",
      "status": "active",
      "connectionType": {},
      "payloadType": [],
      "address": "https://url-for-video-chat.example.com?meetingi=abc123"
    }
  ],
  "identifier": [
    {
      "use": "usual",
      "system": "ScheduleCo",
      "value": "sched123"
    }
  ],
  "status": "proposed",
  "appointmentType": {
    "coding": [
      {
        "system": "http://snomed.info/sct",
        "code": "448337001",
        "display": "Telemedicine consultation with patient (procedure)"
      }
    ]
  },
  "description": "Weekly check-in.",
  "supportingInformation": [
    {
      "reference": "Location/{{location_id}}"
    },
    {
      "reference": "#appointment-meeting-endpoint",
      "type": "Endpoint"
    }
  ],
  "start": "2021-03-29T13:30:00.000Z",
  "end": "2021-03-29T14:00:00.000Z",
  "participant": [
    {
      "actor": {
        "reference": "Practitioner/{{practitioner_a_id}}"
      },
      "status": "accepted"
    },
    {
      "actor": {
        "reference": "Patient/{{patient_id}}"
      },
      "status": "accepted"
    }
  ]
}
```

## Usage Notes

1. **Status Workflow**: Update the appointment status as it progresses through its lifecycle:
   - Create with `proposed` or `booked`
   - Update to `arrived` when patient checks in
   - Update to `fulfilled` after completion or `noshow` if patient doesn't arrive

2. **Time Zones**: Use ISO 8601 format with timezone information (e.g., `.000Z` for UTC) for `start` and `end` times.

3. **Telemedicine**: For virtual appointments:
   - Include Endpoint resource in `contained` with the video call URL
   - Reference it in `supportingInformation`
   - Use appropriate SNOMED CT code for telemedicine in `appointmentType`

4. **Participants**: Include all relevant participants:
   - At minimum: Patient and primary Practitioner
   - Optionally: Additional practitioners, interpreters, or resources

5. **Identifiers**: Use external system identifiers to link with scheduling systems:
   ```json
   {
     "system": "YourSchedulingSystem",
     "value": "unique-appointment-id"
   }
   ```

## Common Use Cases

### In-Person Visit

```json
{
  "status": "booked",
  "appointmentType": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "185349003",
      "display": "Encounter for check up"
    }]
  },
  "supportingInformation": [
    {
      "reference": "Location/clinic-room-1"
    }
  ]
}
```

### Telemedicine Visit

```json
{
  "contained": [
    {
      "resourceType": "Endpoint",
      "id": "video-link",
      "address": "https://meet.example.com/abc123"
    }
  ],
  "appointmentType": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "448337001",
      "display": "Telemedicine consultation"
    }]
  },
  "supportingInformation": [
    {
      "reference": "#video-link",
      "type": "Endpoint"
    }
  ]
}
```

## FHIR Specification References

- [Appointment Resource](https://hl7.org/fhir/appointment.html)
- [AppointmentStatus Value Set](https://hl7.org/fhir/valueset-appointmentstatus.html)
- [Encounter Type Codes](https://hl7.org/fhir/valueset-encounter-type.html)
- [US Core Appointment Profile](https://www.hl7.org/fhir/us/core/StructureDefinition-us-core-appointment.html)
