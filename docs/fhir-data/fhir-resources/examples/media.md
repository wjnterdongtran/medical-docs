# Media

Records photos, videos, and audio recordings related to patient care.

## Resource Overview

The Media resource is used to capture photos, videos, and audio recordings acquired or used in healthcare. This includes wound photos, dermoscopy images, ultrasound clips, procedure videos, and audio recordings. Media resources can be standalone or referenced from other clinical resources.

## Key Fields

### Required Fields

- **resourceType**: Must be `"Media"`
- **status**: The current state of the media
- **content**: The actual media content

### Important Optional Fields

- **identifier**: Business identifier for the media
- **basedOn**: Procedure request or order
- **partOf**: Larger event of which this is a part
- **type**: Classification of media (image, video, audio)
- **modality**: Imaging modality or acquisition method
- **view**: Imaging view (AP, lateral, etc.)
- **subject**: Who/what the media is about
- **encounter**: Encounter when media was created
- **created[x]**: When media was collected
- **issued**: When media was published
- **operator**: Who captured the media
- **reasonCode**: Why media was collected
- **bodySite**: Body site shown in media
- **deviceName**: Name of device used to create media
- **device**: Device used to create media
- **height**: Height of image/video in pixels
- **width**: Width of image/video in pixels
- **frames**: Number of frames (for video)
- **duration**: Length in seconds (for audio/video)
- **note**: Comments about the media

## Field Descriptions

### status

The workflow status of the media:

- **preparation**: Media is being prepared
- **in-progress**: Media is being captured
- **not-done**: Media was not captured
- **on-hold**: Media capture is paused
- **stopped**: Media capture stopped before completion
- **completed**: Media capture is complete
- **entered-in-error**: Media was entered in error
- **unknown**: Status is unknown

### type

The type of media:

- **image**: Still image (photo, x-ray, scan)
- **video**: Moving images (ultrasound clip, procedure video)
- **audio**: Audio recording

Uses codes from the [Digital Media Type Codes](http://terminology.hl7.org/CodeSystem/media-type) value set.

### modality

The type of acquisition equipment or process:

- **XC**: External Camera (photography)
- **US**: Ultrasound
- **DX**: Digital Radiography
- **CT**: Computed Tomography
- **MR**: Magnetic Resonance
- **ES**: Endoscopy
- **DG**: Dermatology

Uses codes from the [DICOM Modality Codes](http://dicom.nema.org/resources/ontology/DCM) value set.

### view

The imaging view or perspective:

- **AP**: Anterior-Posterior
- **PA**: Posterior-Anterior
- **LAT**: Lateral
- **OBL**: Oblique

Uses codes from imaging view value sets.

### subject

Reference to who or what the media is about:

- Patient (most common)
- Practitioner
- Group
- Device
- Specimen
- Location

### created[x]

When the media was collected:

- **createdDateTime**: Specific date and time
- **createdPeriod**: Period over which media was collected

### operator

Reference to the person who captured the media:

- Practitioner
- PractitionerRole
- Organization
- CareTeam
- Patient (for patient-captured media)

### reasonCode

Why the media was collected:

- Documentation of wound healing
- Diagnostic imaging
- Procedure documentation
- Patient education
- Legal documentation

### bodySite

Anatomical location shown in the media:

```json
{
  "coding": [{
    "system": "http://snomed.info/sct",
    "code": "368209003",
    "display": "Right upper arm"
  }]
}
```

Uses SNOMED CT body structure codes.

### content

The actual media content:

- **contentType**: MIME type (image/jpeg, video/mp4, audio/mpeg, etc.)
- **data**: Base64-encoded media data
- **url**: URL where media can be retrieved
- **size**: Size in bytes
- **hash**: SHA-1 hash of the content
- **title**: Label for the media
- **creation**: When the attachment was created

Common MIME types:

- **image/jpeg**: JPEG images
- **image/png**: PNG images
- **image/tiff**: TIFF images
- **video/mp4**: MP4 videos
- **video/mpeg**: MPEG videos
- **audio/mpeg**: MP3 audio
- **audio/wav**: WAV audio

### note

Additional notes about the media:

- Technical details
- Clinical significance
- Instructions for viewing
- Disclaimers

## Complete Example

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

## Usage Notes

1. **Storage Considerations**: For large media files (>1MB), consider storing externally and using `content.url` instead of embedding base64 data.

2. **MIME Types**: Always specify the correct MIME type in `content.contentType` for proper rendering and processing.

3. **Patient Privacy**: Be mindful of patient privacy and consent when capturing and storing media, especially photos and videos.

4. **Clinical Context**: Link media to encounters and include body site information for proper clinical context.

5. **Image Metadata**: Include dimensions (height, width), frames, and duration for technical specifications.

6. **Modality Codes**: Use DICOM modality codes when applicable for interoperability with imaging systems.

7. **Versioning**: If media needs to be updated or replaced, create a new Media resource and reference it appropriately.

8. **Notes**: Use the `note` field to provide clinical context, interpretation guidance, or technical details.

## Common Use Cases

### Wound Photo

```json
{
  "type": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/media-type",
      "code": "image"
    }]
  },
  "modality": {
    "coding": [{
      "system": "http://dicom.nema.org/resources/ontology/DCM",
      "code": "XC",
      "display": "External Camera Photography"
    }]
  },
  "bodySite": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "51636004",
      "display": "Structure of left ankle"
    }]
  },
  "reasonCode": [{
    "text": "Wound healing documentation"
  }]
}
```

### Ultrasound Video

```json
{
  "type": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/media-type",
      "code": "video"
    }]
  },
  "modality": {
    "coding": [{
      "system": "http://dicom.nema.org/resources/ontology/DCM",
      "code": "US",
      "display": "Ultrasound"
    }]
  },
  "content": {
    "contentType": "video/mp4"
  },
  "frames": 300,
  "duration": 10
}
```

### Dermoscopy Image

```json
{
  "type": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/media-type",
      "code": "image"
    }]
  },
  "modality": {
    "coding": [{
      "system": "http://dicom.nema.org/resources/ontology/DCM",
      "code": "DG",
      "display": "Dermatology"
    }]
  },
  "bodySite": {
    "coding": [{
      "system": "http://snomed.info/sct",
      "code": "14975008",
      "display": "Forearm"
    }]
  }
}
```

### Audio Recording

```json
{
  "type": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/media-type",
      "code": "audio"
    }]
  },
  "content": {
    "contentType": "audio/mpeg"
  },
  "duration": 120,
  "reasonCode": [{
    "text": "Heart sounds"
  }]
}
```

## Integration with Other Resources

Media resources are often referenced from:

- **Observation**: For imaging results
- **Procedure**: For procedure documentation
- **Condition**: For condition documentation
- **DocumentReference**: As attachments to clinical documents
- **DiagnosticReport**: For imaging reports

## FHIR Specification References

- [Media Resource](https://hl7.org/fhir/media.html)
- [Digital Media Type Codes](http://terminology.hl7.org/CodeSystem/media-type)
- [DICOM Modality Codes](http://dicom.nema.org/resources/ontology/DCM)
- [Event Status Codes](http://hl7.org/fhir/event-status)
- [MIME Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
