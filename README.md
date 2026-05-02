# Express.js Boilerplate

A clean, production-ready Express.js boilerplate with authentication, MongoDB integration, and modular architecture. Perfect for starting new projects quickly.

## Features

- ✅ **Authentication Flow** - JWT-based user authentication
- ✅ **Authorization & Permissions** - Role-based access control
- ✅ **MongoDB Integration** - Mongoose ORM setup
- ✅ **Modular Structure** - Routes, Models, Middleware, Helpers
- ✅ **Rate Limiting** - Built-in request rate limiter
- ✅ **Cloudinary Integration** - File upload support
- ✅ **Environment Configuration** - .env.local setup
- ✅ **Example APIs** - Student module as reference

## Project Structure

```
.
├── Config/              # Configuration files
│   └── Cloudinary/      # File upload config
├── Constant/            # Application constants
├── Helpers/             # Helper functions
│   └── RateLimiter/     # Rate limiter utility
├── Middleware/          # Express middleware
│   ├── Authenticate/    # User authentication
│   ├── Authorize/       # Role-based authorization
│   ├── CheckPermission/ # Permission checker
│   └── TokenVerification/
├── Models/              # MongoDB schemas
│   ├── Student/         # Example: Student model
│   └── user/            # User model
├── Routes/              # API routes
│   ├── Auth/            # Authentication endpoints
│   └── Student/         # Example: Student endpoints
├── Types/               # Type definitions
├── Utils/               # Utility functions
├── Validations/         # Request validation schemas
│   └── Student/         # Example: Student validation
├── .env.local           # Environment variables
├── index.js             # Main server file
└── package.json         # Dependencies
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy `.env.local` and update with your credentials:
     ```bash
     NODE_ENV=development
     PORT=3002
     database_url=mongodb://localhost:27017/your_db_name
     JWT_SECRET=your_secret_key
     CLOUDINARY_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     FRONTEND_URL=http://localhost:3000
     ```

## Running the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

## API Examples

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/users` - Get all users (admin only)

### Student (Example Module)
- `GET /api/student` - Get all students
- `GET /api/student/:id` - Get student by ID
- `POST /api/student` - Create new student
- `PUT /api/student/:id` - Update student
- `DELETE /api/student/:id` - Delete student

See `Routes/Student/index.js` for the route template.

## Creating New APIs

1. **Create Model** in `Models/YourEntity/`
   - Example: `Models/Course/courseSchema.js`

2. **Create Routes** in `Routes/YourEntity/`
   - Example: `Routes/Course/index.js`

3. **Create Validation** in `Validations/YourEntity/`
   - Example: `Validations/Course/index.js`

4. **Register Route** in `Routes/index.js`
   ```javascript
   const yourEntity = require("./YourEntity");
   router.use("/your-entity", yourEntity);
   ```

## Middleware Usage

```javascript
const { authenticate, authorize, checkPermission } = require("./Middleware");

router.post(
  "/protected",
  authenticate,                    // Verify JWT token
  authorize(ROLES.ADMIN),          // Check role
  checkPermission(perm, cap),      // Check permissions
  controllerFunction
);
```

## Helpers

### Rate Limiter
```javascript
const { GlobalRateLimiter } = require("./Helpers/RateLimiter");
app.use(GlobalRateLimiter(160, 1)); // 160 requests per minute
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | App environment |
| `PORT` | 3002 | Server port |
| `database_url` | - | MongoDB connection string |
| `JWT_SECRET` | - | JWT signing secret |
| `CLOUDINARY_NAME` | - | Cloudinary account name |
| `CLOUDINARY_API_KEY` | - | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | - | Cloudinary API secret |
| `FRONTEND_URL` | http://localhost:3000 | Frontend URL for CORS |

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **joi** - Data validation
- **cloudinary** - File uploads
- **helmet** - Security headers
- **cors** - Cross-origin requests
- **multer** - File upload middleware
- **morgan** - Request logging
- **express-rate-limit** - Rate limiting

## License

ISC

## Author

moosa

