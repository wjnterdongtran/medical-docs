# FHIR Request Body JSON Export

This file contains all the `body:json` content from Create/Add `.bru` files.

---

## AllergyIntolerance - Create AllergyIntolerance

```json
{
  "resourceType": "AllergyIntolerance",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
        "code": "active",
        "display": "Active"
      }
    ],
    "text": "Active"
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
        "code": "confirmed",
        "display": "Confirmed"
      }
    ],
    "text": "Confirmed"
  },
  "type": "allergy",
  "code": {
    "coding": [
      {
        "system": "http://www.fdbhealth.com/",
        "code": "2-15588",
        "display": "Allergy Medicine"
      }
    ],
    "text": "Allergy Medicine"
  },
  "patient": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "onsetDateTime": "2023-06-15",
  "recorder": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "lastOccurrence": "2023-06-17",
  "note": [
    {
      "text": "AllergyIntolerance note"
    }
  ],
  "reaction": [
    {
      "manifestation": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/data-absent-reason",
              "code": "unknown",
              "display": "Unknown"
            }
          ],
          "text": "Unknown"
        }
      ],
      "severity": "moderate"
    }
  ]
}
```

---

## Appointment - Create Appointment

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

---

## Claim - Create Claim

```json
{
  "resourceType": "Claim",
  "extension": [
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/claim-queue",
      "valueCoding": {
        "system": "http://canvasmedical.com",
        "code": "NeedsClinicianReview",
        "display": "Clinician"
      }
    }
  ],
  "status": "active",
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/claim-type",
        "code": "professional",
        "display": "Professional"
      }
    ]
  },
  "use": "claim",
  "patient": {
    "reference": "Patient/{{patient_id}}",
    "type": "Patient"
  },
  "created": "2020-08-16",
  "provider": {
    "reference": "Practitioner/{{practitioner_a_id}}",
    "type": "Practitioner"
  },
  "priority": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/processpriority",
        "code": "normal",
        "display": "Normal"
      }
    ]
  },
  "supportingInfo": [
    {
      "sequence": 1,
      "category": {
        "coding": [
          {
            "code": "patientreasonforvisit",
            "system": "http://terminology.hl7.org/CodeSystem/claiminformationcategory",
            "display": "Patient Reason for Visit"
          }
        ]
      },
      "valueString": "Does not feel well - cough and fever"
    }
  ],
  "diagnosis": [
    {
      "sequence": 1,
      "diagnosisCodeableConcept": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/sid/icd-10-cm",
            "code": "H9190",
            "display": "Unspecified hearing loss, unspecified ear"
          }
        ]
      }
    },
    {
      "sequence": 2,
      "diagnosisCodeableConcept": {
        "coding": [
          {
            "system": "http://hl7.org/fhir/sid/icd-10-cm",
            "code": "R0602",
            "display": "Shortness of breath"
          }
        ]
      }
    }
  ],
  "insurance": [
    {
      "sequence": 1,
      "focal": true,
      "coverage": {
        "reference": "Coverage/{{coverage_id}}",
        "type": "Coverage"
      }
    }
  ],
  "item": [
    {
      "sequence": 1,
      "diagnosisSequence": [1, 2],
      "productOrService": {
        "coding": [
          {
            "system": "http://www.ama-assn.org/go/cpt",
            "code": "99213",
            "display": "OFFICE OUTPATIENT VISIT 15 MINUTES"
          }
        ]
      },
      "modifier": [
        {
          "coding": [
            {
              "system": "https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets",
              "code": "25"
            }
          ]
        }
      ],
      "servicedDate": "2023-12-05",
      "quantity": {
        "value": 1
      },
      "unitPrice": {
        "value": 100.0
      },
      "net": {
        "value": 100.0
      }
    },
    {
      "sequence": 2,
      "diagnosisSequence": [2],
      "productOrService": {
        "coding": [
          {
            "system": "http://www.ama-assn.org/go/cpt",
            "code": "90715",
            "display": "TDAP VACCINE 7 YRS/> IM"
          }
        ]
      },
      "servicedDate": "2023-12-05",
      "quantity": {
        "value": 1
      },
      "unitPrice": {
        "value": 0.0
      },
      "net": {
        "value": 0
      }
    }
  ]
}
```

---

## Claim - Add activity log item

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "comment",
      "valueString": "Comment added to claim activity log"
    }
  ]
}
```

---

## Communication - Create Communication

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

---

## Condition - Create Condition

```json
{
  "resourceType": "Condition",
  "clinicalStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
        "code": "resolved",
        "display": "Resolved"
      }
    ],
    "text": "Resolved"
  },
  "verificationStatus": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
        "code": "confirmed",
        "display": "Confirmed"
      }
    ],
    "text": "Confirmed"
  },
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/condition-category",
          "code": "encounter-diagnosis",
          "display": "Encounter Diagnosis"
        }
      ],
      "text": "Encounter Diagnosis"
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/icd-10-cm",
        "code": "V97.21XS",
        "display": "Parachutist entangled in object, sequela"
      }
    ],
    "text": "Parachutist entangled in object, sequela"
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "onsetDateTime": "2023-06-15",
  "abatementDateTime": "2023-06-17",
  "recordedDate": "2023-06-18T15:00:00-04:00",
  "recorder": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "note": [
    {
      "text": "Condition note"
    }
  ]
}
```

---

## Consent - Create Consent

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

---

## Coverage - Create Coverage

```json
{
  "resourceType": "Coverage",
  "identifier": [
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "MB",
            "display": "Member Number"
          }
        ]
      },
      "value": "1234"
    }
  ],
  "status": "active",
  "type": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "MILITARY",
        "display": "military health program"
      }
    ],
    "text": "Military"
  },
  "subscriber": {
    "reference": "Patient/{{patient_id}}"
  },
  "subscriberId": "123",
  "beneficiary": {
    "reference": "Patient/{{patient_id}}"
  },
  "relationship": {
    "coding": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
        "code": "self"
      }
    ]
  },
  "period": {
    "start": "2021-06-27"
  },
  "payor": [
    {
      "identifier": {
        "system": "https://www.claim.md/services/era/",
        "value": "AMM03"
      },
      "display": "Independence Blue Cross Blue Shield"
    }
  ],
  "class": [
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "group"
          }
        ]
      },
      "value": "Captains Only"
    },
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "subgroup"
          }
        ]
      },
      "value": "Subgroup 2"
    },
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "plan"
          }
        ]
      },
      "value": "Starfleet HMO"
    },
    {
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
            "code": "subplan"
          }
        ]
      },
      "value": "Stars Subplan"
    }
  ],
  "order": 1
}
```

---

## CoverageEligibilityRequest - Create CoverageEligibilityRequest

```json
{
  "resourceType": "CoverageEligibilityRequest",
  "status": "active",
  "purpose": ["benefits"],
  "patient": {
    "reference": "Patient/{{patient_id}}"
  },
  "created": "2024-02-13T02:53:00-04:00",
  "insurer": {},
  "insurance": [
    {
      "focal": true,
      "coverage": {
        "reference": "Coverage/{{coverage_id}}"
      }
    }
  ]
}
```

---

## DetectedIssue - Create DetectedIssue

```json
{
  "resourceType": "DetectedIssue",
  "identifier": [
    {
      "system": "http://external.identifier.system/url",
      "value": "080abebd"
    }
  ],
  "status": "preliminary",
  "code": {
    "coding": [
      {
        "system": "https://terminology.hl7.org/CodeSystem/v3-ActCode",
        "code": "CODINGGAP",
        "display": "Codinggap"
      }
    ],
    "text": "Codinggap"
  },
  "severity": "moderate",
  "patient": {
    "reference": "Patient/{{patient_id}}",
    "type": "Patient"
  },
  "identifiedDateTime": "2024-08-10T14:23:08+00:00",
  "author": {
    "reference": "Practitioner/{{practitioner_a_id}}",
    "type": "Practitioner"
  },
  "evidence": [
    {
      "code": [
        {
          "coding": [
            {
              "system": "http://hl7.org/fhir/sid/icd-10-cm",
              "code": "V97.21XS",
              "display": "Parachutist entangled in object, sequela"
            }
          ]
        }
      ]
    }
  ],
  "detail": "Detail for detected issue",
  "reference": "https://example.com",
  "mitigation": [
    {
      "action": {
        "coding": [
          {
            "system": "https://schemas.canvasmedical.com/fhir/detectedissue-mitigation-action",
            "code": "valid"
          }
        ]
      },
      "date": "2024-08-09T14:23:08+00:00",
      "author": {
        "reference": "Practitioner/{{practitioner_b_id}}",
        "type": "Practitioner"
      }
    }
  ]
}
```

---

## DiagnosticReport - Create lab report

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "labReport",
      "resource": {
        "resourceType": "DiagnosticReport",
        "status": "final",
        "category": [
          {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v2-0074",
                "code": "LAB",
                "display": "Laboratory"
              }
            ]
          }
        ],
        "subject": {
          "reference": "Patient/4cc6fd69f81042a0b6d123e2080a7c1a",
          "type": "Patient"
        },
        "presentedForm": [
          {
            "data": "(base64 encoded PDF data - truncated)",
            "contentType": "application/pdf"
          }
        ],
        "effectiveDateTime": "2024-02-25T14:46:39.219042",
        "code": {
          "coding": []
        }
      }
    },
    {
      "name": "labTestCollection",
      "part": [
        {
          "name": "labTest",
          "resource": {
            "resourceType": "Observation",
            "code": {
              "text": "Hepatic Function Panel (7)",
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "24325-3",
                  "display": "Hepatic Function Panel (7)"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "status": "final"
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "coding": [
                {
                  "system": "http://loinc.org",
                  "code": "2885-2",
                  "display": "Protein, Total"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "value": "9.6",
              "unit": "g/dL",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "6.0" },
                "high": { "value": "8.5" },
                "text": "6.0-8.5"
              }
            ],
            "interpretation": [
              {
                "text": "Abnormal",
                "coding": [
                  {
                    "code": "A",
                    "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    "display": "Abnormal"
                  }
                ]
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "coding": [
                {
                  "code": "1751-7",
                  "system": "http://loinc.org",
                  "display": "Albumin"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "g/dL",
              "value": "3.8",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "3.6" },
                "high": { "value": "4.6" },
                "text": "3.6-4.6"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "Bilirubin, Total",
              "coding": [
                {
                  "code": "1975-2",
                  "system": "http://loinc.org",
                  "display": "Bilirubin, Total"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "mg/dL",
              "value": "0.3",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "0.0" },
                "high": { "value": "1.2" },
                "text": "0.0-1.2"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "Alkaline Phosphatase",
              "coding": [
                {
                  "code": "6768-6",
                  "system": "http://loinc.org",
                  "display": "Alkaline Phosphatase"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "IU/L",
              "value": "83.6",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "44.0" },
                "high": { "value": "121.0" },
                "text": "44-121"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "AST (SGOT)",
              "coding": [
                {
                  "code": "1920-8",
                  "system": "http://loinc.org",
                  "display": "AST (SGOT)"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "IU/L",
              "value": "19.4",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "0.0" },
                "high": { "value": "40.0" },
                "text": "0-40"
              }
            ]
          }
        },
        {
          "name": "labValue",
          "resource": {
            "resourceType": "Observation",
            "status": "final",
            "code": {
              "text": "ALT (SGPT)",
              "coding": [
                {
                  "code": "1742-6",
                  "system": "http://loinc.org",
                  "display": "ALT (SGPT)"
                }
              ]
            },
            "effectiveDateTime": "2024-01-11T17:37:30.756832+00:00",
            "valueQuantity": {
              "unit": "IU/L",
              "value": "13.5",
              "system": "http://unitsofmeasure.org"
            },
            "referenceRange": [
              {
                "low": { "value": "0.0" },
                "high": { "value": "44.0" },
                "text": "0-44"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

---

## DocumentReference - Create DocumentReference

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

---

## Group - Create Group - Patient Group

```json
{
  "resourceType": "Group",
  "type": "person",
  "actual": true,
  "name": "A Test Patient Group",
  "member": [
    {
      "entity": {
        "reference": "Patient/{{patient_id}}",
        "type": "Patient"
      }
    }
  ]
}
```

---

## Group - Create Group - Team

```json
{
  "resourceType": "Group",
  "type": "practitioner",
  "actual": true,
  "name": "A Test Team",
  "characteristic": [
    {
      "exclude": false,
      "code": {
        "text": "responsibility"
      },
      "valueCodeableConcept": {
        "text": "COLLECT_SPECIMENS_FROM_PATIENT"
      }
    }
  ],
  "member": [
    {
      "entity": {
        "reference": "Practitioner/{{practitioner_a_id}}",
        "type": "Practitioner"
      }
    }
  ]
}
```

---

## Immunization - Create Immunization

```json
{
  "resourceType": "Immunization",
  "status": "completed",
  "vaccineCode": {
    "coding": [
      {
        "system": "http://hl7.org/fhir/sid/cvx",
        "code": "40",
        "display": "rabies, intradermal injection"
      },
      {
        "system": "http://www.ama-assn.org/go/cpt",
        "code": "90676",
        "display": "RABIES VACCINE INTRADERMAL"
      }
    ]
  },
  "patient": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "occurrenceDateTime": "2024-08-01",
  "primarySource": false
}
```

---

## Media - Create Media

```json
{
  "resourceType": "Media",
  "status": "completed",
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "encounter": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "operator": {
    "reference": "Practitioner/{{practitioner_a_id}}"
  },
  "content": {
    "contentType": "image/jpeg",
    "data": "(base64 encoded image data - truncated)",
    "title": "Image title"
  },
  "note": [
    {
      "text": "Note #1"
    },
    {
      "text": "Note #2"
    }
  ]
}
```

---

## MedicationStatement - Create MedicationStatement

```json
{
  "resourceType": "MedicationStatement",
  "status": "active",
  "medicationReference": {
    "reference": "Medication/fdb-449732",
    "display": "Tylenol PM Extra Strength 25 mg-500 mg tablet"
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "context": {
    "reference": "Encounter/{{encounter_id}}"
  },
  "effectivePeriod": {
    "start": "2023-06-15T15:00:00-04:00",
    "end": "2023-06-25T15:00:00-04:00"
  },
  "dosage": [
    {
      "text": "1-2 tablets once daily at bedtime as needed for restless legs"
    }
  ]
}
```

---

## Observation - Create Observation - w/ components

```json
{
  "resourceType": "Observation",
  "status": "unknown",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85354-9",
        "display": "BP"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "effectiveDateTime": "2022-06-01T08:50:24.883809+00:00",
  "derivedFrom": [
    {
      "reference": "Observation/{{observation_id}}"
    }
  ],
  "component": [
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8480-6",
            "display": "BP - Systolic"
          }
        ]
      },
      "valueQuantity": {
        "value": 100
      }
    },
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "8462-4",
            "display": "BP - Diastole"
          }
        ]
      },
      "valueQuantity": {
        "value": 80
      }
    }
  ]
}
```

---

## Observation - Create Observation - w/o components

```json
{
  "resourceType": "Observation",
  "status": "unknown",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "29463-7",
        "display": "Weight"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "effectiveDateTime": "2022-09-29T08:50:24.883809+00:00",
  "valueQuantity": {
    "value": 50,
    "unit": "kg"
  },
  "derivedFrom": [
    {
      "reference": "Observation/{{observation_id}}"
    }
  ]
}
```

---

## Observation - Create Observation - panel

```json
{
  "resourceType": "Observation",
  "status": "unknown",
  "category": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/observation-category",
          "code": "vital-signs",
          "display": "Vital Signs"
        }
      ]
    }
  ],
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "85353-1",
        "display": "Vital Panel"
      }
    ]
  },
  "subject": {
    "reference": "Patient/{{patient_id}}"
  },
  "effectiveDateTime": "2022-08-29T08:50:24.883809+00:00",
  "hasMember": [
    {
      "reference": "Observation/{{observation_id}}"
    },
    {
      "reference": "Observation/{{observation_id}}"
    }
  ]
}
```

---

## Patient - Create Patient

```json
{
  "resourceType": "Patient",
  "extension": [
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
      "valueCode": "M"
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-sex",
      "valueCode": "248153007"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/preferred-pharmacy",
      "extension": [
        {
          "url": "ncpdp-id",
          "valueIdentifier": {
            "value": "1123152",
            "system": "http://terminology.hl7.org/CodeSystem/NCPDPProviderIdentificationNumber"
          }
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity",
      "extension": [
        {
          "url": "text",
          "valueString": "UNK"
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race",
      "extension": [
        {
          "url": "text",
          "valueString": "UNK"
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-tribal-affiliation",
      "extension": [
        {
          "url": "tribalAffiliation",
          "valueCodeableConcept": {
            "coding": [
              {
                "system": "http://terminology.hl7.org/CodeSystem/v3-TribalEntityUS",
                "code": "187",
                "display": "Paiute-Shoshone Tribe of the Fallon Reservation and Colony, Nevada"
              }
            ]
          }
        }
      ]
    },
    {
      "url": "http://hl7.org/fhir/StructureDefinition/tz-code",
      "valueCode": "America/New_York"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/clinical-note",
      "valueString": "I am a clinical caption from a Create message"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/administrative-note",
      "valueString": "I am an administrative caption from a Create message"
    }
  ],
  "identifier": [
    {
      "use": "usual",
      "system": "HealthCo",
      "value": "s07960990"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Bahar",
      "given": ["Issam", "Khuzaimah"]
    },
    {
      "use": "nickname",
      "given": ["Nick Name"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "5554320555",
      "use": "mobile",
      "rank": 1
    },
    {
      "system": "email",
      "value": "i.k.bahar@example.com",
      "use": "work",
      "rank": 1
    }
  ],
  "gender": "male",
  "birthDate": "1949-11-13",
  "address": [
    {
      "use": "home",
      "type": "both",
      "text": "4247 Murry Street, Chesapeake, VA 23322",
      "line": ["4247 Murry Street"],
      "city": "Chesapeake",
      "state": "VA",
      "postalCode": "23322"
    }
  ],
  "contact": [
    {
      "name": {
        "text": "Test Spouse"
      },
      "telecom": [
        {
          "system": "email",
          "value": "test@me.com"
        }
      ],
      "relationship": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
          "code": "SPS",
          "display": "spouse"
        },
        {
          "system": "http://schemas.canvasmedical.com/fhir/contact-category",
          "code": "EMC",
          "display": "Emergency contact"
        }
      ]
    },
    {
      "name": {
        "text": "Test Mom"
      },
      "telecom": [
        {
          "system": "phone",
          "value": "7177327068"
        }
      ]
    },
    {
      "name": {
        "text": "Test Email"
      },
      "telecom": [
        {
          "system": "email",
          "value": "test.email@email.test"
        }
      ],
      "relationship": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
          "code": "MTH",
          "display": "mother"
        },
        {
          "system": "http://schemas.canvasmedical.com/fhir/contact-category",
          "code": "ARI",
          "display": "Authorized for release of information"
        }
      ]
    }
  ],
  "communication": [
    {
      "language": {
        "coding": [
          {
            "system": "urn:ietf:bcp:47",
            "code": "en",
            "display": "English"
          }
        ],
        "text": "English"
      }
    }
  ]
}
```

---

## PaymentNotice - Create PaymentNotice

```json
{
  "resourceType": "PaymentNotice",
  "status": "active",
  "request": {
    "reference": "Patient/5350cd20de8a470aa570a852859ac87e"
  },
  "created": "2014-08-16",
  "payment": {},
  "recipient": {},
  "amount": {
    "value": 10.0,
    "currency": "USD"
  }
}
```

---

## Practitioner - Create Practitioner

```json
{
  "resourceType": "Practitioner",
  "extension": [
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-user-username",
      "valueString": "jgeorge"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-personal-meeting-room-link",
      "valueUrl": "https://meet.google.com/room-001"
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-primary-practice-location",
      "valueReference": {
        "reference": "Location/{{location_id}}"
      }
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/practitioner-signature",
      "valueAttachment": {
        "data": "(base64 encoded signature image - truncated)"
      }
    },
    {
      "url": "http://schemas.canvasmedical.com/fhir/extensions/roles",
      "extension": [
        {
          "url": "code",
          "valueCoding": {
            "system": "http://schemas.canvasmedical.com/fhir/roles",
            "code": "MD"
          }
        },
        {
          "url": "code",
          "valueCoding": {
            "system": "http://schemas.canvasmedical.com/fhir/roles",
            "code": "DO"
          }
        }
      ]
    }
  ],
  "identifier": [
    {
      "system": "http://hl7.org/fhir/sid/us-npi",
      "value": "646460931"
    }
  ],
  "name": [
    {
      "use": "usual",
      "family": "George",
      "given": ["Joshua"]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "5558675309",
      "use": "mobile",
      "rank": 1
    },
    {
      "system": "phone",
      "value": "5551234567",
      "use": "work",
      "rank": 1
    },
    {
      "system": "email",
      "value": "jgeorge@example.net",
      "use": "work",
      "rank": 1
    }
  ],
  "address": [
    {
      "use": "work",
      "type": "both",
      "line": ["428 Stephen Circles"],
      "city": "North Alyssa",
      "state": "HI",
      "postalCode": "96693",
      "country": "United States"
    },
    {
      "use": "work",
      "type": "both",
      "line": ["59805 Raymond Terrace"],
      "city": "West Bethhaven",
      "state": "MA",
      "postalCode": "89511",
      "country": "United States"
    }
  ],
  "birthDate": "1990-05-04",
  "photo": [
    {
      "url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Dr._Strangelove.png",
      "title": "Profile photo 1"
    },
    {
      "url": "https://images.halloweencostumes.com/products/82273/1-1/pet-doctor-costume.jpg"
    }
  ],
  "qualification": [
    {
      "identifier": [
        {
          "system": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-url",
          "value": "A60695"
        }
      ],
      "code": {
        "text": "License"
      },
      "period": {
        "start": "2020-01-01",
        "end": "2024-05-05"
      },
      "issuer": {
        "display": "MEDICAL BOARD OF MASSACHUSETTS (LONG NAME)",
        "extension": [
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-short-name",
            "valueString": "MEDICAL BOARD OF MASSACHUSETTS"
          },
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/issuing-authority-state",
            "valueString": "CA"
          },
          {
            "url": "http://schemas.canvasmedical.com/fhir/extensions/license-primary",
            "valueBoolean": true
          }
        ]
      }
    }
  ]
}
```

---

## QuestionnaireResponse - Create QuestionnaireResponse

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

---

## Task - Create Task

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
