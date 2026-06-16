import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const productionUrl =
  process.env.PUBLIC_API_URL || "https://beyond-sea-travels-api.onrender.com";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Beyond Sea Travels API",
      version: "1.0.0",
      description:
        "REST API for the Beyond Sea Travels fullstack tourism lead management platform. Includes public catalogue APIs, inquiry capture, JWT admin authentication, and protected inquiry management endpoints.",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Local development server",
      },
      {
        url: productionUrl,
        description: "Production API server",
      },
    ],
    tags: [
      { name: "Auth", description: "Admin authentication and session endpoints" },
      { name: "Tours", description: "Public tour catalogue endpoints" },
      { name: "Destinations", description: "Public destination endpoints" },
      { name: "Testimonials", description: "Public testimonial endpoints" },
      { name: "Transfers", description: "Transfer location, route, and estimate endpoints" },
      { name: "Inquiries", description: "Inquiry capture and protected inquiry management" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Unauthorized" },
          },
          required: ["success", "message"],
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email", example: "admin@beyondsea.com" },
            password: { type: "string", example: "Admin123!" },
          },
          required: ["email", "password"],
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "cmq62a9kc0000r5w1jjf0l2aj" },
            fullName: { type: "string", example: "Beyond Sea Admin" },
            email: { type: "string", format: "email", example: "admin@beyondsea.com" },
            role: { type: "string", example: "ADMIN" },
          },
          required: ["id", "fullName", "email", "role"],
        },
        TourImage: {
          type: "object",
          properties: {
            id: { type: "string" },
            url: { type: "string", example: "/images/sigiriya.webp" },
            alt: { type: "string", example: "Sri Lanka 7-Day Signature Escape image 1" },
            tourId: { type: "string" },
          },
        },
        ItineraryDay: {
          type: "object",
          properties: {
            id: { type: "string" },
            dayNumber: { type: "integer", example: 1 },
            title: { type: "string", example: "Arrival and Coastal Welcome" },
            location: { type: "string", example: "Negombo" },
            description: { type: "string" },
            highlights: {
              type: "array",
              items: { type: "string" },
              example: ["VIP arrival", "Sunset dinner"],
            },
          },
        },
        Activity: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string", example: "Private Temple Tour" },
            description: { type: "string" },
            icon: { type: "string", example: "Landmark" },
            image: { type: "string", example: "/images/kandy.jpg" },
            estimatedPrice: { type: "string", nullable: true, example: "60" },
          },
        },
        Tour: {
          type: "object",
          properties: {
            id: { type: "string" },
            slug: { type: "string", example: "sri-lanka-7-day-escape" },
            title: { type: "string", example: "Sri Lanka 7-Day Signature Escape" },
            country: { type: "string", example: "Sri Lanka" },
            durationDays: { type: "integer", example: 7 },
            shortDescription: { type: "string" },
            overview: { type: "string" },
            startingPrice: { type: "string", example: "2399" },
            priceMin: { type: "string", example: "2399" },
            priceMax: { type: "string", example: "3199" },
            bestSeason: { type: "string", example: "November - April" },
            groupSize: { type: "string", example: "2-8 guests" },
            featuredImage: { type: "string", example: "/images/sigiriya2.jpg" },
            isFeatured: { type: "boolean", example: true },
            images: { type: "array", items: { $ref: "#/components/schemas/TourImage" } },
            itineraryDays: { type: "array", items: { $ref: "#/components/schemas/ItineraryDay" } },
            activities: { type: "array", items: { $ref: "#/components/schemas/Activity" } },
            destinations: { type: "array", items: { $ref: "#/components/schemas/Destination" } },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Destination: {
          type: "object",
          properties: {
            id: { type: "string" },
            slug: { type: "string", example: "sigiriya" },
            name: { type: "string", example: "Sigiriya" },
            country: { type: "string", example: "Sri Lanka" },
            description: { type: "string" },
            image: { type: "string", example: "/images/sigiriya2.jpg" },
            highlights: {
              type: "array",
              items: { type: "string" },
              example: ["Lion Rock", "Village safari"],
            },
            isFeatured: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Testimonial: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string", example: "Asha Perera" },
            country: { type: "string", example: "Sri Lanka" },
            message: { type: "string" },
            rating: { type: "integer", example: 5 },
            avatar: { type: "string" },
            role: { type: "string", example: "Honeymoon Couple" },
            isFeatured: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        TransferLocation: {
          type: "object",
          properties: {
            id: { type: "string" },
            slug: { type: "string", example: "colombo" },
            name: { type: "string", example: "Colombo" },
            type: { type: "string", example: "city" },
            description: { type: "string" },
          },
        },
        TransferRoute: {
          type: "object",
          properties: {
            id: { type: "string" },
            distanceKm: { type: "integer", example: 120 },
            basePrice: { type: "string", example: "180" },
            estimatedDuration: { type: "string", example: "2h 15m" },
            recommendedStops: {
              type: "array",
              items: { type: "string" },
              example: ["Bentota Turtle Hatchery", "Madu River Safari"],
            },
            pickupLocation: { $ref: "#/components/schemas/TransferLocation" },
            dropoffLocation: { $ref: "#/components/schemas/TransferLocation" },
          },
        },
        TransferEstimate: {
          type: "object",
          properties: {
            pickup: { $ref: "#/components/schemas/TransferLocation" },
            dropoff: { $ref: "#/components/schemas/TransferLocation" },
            distanceKm: { type: "integer", example: 120 },
            estimatedDuration: { type: "string", example: "2h 15m" },
            basePrice: { type: "number", example: 180 },
            passengerMultiplier: { type: "number", example: 1.15 },
            estimatedPrice: { type: "integer", example: 207 },
            recommendedVehicle: { type: "string", example: "SUV" },
            recommendedStops: { type: "array", items: { type: "string" } },
          },
        },
        InquiryStatus: {
          type: "string",
          enum: ["NEW", "CONTACTED", "CONFIRMED", "CANCELLED"],
          example: "NEW",
        },
        ContactInquiry: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullName: { type: "string", example: "John Smith" },
            email: { type: "string", nullable: true, example: "john@example.com" },
            whatsapp: { type: "string", example: "+49123456789" },
            country: { type: "string", nullable: true, example: "Germany" },
            inquiryType: { type: "string", example: "Custom Tour" },
            message: { type: "string", example: "I want to plan a 10 day Sri Lanka trip." },
            status: { $ref: "#/components/schemas/InquiryStatus" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        TourInquiry: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullName: { type: "string", example: "Anna Muller" },
            email: { type: "string", nullable: true, example: "anna@example.com" },
            whatsapp: { type: "string", example: "+49123456789" },
            country: { type: "string", nullable: true, example: "Germany" },
            travelDate: { type: "string", format: "date-time", nullable: true },
            passengerCount: { type: "integer", example: 4 },
            message: { type: "string", nullable: true },
            tourId: { type: "string", nullable: true },
            tourTitle: { type: "string", example: "Sri Lanka 7 Day Escape" },
            tourSlug: { type: "string", example: "sri-lanka-7-day-escape" },
            status: { $ref: "#/components/schemas/InquiryStatus" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CustomTourInquiry: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullName: { type: "string", example: "David Lee" },
            email: { type: "string", nullable: true },
            whatsapp: { type: "string", example: "+86123456789" },
            country: { type: "string", nullable: true, example: "China" },
            travelDate: { type: "string", format: "date-time", nullable: true },
            duration: { type: "string", example: "14 Days" },
            budget: { type: "string", example: "Luxury" },
            passengerCount: { type: "integer", example: 2 },
            destinations: {
              type: "array",
              items: { type: "string" },
              example: ["Sigiriya", "Kandy", "Ella", "Mirissa"],
            },
            interests: {
              type: "array",
              nullable: true,
              items: { type: "string" },
              example: ["Culture", "Beaches", "Wildlife"],
            },
            message: { type: "string", nullable: true },
            status: { $ref: "#/components/schemas/InquiryStatus" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        TransferInquiry: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullName: { type: "string", example: "Sarah Wilson" },
            email: { type: "string", nullable: true, example: "sarah@example.com" },
            whatsapp: { type: "string", example: "+44123456789" },
            country: { type: "string", nullable: true, example: "United Kingdom" },
            travelDate: { type: "string", format: "date-time", nullable: true },
            pickupLocation: { type: "string", example: "Colombo" },
            dropoffLocation: { type: "string", example: "Galle" },
            passengerCount: { type: "integer", example: 4 },
            estimatedVehicle: { type: "string", nullable: true, example: "SUV" },
            estimatedPrice: { type: "string", nullable: true, example: "207" },
            distanceKm: { type: "integer", nullable: true, example: 120 },
            message: { type: "string", nullable: true },
            status: { $ref: "#/components/schemas/InquiryStatus" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                user: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "JWT token is missing, invalid, or expired.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        NotFoundError: {
          description: "Resource not found.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        ValidationError: {
          description: "Validation failed.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    paths: {
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Admin login",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" },
              },
            },
          },
          responses: {
            "200": {
              description: "Login successful.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LoginResponse" },
                },
              },
            },
            "401": { $ref: "#/components/responses/UnauthorizedError" },
          },
        },
      },
      "/api/auth/me": {
        get: {
          tags: ["Auth"],
          summary: "Get current admin user",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Current authenticated user.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/UnauthorizedError" },
          },
        },
      },
      "/api/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout current admin user",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Logout acknowledgement.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessResponse" },
                },
              },
            },
            "401": { $ref: "#/components/responses/UnauthorizedError" },
          },
        },
      },
      "/api/tours": {
        get: {
          tags: ["Tours"],
          summary: "List tours",
          parameters: [
            { name: "country", in: "query", schema: { type: "string" }, example: "Sri Lanka" },
            { name: "duration", in: "query", schema: { type: "integer" }, example: 7 },
            { name: "featured", in: "query", schema: { type: "boolean" }, example: true },
          ],
          responses: {
            "200": {
              description: "Tour list.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { type: "array", items: { $ref: "#/components/schemas/Tour" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/tours/{slug}": {
        get: {
          tags: ["Tours"],
          summary: "Get tour by slug",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              schema: { type: "string" },
              example: "sri-lanka-7-day-escape",
            },
          ],
          responses: {
            "200": {
              description: "Tour detail.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/Tour" },
                    },
                  },
                },
              },
            },
            "404": { $ref: "#/components/responses/NotFoundError" },
          },
        },
      },
      "/api/destinations": {
        get: {
          tags: ["Destinations"],
          summary: "List destinations",
          parameters: [
            { name: "country", in: "query", schema: { type: "string" }, example: "Sri Lanka" },
            { name: "featured", in: "query", schema: { type: "boolean" }, example: true },
          ],
          responses: {
            "200": {
              description: "Destination list.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { type: "array", items: { $ref: "#/components/schemas/Destination" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/testimonials": {
        get: {
          tags: ["Testimonials"],
          summary: "List testimonials",
          parameters: [
            { name: "featured", in: "query", schema: { type: "boolean" }, example: true },
          ],
          responses: {
            "200": {
              description: "Testimonial list.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { type: "array", items: { $ref: "#/components/schemas/Testimonial" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/transfers/locations": {
        get: {
          tags: ["Transfers"],
          summary: "List transfer locations",
          responses: {
            "200": {
              description: "Transfer locations.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { type: "array", items: { $ref: "#/components/schemas/TransferLocation" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/transfers/routes": {
        get: {
          tags: ["Transfers"],
          summary: "List transfer routes",
          responses: {
            "200": {
              description: "Transfer routes.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { type: "array", items: { $ref: "#/components/schemas/TransferRoute" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/transfers/estimate": {
        get: {
          tags: ["Transfers"],
          summary: "Estimate transfer route pricing",
          parameters: [
            { name: "pickup", in: "query", required: true, schema: { type: "string" }, example: "colombo" },
            { name: "dropoff", in: "query", required: true, schema: { type: "string" }, example: "galle" },
            { name: "passengers", in: "query", required: true, schema: { type: "integer" }, example: 4 },
          ],
          responses: {
            "200": {
              description: "Transfer estimate.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/TransferEstimate" },
                    },
                  },
                },
              },
            },
            "400": { $ref: "#/components/responses/ValidationError" },
            "404": { $ref: "#/components/responses/NotFoundError" },
          },
        },
      },
      "/api/inquiries/contact": {
        post: {
          tags: ["Inquiries"],
          summary: "Create contact inquiry",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fullName", "whatsapp", "inquiryType", "message"],
                  properties: {
                    fullName: { type: "string", example: "John Smith" },
                    email: { type: "string", format: "email", example: "john@example.com" },
                    whatsapp: { type: "string", example: "+49123456789" },
                    country: { type: "string", example: "Germany" },
                    inquiryType: {
                      type: "string",
                      enum: ["Tour Inquiry", "Custom Tour", "Transfers", "General Inquiry"],
                      example: "Custom Tour",
                    },
                    message: { type: "string", example: "I want to plan a 10 day Sri Lanka trip." },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Contact inquiry created.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/ContactInquiry" },
                    },
                  },
                },
              },
            },
            "400": { $ref: "#/components/responses/ValidationError" },
          },
        },
      },
      "/api/inquiries/tour": {
        post: {
          tags: ["Inquiries"],
          summary: "Create tour inquiry",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fullName", "whatsapp", "tourSlug", "tourTitle", "passengerCount"],
                  properties: {
                    fullName: { type: "string", example: "Anna Muller" },
                    email: { type: "string", format: "email", example: "anna@example.com" },
                    whatsapp: { type: "string", example: "+49123456789" },
                    country: { type: "string", example: "Germany" },
                    travelDate: { type: "string", format: "date", example: "2026-08-15" },
                    passengerCount: { type: "integer", example: 4 },
                    tourSlug: { type: "string", example: "sri-lanka-7-day-escape" },
                    tourTitle: { type: "string", example: "Sri Lanka 7 Day Escape" },
                    message: { type: "string", example: "Please send me the full quote." },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Tour inquiry created.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/TourInquiry" },
                    },
                  },
                },
              },
            },
            "400": { $ref: "#/components/responses/ValidationError" },
          },
        },
      },
      "/api/inquiries/custom-tour": {
        post: {
          tags: ["Inquiries"],
          summary: "Create custom tour inquiry",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fullName", "whatsapp", "duration", "budget", "passengerCount", "destinations"],
                  properties: {
                    fullName: { type: "string", example: "David Lee" },
                    email: { type: "string", format: "email", example: "david@example.com" },
                    whatsapp: { type: "string", example: "+86123456789" },
                    country: { type: "string", example: "China" },
                    travelDate: { type: "string", format: "date", example: "2026-09-10" },
                    duration: { type: "string", example: "14 Days" },
                    budget: { type: "string", example: "Luxury" },
                    passengerCount: { type: "integer", example: 2 },
                    destinations: {
                      type: "array",
                      items: { type: "string" },
                      example: ["Sigiriya", "Kandy", "Ella", "Mirissa"],
                    },
                    interests: {
                      type: "array",
                      items: { type: "string" },
                      example: ["Culture", "Beaches", "Wildlife"],
                    },
                    message: { type: "string", example: "We want a private honeymoon tour." },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Custom tour inquiry created.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/CustomTourInquiry" },
                    },
                  },
                },
              },
            },
            "400": { $ref: "#/components/responses/ValidationError" },
          },
        },
      },
      "/api/inquiries/transfer": {
        post: {
          tags: ["Inquiries"],
          summary: "Create transfer inquiry",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fullName", "whatsapp", "pickupLocation", "dropoffLocation", "passengerCount"],
                  properties: {
                    fullName: { type: "string", example: "Sarah Wilson" },
                    email: { type: "string", format: "email", example: "sarah@example.com" },
                    whatsapp: { type: "string", example: "+44123456789" },
                    country: { type: "string", example: "United Kingdom" },
                    travelDate: { type: "string", format: "date", example: "2026-07-20" },
                    pickupLocation: { type: "string", example: "Colombo" },
                    dropoffLocation: { type: "string", example: "Galle" },
                    passengerCount: { type: "integer", example: 4 },
                    estimatedVehicle: { type: "string", example: "SUV" },
                    estimatedPrice: { type: "number", example: 207 },
                    distanceKm: { type: "integer", example: 120 },
                    message: { type: "string", example: "We need airport-style luggage space." },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Transfer inquiry created.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: { $ref: "#/components/schemas/TransferInquiry" },
                    },
                  },
                },
              },
            },
            "400": { $ref: "#/components/responses/ValidationError" },
          },
        },
      },
      "/api/inquiries": {
        get: {
          tags: ["Inquiries"],
          summary: "List all inquiries",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "status",
              in: "query",
              schema: { $ref: "#/components/schemas/InquiryStatus" },
              required: false,
            },
          ],
          responses: {
            "200": {
              description: "Combined inquiry data and counts.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean", example: true },
                      data: {
                        type: "object",
                        properties: {
                          contact: {
                            type: "array",
                            items: { $ref: "#/components/schemas/ContactInquiry" },
                          },
                          tour: {
                            type: "array",
                            items: { $ref: "#/components/schemas/TourInquiry" },
                          },
                          customTour: {
                            type: "array",
                            items: { $ref: "#/components/schemas/CustomTourInquiry" },
                          },
                          transfer: {
                            type: "array",
                            items: { $ref: "#/components/schemas/TransferInquiry" },
                          },
                          counts: {
                            type: "object",
                            properties: {
                              total: { type: "integer", example: 4 },
                              new: { type: "integer", example: 2 },
                              contacted: { type: "integer", example: 1 },
                              confirmed: { type: "integer", example: 1 },
                              cancelled: { type: "integer", example: 0 },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            "401": { $ref: "#/components/responses/UnauthorizedError" },
          },
        },
      },
      "/api/inquiries/{type}/{id}": {
        get: {
          tags: ["Inquiries"],
          summary: "Get inquiry by type and ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "type",
              in: "path",
              required: true,
              schema: { type: "string", enum: ["contact", "tour", "custom-tour", "transfer"] },
            },
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            "200": {
              description: "Inquiry detail.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessResponse" },
                },
              },
            },
            "401": { $ref: "#/components/responses/UnauthorizedError" },
            "404": { $ref: "#/components/responses/NotFoundError" },
          },
        },
      },
      "/api/inquiries/{type}/{id}/status": {
        patch: {
          tags: ["Inquiries"],
          summary: "Update inquiry status",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "type",
              in: "path",
              required: true,
              schema: { type: "string", enum: ["contact", "tour", "custom-tour", "transfer"] },
            },
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: { $ref: "#/components/schemas/InquiryStatus" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Inquiry status updated.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SuccessResponse" },
                },
              },
            },
            "400": { $ref: "#/components/responses/ValidationError" },
            "401": { $ref: "#/components/responses/UnauthorizedError" },
            "404": { $ref: "#/components/responses/NotFoundError" },
          },
        },
      },
    },
  },
  apis: [],
});

export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customSiteTitle: "Beyond Sea Travels API Docs",
});
