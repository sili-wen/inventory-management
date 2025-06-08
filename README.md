# inventory-management

# EC2 Service

To start the service on EC2, do the following

1. Go to the EC2 service and connect.
2. Start the service using `pm2 start ecosystem.config.js`
3. To run DB migrations, make sure the EC2 service has the following .env

   DATABASE_URL='postgres://postgres:<password>@rds-inventory-management.cbaugy04ghma.us-west-2.rds.amazonaws.com:5432/inventory_management?sslmode=no-verify'

4. DrizzleORM has a known issue that requires `sslmode=no-verify` at the end of the Postgres connection
