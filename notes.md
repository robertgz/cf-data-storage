DATABASE_URL="file:./dev.db"

npx prisma migrate dev --name init
npx prisma generate
