import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { db } from "./db";

// Import schemas
import { expenseByCategory } from "./schema/expenseByCategory";
import { expenses } from "./schema/expenses";
import { expenseSummary } from "./schema/expenseSummary";
import { products } from "./schema/products";
import { purchases } from "./schema/purchases";
import { sales } from "./schema/sales";
import { salesSummary } from "./schema/salesSummary";
import { users } from "./schema/users";

// Helper function to read JSON files
async function readJsonFile<T>(filename: string): Promise<T[]> {
  const filePath = path.join(__dirname, "seedData", filename);
  const fileContent = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
}

// Transform user data from JSON format to schema format
function transformUserData(userData: any[]) {
  return userData.map((user) => ({
    id: user.userId,
    firstName: user.name.split(" ")[0] || user.name,
    lastName: user.name.split(" ").slice(1).join(" ") || "",
    email: user.email,
  }));
}

// Transform product data from JSON format to schema format
function transformProductData(productData: any[]) {
  return productData.map((product) => ({
    id: product.productId,
    name: product.name,
    price: Math.round(product.price * 100), // Convert to cents
    rating: product.rating.toString(),
    quantity: product.stockQuantity,
  }));
}

// Transform sales data
function transformSalesData(salesData: any[]) {
  return salesData.map((sale) => ({
    id: sale.saleId,
    productId: sale.productId,
    quantity: sale.quantity,
    unitPrice: (sale.unitPrice * 100).toString(), // Convert to cents as string
    totalAmount: (sale.totalAmount * 100).toString(), // Convert to cents as string
  }));
}

// Transform expenses data
function transformExpensesData(expensesData: any[]) {
  return expensesData.map((expense) => ({
    id: expense.expenseId,
    category: expense.category,
    amount: Math.round(expense.amount * 100), // Convert to cents as integer
  }));
}

// Transform purchases data
function transformPurchasesData(purchasesData: any[]) {
  return purchasesData.map((purchase) => ({
    id: purchase.purchaseId,
    productId: purchase.productId,
    quantity: purchase.quantity,
    unitCost: (purchase.unitCost * 100).toString(), // Convert to cents as string
    totalcost: (purchase.totalCost * 100).toString(), // Convert to cents as string
  }));
}

// Transform expense by category data
function transformExpenseByCategoryData(data: any[]) {
  return data.map((item) => ({
    id: item.expenseByCategoryId,
    expenseSummaryId: item.expenseSummaryId,
    category: item.category,
    amount: item.amount,
  }));
}

// Seed function
async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    // Read all JSON files
    const [
      usersData,
      productsData,
      salesData,
      expensesData,
      purchasesData,
      expenseByCategoryData,
      expenseSummaryData,
      salesSummaryData,
    ] = await Promise.all([
      readJsonFile("users.json"),
      readJsonFile("products.json"),
      readJsonFile("sales.json"),
      readJsonFile("expenses.json"),
      readJsonFile("purchases.json"),
      readJsonFile("expenseByCategory.json"),
      readJsonFile("expenseSummary.json"),
      readJsonFile("salesSummary.json"),
    ]);

    // Seed users
    console.log("👥 Seeding users...");
    const transformedUsers = transformUserData(usersData);
    await db.insert(users).values(transformedUsers);
    console.log(`✅ Inserted ${transformedUsers.length} users`);

    // Seed products
    console.log("📦 Seeding products...");
    const transformedProducts = transformProductData(productsData);
    await db.insert(products).values(transformedProducts);
    console.log(`✅ Inserted ${transformedProducts.length} products`);

    // Seed expenses
    console.log("💸 Seeding expenses...");
    const transformedExpenses = transformExpensesData(expensesData);
    await db.insert(expenses).values(transformedExpenses);
    console.log(`✅ Inserted ${transformedExpenses.length} expenses`);

    // Seed expense summary (must come before expense by category due to foreign key)
    console.log("💰 Seeding expense summaries...");
    const transformedExpenseSummary = expenseSummaryData.map((item: any) => ({
      id: item.expenseSummaryId,
      totalExpenses: (item.totalExpenses * 100).toString(), // Convert to cents as string
    }));
    await db.insert(expenseSummary).values(transformedExpenseSummary);
    console.log(
      `✅ Inserted ${transformedExpenseSummary.length} expense summaries`
    );

    // Seed expense by category
    console.log("📊 Seeding expenses by category...");
    const transformedExpenseByCategory = transformExpenseByCategoryData(
      expenseByCategoryData
    );
    await db.insert(expenseByCategory).values(transformedExpenseByCategory);
    console.log(
      `✅ Inserted ${transformedExpenseByCategory.length} expense categories`
    );

    // Seed sales summary
    console.log("💼 Seeding sales summaries...");
    const transformedSalesSummary = salesSummaryData.map((item: any) => ({
      id: item.salesSummaryId,
      totalValue: (item.totalValue * 100).toString(), // Convert to cents as string
      changePercentage: item.changePercentage?.toString() || "0",
    }));
    await db.insert(salesSummary).values(transformedSalesSummary);
    console.log(
      `✅ Inserted ${transformedSalesSummary.length} sales summaries`
    );

    // Seed sales (must come after products due to foreign key)
    console.log("🛍️ Seeding sales...");
    const transformedSales = transformSalesData(salesData);
    await db.insert(sales).values(transformedSales);
    console.log(`✅ Inserted ${transformedSales.length} sales`);

    // Seed purchases (must come after products due to foreign key)
    console.log("🛒 Seeding purchases...");
    const transformedPurchases = transformPurchasesData(purchasesData);
    await db.insert(purchases).values(transformedPurchases);
    console.log(`✅ Inserted ${transformedPurchases.length} purchases`);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
if (require.main === module) {
  seed().catch(console.error);
}

export { seed };
