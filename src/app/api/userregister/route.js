import pool from "../../../../lib/db";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(request){
    let response = await request.json();
    if(!response.username || !response.email || !response.password || !response.role){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(response.password, saltRounds);
        const client = await pool.connect();
        const value = [response.username,response.email,hashedPassword,response.role,response.driverId];
        const query = `Insert INTO Users(username,email,password,role,driverid) values ('${value[0]}' ,'${value[1]}' ,'${value[2]}' ,'${value[3]}' ,${value[4]})`
        const result  = await client.query(query);
        const query1 = `select * from users order by userid asc`
        const result1  = await client.query(query1);
        const returnData = [result1.rows[result1.rows.length-1]['userid'], result1.rows[result1.rows.length-1]['password']];
        
        if (result1.rowCount) {
            return NextResponse.json(
              {
                data:  {userid: returnData[0],password:returnData[1]},
                result: "Login Successfully",
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