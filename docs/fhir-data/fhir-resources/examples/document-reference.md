# DocumentReference

Records references to clinical documents and their metadata.

## Resource Overview

The DocumentReference resource provides a reference to a document of any kind for any purpose. It is used to index and make retrievable clinical documents such as progress notes, discharge summaries, imaging reports, consent forms, and other healthcare-related documents. The document can be stored within the resource as base64 data or referenced externally.

## Key Fields

### Required Fields

- **resourceType**: Must be `"DocumentReference"`
- **status**: The status of the document reference
- **content**: The document and format

### Important Optional Fields

- **identifier**: Business identifier for the document
- **type**: Type of document (LOINC code)
- **category**: Categorization of document
- **subject**: Reference to the Patient
- **date**: When the reference was created
- **author**: Who created the document
- **authenticator**: Who authenticated the document
- **custodian**: Organization maintaining the document
- **relatesTo**: Relationships to other documents
- **description**: Human-readable description
- **securityLabel**: Document security classification
- **context**: Clinical context of document
- **extension**: Custom extensions for additional metadata

## Field Descriptions

### status

The status of the document reference:

- **current**: The document is current and active
- **superseded**: The document has been replaced by a newer version
- **entered-in-error**: The document reference was created in error

### type

Precise type of document using LOINC codes. Common types include:

- **34109-9**: Note
- **18842-5**: Discharge summary
- **11488-4**: Consultation note
- **11506-3**: Progress note
- **34117-2**: History and physical note
- **57133-1**: Referral note

Uses codes from the [LOINC Document Types](http://loinc.org) value set.

### category

High-level categorization of the document:

- **clinical-note**: Clinical Note
- **procedure-note**: Procedure Note
- **progress-note**: Progress Note
- **summary**: Summary Document
- **report**: Report
- **consult**: Consult Note
- **uncategorizedclinicaldocument**: Uncategorized Clinical Document

May use codes from custom systems or US Core Document Category codes.

### subject

Reference to the Patient (or Group) that the document is about. This is essential for associating the document with the correct patient record.

### date

When this document reference was created. This is different from when the document itself was created.

### author

References to who and/or what authored the document:

- Practitioner
- PractitionerRole
- Organization
- Device
- Patient
- RelatedPerson

Multiple authors can be specified.

### authenticator

Reference to the organization or practitioner who has authenticated the document. This is typically used for formally signed documents.

### description

Human-readable description of the document to help users understand the content without opening it.

### content

The document content and format information:

- **attachment**: The document itself
  - **contentType**: MIME type (application/pdf, text/plain, image/jpeg, etc.)
  - **data**: Base64-encoded document data
  - **url**: URL where document can be retrieved
  - **size**: Size in bytes
  - **hash**: SHA-1 hash of the data
  - **title**: Label for the document
  - **creation**: When the attachment was created
- **format**: Format/content type beyond MIME type

### context

Clinical context of the document:

- **encounter**: Encounter during which document was created
- **event**: Kind of facility where patient was seen
- **period**: Time of service documented
- **facilityType**: Kind of facility (hospital, clinic, etc.)
- **practiceSetting**: Additional practice setting (cardiology, family practice, etc.)
- **sourcePatientInfo**: Patient demographics at time of document creation
- **related**: Related identifiers or resources

### relatesTo

Relationships to other document references:

- **code**: Type of relationship (replaces, transforms, signs, appends)
- **target**: Reference to related DocumentReference

### Custom Extensions

#### Document Comment

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/document-reference-comment",
  "valueString": "Comment text"
}
```

#### Clinical Date

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/document-reference-clinical-date",
  "valueDate": "2024-04-01"
}
```

#### Review Mode

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/document-reference-review-mode",
  "valueCode": "RN"
}
```

#### Reviewer

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/document-reference-reviewer",
  "valueReference": {
    "reference": "Practitioner/{{practitioner_id}}"
  }
}
```

#### Priority Flag

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/document-reference-priority",
  "valueBoolean": true
}
```

#### Requires Signature

```json
{
  "url": "http://schemas.canvasmedical.com/fhir/document-reference-requires-signature",
  "valueBoolean": true
}
```

## Complete Example

```json
{
  "resourceType": "DocumentReference",
  "extension": [
    {
      "url": "http://schemas.canvasmedical.com/fhir/document-reference-comment",
      "valueString": "Some comment on Document"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/document-reference-clinical-date",
      "valueDate": "2024-04-01"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/document-reference-review-mode",
      "valueCode": "RN"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/document-reference-reviewer",
      "valueReference": {
        "reference": "Practitioner/{{practitioner_a_id}}",
        "type": "Practitioner"
      }
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/document-reference-priority",
      "valueBoolean": true
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/document-reference-requires-signature",
      "valueBoolean": true
    }
  ],
  "status": "current",
  "type": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "34109-9"
      }
    ]
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://schemas.canvasmedical.com/fhir/document-reference-category",
          "code": "uncategorizedclinicaldocument"
        }
      ]
    }
  ],
  "subject": {
    "reference": "Patient/{{patient_id}}",
    "type": "Patient"
  },
  "author": [
    {
      "reference": "Practitioner/{{practitioner_a_id}}",
      "type": "Practitioner"
    }
  ],
  "description": "Uncategorized Clinical Document",
  "content": [
    {
      "attachment": {
        "contentType": "application/pdf",
        "data": "JVBERi0xLjIgCjkgMCBvYmoKPDwKPj4Kc3RyZWFtCkJULyAzMiBUZiggIFlPVVIgVEVYVCBIRVJFICAgKScgRVQKZW5kc3RyZWFtCmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgNSAwIFIKL0NvbnRlbnRzIDkgMCBSCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9LaWRzIFs0IDAgUiBdCi9Db3VudCAxCi9UeXBlIC9QYWdlcwovTWVkaWFCb3ggWyAwIDAgMjUwIDUwIF0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1BhZ2VzIDUgMCBSCi9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iagp0cmFpbGVyCjw8Ci9Sb290IDMgMCBSCj4+CiUlRU9G"
      }
    }
  ]
}
```

## Usage Notes

1. **Document Storage**: Store small documents (&lt;1MB) as base64 in the `data` field. For larger documents, use external storage and provide a `url`.

2. **LOINC Coding**: Use LOINC codes for the `type` field to ensure interoperability and standardized document classification.

3. **Categorization**: Properly categorize documents using the `category` field to enable filtering and organization.

4. **Patient Association**: Always include the `subject` reference to associate the document with the correct patient.

5. **Authorship**: Include `author` references to track who created the document for accountability and auditing.

6. **Versioning**: When a document is updated, create a new DocumentReference with status "current" and update the old one to "superseded". Use `relatesTo` to link them.

7. **Security**: Use `securityLabel` to mark documents with special handling requirements (confidential, restricted, etc.).

8. **Context**: Include `context.encounter` to associate the document with a specific visit or episode of care.

## Common Document Types

### Progress Note

```json
{
  "type": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "11506-3",
      "display": "Progress note"
    }]
  },
  "category": [{
    "coding": [{
      "code": "progress-note"
    }]
  }]
}
```

### Discharge Summary

```json
{
  "type": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "18842-5",
      "display": "Discharge summary"
    }]
  },
  "category": [{
    "coding": [{
      "code": "summary"
    }]
  }]
}
```

### Consent Form

```json
{
  "type": {
    "coding": [{
      "system": "http://loinc.org",
      "code": "64292-6",
      "display": "Consent"
    }]
  },
  "category": [{
    "coding": [{
      "code": "consent"
    }]
  }]
}
```

## FHIR Specification References

- [DocumentReference Resource](https://hl7.org/fhir/documentreference.html)
- [US Core DocumentReference Profile](https://hl7.org/fhir/us/core/StructureDefinition-us-core-documentreference.html)
- [LOINC Document Ontology](https://loinc.org/document-ontology/)
- [Document Relationship Type Codes](http://hl7.org/fhir/valueset-document-relationship-type.html)
