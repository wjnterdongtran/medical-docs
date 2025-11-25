# Communication

Records communications between healthcare participants, including messages, phone calls, and other interactions.

## Resource Overview

The Communication resource represents a record of information transmitted from one entity to another. This can include phone calls, messages, emails, or other forms of communication between healthcare participants and patients.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Communication"`
- **status**: The status of the communication

### Important Optional Fields

- **sent**: When the communication was sent
- **received**: When the communication was received
- **recipient**: Who received the communication
- **sender**: Who sent the communication
- **payload**: The actual communication content
- **subject**: The patient or subject of the communication
- **encounter**: The encounter during which the communication occurred
- **category**: Type of communication (notification, reminder, alert)
- **medium**: The channel used (phone, email, SMS, in-person)
- **priority**: Urgency of the communication (routine, urgent, asap, stat)
- **topic**: The focus or subject matter
- **note**: Additional notes about the communication

## Field Descriptions

### status

The status of the transmission:

- **preparation**: The communication is being prepared
- **in-progress**: The communication is ongoing
- **not-done**: The communication was not done
- **on-hold**: The communication has been paused
- **stopped**: The communication was stopped
- **completed**: The communication has been completed
- **entered-in-error**: The communication was entered in error
- **unknown**: The status is unknown

### sent

The date/time when the communication was sent. Should be in ISO 8601 format with timezone information.

### received

The date/time when the communication was received. Should be in ISO 8601 format with timezone information.

### recipient

References to the entities that received the communication. Can be:

- Patient
- Practitioner
- PractitionerRole
- RelatedPerson
- Group
- Organization
- CareTeam
- HealthcareService

Multiple recipients can be specified in an array.

### sender

Reference to the entity that sent the communication. Can be the same types as recipient.

### payload

The actual content of the communication:

- **contentString**: Simple text content
- **contentAttachment**: File attachment (document, image, etc.)
- **contentReference**: Reference to another resource

Multiple payloads can be included in a single communication.

### category

Classification of the communication:

- **notification**: Notification
- **reminder**: Reminder
- **alert**: Alert
- **instruction**: Instruction

Uses codes from the [Communication Category](http://terminology.hl7.org/CodeSystem/communication-category) value set.

### medium

The channel or mechanism used:

- Phone call
- Email
- SMS/Text message
- In-person conversation
- Video call
- Fax
- Mail

Uses codes from various value sets including v3-ParticipationMode.

### priority

Indicates the urgency:

- **routine**: Routine priority
- **urgent**: Urgent priority
- **asap**: As soon as possible
- **stat**: Immediate/STAT priority

## Complete Example

```json
{
  "resourceType": "Communication",
  "status": "unknown",
  "sent": "2022-02-10T13:30:00.000Z",
  "received": "2022-02-10T13:30:00.000Z",
  "recipient": [
    {
      "reference": "Patient/{{patient_id}}"
    }
  ],
  "sender": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "payload": [
    {
      "contentString": "Testing out this Communication"
    }
  ]
}
```

## Usage Notes

1. **Status Management**: Always set an appropriate status. Use "unknown" only when the actual status cannot be determined.

2. **Timestamps**: Include both `sent` and `received` timestamps when available to track communication timing accurately.

3. **Multiple Recipients**: You can specify multiple recipients in the `recipient` array for group communications.

4. **Content Types**: Use `contentString` for simple text messages, `contentAttachment` for documents or images, and `contentReference` to link to other FHIR resources.

5. **Patient Communications**: When communicating with patients, always include the Patient reference in either `sender` or `recipient`.

6. **Audit Trail**: Communication resources serve as an audit trail of interactions and should be created even for informal communications that are clinically relevant.

7. **Privacy Considerations**: Be mindful of PHI (Protected Health Information) in communication content. Ensure appropriate consent and authorization.

8. **Integration**: Communication resources can be linked to encounters, care plans, and tasks to provide context.

## Common Use Cases

- **Patient Messaging**: Record messages sent to or received from patients
- **Care Coordination**: Document communications between care team members
- **Appointment Reminders**: Track automated or manual appointment reminders
- **Test Results**: Record notification of test results to patients
- **Care Instructions**: Document discharge instructions or care plan communications
- **Referrals**: Track communication related to patient referrals

## FHIR Specification References

- [Communication Resource](https://hl7.org/fhir/communication.html)
- [Communication Category Codes](http://terminology.hl7.org/CodeSystem/communication-category)
- [Event Status Codes](http://hl7.org/fhir/event-status)
