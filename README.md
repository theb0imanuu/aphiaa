
# aphiaa

Aphiaa is a pharmacy management system designed to streamline inventory management, sales tracking, and user roles management in a pharmacy setting. The system aims to simplify daily operations, reduce errors, and improve efficiency. It allows admins to manage users, track sales, and manage stock, while providing an intuitive interface for pharmacy staff and clinicians.




## Features

- 🔐 Secure authentication with NextAuth.js
- 🗄️ MySQL database integration with Prisma ORM
- 📱 Responsive design with modern UI components
- 👥 User management and role-based access control
- 🚀 High performance and SEO optimization

## Tech Stack

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API routes
- **Database**: MySQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **State Management**: Redux and Context API
- **Deployment**: Azure / Vercel / Netlify
### Prerequisites

- Node.js (preferably LTS version)
- Yarn (preferred, or npm)
- MySQL database (local or cloud setup)
- Git
## Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/theb0imanuu/aphiaa.git
   cd aphiaa
   ```

2. **Install Dependencies:**

   Using Yarn (preferred):
   ```bash
   yarn install
   ```

   Alternatively, using npm:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXTAUTH_SECRET=your-secret-key
   DATABASE_URL="your_db" # Preferably postgreSQL
   ```

4. **Run the Development Server:**

   For development:
   ```bash
   yarn dev  # or npm run dev
   ```

   Navigate to `http://localhost:3000` in your browser to access the application.

5. **Migrate Database:**

   Run database migrations to set up the necessary tables:
   ```bash
   yarn prisma migrate dev  # or npm run prisma migrate dev
   ```

6. **Seed the Database (Optional):**

   If you want to populate the database with initial data:
   ```bash
   yarn prisma db seed  # or npm run prisma db seed
   ```

## Project Structure

```bash
aphiaa/
├── app/
│   ├── (auth)/
│   ├── admin/
│   ├── users/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── Sidebar.tsx
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── pages/
│   ├── api/
│   ├── auth/
├── package.json
└── .gitignore
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [MIT](https://choosealicense.com/licenses/mit/) file for details.


