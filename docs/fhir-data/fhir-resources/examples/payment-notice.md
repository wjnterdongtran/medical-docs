# PaymentNotice

Records notification of payment or payment status.

## Resource Overview

The PaymentNotice resource provides notice of the payment status and optionally can be used to provide advance notice of a payment. This resource is used in financial transactions to communicate information about payments between payers, providers, and patients.

## Key Fields

### Required Fields

- **resourceType**: Must be `"PaymentNotice"`
- **status**: The status of the payment notice
- **created**: When the notice was created
- **payment**: Reference to the payment resource
- **recipient**: Intended recipient of the notice
- **amount**: Monetary amount

### Important Optional Fields

- **identifier**: Business identifier for the notice
- **request**: Reference to the request (e.g., Claim)
- **response**: Reference to the response
- **paymentDate**: Date of the payment
- **payee**: Party receiving payment
- **provider**: Provider responsible for the payment
- **paymentStatus**: Payment status code

## Field Descriptions

### status

The status of the payment notice:

- **active**: The notice is active
- **cancelled**: The notice was cancelled
- **draft**: The notice is in draft form
- **entered-in-error**: The notice was entered in error

### created

The date when the payment notice was created. This should be in ISO 8601 date format.

### payment

Reference to a PaymentReconciliation resource that contains details about the payment. This links the notice to the actual payment transaction.

### recipient

Reference to the Organization that is the intended recipient of the payment notice. This is typically:

- Insurance company (for provider to payer notices)
- Healthcare provider (for payer to provider notices)
- Patient (for payment notifications)

### amount

The monetary amount of the payment:

- **value**: Numeric amount
- **currency**: Currency code (USD, EUR, etc.)

Uses the ISO 4217 currency codes.

### request

Reference to the original request that resulted in the payment:

- Claim
- ClaimResponse
- Other financial resource

### response

Reference to the response related to the payment:

- ClaimResponse
- Explanation of Benefit

### paymentDate

The date when the payment was or will be made.

### payee

Reference to the party receiving the payment:

- Practitioner
- Organization
- Patient
- RelatedPerson

### provider

Reference to the Practitioner or Organization responsible for the request or claim.

### paymentStatus

A code indicating the payment status. Common values include:

- **paid**: Payment has been made
- **cleared**: Payment has cleared
- **pending**: Payment is pending
- **denied**: Payment was denied

Uses codes from the [Payment Status Codes](http://terminology.hl7.org/CodeSystem/paymentstatus) value set.

## Complete Example

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

## Usage Notes

1. **Advance Notice**: Use PaymentNotice to provide advance notice of upcoming payments to help organizations with cash flow planning.

2. **Payment Confirmation**: Send payment notices after payments are made to confirm receipt and processing.

3. **Currency Specification**: Always include the currency code in the amount to avoid ambiguity in international transactions.

4. **Linking Resources**: Link to the original Claim and ClaimResponse to provide full context for the payment.

5. **Status Tracking**: Update the status as the payment moves through different stages (draft → active).

6. **Payment Date**: Include `paymentDate` to indicate when funds were or will be transferred.

7. **Batch Payments**: When multiple claims are paid together, create individual PaymentNotice resources for each or reference a PaymentReconciliation for the batch.

8. **Provider Communication**: Use PaymentNotice to inform providers about payment status for submitted claims.

## Common Use Cases

### Payment Confirmation

```json
{
  "status": "active",
  "paymentStatus": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/paymentstatus",
      "code": "paid"
    }]
  },
  "paymentDate": "2024-11-20",
  "amount": {
    "value": 150.00,
    "currency": "USD"
  }
}
```

### Advance Payment Notice

```json
{
  "status": "active",
  "paymentStatus": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/paymentstatus",
      "code": "pending"
    }]
  },
  "paymentDate": "2024-12-01",
  "amount": {
    "value": 500.00,
    "currency": "USD"
  }
}
```

### Payment Denial Notice

```json
{
  "status": "active",
  "paymentStatus": {
    "coding": [{
      "system": "http://terminology.hl7.org/CodeSystem/paymentstatus",
      "code": "denied"
    }]
  },
  "request": {
    "reference": "Claim/{{claim_id}}"
  },
  "amount": {
    "value": 0.00,
    "currency": "USD"
  }
}
```

### Linked to Claim

```json
{
  "status": "active",
  "request": {
    "reference": "Claim/{{claim_id}}"
  },
  "response": {
    "reference": "ClaimResponse/{{claim_response_id}}"
  },
  "provider": {
    "reference": "Organization/{{provider_org_id}}"
  },
  "payee": {
    "reference": "Organization/{{provider_org_id}}"
  }
}
```

## Integration with Financial Workflow

PaymentNotice is typically part of a larger financial workflow:

1. **Claim** submitted by provider
2. **ClaimResponse** generated by payer
3. **PaymentReconciliation** created for payment processing
4. **PaymentNotice** sent to notify of payment status
5. **ExplanationOfBenefit** provided for detailed breakdown

## Common Amount Scenarios

### Full Payment

```json
{
  "amount": {
    "value": 100.00,
    "currency": "USD"
  }
}
```

### Partial Payment

```json
{
  "amount": {
    "value": 50.00,
    "currency": "USD"
  }
}
```

### No Payment (Denial)

```json
{
  "amount": {
    "value": 0.00,
    "currency": "USD"
  }
}
```

## FHIR Specification References

- [PaymentNotice Resource](https://hl7.org/fhir/paymentnotice.html)
- [Payment Status Codes](http://terminology.hl7.org/CodeSystem/paymentstatus)
- [Financial Status Codes](http://hl7.org/fhir/fm-status)
- [PaymentReconciliation Resource](https://hl7.org/fhir/paymentreconciliation.html)
- [ISO 4217 Currency Codes](https://www.iso.org/iso-4217-currency-codes.html)
