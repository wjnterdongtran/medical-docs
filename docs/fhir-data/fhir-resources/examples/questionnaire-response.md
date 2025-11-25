# QuestionnaireResponse

Records answers to questions in a structured questionnaire.

## Resource Overview

The QuestionnaireResponse resource captures a completed questionnaire with the patient's or provider's responses. It is used for structured data capture including patient-reported outcomes, screening tools, assessments, intake forms, and other questionnaire-based data collection.

## Key Fields

### Required Fields

- **resourceType**: Must be `"QuestionnaireResponse"`
- **status**: The completion status of the questionnaire
- **questionnaire**: Reference to the Questionnaire being answered

### Important Optional Fields

- **identifier**: Business identifier for the response
- **basedOn**: Request or order fulfilled by this response
- **partOf**: Larger procedure or event
- **subject**: The subject of the questionnaire (typically Patient)
- **encounter**: Encounter during which response was collected
- **authored**: When the response was created/updated
- **author**: Who answered the questions
- **source**: The person who answered (if different from author)
- **item**: Groups and questions with answers

## Field Descriptions

### status

The status of the questionnaire response:

- **in-progress**: The questionnaire is being filled out
- **completed**: The questionnaire has been completed
- **amended**: The response has been modified after completion
- **entered-in-error**: The response was entered in error
- **stopped**: The questionnaire was stopped before completion

### questionnaire

Canonical URL or reference to the Questionnaire resource that defines the questions being answered:

```json
{
  "questionnaire": "Questionnaire/{{questionnaire_id}}"
}
```

### subject

Reference to the subject of the questionnaire:

- Patient (most common)
- Practitioner
- RelatedPerson
- Device
- Organization

### encounter

Reference to the Encounter during which the questionnaire was completed. This provides clinical context.

### authored

The date/time when the questionnaire response was authored or last updated. Should be in ISO 8601 format.

### author

Reference to the person who filled out the questionnaire:

- Patient (for patient-completed questionnaires)
- Practitioner (for clinician-completed assessments)
- PractitionerRole
- RelatedPerson (for proxy responses)
- Device (for automated/calculated responses)

### source

Reference to the person who actually answered the questions if different from the author. For example, a family member answering on behalf of a patient.

### item

The actual questions and answers. Each item contains:

- **linkId**: Unique identifier linking to the question in the Questionnaire
- **definition**: ElementDefinition URI
- **text**: Text of the question
- **answer**: Array of answers
  - **valueBoolean**: Boolean answer
  - **valueDecimal**: Decimal number answer
  - **valueInteger**: Integer answer
  - **valueDate**: Date answer
  - **valueDateTime**: Date/time answer
  - **valueTime**: Time answer
  - **valueString**: String answer
  - **valueUri**: URI answer
  - **valueAttachment**: Attachment answer
  - **valueCoding**: Coded answer
  - **valueQuantity**: Quantity answer
  - **valueReference**: Reference answer
- **item**: Nested child questions

## Answer Types

Different question types support different answer types:

### Boolean Answer

```json
{
  "answer": [{
    "valueBoolean": true
  }]
}
```

### String Answer

```json
{
  "answer": [{
    "valueString": "Patient response text"
  }]
}
```

### Coded Answer (Single)

```json
{
  "answer": [{
    "valueCoding": {
      "system": "http://snomed.info/sct",
      "code": "8517006",
      "display": "Former user"
    }
  }]
}
```

### Coded Answer (Multiple)

```json
{
  "answer": [
    {
      "valueCoding": {
        "system": "http://snomed.info/sct",
        "code": "722496004",
        "display": "Cigarettes"
      }
    },
    {
      "valueCoding": {
        "system": "http://snomed.info/sct",
        "code": "722498003",
        "display": "eCigarette"
      }
    }
  ]
}
```

### Numeric Answer

```json
{
  "answer": [{
    "valueInteger": 5
  }]
}
```

### Date Answer

```json
{
  "answer": [{
    "valueDate": "2024-01-15"
  }]
}
```

## Complete Example

```json
{
  "resourceType": "QuestionnaireResponse",
  "questionnaire": "Questionnaire/{{questionnaire_id}}",
  "status": "completed",
  "subject": {
    "reference": "Patient/{{patient_id}}",
    "type": "Patient"
  },
  "authored": "2022-12-19T18:11:20.914260+00:00",
  "author": {
    "reference": "Practitioner/{{practitioner_a_id}}",
    "type": "Practitioner"
  },
  "item": [
    {
      "linkId": "e2e5ddc3-a0ec-4a1b-9c53-bf2e2e990fe1",
      "text": "Tobacco status",
      "answer": [
        {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "8517006",
            "display": "Former user"
          }
        }
      ]
    },
    {
      "linkId": "d210dc3a-3427-4f58-8707-3f38393a8416",
      "text": "Tobacco type",
      "answer": [
        {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "722496004",
            "display": "Cigarettes"
          }
        },
        {
          "valueCoding": {
            "system": "http://snomed.info/sct",
            "code": "722498003",
            "display": "eCigarette"
          }
        }
      ]
    },
    {
      "linkId": "a656c6c8-ecea-403f-a430-f80899f26914",
      "text": "Tobacco comment",
      "answer": [
        {
          "valueString": "Yep"
        }
      ]
    }
  ]
}
```

## Usage Notes

1. **Questionnaire Reference**: Always reference the canonical Questionnaire to maintain the relationship between questions and answers.

2. **LinkId Matching**: Ensure `linkId` values in the response match the `linkId` values in the source Questionnaire.

3. **Status Management**: Update status appropriately (in-progress → completed) as the patient or clinician fills out the form.

4. **Multiple Answers**: Some questions allow multiple answers. Include each answer as a separate entry in the `answer` array.

5. **Nested Items**: For questionnaires with groups or conditional questions, use nested `item` elements.

6. **Authored Date**: Update `authored` timestamp when the response is modified.

7. **Author vs Source**: Use `author` for who recorded the response and `source` for who provided the information if different.

8. **Data Extraction**: QuestionnaireResponse data can be extracted to create other FHIR resources (Observations, Conditions, etc.).

## Common Use Cases

### Patient Screening

```json
{
  "questionnaire": "Questionnaire/phq9-depression-screening",
  "status": "completed",
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "author": {
    "reference": "Patient/{{patient_id}}"
  },
  "source": {
    "reference": "Patient/{{patient_id}}"
  }
}
```

### Clinical Assessment

```json
{
  "questionnaire": "Questionnaire/fall-risk-assessment",
  "status": "completed",
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "author": {
    "reference": "Practitioner/{{practitioner_id}}"
  }
}
```

### Intake Form

```json
{
  "questionnaire": "Questionnaire/new-patient-intake",
  "status": "completed",
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "author": {
    "reference": "Patient/{{patient_id}}"
  },
  "authored": "2024-11-25T09:30:00Z"
}
```

### SDOH Screening

```json
{
  "questionnaire": "Questionnaire/prapare-sdoh",
  "status": "completed",
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "item": [
    {
      "linkId": "housing-status",
      "text": "What is your housing situation?",
      "answer": [{
        "valueCoding": {
          "system": "http://loinc.org",
          "code": "LA31993-1",
          "display": "I have housing"
        }
      }]
    }
  ]
}
```

## Conditional/Nested Questions

Questionnaires may have conditional logic where some questions only appear based on previous answers:

```json
{
  "item": [
    {
      "linkId": "q1",
      "text": "Do you smoke?",
      "answer": [{
        "valueBoolean": true
      }]
    },
    {
      "linkId": "q1.1",
      "text": "How many cigarettes per day?",
      "answer": [{
        "valueInteger": 10
      }]
    }
  ]
}
```

## Data Extraction

QuestionnaireResponse data can be extracted to create structured FHIR resources:

- Observations (vital signs, lab values, scores)
- Conditions (diagnoses from screening)
- Procedures (procedures reported)
- MedicationStatements (medications reported)

This is typically done using the `$extract` operation or mapping defined in the Questionnaire.

## FHIR Specification References

- [QuestionnaireResponse Resource](https://hl7.org/fhir/questionnaireresponse.html)
- [Questionnaire Resource](https://hl7.org/fhir/questionnaire.html)
- [QuestionnaireResponse Status Codes](http://hl7.org/fhir/valueset-questionnaire-answers-status.html)
- [Structured Data Capture (SDC) Implementation Guide](http://hl7.org/fhir/uv/sdc/)
- [LOINC](https://loinc.org/) - Common source for standardized questionnaires
