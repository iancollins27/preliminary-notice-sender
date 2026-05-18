import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

const addressSchema = {
  type: 'object',
  required: ['name', 'address_line1', 'address_city', 'address_state', 'address_zip'],
  properties: {
    name: { type: 'string', description: 'Recipient or sender full name.' },
    company: { type: 'string' },
    address_line1: { type: 'string' },
    address_line2: { type: 'string' },
    address_city: { type: 'string' },
    address_state: {
      type: 'string',
      minLength: 2,
      maxLength: 2,
      description: 'USPS 2-letter state code.',
    },
    address_zip: { type: 'string', description: '5-digit or ZIP+4.' },
    address_country: { type: 'string', default: 'US' },
  },
} as const

const letterRequest = {
  type: 'object',
  required: ['to', 'from'],
  description:
    'Provide exactly one of `body_text` (rendered server-side) or `file_url` (your own PDF).',
  properties: {
    to: { $ref: '#/components/schemas/Address' },
    from: { $ref: '#/components/schemas/Address' },
    body_text: {
      type: 'string',
      description:
        'Plain text body. Newlines preserved. Rendered to letter-sized PDF.',
      maxLength: 20000,
    },
    file_url: {
      type: 'string',
      format: 'uri',
      description: 'Public URL to a pre-rendered PDF (Letter 8.5x11).',
    },
    color: { type: 'boolean', default: false },
    double_sided: { type: 'boolean', default: true },
    extra_service: {
      type: 'string',
      enum: ['certified', 'registered', 'certified_return_receipt'],
      description: 'Adds tracking. Certified mail recommended for legal notices.',
    },
    description: { type: 'string', description: 'Internal label for your records.' },
    payment_token: {
      type: 'string',
      description:
        'Stripe Shared Payment Token (spt_...). If absent, the server returns 402 Payment Required with the quote.',
    },
  },
} as const

const letterResponse = {
  type: 'object',
  required: ['id', 'status', 'amount_charged_cents', 'currency', 'payment_intent_id'],
  properties: {
    id: { type: 'string', description: 'Letter / job id at the upstream mail provider.' },
    status: { type: 'string' },
    live: { type: 'boolean' },
    amount_charged_cents: { type: 'integer' },
    currency: { type: 'string' },
    payment_intent_id: { type: 'string' },
    receipt_url: { type: 'string', format: 'uri', nullable: true },
  },
} as const

const paymentRequiredBody = {
  type: 'object',
  description: 'RFC 9457 Problem Details for HTTP 402 Payment Required.',
  required: ['type', 'title', 'status', 'payment_request'],
  properties: {
    type: { type: 'string', format: 'uri' },
    title: { type: 'string' },
    status: { type: 'integer', enum: [402] },
    detail: { type: 'string' },
    instance: { type: 'string', format: 'uri' },
    payment_request: {
      type: 'object',
      required: ['amount', 'currency', 'methods'],
      properties: {
        amount: { type: 'integer', description: 'Amount in the smallest currency unit (cents).' },
        currency: { type: 'string', example: 'usd' },
        methods: {
          type: 'array',
          items: { type: 'string' },
          example: ['stripe.spt'],
        },
        idempotency_key: { type: 'string' },
      },
    },
  },
} as const

export async function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: `${siteConfig.name} API`,
      version: '0.2.0',
      summary: siteConfig.tagline,
      description: `${siteConfig.description}\n\nThis is the HTTP backend the ${siteConfig.name} MCP server is built on. Agents should normally use the MCP server (\`${siteConfig.npmPackage}\`) — see ${siteConfig.url}/setup. Direct HTTP integration uses the Machine Payments Protocol (HTTP 402) with Stripe Shared Payment Tokens.`,
      contact: { email: siteConfig.company.email, url: siteConfig.url },
      license: { name: 'Proprietary' },
    },
    servers: [{ url: `${siteConfig.api.baseUrl}/v1`, description: 'Production' }],
    tags: [
      { name: 'letters', description: 'Send and track physical letters.' },
      { name: 'postcards', description: 'Send postcards.' },
      { name: 'verify', description: 'USPS address verification.' },
    ],
    paths: {
      '/verify': {
        post: {
          tags: ['verify'],
          operationId: 'verify_address',
          summary: 'Verify and normalize a US address via USPS CASS. Free.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['address_line1'],
                  properties: {
                    address_line1: { type: 'string' },
                    address_line2: { type: 'string' },
                    address_city: { type: 'string' },
                    address_state: { type: 'string' },
                    address_zip: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Verification result.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      deliverability: { type: 'string' },
                      normalized: { $ref: '#/components/schemas/Address' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/letters': {
        post: {
          tags: ['letters'],
          operationId: 'send_letter',
          summary: 'Mail a physical letter. Returns 402 with quote if no payment_token.',
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/LetterRequest' } },
            },
          },
          responses: {
            '200': {
              description: 'Letter accepted, charged, and queued for mailing.',
              content: {
                'application/json': { schema: { $ref: '#/components/schemas/LetterResponse' } },
              },
            },
            '402': {
              description:
                'Payment required. WWW-Authenticate: Payment header carries the challenge.',
              headers: {
                'WWW-Authenticate': {
                  schema: { type: 'string' },
                  description: 'Payment intent="purchase", request="<base64url JSON>"',
                },
              },
              content: {
                'application/problem+json': {
                  schema: { $ref: '#/components/schemas/PaymentRequired' },
                },
              },
            },
            '400': { description: 'Validation error.' },
            '502': { description: 'Mailing failed after charge. Auto-refunded.' },
          },
        },
      },
      '/letters/{id}': {
        get: {
          tags: ['letters'],
          operationId: 'get_letter',
          summary: 'Get status for a previously sent letter.',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            '200': {
              description: 'Letter record.',
              content: { 'application/json': { schema: { type: 'object' } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Address: addressSchema,
        LetterRequest: letterRequest,
        LetterResponse: letterResponse,
        PaymentRequired: paymentRequiredBody,
      },
    },
    'x-mcp': {
      package: siteConfig.npmPackage,
      command: siteConfig.mcp.command,
      args: siteConfig.mcp.args,
      transport: siteConfig.mcp.transport,
      setup_url: `${siteConfig.url}/setup`,
    },
    'x-payment': {
      protocol: 'Machine Payments Protocol (MPP)',
      spec_url: 'https://docs.stripe.com/payments/machine/mpp',
      methods: ['stripe.spt'],
      fallback_field: 'payment_token',
    },
  }

  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  })
}
