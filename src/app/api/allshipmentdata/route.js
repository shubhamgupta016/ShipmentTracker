import pool from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request){

    try{
        const query = `select * from shipments`;
        const client = await pool.connect();
        const result  = await client.query(query);
        if (result.rows.length >= 1) {
            return NextResponse.json(
              {
                data: result.rows,
                result: "All data fetch Successfully",
                success: true
                },
              {status: 201}
        );
            }else {
            return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
          }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
}