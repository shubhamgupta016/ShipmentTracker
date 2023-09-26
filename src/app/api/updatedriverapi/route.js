import pool from "../../../../lib/db";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(request){
    let response = await request.json();
    if(!response.driverid || !response.userid || !response.username || !response.password || !response.email || !response.vehiclenumber || !response.licensenumber || !response.contactnumber){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        const client1 = await pool.connect();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(response.password, saltRounds);
        const value = [response.driverid, response.userid, response.username, hashedPassword, response.email, response.vehiclenumber, response.licensenumber, response.contactnumber];
        // if(response.shipmentstatus == 'delivered'){
        const query1 = `UPDATE drivers set vehiclenumber = '${value[5]}', licensenumber = '${value[6]}', contactnumber = '${value[7]}' where driverid = ${value[0]}`
        const result1  = await client1.query(query1);
        const client2 = await pool.connect();
        const query2 = `UPDATE users set username = '${value[2]}', password = '${value[3]}', email = '${value[4]}' where userid = ${value[1]} and driverid = ${value[0]}`
        const result2  = await client2.query(query2);
            if (result1.rowCount && result2.rowCount) {
                return NextResponse.json(
                  {
                    data:  result1.rows,
                    result: "Shipment made Successfully",
                    success: true,
                    },
                  {status: 201,}
            );
                }else {
                return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
              }
        
    } catch (error) {
        console.error("Error executing SQL query:", error);
        return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
    }
}