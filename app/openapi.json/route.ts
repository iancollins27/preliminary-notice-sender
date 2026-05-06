import { siteConfig } from '@/lib/config'

export const dynamic = 'force-static'

const addressSchema = {
  type: 'object',
  required: ['name', 'address_line1', 'city', 'state', 'zip'],
  properties: {
    name: { type: 'string', description: 'Recipient or sender full name.' },
    address_line1: { type: 'string' },
    address_line2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string', minLength: 2, maxLength: 2, description: 'USPS 2-letter state code.' },
    zip: { type: 'string', description: '5-digit or ZIP+4.' },
  },
} as const

const mailRecord = {
  type: 'object',
  required: ['id', 'status', 'created_at'],
  properties: {
    id: { type: 'string' },
    status: {
      type: 'string',
      enum: ['queued', 'printed', 'in_transit', 'delivered', 'returned'],
    },
    created_at: { type: 'string', format: 'date-time' },
    estimated_delivery: { type: 'string', format: 'date' },
    tracking_url: { type: 'string', format: 'uri' },
    to: { $ref: '#/components/schemas/Address' },
    from: { $ref: '#/components/schemas/Address' },
  },
} as const

export async function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: `${siteConfig.name} API`,
      version: '0.1.0',
      summary: siteConfig.tagline,
      description: `${siteConfig.description}\n\nThis OpenAPI document describes the HTTP surface that the ${siteConfig.name} MCP server is built on. Most agents should use the MCP server at ${siteConfig.mcp.serverUrl} rather than calling these endpoints directly. See ${siteConfig.url}/setup.`,
      contact: { email: siteConfig.company.email, url: siteConfig.url },
      license: { name: 'Proprietary' },
    },
    servers: [{ url: `${siteConfig.url}/api/v1`, description: 'Production' }],
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'letters', description: 'Send and track physical letters.' },
      { name: 'postcards', description: 'Send postcards.' },
    ],
    paths: {
      '/letters': {
        post: {
          tags: ['letters'],
          operationId: 'send_letter',
          summary: 'Mail a physical letter to a US address.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['to', 'body'],
                  properties: {
                    to: { $ref: '#/components/schemas/Address' },
                    from: { $ref: '#/components/schemas/Address' },
                    body: { type: 'string', description: 'Letter body. Plain text, markdown, or HTML.' },
                    subject: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Letter accepted for printing.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/MailRecord' } } },
            },
          },
        },
      },
      '/letters/{id}': {
        get: {
          tags: ['letters'],
          operationId: 'get_mail_status',
          summary: 'Get delivery status for a piece of mail.',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            '200': {
              description: 'Mail record.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/MailRecord' } } },
            },
          },
        },
      },
      '/letters/list': {
        get: {
          tags: ['letters'],
          operationId: 'list_sent_mail',
          summary: 'List sent mail for the authenticated account.',
          parameters: [
            { name: 'limit', in: 'query', schema: { type: 'integer', maximum: 100, default: 25 } },
            { name: 'cursor', in: 'query', schema: { type: 'string' } },
            { name: 'recipient_filter', in: 'query', schema: { type: 'string' } },
            { name: 'since', in: 'query', schema: { type: 'string', format: 'date-time' } },
          ],
          responses: {
            '200': {
              description: 'Paginated list of mail records.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      items: { type: 'array', items: { $ref: '#/components/schemas/MailRecord' } },
                      next_cursor: { type: 'string', nullable: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/postcards': {
        post: {
          tags: ['postcards'],
          operationId: 'send_postcard',
          summary: 'Send a postcard with a custom front image.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['to', 'front_image_url', 'message'],
                  properties: {
                    to: { $ref: '#/components/schemas/Address' },
                    front_image_url: { type: 'string', format: 'uri' },
                    message: { type: 'string', maxLength: 400 },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Postcard accepted for printing.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/MailRecord' } } },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'API key' },
      },
      schemas: {
        Address: addressSchema,
        MailRecord: mailRecord,
      },
    },
    'x-mcp': {
      server_url: siteConfig.mcp.serverUrl,
      transport: siteConfig.mcp.transport,
      setup_url: `${siteConfig.url}/setup`,
    },
  }

  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  })
}
