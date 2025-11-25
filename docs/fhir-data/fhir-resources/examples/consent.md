# Consent

Records patient consent and authorization for care, treatment, or information sharing.

## Resource Overview

The Consent resource represents a patient's consent or authorization for healthcare-related activities. This includes consent for treatment, research participation, information sharing, and other healthcare activities requiring patient permission.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Consent"`
- **status**: The status of the consent
- **scope**: The scope of the consent (patient-privacy, research, treatment)
- **category**: Classification of the consent
- **patient**: Reference to the Patient who gave consent

### Important Optional Fields

- **dateTime**: When the consent was agreed to
- **performer**: Who is agreeing to the consent
- **organization**: The organization managing the consent
- **sourceAttachment**: The signed consent form or document
- **sourceReference**: Reference to a consent document
- **policy**: Specific policies the consent is based on
- **provision**: Specific provisions or exceptions in the consent
- **verification**: Evidence of verification (witnessed, signed, etc.)

## Field Descriptions

### status

The current state of the consent:

- **draft**: The consent is in draft form
- **proposed**: The consent has been proposed
- **active**: The consent is active and in effect
- **rejected**: The consent has been rejected
- **inactive**: The consent is inactive
- **entered-in-error**: The consent was entered in error

### scope

Indicates the scope or context of the consent:

- **adr**: Advanced Care Directive
- **research**: Consent for research
- **patient-privacy**: Privacy consent
- **treatment**: Consent for treatment

Uses codes from the [Consent Scope Codes](http://terminology.hl7.org/CodeSystem/consentscope) value set.

### category

Classification of the consent statement. Common categories include:

- **HIPAA Authorization**: Authorization under HIPAA
- **Information Disclosure**: Consent for information disclosure
- **Research Participation**: Consent for research
- **Treatment**: Consent for treatment
- **Advance Directive**: Advanced care directive

Can use codes from multiple value sets including LOINC and local coding systems.

### patient

Reference to the Patient resource for whom this consent applies. This is required to associate the consent with the correct patient.

### sourceAttachment

The actual consent document, typically a PDF or image:

- **contentType**: MIME type (e.g., "application/pdf", "image/jpeg")
- **data**: Base64-encoded document data
- **title**: Title or filename of the document
- **creation**: When the document was created

### provision

Provisions describe what actions are permitted or denied:

- **type**: permit or deny
- **period**: Time period when the provision applies
- **actor**: Who the provision applies to
- **action**: What actions are permitted or denied
- **purpose**: The purpose for which the action is permitted
- **data**: What data the provision applies to
- **provision**: Nested sub-provisions for complex consents

### verification

Evidence that the consent was verified:

- **verified**: Whether the consent has been verified
- **verifiedWith**: Who verified the consent
- **verificationDate**: When the verification occurred

## Complete Example

```json
{
  "resourceType": "Consent",
  "status": "active",
  "scope": {},
  "category": [
    {
      "coding": [
        {
          "system": "ConsentCoding_System_ConfigureInAdmin",
          "code": "ConsentCoding_Code_ConfigureInAdmin",
          "display": "ConsentCoding_Display_ConfigureInAdmin"
        }
      ]
    }
  ],
  "patient": {
    "reference": "Patient/{{patient_id}}"
  },
  "sourceAttachment": {
    "contentType": "application/pdf",
    "data": "JVBERi0xLjYKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nCXKuwqEQAxG4T5P8dcLxiS6MyMMUwha2AkBi8VuL52gja+/gpzia46w4qQdAmGxhKDKXVTE7vb40PLAdh9Xx496p2fghGgtB/gb9ahQg39fWbSElMWKZmlKZVnasvpEg9NMM/7+cxdrCmVuZHN0cmVhbQplbmRvYmoKCjMgMCBvYmoKMTA2CmVuZG9iago...(truncated for brevity)",
    "title": "UploadTest.pdf"
  },
  "provision": {
    "period": {
      "start": "2022-05-15",
      "end": "2022-10-10"
    }
  }
}
```

## Usage Notes

1. **Required Documentation**: Always attach the actual signed consent document using `sourceAttachment` for legal and compliance purposes.

2. **Active Status**: Set status to "active" only when the consent is fully executed and in effect.

3. **Time Periods**: Use `provision.period` to specify when the consent is valid. This is critical for time-limited consents.

4. **Granular Permissions**: Use nested `provision` elements to create complex consent scenarios with specific permissions and restrictions.

5. **Revocation**: When a patient revokes consent, update the status to "inactive" and document the revocation date.

6. **HIPAA Compliance**: For US healthcare, ensure consent resources comply with HIPAA authorization requirements.

7. **Verification**: Document who verified the consent and when, especially for witnessed consents.

8. **Multiple Consents**: A patient may have multiple active consents for different purposes (treatment, research, information sharing).

## Common Consent Types

### Treatment Consent

```json
{
  "scope": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/consentscope",
      "code": "treatment"
    }]
  }
}
```

### Research Consent

```json
{
  "scope": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/consentscope",
      "code": "research"
    }]
  }
}
```

### Privacy Consent

```json
{
  "scope": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/consentscope",
      "code": "patient-privacy"
    }]
  }
}
```

## FHIR Specification References

- [Consent Resource](https://hl7.org/fhir/consent.html)
- [Consent Scope Codes](http://terminology.hl7.org/CodeSystem/consentscope)
- [Consent State Codes](http://hl7.org/fhir/consent-state-codes)
- [Consent Category Codes](http://terminology.hl7.org/ValueSet/consent-category)
