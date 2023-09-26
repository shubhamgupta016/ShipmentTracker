import pool from "../../../../lib/db";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(request){
    let response = await request.json();
    if(!response.userid || !response.password){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        const value = [response.userid];
        // const query = "select * from users where userid=$1 and password=$2";
        const query = 'SELECT * FROM users WHERE userid = $1';
        const client = await pool.connect();
        const result  = await client.query(query,value);
        if (result.rows.length >= 1) {
            const hashedPassword = result.rows[0].password;
            const passwordMatch = await bcrypt.compare(response.password, hashedPassword);
            
            if (passwordMatch) {
            return NextResponse.json(
              {
                data: {username:result.rows[0]['username'],role:result.rows[0]['role']},
                result: "Login Successfully",
                success: true
                },
              {status: 201}
        );}
            }else {
            return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
          }
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
}