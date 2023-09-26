import pool from "../../../../lib/db";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(request){
    let response = await request.json();
    if(!response.username || !response.email || !response.password || !response.role || !response.vehiclenumber || !response.licensenumber || !response.contactnumber){
        return NextResponse.json({result:"All Fields Not Found"},{status:400})
    }
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(response.password, saltRounds);
        const client = await pool.connect();
        const value = [response.username,response.email,hashedPassword,response.role,response.driverId,response.vehiclenumber,response.licensenumber,response.contactnumber];
        const query1 = `INSERT INTO DRIVERS(vehiclenumber,licensenumber,contactnumber) values('${value[5]}', '${value[6]}', '${value[7]}')`
        const result1  = await client.query(query1);
        const query2 = `select max(driverid) from drivers`;

        const result2  = await client.query(query2);
        const driverId = Number(result2.rows[0]['max']);
        const query = `Insert INTO Users(username,email,password,role,driverid) values ('${value[0]}' ,'${value[1]}' ,'${value[2]}' ,'${value[3]}' ,${driverId})`
        const result  = await client.query(query);
        const query3 = `select * from users where driverid = ${driverId}`;
        const result3  = await client.query(query3);
        if (result.rowCount) {
            return NextResponse.json(
              {
                data: {userid:result3.rows[0]['userid'],password:result3.rows[0]['password']},
                result: "Login Successfully",
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